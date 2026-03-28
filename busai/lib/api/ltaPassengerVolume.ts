import AsyncStorage from "@react-native-async-storage/async-storage";
import JSZip from "jszip";

const API_URL = "https://datamall2.mytransport.sg/ltaodataservice/PV/Bus";
const API_KEY = process.env.EXPO_PUBLIC_LTA_DATAMALL_KEY ?? "";
const CACHE_KEY_PREFIX = "lta_pv_bus_v2_";
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface PVRecord {
  YEAR_MONTH: string;
  DAY_TYPE: string;
  TIME_PER_HOUR: number;
  PT_TYPE: string;
  PT_CODE: string;
  TOTAL_TAP_IN_VOLUME: number;
  TOTAL_TAP_OUT_VOLUME: number;
}

interface CachedPV {
  timestamp: number;
  records: PVRecord[];
}

// Returns YYYYMM format (no hyphen) as required by the LTA PV/Bus API
function getPreviousMonth(): string {
  const now = new Date();
  const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const yyyy = prev.getFullYear();
  const mm = String(prev.getMonth() + 1).padStart(2, "0");
  return `${yyyy}${mm}`;
}

// Step 1: Ask LTA for the S3 download link
async function fetchDownloadLink(yearMonth: string): Promise<string> {
  const res = await fetch(`${API_URL}?Date=${yearMonth}`, {
    headers: { AccountKey: API_KEY, accept: "application/json" },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`LTA PV/Bus API error ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  const link: string | undefined = data?.value?.[0]?.Link;
  if (!link) {
    throw new Error("LTA PV/Bus: no download link in response");
  }
  return link;
}

// Step 2: Download the ZIP and extract the CSV text
async function downloadAndExtractCsv(link: string): Promise<string> {
  const res = await fetch(link);
  if (!res.ok) throw new Error(`S3 download error ${res.status}`);

  // fetch gives us an ArrayBuffer; JSZip can load that directly
  const arrayBuffer = await res.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);

  // The ZIP contains one CSV file — grab whatever file is inside
  const csvFile = Object.values(zip.files).find(
    (f) => !f.dir && f.name.toLowerCase().endsWith(".csv")
  );
  if (!csvFile) throw new Error("No CSV found inside PV/Bus ZIP");

  return csvFile.async("string");
}

// Step 3: Parse the CSV into PVRecord[]
function parseCsv(csv: string): PVRecord[] {
  const lines = csv.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];

  // Normalise header names (trim whitespace/BOM)
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^\uFEFF/, ""));

  const idx = (name: string) => headers.indexOf(name);
  const iYM  = idx("YEAR_MONTH");
  const iDT  = idx("DAY_TYPE");
  const iTPH = idx("TIME_PER_HOUR");
  const iPTT = idx("PT_TYPE");
  const iPTC = idx("PT_CODE");
  const iTI  = idx("TOTAL_TAP_IN_VOLUME");
  const iTO  = idx("TOTAL_TAP_OUT_VOLUME");

  const records: PVRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    if (cols.length < 7) continue;

    // Only keep BUS records (filter out MRT etc.)
    if (cols[iPTT]?.trim() !== "BUS") continue;

    records.push({
      YEAR_MONTH:           cols[iYM]?.trim()  ?? "",
      DAY_TYPE:             cols[iDT]?.trim()  ?? "",
      TIME_PER_HOUR:        parseInt(cols[iTPH]?.trim() ?? "0", 10),
      PT_TYPE:              cols[iPTT]?.trim() ?? "",
      PT_CODE:              cols[iPTC]?.trim() ?? "",
      TOTAL_TAP_IN_VOLUME:  parseInt(cols[iTI]?.trim()  ?? "0", 10),
      TOTAL_TAP_OUT_VOLUME: parseInt(cols[iTO]?.trim()  ?? "0", 10),
    });
  }

  return records;
}

export async function getPassengerVolume(yearMonth?: string): Promise<PVRecord[]> {
  const month = yearMonth ?? getPreviousMonth();
  const cacheKey = `${CACHE_KEY_PREFIX}${month}`;

  // Return cached data if still fresh
  try {
    const cached = await AsyncStorage.getItem(cacheKey);
    if (cached) {
      const parsed: CachedPV = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
        return parsed.records;
      }
    }
  } catch {}

  if (!API_KEY) return [];

  // Fetch → download ZIP → parse CSV
  const link = await fetchDownloadLink(month);
  const csv  = await downloadAndExtractCsv(link);
  const records = parseCsv(csv);

  // Cache the parsed records (avoid re-downloading within TTL)
  try {
    await AsyncStorage.setItem(
      cacheKey,
      JSON.stringify({ timestamp: Date.now(), records } satisfies CachedPV)
    );
  } catch {}

  return records;
}

export function getDayType(): string {
  const day = new Date().getDay();
  return day === 0 || day === 6 ? "WEEKENDS/HOLIDAY" : "WEEKDAY";
}

export function getCurrentHour(): number {
  return new Date().getHours();
}
