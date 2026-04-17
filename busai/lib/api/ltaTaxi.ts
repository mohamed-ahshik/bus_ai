import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = process.env.EXPO_PUBLIC_LTA_DATAMALL_KEY ?? "";
const HEADERS = { AccountKey: API_KEY, accept: "application/json" };

// ── Taxi Availability ────────────────────────────────────────────────────────

export interface TaxiLocation {
  Latitude: number;
  Longitude: number;
}

export async function getTaxiAvailability(): Promise<TaxiLocation[]> {
  if (!API_KEY) return [];
  const res = await fetch(
    "https://datamall2.mytransport.sg/ltaodataservice/Taxi-Availability",
    { headers: HEADERS }
  );
  if (!res.ok) throw new Error(`LTA Taxi-Availability error: ${res.status}`);
  const data = await res.json();
  return (data.value ?? []) as TaxiLocation[];
}

// ── Taxi Stands ──────────────────────────────────────────────────────────────

export interface TaxiStand {
  TaxiCode: string;
  Latitude: number;
  Longitude: number;
  Bfa: string;       // "Y" = barrier-free access
  Ownership: string;
  Type: string;
  Name: string;
}

const STAND_CACHE_KEY = "lta_taxi_stands_v1";
const STAND_CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function getTaxiStands(): Promise<TaxiStand[]> {
  try {
    const cached = await AsyncStorage.getItem(STAND_CACHE_KEY);
    if (cached) {
      const { timestamp, stands } = JSON.parse(cached);
      if (Date.now() - timestamp < STAND_CACHE_TTL) return stands;
    }
  } catch {}

  if (!API_KEY) return [];
  const res = await fetch(
    "https://datamall2.mytransport.sg/ltaodataservice/TaxiStands",
    { headers: HEADERS }
  );
  if (!res.ok) throw new Error(`LTA TaxiStands error: ${res.status}`);
  const data = await res.json();
  const stands: TaxiStand[] = data.value ?? [];

  try {
    await AsyncStorage.setItem(
      STAND_CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), stands })
    );
  } catch {}

  return stands;
}
