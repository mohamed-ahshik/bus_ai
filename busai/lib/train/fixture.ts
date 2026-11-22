import type { TrainLine, TrainStation } from "./types";

// Generated from the compact snapshot. Departure times are relative
// offsets so the fixture remains useful during UI development.

export type FixtureDeparture = {
  tripId: string;
  line: string;
  direction: "0" | "1";
  headsign: string;
  platform: string;
  offsetMinutes: number;
};

export const FIXTURE_SNAPSHOT_AT = new Date().toISOString();
export const FIXTURE_FEED_END_DATE = "2026-12-31";

export const FIXTURE_STATIONS: TrainStation[] = [
  {
    "id": "EW24",
    "name": "Jurong East",
    "lines": [
      "NSL",
      "EWL"
    ],
    "codes": {
      "NSL": "NS1",
      "EWL": "EW24"
    }
  },
  {
    "id": "NS2",
    "name": "Bukit Batok",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS2"
    }
  },
  {
    "id": "NS3",
    "name": "Bukit Gombak",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS3"
    }
  },
  {
    "id": "NS4",
    "name": "Choa Chu Kang",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS4"
    }
  },
  {
    "id": "NS5",
    "name": "Yew Tee",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS5"
    }
  },
  {
    "id": "NS7",
    "name": "Kranji",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS7"
    }
  },
  {
    "id": "NS8",
    "name": "Marsiling",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS8"
    }
  },
  {
    "id": "NS9",
    "name": "Woodlands",
    "lines": [
      "NSL",
      "TEL"
    ],
    "codes": {
      "NSL": "NS9",
      "TEL": "TE2"
    }
  },
  {
    "id": "NS10",
    "name": "Admiralty",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS10"
    }
  },
  {
    "id": "NS11",
    "name": "Sembawang",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS11"
    }
  },
  {
    "id": "NS12",
    "name": "Canberra",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS12"
    }
  },
  {
    "id": "NS13",
    "name": "Yishun",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS13"
    }
  },
  {
    "id": "NS14",
    "name": "Khatib",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS14"
    }
  },
  {
    "id": "NS15",
    "name": "Yio Chu Kang",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS15"
    }
  },
  {
    "id": "NS16",
    "name": "Ang Mo Kio",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS16"
    }
  },
  {
    "id": "CC15",
    "name": "Bishan",
    "lines": [
      "NSL",
      "CCL"
    ],
    "codes": {
      "NSL": "NS17",
      "CCL": "CC15"
    }
  },
  {
    "id": "NS18",
    "name": "Braddell",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS18"
    }
  },
  {
    "id": "NS19",
    "name": "Toa Payoh",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS19"
    }
  },
  {
    "id": "NS20",
    "name": "Novena",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS20"
    }
  },
  {
    "id": "DT11",
    "name": "Newton",
    "lines": [
      "NSL",
      "DTL"
    ],
    "codes": {
      "NSL": "NS21",
      "DTL": "DT11"
    }
  },
  {
    "id": "NS22",
    "name": "Orchard",
    "lines": [
      "NSL",
      "TEL"
    ],
    "codes": {
      "NSL": "NS22",
      "TEL": "TE14"
    }
  },
  {
    "id": "NS23",
    "name": "Somerset",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS23"
    }
  },
  {
    "id": "NS24",
    "name": "Dhoby Ghaut",
    "lines": [
      "NSL",
      "NEL",
      "CCL"
    ],
    "codes": {
      "NSL": "NS24",
      "NEL": "NE6",
      "CCL": "CC1"
    }
  },
  {
    "id": "EW13",
    "name": "City Hall",
    "lines": [
      "NSL",
      "EWL"
    ],
    "codes": {
      "NSL": "NS25",
      "EWL": "EW13"
    }
  },
  {
    "id": "EW14",
    "name": "Raffles Place",
    "lines": [
      "NSL",
      "EWL"
    ],
    "codes": {
      "NSL": "NS26",
      "EWL": "EW14"
    }
  },
  {
    "id": "CC33",
    "name": "Marina Bay",
    "lines": [
      "NSL",
      "CCL",
      "TEL"
    ],
    "codes": {
      "NSL": "NS27",
      "CCL": "CC33",
      "TEL": "TE20"
    }
  },
  {
    "id": "NS28",
    "name": "Marina South Pier",
    "lines": [
      "NSL"
    ],
    "codes": {
      "NSL": "NS28"
    }
  },
  {
    "id": "EW33",
    "name": "Tuas Link",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW33"
    }
  },
  {
    "id": "EW32",
    "name": "Tuas West Road",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW32"
    }
  },
  {
    "id": "EW31",
    "name": "Tuas Crescent",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW31"
    }
  },
  {
    "id": "EW30",
    "name": "Gul Circle",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW30"
    }
  },
  {
    "id": "EW29",
    "name": "Joo Koon",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW29"
    }
  },
  {
    "id": "EW28",
    "name": "Pioneer",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW28"
    }
  },
  {
    "id": "EW27",
    "name": "Boon Lay",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW27"
    }
  },
  {
    "id": "EW26",
    "name": "Lakeside",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW26"
    }
  },
  {
    "id": "EW25",
    "name": "Chinese Garden",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW25"
    }
  },
  {
    "id": "EW23",
    "name": "Clementi",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW23"
    }
  },
  {
    "id": "EW22",
    "name": "Dover",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW22"
    }
  },
  {
    "id": "CC22",
    "name": "Buona Vista",
    "lines": [
      "EWL",
      "CCL"
    ],
    "codes": {
      "EWL": "EW21",
      "CCL": "CC22"
    }
  },
  {
    "id": "EW20",
    "name": "Commonwealth",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW20"
    }
  },
  {
    "id": "EW19",
    "name": "Queenstown",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW19"
    }
  },
  {
    "id": "EW18",
    "name": "Redhill",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW18"
    }
  },
  {
    "id": "EW17",
    "name": "Tiong Bahru",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW17"
    }
  },
  {
    "id": "EW16",
    "name": "Outram Park",
    "lines": [
      "EWL",
      "NEL",
      "TEL"
    ],
    "codes": {
      "EWL": "EW16",
      "NEL": "NE3",
      "TEL": "TE17"
    }
  },
  {
    "id": "EW15",
    "name": "Tanjong Pagar",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW15"
    }
  },
  {
    "id": "DT14",
    "name": "Bugis",
    "lines": [
      "EWL",
      "DTL"
    ],
    "codes": {
      "EWL": "EW12",
      "DTL": "DT14"
    }
  },
  {
    "id": "EW11",
    "name": "Lavender",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW11"
    }
  },
  {
    "id": "EW10",
    "name": "Kallang",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW10"
    }
  },
  {
    "id": "EW9",
    "name": "Aljunied",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW9"
    }
  },
  {
    "id": "CC9",
    "name": "Paya Lebar",
    "lines": [
      "EWL",
      "CCL"
    ],
    "codes": {
      "EWL": "EW8",
      "CCL": "CC9"
    }
  },
  {
    "id": "EW7",
    "name": "Eunos",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW7"
    }
  },
  {
    "id": "EW6",
    "name": "Kembangan",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW6"
    }
  },
  {
    "id": "EW5",
    "name": "Bedok",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW5"
    }
  },
  {
    "id": "EW4",
    "name": "Tanah Merah",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW4"
    }
  },
  {
    "id": "EW3",
    "name": "Simei",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW3"
    }
  },
  {
    "id": "DT32",
    "name": "Tampines",
    "lines": [
      "EWL",
      "DTL"
    ],
    "codes": {
      "EWL": "EW2",
      "DTL": "DT32"
    }
  },
  {
    "id": "EW1",
    "name": "Pasir Ris",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "EW1"
    }
  },
  {
    "id": "CG1",
    "name": "Expo",
    "lines": [
      "EWL",
      "DTL"
    ],
    "codes": {
      "EWL": "CG1",
      "DTL": "DT35"
    }
  },
  {
    "id": "CG2",
    "name": "Changi Airport",
    "lines": [
      "EWL"
    ],
    "codes": {
      "EWL": "CG2"
    }
  },
  {
    "id": "CC29",
    "name": "HarbourFront",
    "lines": [
      "NEL",
      "CCL"
    ],
    "codes": {
      "NEL": "NE1",
      "CCL": "CC29"
    }
  },
  {
    "id": "DT19",
    "name": "Chinatown",
    "lines": [
      "NEL",
      "DTL"
    ],
    "codes": {
      "NEL": "NE4",
      "DTL": "DT19"
    }
  },
  {
    "id": "NE5",
    "name": "Clarke Quay",
    "lines": [
      "NEL"
    ],
    "codes": {
      "NEL": "NE5"
    }
  },
  {
    "id": "DT12",
    "name": "Little India",
    "lines": [
      "NEL",
      "DTL"
    ],
    "codes": {
      "NEL": "NE7",
      "DTL": "DT12"
    }
  },
  {
    "id": "NE8",
    "name": "Farrer Park",
    "lines": [
      "NEL"
    ],
    "codes": {
      "NEL": "NE8"
    }
  },
  {
    "id": "NE9",
    "name": "Boon Keng",
    "lines": [
      "NEL"
    ],
    "codes": {
      "NEL": "NE9"
    }
  },
  {
    "id": "NE10",
    "name": "Potong Pasir",
    "lines": [
      "NEL"
    ],
    "codes": {
      "NEL": "NE10"
    }
  },
  {
    "id": "NE11",
    "name": "Woodleigh",
    "lines": [
      "NEL"
    ],
    "codes": {
      "NEL": "NE11"
    }
  },
  {
    "id": "CC13",
    "name": "Serangoon",
    "lines": [
      "NEL",
      "CCL"
    ],
    "codes": {
      "NEL": "NE12",
      "CCL": "CC13"
    }
  },
  {
    "id": "NE13",
    "name": "Kovan",
    "lines": [
      "NEL"
    ],
    "codes": {
      "NEL": "NE13"
    }
  },
  {
    "id": "NE14",
    "name": "Hougang",
    "lines": [
      "NEL"
    ],
    "codes": {
      "NEL": "NE14"
    }
  },
  {
    "id": "NE15",
    "name": "Buangkok",
    "lines": [
      "NEL"
    ],
    "codes": {
      "NEL": "NE15"
    }
  },
  {
    "id": "NE16",
    "name": "Sengkang",
    "lines": [
      "NEL",
      "SKL"
    ],
    "codes": {
      "NEL": "NE16",
      "SKL": "NE16"
    }
  },
  {
    "id": "NE17",
    "name": "Punggol",
    "lines": [
      "NEL",
      "PGL"
    ],
    "codes": {
      "NEL": "NE17",
      "PGL": "NE17"
    }
  },
  {
    "id": "NE18",
    "name": "Punggol Coast",
    "lines": [
      "NEL"
    ],
    "codes": {
      "NEL": "NE18"
    }
  },
  {
    "id": "CC4",
    "name": "Promenade",
    "lines": [
      "CCL",
      "DTL"
    ],
    "codes": {
      "CCL": "CC4",
      "DTL": "DT15"
    }
  },
  {
    "id": "CC5",
    "name": "Nicoll Highway",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC5"
    }
  },
  {
    "id": "CC6",
    "name": "Stadium",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC6"
    }
  },
  {
    "id": "CC7",
    "name": "Mountbatten",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC7"
    }
  },
  {
    "id": "CC8",
    "name": "Dakota",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC8"
    }
  },
  {
    "id": "CC10",
    "name": "MacPherson",
    "lines": [
      "CCL",
      "DTL"
    ],
    "codes": {
      "CCL": "CC10",
      "DTL": "DT26"
    }
  },
  {
    "id": "CC11",
    "name": "Tai Seng",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC11"
    }
  },
  {
    "id": "CC12",
    "name": "Bartley",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC12"
    }
  },
  {
    "id": "CC14",
    "name": "Lorong Chuan",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC14"
    }
  },
  {
    "id": "CC16",
    "name": "Marymount",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC16"
    }
  },
  {
    "id": "CC17",
    "name": "Caldecott",
    "lines": [
      "CCL",
      "TEL"
    ],
    "codes": {
      "CCL": "CC17",
      "TEL": "TE9"
    }
  },
  {
    "id": "CC19",
    "name": "Botanic Gardens",
    "lines": [
      "CCL",
      "DTL"
    ],
    "codes": {
      "CCL": "CC19",
      "DTL": "DT9"
    }
  },
  {
    "id": "CC20",
    "name": "Farrer Road",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC20"
    }
  },
  {
    "id": "CC21",
    "name": "Holland Village",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC21"
    }
  },
  {
    "id": "CC23",
    "name": "one-north",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC23"
    }
  },
  {
    "id": "CC24",
    "name": "Kent Ridge",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC24"
    }
  },
  {
    "id": "CC25",
    "name": "Haw Par Villa",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC25"
    }
  },
  {
    "id": "CC26",
    "name": "Pasir Panjang",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC26"
    }
  },
  {
    "id": "CC27",
    "name": "Labrador Park",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC27"
    }
  },
  {
    "id": "CC28",
    "name": "Telok Blangah",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC28"
    }
  },
  {
    "id": "CC30",
    "name": "Keppel",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC30"
    }
  },
  {
    "id": "CC31",
    "name": "Cantonment",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC31"
    }
  },
  {
    "id": "CC32",
    "name": "Prince Edward Road",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC32"
    }
  },
  {
    "id": "CC34",
    "name": "Bayfront",
    "lines": [
      "CCL",
      "DTL"
    ],
    "codes": {
      "CCL": "CC34",
      "DTL": "DT16"
    }
  },
  {
    "id": "CC2",
    "name": "Bras Basah",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC2"
    }
  },
  {
    "id": "CC3",
    "name": "Esplanade",
    "lines": [
      "CCL"
    ],
    "codes": {
      "CCL": "CC3"
    }
  },
  {
    "id": "DT1",
    "name": "Bukit Panjang",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT1"
    }
  },
  {
    "id": "DT2",
    "name": "Cashew",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT2"
    }
  },
  {
    "id": "DT3",
    "name": "Hillview",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT3"
    }
  },
  {
    "id": "DT4",
    "name": "Hume",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT4"
    }
  },
  {
    "id": "DT5",
    "name": "Beauty World",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT5"
    }
  },
  {
    "id": "DT6",
    "name": "King Albert Park",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT6"
    }
  },
  {
    "id": "DT7",
    "name": "Sixth Avenue",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT7"
    }
  },
  {
    "id": "DT8",
    "name": "Tan Kah Kee",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT8"
    }
  },
  {
    "id": "DT10",
    "name": "Stevens",
    "lines": [
      "DTL",
      "TEL"
    ],
    "codes": {
      "DTL": "DT10",
      "TEL": "TE11"
    }
  },
  {
    "id": "DT13",
    "name": "Rochor",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT13"
    }
  },
  {
    "id": "DT17",
    "name": "Downtown",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT17"
    }
  },
  {
    "id": "DT18",
    "name": "Telok Ayer",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT18"
    }
  },
  {
    "id": "DT20",
    "name": "Fort Canning",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT20"
    }
  },
  {
    "id": "DT21",
    "name": "Bencoolen",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT21"
    }
  },
  {
    "id": "DT22",
    "name": "Jalan Besar",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT22"
    }
  },
  {
    "id": "DT23",
    "name": "Bendemeer",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT23"
    }
  },
  {
    "id": "DT24",
    "name": "Geylang Bahru",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT24"
    }
  },
  {
    "id": "DT25",
    "name": "Mattar",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT25"
    }
  },
  {
    "id": "DT27",
    "name": "Ubi",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT27"
    }
  },
  {
    "id": "DT28",
    "name": "Kaki Bukit",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT28"
    }
  },
  {
    "id": "DT29",
    "name": "Bedok North",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT29"
    }
  },
  {
    "id": "DT30",
    "name": "Bedok Reservoir",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT30"
    }
  },
  {
    "id": "DT31",
    "name": "Tampines West",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT31"
    }
  },
  {
    "id": "DT33",
    "name": "Tampines East",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT33"
    }
  },
  {
    "id": "DT34",
    "name": "Upper Changi",
    "lines": [
      "DTL"
    ],
    "codes": {
      "DTL": "DT34"
    }
  },
  {
    "id": "TE29",
    "name": "Bayshore",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE29"
    }
  },
  {
    "id": "TE28",
    "name": "Siglap",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE28"
    }
  },
  {
    "id": "TE27",
    "name": "Marine Terrace",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE27"
    }
  },
  {
    "id": "TE26",
    "name": "Marine Parade",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE26"
    }
  },
  {
    "id": "TE25",
    "name": "Tanjong Katong",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE25"
    }
  },
  {
    "id": "TE24",
    "name": "Katong Park",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE24"
    }
  },
  {
    "id": "TE23",
    "name": "Tanjong Rhu",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE23"
    }
  },
  {
    "id": "TE22",
    "name": "Gardens by the Bay",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE22"
    }
  },
  {
    "id": "TE19",
    "name": "Shenton Way",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE19"
    }
  },
  {
    "id": "TE18",
    "name": "Maxwell",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE18"
    }
  },
  {
    "id": "TE16",
    "name": "Havelock",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE16"
    }
  },
  {
    "id": "TE15",
    "name": "Great World",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE15"
    }
  },
  {
    "id": "TE13",
    "name": "Orchard Boulevard",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE13"
    }
  },
  {
    "id": "TE12",
    "name": "Napier",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE12"
    }
  },
  {
    "id": "TE8",
    "name": "Upper Thomson",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE8"
    }
  },
  {
    "id": "TE7",
    "name": "Bright Hill",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE7"
    }
  },
  {
    "id": "TE6",
    "name": "Mayflower",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE6"
    }
  },
  {
    "id": "TE5",
    "name": "Lentor",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE5"
    }
  },
  {
    "id": "TE4",
    "name": "Springleaf",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE4"
    }
  },
  {
    "id": "TE3",
    "name": "Woodlands South",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE3"
    }
  },
  {
    "id": "TE1",
    "name": "Woodlands North",
    "lines": [
      "TEL"
    ],
    "codes": {
      "TEL": "TE1"
    }
  },
  {
    "id": "BP1",
    "name": "Choa Chu Kang",
    "lines": [
      "BPL"
    ],
    "codes": {
      "BPL": "BP1"
    }
  },
  {
    "id": "BP2",
    "name": "South View",
    "lines": [
      "BPL"
    ],
    "codes": {
      "BPL": "BP2"
    }
  },
  {
    "id": "BP3",
    "name": "Keat Hong",
    "lines": [
      "BPL"
    ],
    "codes": {
      "BPL": "BP3"
    }
  },
  {
    "id": "BP4",
    "name": "Teck Whye",
    "lines": [
      "BPL"
    ],
    "codes": {
      "BPL": "BP4"
    }
  },
  {
    "id": "BP5",
    "name": "Phoenix",
    "lines": [
      "BPL"
    ],
    "codes": {
      "BPL": "BP5"
    }
  },
  {
    "id": "BP6",
    "name": "Bukit Panjang",
    "lines": [
      "BPL"
    ],
    "codes": {
      "BPL": "BP6"
    }
  },
  {
    "id": "BP13",
    "name": "Senja",
    "lines": [
      "BPL"
    ],
    "codes": {
      "BPL": "BP13"
    }
  },
  {
    "id": "BP12",
    "name": "Jelapang",
    "lines": [
      "BPL"
    ],
    "codes": {
      "BPL": "BP12"
    }
  },
  {
    "id": "BP11",
    "name": "Segar",
    "lines": [
      "BPL"
    ],
    "codes": {
      "BPL": "BP11"
    }
  },
  {
    "id": "BP10",
    "name": "Fajar",
    "lines": [
      "BPL"
    ],
    "codes": {
      "BPL": "BP10"
    }
  },
  {
    "id": "BP9",
    "name": "Bangkit",
    "lines": [
      "BPL"
    ],
    "codes": {
      "BPL": "BP9"
    }
  },
  {
    "id": "BP8",
    "name": "Pending",
    "lines": [
      "BPL"
    ],
    "codes": {
      "BPL": "BP8"
    }
  },
  {
    "id": "BP7",
    "name": "Petir",
    "lines": [
      "BPL"
    ],
    "codes": {
      "BPL": "BP7"
    }
  },
  {
    "id": "SW1",
    "name": "Cheng Lim",
    "lines": [
      "SKL"
    ],
    "codes": {
      "SKL": "SW1"
    }
  },
  {
    "id": "SW2",
    "name": "Farmway",
    "lines": [
      "SKL"
    ],
    "codes": {
      "SKL": "SW2"
    }
  },
  {
    "id": "SW3",
    "name": "Kupang",
    "lines": [
      "SKL"
    ],
    "codes": {
      "SKL": "SW3"
    }
  },
  {
    "id": "SW4",
    "name": "Thanggam",
    "lines": [
      "SKL"
    ],
    "codes": {
      "SKL": "SW4"
    }
  },
  {
    "id": "SW5",
    "name": "Fernvale",
    "lines": [
      "SKL"
    ],
    "codes": {
      "SKL": "SW5"
    }
  },
  {
    "id": "SW6",
    "name": "Layar",
    "lines": [
      "SKL"
    ],
    "codes": {
      "SKL": "SW6"
    }
  },
  {
    "id": "SW7",
    "name": "Tongkang",
    "lines": [
      "SKL"
    ],
    "codes": {
      "SKL": "SW7"
    }
  },
  {
    "id": "SW8",
    "name": "Renjong",
    "lines": [
      "SKL"
    ],
    "codes": {
      "SKL": "SW8"
    }
  },
  {
    "id": "SE1",
    "name": "Compassvale",
    "lines": [
      "SKL"
    ],
    "codes": {
      "SKL": "SE1"
    }
  },
  {
    "id": "SE2",
    "name": "Rumbia",
    "lines": [
      "SKL"
    ],
    "codes": {
      "SKL": "SE2"
    }
  },
  {
    "id": "SE3",
    "name": "Bakau",
    "lines": [
      "SKL"
    ],
    "codes": {
      "SKL": "SE3"
    }
  },
  {
    "id": "SE4",
    "name": "Kangkar",
    "lines": [
      "SKL"
    ],
    "codes": {
      "SKL": "SE4"
    }
  },
  {
    "id": "SE5",
    "name": "Ranggung",
    "lines": [
      "SKL"
    ],
    "codes": {
      "SKL": "SE5"
    }
  },
  {
    "id": "PE1",
    "name": "Cove",
    "lines": [
      "PGL"
    ],
    "codes": {
      "PGL": "PE1"
    }
  },
  {
    "id": "PE2",
    "name": "Meridian",
    "lines": [
      "PGL"
    ],
    "codes": {
      "PGL": "PE2"
    }
  },
  {
    "id": "PE3",
    "name": "Coral Edge",
    "lines": [
      "PGL"
    ],
    "codes": {
      "PGL": "PE3"
    }
  },
  {
    "id": "PE4",
    "name": "Riviera",
    "lines": [
      "PGL"
    ],
    "codes": {
      "PGL": "PE4"
    }
  },
  {
    "id": "PE5",
    "name": "Kadaloor",
    "lines": [
      "PGL"
    ],
    "codes": {
      "PGL": "PE5"
    }
  },
  {
    "id": "PE6",
    "name": "Oasis",
    "lines": [
      "PGL"
    ],
    "codes": {
      "PGL": "PE6"
    }
  },
  {
    "id": "PE7",
    "name": "Damai",
    "lines": [
      "PGL"
    ],
    "codes": {
      "PGL": "PE7"
    }
  },
  {
    "id": "PW1",
    "name": "Sam Kee",
    "lines": [
      "PGL"
    ],
    "codes": {
      "PGL": "PW1"
    }
  },
  {
    "id": "PW2",
    "name": "Teck Lee",
    "lines": [
      "PGL"
    ],
    "codes": {
      "PGL": "PW2"
    }
  },
  {
    "id": "PW3",
    "name": "Punggol Point",
    "lines": [
      "PGL"
    ],
    "codes": {
      "PGL": "PW3"
    }
  },
  {
    "id": "PW4",
    "name": "Samudera",
    "lines": [
      "PGL"
    ],
    "codes": {
      "PGL": "PW4"
    }
  },
  {
    "id": "PW5",
    "name": "Nibong",
    "lines": [
      "PGL"
    ],
    "codes": {
      "PGL": "PW5"
    }
  },
  {
    "id": "PW6",
    "name": "Sumang",
    "lines": [
      "PGL"
    ],
    "codes": {
      "PGL": "PW6"
    }
  },
  {
    "id": "PW7",
    "name": "Soo Teck",
    "lines": [
      "PGL"
    ],
    "codes": {
      "PGL": "PW7"
    }
  }
];

export const FIXTURE_LINES: TrainLine[] = [
  {
    "code": "NSL",
    "name": "North-South Line",
    "stations": [
      {
        "id": "EW24",
        "name": "Jurong East",
        "code": "NS1"
      },
      {
        "id": "NS2",
        "name": "Bukit Batok",
        "code": "NS2"
      },
      {
        "id": "NS3",
        "name": "Bukit Gombak",
        "code": "NS3"
      },
      {
        "id": "NS4",
        "name": "Choa Chu Kang",
        "code": "NS4"
      },
      {
        "id": "NS5",
        "name": "Yew Tee",
        "code": "NS5"
      },
      {
        "id": "NS7",
        "name": "Kranji",
        "code": "NS7"
      },
      {
        "id": "NS8",
        "name": "Marsiling",
        "code": "NS8"
      },
      {
        "id": "NS9",
        "name": "Woodlands",
        "code": "NS9"
      },
      {
        "id": "NS10",
        "name": "Admiralty",
        "code": "NS10"
      },
      {
        "id": "NS11",
        "name": "Sembawang",
        "code": "NS11"
      },
      {
        "id": "NS12",
        "name": "Canberra",
        "code": "NS12"
      },
      {
        "id": "NS13",
        "name": "Yishun",
        "code": "NS13"
      },
      {
        "id": "NS14",
        "name": "Khatib",
        "code": "NS14"
      },
      {
        "id": "NS15",
        "name": "Yio Chu Kang",
        "code": "NS15"
      },
      {
        "id": "NS16",
        "name": "Ang Mo Kio",
        "code": "NS16"
      },
      {
        "id": "CC15",
        "name": "Bishan",
        "code": "NS17"
      },
      {
        "id": "NS18",
        "name": "Braddell",
        "code": "NS18"
      },
      {
        "id": "NS19",
        "name": "Toa Payoh",
        "code": "NS19"
      },
      {
        "id": "NS20",
        "name": "Novena",
        "code": "NS20"
      },
      {
        "id": "DT11",
        "name": "Newton",
        "code": "NS21"
      },
      {
        "id": "NS22",
        "name": "Orchard",
        "code": "NS22"
      },
      {
        "id": "NS23",
        "name": "Somerset",
        "code": "NS23"
      },
      {
        "id": "NS24",
        "name": "Dhoby Ghaut",
        "code": "NS24"
      },
      {
        "id": "EW13",
        "name": "City Hall",
        "code": "NS25"
      },
      {
        "id": "EW14",
        "name": "Raffles Place",
        "code": "NS26"
      },
      {
        "id": "CC33",
        "name": "Marina Bay",
        "code": "NS27"
      },
      {
        "id": "NS28",
        "name": "Marina South Pier",
        "code": "NS28"
      }
    ]
  },
  {
    "code": "EWL",
    "name": "East-West Line",
    "stations": [
      {
        "id": "EW33",
        "name": "Tuas Link",
        "code": "EW33"
      },
      {
        "id": "EW32",
        "name": "Tuas West Road",
        "code": "EW32"
      },
      {
        "id": "EW31",
        "name": "Tuas Crescent",
        "code": "EW31"
      },
      {
        "id": "EW30",
        "name": "Gul Circle",
        "code": "EW30"
      },
      {
        "id": "EW29",
        "name": "Joo Koon",
        "code": "EW29"
      },
      {
        "id": "EW28",
        "name": "Pioneer",
        "code": "EW28"
      },
      {
        "id": "EW27",
        "name": "Boon Lay",
        "code": "EW27"
      },
      {
        "id": "EW26",
        "name": "Lakeside",
        "code": "EW26"
      },
      {
        "id": "EW25",
        "name": "Chinese Garden",
        "code": "EW25"
      },
      {
        "id": "EW24",
        "name": "Jurong East",
        "code": "EW24"
      },
      {
        "id": "EW23",
        "name": "Clementi",
        "code": "EW23"
      },
      {
        "id": "EW22",
        "name": "Dover",
        "code": "EW22"
      },
      {
        "id": "CC22",
        "name": "Buona Vista",
        "code": "EW21"
      },
      {
        "id": "EW20",
        "name": "Commonwealth",
        "code": "EW20"
      },
      {
        "id": "EW19",
        "name": "Queenstown",
        "code": "EW19"
      },
      {
        "id": "EW18",
        "name": "Redhill",
        "code": "EW18"
      },
      {
        "id": "EW17",
        "name": "Tiong Bahru",
        "code": "EW17"
      },
      {
        "id": "EW16",
        "name": "Outram Park",
        "code": "EW16"
      },
      {
        "id": "EW15",
        "name": "Tanjong Pagar",
        "code": "EW15"
      },
      {
        "id": "EW14",
        "name": "Raffles Place",
        "code": "EW14"
      },
      {
        "id": "EW13",
        "name": "City Hall",
        "code": "EW13"
      },
      {
        "id": "DT14",
        "name": "Bugis",
        "code": "EW12"
      },
      {
        "id": "EW11",
        "name": "Lavender",
        "code": "EW11"
      },
      {
        "id": "EW10",
        "name": "Kallang",
        "code": "EW10"
      },
      {
        "id": "EW9",
        "name": "Aljunied",
        "code": "EW9"
      },
      {
        "id": "CC9",
        "name": "Paya Lebar",
        "code": "EW8"
      },
      {
        "id": "EW7",
        "name": "Eunos",
        "code": "EW7"
      },
      {
        "id": "EW6",
        "name": "Kembangan",
        "code": "EW6"
      },
      {
        "id": "EW5",
        "name": "Bedok",
        "code": "EW5"
      },
      {
        "id": "EW4",
        "name": "Tanah Merah",
        "code": "EW4"
      },
      {
        "id": "EW3",
        "name": "Simei",
        "code": "EW3"
      },
      {
        "id": "DT32",
        "name": "Tampines",
        "code": "EW2"
      },
      {
        "id": "EW1",
        "name": "Pasir Ris",
        "code": "EW1"
      },
      {
        "id": "CG1",
        "name": "Expo",
        "code": "CG1"
      },
      {
        "id": "CG2",
        "name": "Changi Airport",
        "code": "CG2"
      }
    ]
  },
  {
    "code": "NEL",
    "name": "North East Line",
    "stations": [
      {
        "id": "CC29",
        "name": "HarbourFront",
        "code": "NE1"
      },
      {
        "id": "EW16",
        "name": "Outram Park",
        "code": "NE3"
      },
      {
        "id": "DT19",
        "name": "Chinatown",
        "code": "NE4"
      },
      {
        "id": "NE5",
        "name": "Clarke Quay",
        "code": "NE5"
      },
      {
        "id": "NS24",
        "name": "Dhoby Ghaut",
        "code": "NE6"
      },
      {
        "id": "DT12",
        "name": "Little India",
        "code": "NE7"
      },
      {
        "id": "NE8",
        "name": "Farrer Park",
        "code": "NE8"
      },
      {
        "id": "NE9",
        "name": "Boon Keng",
        "code": "NE9"
      },
      {
        "id": "NE10",
        "name": "Potong Pasir",
        "code": "NE10"
      },
      {
        "id": "NE11",
        "name": "Woodleigh",
        "code": "NE11"
      },
      {
        "id": "CC13",
        "name": "Serangoon",
        "code": "NE12"
      },
      {
        "id": "NE13",
        "name": "Kovan",
        "code": "NE13"
      },
      {
        "id": "NE14",
        "name": "Hougang",
        "code": "NE14"
      },
      {
        "id": "NE15",
        "name": "Buangkok",
        "code": "NE15"
      },
      {
        "id": "NE16",
        "name": "Sengkang",
        "code": "NE16"
      },
      {
        "id": "NE17",
        "name": "Punggol",
        "code": "NE17"
      },
      {
        "id": "NE18",
        "name": "Punggol Coast",
        "code": "NE18"
      }
    ]
  },
  {
    "code": "CCL",
    "name": "Circle Line",
    "stations": [
      {
        "id": "CC4",
        "name": "Promenade",
        "code": "CC4"
      },
      {
        "id": "CC5",
        "name": "Nicoll Highway",
        "code": "CC5"
      },
      {
        "id": "CC6",
        "name": "Stadium",
        "code": "CC6"
      },
      {
        "id": "CC7",
        "name": "Mountbatten",
        "code": "CC7"
      },
      {
        "id": "CC8",
        "name": "Dakota",
        "code": "CC8"
      },
      {
        "id": "CC9",
        "name": "Paya Lebar",
        "code": "CC9"
      },
      {
        "id": "CC10",
        "name": "MacPherson",
        "code": "CC10"
      },
      {
        "id": "CC11",
        "name": "Tai Seng",
        "code": "CC11"
      },
      {
        "id": "CC12",
        "name": "Bartley",
        "code": "CC12"
      },
      {
        "id": "CC13",
        "name": "Serangoon",
        "code": "CC13"
      },
      {
        "id": "CC14",
        "name": "Lorong Chuan",
        "code": "CC14"
      },
      {
        "id": "CC15",
        "name": "Bishan",
        "code": "CC15"
      },
      {
        "id": "CC16",
        "name": "Marymount",
        "code": "CC16"
      },
      {
        "id": "CC17",
        "name": "Caldecott",
        "code": "CC17"
      },
      {
        "id": "CC19",
        "name": "Botanic Gardens",
        "code": "CC19"
      },
      {
        "id": "CC20",
        "name": "Farrer Road",
        "code": "CC20"
      },
      {
        "id": "CC21",
        "name": "Holland Village",
        "code": "CC21"
      },
      {
        "id": "CC22",
        "name": "Buona Vista",
        "code": "CC22"
      },
      {
        "id": "CC23",
        "name": "one-north",
        "code": "CC23"
      },
      {
        "id": "CC24",
        "name": "Kent Ridge",
        "code": "CC24"
      },
      {
        "id": "CC25",
        "name": "Haw Par Villa",
        "code": "CC25"
      },
      {
        "id": "CC26",
        "name": "Pasir Panjang",
        "code": "CC26"
      },
      {
        "id": "CC27",
        "name": "Labrador Park",
        "code": "CC27"
      },
      {
        "id": "CC28",
        "name": "Telok Blangah",
        "code": "CC28"
      },
      {
        "id": "CC29",
        "name": "HarbourFront",
        "code": "CC29"
      },
      {
        "id": "CC30",
        "name": "Keppel",
        "code": "CC30"
      },
      {
        "id": "CC31",
        "name": "Cantonment",
        "code": "CC31"
      },
      {
        "id": "CC32",
        "name": "Prince Edward Road",
        "code": "CC32"
      },
      {
        "id": "CC33",
        "name": "Marina Bay",
        "code": "CC33"
      },
      {
        "id": "CC34",
        "name": "Bayfront",
        "code": "CC34"
      },
      {
        "id": "CC2",
        "name": "Bras Basah",
        "code": "CC2"
      },
      {
        "id": "CC3",
        "name": "Esplanade",
        "code": "CC3"
      },
      {
        "id": "NS24",
        "name": "Dhoby Ghaut",
        "code": "CC1"
      }
    ]
  },
  {
    "code": "DTL",
    "name": "Downtown Line",
    "stations": [
      {
        "id": "DT1",
        "name": "Bukit Panjang",
        "code": "DT1"
      },
      {
        "id": "DT2",
        "name": "Cashew",
        "code": "DT2"
      },
      {
        "id": "DT3",
        "name": "Hillview",
        "code": "DT3"
      },
      {
        "id": "DT4",
        "name": "Hume",
        "code": "DT4"
      },
      {
        "id": "DT5",
        "name": "Beauty World",
        "code": "DT5"
      },
      {
        "id": "DT6",
        "name": "King Albert Park",
        "code": "DT6"
      },
      {
        "id": "DT7",
        "name": "Sixth Avenue",
        "code": "DT7"
      },
      {
        "id": "DT8",
        "name": "Tan Kah Kee",
        "code": "DT8"
      },
      {
        "id": "CC19",
        "name": "Botanic Gardens",
        "code": "DT9"
      },
      {
        "id": "DT10",
        "name": "Stevens",
        "code": "DT10"
      },
      {
        "id": "DT11",
        "name": "Newton",
        "code": "DT11"
      },
      {
        "id": "DT12",
        "name": "Little India",
        "code": "DT12"
      },
      {
        "id": "DT13",
        "name": "Rochor",
        "code": "DT13"
      },
      {
        "id": "DT14",
        "name": "Bugis",
        "code": "DT14"
      },
      {
        "id": "CC4",
        "name": "Promenade",
        "code": "DT15"
      },
      {
        "id": "CC34",
        "name": "Bayfront",
        "code": "DT16"
      },
      {
        "id": "DT17",
        "name": "Downtown",
        "code": "DT17"
      },
      {
        "id": "DT18",
        "name": "Telok Ayer",
        "code": "DT18"
      },
      {
        "id": "DT19",
        "name": "Chinatown",
        "code": "DT19"
      },
      {
        "id": "DT20",
        "name": "Fort Canning",
        "code": "DT20"
      },
      {
        "id": "DT21",
        "name": "Bencoolen",
        "code": "DT21"
      },
      {
        "id": "DT22",
        "name": "Jalan Besar",
        "code": "DT22"
      },
      {
        "id": "DT23",
        "name": "Bendemeer",
        "code": "DT23"
      },
      {
        "id": "DT24",
        "name": "Geylang Bahru",
        "code": "DT24"
      },
      {
        "id": "DT25",
        "name": "Mattar",
        "code": "DT25"
      },
      {
        "id": "CC10",
        "name": "MacPherson",
        "code": "DT26"
      },
      {
        "id": "DT27",
        "name": "Ubi",
        "code": "DT27"
      },
      {
        "id": "DT28",
        "name": "Kaki Bukit",
        "code": "DT28"
      },
      {
        "id": "DT29",
        "name": "Bedok North",
        "code": "DT29"
      },
      {
        "id": "DT30",
        "name": "Bedok Reservoir",
        "code": "DT30"
      },
      {
        "id": "DT31",
        "name": "Tampines West",
        "code": "DT31"
      },
      {
        "id": "DT32",
        "name": "Tampines",
        "code": "DT32"
      },
      {
        "id": "DT33",
        "name": "Tampines East",
        "code": "DT33"
      },
      {
        "id": "DT34",
        "name": "Upper Changi",
        "code": "DT34"
      },
      {
        "id": "CG1",
        "name": "Expo",
        "code": "DT35"
      }
    ]
  },
  {
    "code": "TEL",
    "name": "Thomson-East Coast Line",
    "stations": [
      {
        "id": "TE29",
        "name": "Bayshore",
        "code": "TE29"
      },
      {
        "id": "TE28",
        "name": "Siglap",
        "code": "TE28"
      },
      {
        "id": "TE27",
        "name": "Marine Terrace",
        "code": "TE27"
      },
      {
        "id": "TE26",
        "name": "Marine Parade",
        "code": "TE26"
      },
      {
        "id": "TE25",
        "name": "Tanjong Katong",
        "code": "TE25"
      },
      {
        "id": "TE24",
        "name": "Katong Park",
        "code": "TE24"
      },
      {
        "id": "TE23",
        "name": "Tanjong Rhu",
        "code": "TE23"
      },
      {
        "id": "TE22",
        "name": "Gardens by the Bay",
        "code": "TE22"
      },
      {
        "id": "CC33",
        "name": "Marina Bay",
        "code": "TE20"
      },
      {
        "id": "TE19",
        "name": "Shenton Way",
        "code": "TE19"
      },
      {
        "id": "TE18",
        "name": "Maxwell",
        "code": "TE18"
      },
      {
        "id": "EW16",
        "name": "Outram Park",
        "code": "TE17"
      },
      {
        "id": "TE16",
        "name": "Havelock",
        "code": "TE16"
      },
      {
        "id": "TE15",
        "name": "Great World",
        "code": "TE15"
      },
      {
        "id": "NS22",
        "name": "Orchard",
        "code": "TE14"
      },
      {
        "id": "TE13",
        "name": "Orchard Boulevard",
        "code": "TE13"
      },
      {
        "id": "TE12",
        "name": "Napier",
        "code": "TE12"
      },
      {
        "id": "DT10",
        "name": "Stevens",
        "code": "TE11"
      },
      {
        "id": "CC17",
        "name": "Caldecott",
        "code": "TE9"
      },
      {
        "id": "TE8",
        "name": "Upper Thomson",
        "code": "TE8"
      },
      {
        "id": "TE7",
        "name": "Bright Hill",
        "code": "TE7"
      },
      {
        "id": "TE6",
        "name": "Mayflower",
        "code": "TE6"
      },
      {
        "id": "TE5",
        "name": "Lentor",
        "code": "TE5"
      },
      {
        "id": "TE4",
        "name": "Springleaf",
        "code": "TE4"
      },
      {
        "id": "TE3",
        "name": "Woodlands South",
        "code": "TE3"
      },
      {
        "id": "NS9",
        "name": "Woodlands",
        "code": "TE2"
      },
      {
        "id": "TE1",
        "name": "Woodlands North",
        "code": "TE1"
      }
    ]
  },
  {
    "code": "BPL",
    "name": "Bukit Panjang LRT",
    "stations": [
      {
        "id": "BP1",
        "name": "Choa Chu Kang",
        "code": "BP1"
      },
      {
        "id": "BP2",
        "name": "South View",
        "code": "BP2"
      },
      {
        "id": "BP3",
        "name": "Keat Hong",
        "code": "BP3"
      },
      {
        "id": "BP4",
        "name": "Teck Whye",
        "code": "BP4"
      },
      {
        "id": "BP5",
        "name": "Phoenix",
        "code": "BP5"
      },
      {
        "id": "BP6",
        "name": "Bukit Panjang",
        "code": "BP6"
      },
      {
        "id": "BP13",
        "name": "Senja",
        "code": "BP13"
      },
      {
        "id": "BP12",
        "name": "Jelapang",
        "code": "BP12"
      },
      {
        "id": "BP11",
        "name": "Segar",
        "code": "BP11"
      },
      {
        "id": "BP10",
        "name": "Fajar",
        "code": "BP10"
      },
      {
        "id": "BP9",
        "name": "Bangkit",
        "code": "BP9"
      },
      {
        "id": "BP8",
        "name": "Pending",
        "code": "BP8"
      },
      {
        "id": "BP7",
        "name": "Petir",
        "code": "BP7"
      }
    ]
  },
  {
    "code": "SKL",
    "name": "Sengkang LRT",
    "stations": [
      {
        "id": "NE16",
        "name": "Sengkang",
        "code": "NE16"
      },
      {
        "id": "SW1",
        "name": "Cheng Lim",
        "code": "SW1"
      },
      {
        "id": "SW2",
        "name": "Farmway",
        "code": "SW2"
      },
      {
        "id": "SW3",
        "name": "Kupang",
        "code": "SW3"
      },
      {
        "id": "SW4",
        "name": "Thanggam",
        "code": "SW4"
      },
      {
        "id": "SW5",
        "name": "Fernvale",
        "code": "SW5"
      },
      {
        "id": "SW6",
        "name": "Layar",
        "code": "SW6"
      },
      {
        "id": "SW7",
        "name": "Tongkang",
        "code": "SW7"
      },
      {
        "id": "SW8",
        "name": "Renjong",
        "code": "SW8"
      },
      {
        "id": "SE1",
        "name": "Compassvale",
        "code": "SE1"
      },
      {
        "id": "SE2",
        "name": "Rumbia",
        "code": "SE2"
      },
      {
        "id": "SE3",
        "name": "Bakau",
        "code": "SE3"
      },
      {
        "id": "SE4",
        "name": "Kangkar",
        "code": "SE4"
      },
      {
        "id": "SE5",
        "name": "Ranggung",
        "code": "SE5"
      }
    ]
  },
  {
    "code": "PGL",
    "name": "Punggol LRT",
    "stations": [
      {
        "id": "NE17",
        "name": "Punggol",
        "code": "NE17"
      },
      {
        "id": "PE1",
        "name": "Cove",
        "code": "PE1"
      },
      {
        "id": "PE2",
        "name": "Meridian",
        "code": "PE2"
      },
      {
        "id": "PE3",
        "name": "Coral Edge",
        "code": "PE3"
      },
      {
        "id": "PE4",
        "name": "Riviera",
        "code": "PE4"
      },
      {
        "id": "PE5",
        "name": "Kadaloor",
        "code": "PE5"
      },
      {
        "id": "PE6",
        "name": "Oasis",
        "code": "PE6"
      },
      {
        "id": "PE7",
        "name": "Damai",
        "code": "PE7"
      },
      {
        "id": "PW1",
        "name": "Sam Kee",
        "code": "PW1"
      },
      {
        "id": "PW2",
        "name": "Teck Lee",
        "code": "PW2"
      },
      {
        "id": "PW3",
        "name": "Punggol Point",
        "code": "PW3"
      },
      {
        "id": "PW4",
        "name": "Samudera",
        "code": "PW4"
      },
      {
        "id": "PW5",
        "name": "Nibong",
        "code": "PW5"
      },
      {
        "id": "PW6",
        "name": "Sumang",
        "code": "PW6"
      },
      {
        "id": "PW7",
        "name": "Soo Teck",
        "code": "PW7"
      }
    ]
  }
];

export const FIXTURE_DEPARTURES: Record<string, FixtureDeparture[]> = {
  "EW24|NSL|0": [
    {
      "tripId": "NSL_0_EW24_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "NSL_0_EW24_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "NSL_0_EW24_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "NSL_0_EW24_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "NSL_0_EW24_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "EW24|NSL|1": [
    {
      "tripId": "NSL_1_EW24_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NSL_1_EW24_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NSL_1_EW24_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NSL_1_EW24_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NSL_1_EW24_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "NS2|NSL|0": [
    {
      "tripId": "NSL_0_NS2_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "NSL_0_NS2_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "NSL_0_NS2_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "NSL_0_NS2_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "NSL_0_NS2_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "NS2|NSL|1": [
    {
      "tripId": "NSL_1_NS2_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NSL_1_NS2_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NSL_1_NS2_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NSL_1_NS2_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NSL_1_NS2_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "NS3|NSL|0": [
    {
      "tripId": "NSL_0_NS3_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "NSL_0_NS3_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "NSL_0_NS3_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "NSL_0_NS3_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "NSL_0_NS3_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "NS3|NSL|1": [
    {
      "tripId": "NSL_1_NS3_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "NSL_1_NS3_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "NSL_1_NS3_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "NSL_1_NS3_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "NSL_1_NS3_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "NS4|NSL|0": [
    {
      "tripId": "NSL_0_NS4_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "NSL_0_NS4_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "NSL_0_NS4_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "NSL_0_NS4_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "NSL_0_NS4_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "NS4|NSL|1": [
    {
      "tripId": "NSL_1_NS4_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "NSL_1_NS4_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "NSL_1_NS4_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "NSL_1_NS4_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 27
    },
    {
      "tripId": "NSL_1_NS4_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 33
    }
  ],
  "NS5|NSL|0": [
    {
      "tripId": "NSL_0_NS5_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "NSL_0_NS5_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "NSL_0_NS5_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "NSL_0_NS5_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "NSL_0_NS5_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "NS5|NSL|1": [
    {
      "tripId": "NSL_1_NS5_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 3
    },
    {
      "tripId": "NSL_1_NS5_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "NSL_1_NS5_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "NSL_1_NS5_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "NSL_1_NS5_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 27
    }
  ],
  "NS7|NSL|0": [
    {
      "tripId": "NSL_0_NS7_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "NSL_0_NS7_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "NSL_0_NS7_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "NSL_0_NS7_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "NSL_0_NS7_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "NS7|NSL|1": [
    {
      "tripId": "NSL_1_NS7_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "NSL_1_NS7_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "NSL_1_NS7_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "NSL_1_NS7_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "NSL_1_NS7_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "NS8|NSL|0": [
    {
      "tripId": "NSL_0_NS8_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "NSL_0_NS8_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "NSL_0_NS8_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "NSL_0_NS8_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "NSL_0_NS8_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "NS8|NSL|1": [
    {
      "tripId": "NSL_1_NS8_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 8
    },
    {
      "tripId": "NSL_1_NS8_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 14
    },
    {
      "tripId": "NSL_1_NS8_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 20
    },
    {
      "tripId": "NSL_1_NS8_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 26
    },
    {
      "tripId": "NSL_1_NS8_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 32
    }
  ],
  "NS9|NSL|0": [
    {
      "tripId": "NSL_0_NS9_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "NSL_0_NS9_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "NSL_0_NS9_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "NSL_0_NS9_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "NSL_0_NS9_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "NS9|NSL|1": [
    {
      "tripId": "NSL_1_NS9_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "NSL_1_NS9_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "NSL_1_NS9_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "NSL_1_NS9_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "NSL_1_NS9_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "NS10|NSL|0": [
    {
      "tripId": "NSL_0_NS10_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "NSL_0_NS10_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "NSL_0_NS10_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "NSL_0_NS10_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "NSL_0_NS10_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "NS10|NSL|1": [
    {
      "tripId": "NSL_1_NS10_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NSL_1_NS10_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NSL_1_NS10_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NSL_1_NS10_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NSL_1_NS10_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "NS11|NSL|0": [
    {
      "tripId": "NSL_0_NS11_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "NSL_0_NS11_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "NSL_0_NS11_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "NSL_0_NS11_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "NSL_0_NS11_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "NS11|NSL|1": [
    {
      "tripId": "NSL_1_NS11_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NSL_1_NS11_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NSL_1_NS11_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NSL_1_NS11_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NSL_1_NS11_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "NS12|NSL|0": [
    {
      "tripId": "NSL_0_NS12_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "NSL_0_NS12_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "NSL_0_NS12_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "NSL_0_NS12_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "NSL_0_NS12_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "NS12|NSL|1": [
    {
      "tripId": "NSL_1_NS12_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NSL_1_NS12_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NSL_1_NS12_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NSL_1_NS12_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NSL_1_NS12_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "NS13|NSL|0": [
    {
      "tripId": "NSL_0_NS13_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "NSL_0_NS13_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "NSL_0_NS13_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "NSL_0_NS13_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "NSL_0_NS13_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "NS13|NSL|1": [
    {
      "tripId": "NSL_1_NS13_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "NSL_1_NS13_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "NSL_1_NS13_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "NSL_1_NS13_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 27
    },
    {
      "tripId": "NSL_1_NS13_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 33
    }
  ],
  "NS14|NSL|0": [
    {
      "tripId": "NSL_0_NS14_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "NSL_0_NS14_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "NSL_0_NS14_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "NSL_0_NS14_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "NSL_0_NS14_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "NS14|NSL|1": [
    {
      "tripId": "NSL_1_NS14_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NSL_1_NS14_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NSL_1_NS14_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NSL_1_NS14_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NSL_1_NS14_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "NS15|NSL|0": [
    {
      "tripId": "NSL_0_NS15_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "NSL_0_NS15_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "NSL_0_NS15_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "NSL_0_NS15_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "NSL_0_NS15_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "NS15|NSL|1": [
    {
      "tripId": "NSL_1_NS15_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NSL_1_NS15_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NSL_1_NS15_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NSL_1_NS15_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NSL_1_NS15_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "NS16|NSL|0": [
    {
      "tripId": "NSL_0_NS16_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "NSL_0_NS16_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "NSL_0_NS16_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "NSL_0_NS16_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "NSL_0_NS16_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "NS16|NSL|1": [
    {
      "tripId": "NSL_1_NS16_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NSL_1_NS16_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NSL_1_NS16_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NSL_1_NS16_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NSL_1_NS16_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "CC15|NSL|0": [
    {
      "tripId": "NSL_0_CC15_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "NSL_0_CC15_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "NSL_0_CC15_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "NSL_0_CC15_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "NSL_0_CC15_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "CC15|NSL|1": [
    {
      "tripId": "NSL_1_CC15_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "NSL_1_CC15_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "NSL_1_CC15_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "NSL_1_CC15_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "NSL_1_CC15_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "NS18|NSL|0": [
    {
      "tripId": "NSL_0_NS18_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "NSL_0_NS18_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "NSL_0_NS18_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "NSL_0_NS18_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "NSL_0_NS18_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "NS18|NSL|1": [
    {
      "tripId": "NSL_1_NS18_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NSL_1_NS18_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NSL_1_NS18_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NSL_1_NS18_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NSL_1_NS18_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "NS19|NSL|0": [
    {
      "tripId": "NSL_0_NS19_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "NSL_0_NS19_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "NSL_0_NS19_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "NSL_0_NS19_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "NSL_0_NS19_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "NS19|NSL|1": [
    {
      "tripId": "NSL_1_NS19_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NSL_1_NS19_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NSL_1_NS19_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NSL_1_NS19_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NSL_1_NS19_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "NS20|NSL|0": [
    {
      "tripId": "NSL_0_NS20_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "NSL_0_NS20_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "NSL_0_NS20_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "NSL_0_NS20_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "NSL_0_NS20_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "NS20|NSL|1": [
    {
      "tripId": "NSL_1_NS20_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "NSL_1_NS20_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "NSL_1_NS20_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "NSL_1_NS20_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "NSL_1_NS20_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "DT11|NSL|0": [
    {
      "tripId": "NSL_0_DT11_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "NSL_0_DT11_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "NSL_0_DT11_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "NSL_0_DT11_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "NSL_0_DT11_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "DT11|NSL|1": [
    {
      "tripId": "NSL_1_DT11_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 8
    },
    {
      "tripId": "NSL_1_DT11_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 14
    },
    {
      "tripId": "NSL_1_DT11_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 20
    },
    {
      "tripId": "NSL_1_DT11_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 26
    },
    {
      "tripId": "NSL_1_DT11_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 32
    }
  ],
  "NS22|NSL|0": [
    {
      "tripId": "NSL_0_NS22_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "NSL_0_NS22_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "NSL_0_NS22_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "NSL_0_NS22_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "NSL_0_NS22_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "NS22|NSL|1": [
    {
      "tripId": "NSL_1_NS22_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "NSL_1_NS22_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "NSL_1_NS22_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "NSL_1_NS22_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "NSL_1_NS22_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "NS23|NSL|0": [
    {
      "tripId": "NSL_0_NS23_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "NSL_0_NS23_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "NSL_0_NS23_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "NSL_0_NS23_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "NSL_0_NS23_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "NS23|NSL|1": [
    {
      "tripId": "NSL_1_NS23_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 4
    },
    {
      "tripId": "NSL_1_NS23_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 10
    },
    {
      "tripId": "NSL_1_NS23_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 16
    },
    {
      "tripId": "NSL_1_NS23_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 22
    },
    {
      "tripId": "NSL_1_NS23_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 28
    }
  ],
  "NS24|NSL|0": [
    {
      "tripId": "NSL_0_NS24_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "NSL_0_NS24_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "NSL_0_NS24_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "NSL_0_NS24_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "NSL_0_NS24_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "NS24|NSL|1": [
    {
      "tripId": "NSL_1_NS24_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "NSL_1_NS24_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "NSL_1_NS24_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "NSL_1_NS24_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "NSL_1_NS24_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "EW13|NSL|0": [
    {
      "tripId": "NSL_0_EW13_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "NSL_0_EW13_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "NSL_0_EW13_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "NSL_0_EW13_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "NSL_0_EW13_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "EW13|NSL|1": [
    {
      "tripId": "NSL_1_EW13_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "NSL_1_EW13_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "NSL_1_EW13_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "NSL_1_EW13_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "NSL_1_EW13_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "EW14|NSL|0": [
    {
      "tripId": "NSL_0_EW14_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "NSL_0_EW14_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "NSL_0_EW14_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "NSL_0_EW14_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "NSL_0_EW14_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "EW14|NSL|1": [
    {
      "tripId": "NSL_1_EW14_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 4
    },
    {
      "tripId": "NSL_1_EW14_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 10
    },
    {
      "tripId": "NSL_1_EW14_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 16
    },
    {
      "tripId": "NSL_1_EW14_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 22
    },
    {
      "tripId": "NSL_1_EW14_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 28
    }
  ],
  "CC33|NSL|0": [
    {
      "tripId": "NSL_0_CC33_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "NSL_0_CC33_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "NSL_0_CC33_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "NSL_0_CC33_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "NSL_0_CC33_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "CC33|NSL|1": [
    {
      "tripId": "NSL_1_CC33_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 4
    },
    {
      "tripId": "NSL_1_CC33_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 10
    },
    {
      "tripId": "NSL_1_CC33_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 16
    },
    {
      "tripId": "NSL_1_CC33_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 22
    },
    {
      "tripId": "NSL_1_CC33_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 28
    }
  ],
  "NS28|NSL|0": [
    {
      "tripId": "NSL_0_NS28_1",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "NSL_0_NS28_2",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "NSL_0_NS28_3",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "NSL_0_NS28_4",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "NSL_0_NS28_5",
      "line": "NSL",
      "direction": "0",
      "headsign": "Jurong East",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "NS28|NSL|1": [
    {
      "tripId": "NSL_1_NS28_1",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "NSL_1_NS28_2",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "NSL_1_NS28_3",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "NSL_1_NS28_4",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "NSL_1_NS28_5",
      "line": "NSL",
      "direction": "1",
      "headsign": "Marina South Pier",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "EW33|EWL|0": [
    {
      "tripId": "EWL_0_EW33_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "EWL_0_EW33_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "EWL_0_EW33_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "EWL_0_EW33_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "EWL_0_EW33_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "EW33|EWL|1": [
    {
      "tripId": "EWL_1_EW33_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "EWL_1_EW33_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "EWL_1_EW33_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "EWL_1_EW33_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "EWL_1_EW33_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "EW32|EWL|0": [
    {
      "tripId": "EWL_0_EW32_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "EWL_0_EW32_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "EWL_0_EW32_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "EWL_0_EW32_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "EWL_0_EW32_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "EW32|EWL|1": [
    {
      "tripId": "EWL_1_EW32_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 4
    },
    {
      "tripId": "EWL_1_EW32_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 10
    },
    {
      "tripId": "EWL_1_EW32_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 16
    },
    {
      "tripId": "EWL_1_EW32_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 22
    },
    {
      "tripId": "EWL_1_EW32_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 28
    }
  ],
  "EW31|EWL|0": [
    {
      "tripId": "EWL_0_EW31_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "EWL_0_EW31_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "EWL_0_EW31_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "EWL_0_EW31_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "EWL_0_EW31_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "EW31|EWL|1": [
    {
      "tripId": "EWL_1_EW31_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "EWL_1_EW31_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "EWL_1_EW31_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "EWL_1_EW31_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "EWL_1_EW31_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "EW30|EWL|0": [
    {
      "tripId": "EWL_0_EW30_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "EWL_0_EW30_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "EWL_0_EW30_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "EWL_0_EW30_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "EWL_0_EW30_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "EW30|EWL|1": [
    {
      "tripId": "EWL_1_EW30_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 8
    },
    {
      "tripId": "EWL_1_EW30_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 14
    },
    {
      "tripId": "EWL_1_EW30_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 20
    },
    {
      "tripId": "EWL_1_EW30_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 26
    },
    {
      "tripId": "EWL_1_EW30_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 32
    }
  ],
  "EW29|EWL|0": [
    {
      "tripId": "EWL_0_EW29_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "EWL_0_EW29_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "EWL_0_EW29_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "EWL_0_EW29_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "EWL_0_EW29_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "EW29|EWL|1": [
    {
      "tripId": "EWL_1_EW29_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 3
    },
    {
      "tripId": "EWL_1_EW29_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "EWL_1_EW29_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "EWL_1_EW29_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "EWL_1_EW29_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 27
    }
  ],
  "EW28|EWL|0": [
    {
      "tripId": "EWL_0_EW28_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "EWL_0_EW28_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "EWL_0_EW28_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "EWL_0_EW28_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "EWL_0_EW28_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "EW28|EWL|1": [
    {
      "tripId": "EWL_1_EW28_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "EWL_1_EW28_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "EWL_1_EW28_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "EWL_1_EW28_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "EWL_1_EW28_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "EW27|EWL|0": [
    {
      "tripId": "EWL_0_EW27_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "EWL_0_EW27_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "EWL_0_EW27_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "EWL_0_EW27_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "EWL_0_EW27_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "EW27|EWL|1": [
    {
      "tripId": "EWL_1_EW27_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "EWL_1_EW27_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "EWL_1_EW27_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "EWL_1_EW27_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "EWL_1_EW27_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "EW26|EWL|0": [
    {
      "tripId": "EWL_0_EW26_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "EWL_0_EW26_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "EWL_0_EW26_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "EWL_0_EW26_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "EWL_0_EW26_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "EW26|EWL|1": [
    {
      "tripId": "EWL_1_EW26_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "EWL_1_EW26_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "EWL_1_EW26_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "EWL_1_EW26_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "EWL_1_EW26_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "EW25|EWL|0": [
    {
      "tripId": "EWL_0_EW25_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "EWL_0_EW25_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "EWL_0_EW25_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "EWL_0_EW25_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "EWL_0_EW25_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "EW25|EWL|1": [
    {
      "tripId": "EWL_1_EW25_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 3
    },
    {
      "tripId": "EWL_1_EW25_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "EWL_1_EW25_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "EWL_1_EW25_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "EWL_1_EW25_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 27
    }
  ],
  "EW24|EWL|0": [
    {
      "tripId": "EWL_0_EW24_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "EWL_0_EW24_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "EWL_0_EW24_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "EWL_0_EW24_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "EWL_0_EW24_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "EW24|EWL|1": [
    {
      "tripId": "EWL_1_EW24_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "EWL_1_EW24_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "EWL_1_EW24_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "EWL_1_EW24_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "EWL_1_EW24_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "EW23|EWL|0": [
    {
      "tripId": "EWL_0_EW23_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "EWL_0_EW23_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "EWL_0_EW23_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "EWL_0_EW23_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "EWL_0_EW23_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "EW23|EWL|1": [
    {
      "tripId": "EWL_1_EW23_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "EWL_1_EW23_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "EWL_1_EW23_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "EWL_1_EW23_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "EWL_1_EW23_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "EW22|EWL|0": [
    {
      "tripId": "EWL_0_EW22_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "EWL_0_EW22_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "EWL_0_EW22_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "EWL_0_EW22_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "EWL_0_EW22_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "EW22|EWL|1": [
    {
      "tripId": "EWL_1_EW22_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "EWL_1_EW22_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "EWL_1_EW22_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "EWL_1_EW22_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "EWL_1_EW22_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "CC22|EWL|0": [
    {
      "tripId": "EWL_0_CC22_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "EWL_0_CC22_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "EWL_0_CC22_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "EWL_0_CC22_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "EWL_0_CC22_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "CC22|EWL|1": [
    {
      "tripId": "EWL_1_CC22_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "EWL_1_CC22_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "EWL_1_CC22_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "EWL_1_CC22_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "EWL_1_CC22_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "EW20|EWL|0": [
    {
      "tripId": "EWL_0_EW20_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "EWL_0_EW20_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "EWL_0_EW20_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "EWL_0_EW20_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "EWL_0_EW20_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "EW20|EWL|1": [
    {
      "tripId": "EWL_1_EW20_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "EWL_1_EW20_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "EWL_1_EW20_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "EWL_1_EW20_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "EWL_1_EW20_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "EW19|EWL|0": [
    {
      "tripId": "EWL_0_EW19_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "EWL_0_EW19_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "EWL_0_EW19_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "EWL_0_EW19_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "EWL_0_EW19_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "EW19|EWL|1": [
    {
      "tripId": "EWL_1_EW19_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 8
    },
    {
      "tripId": "EWL_1_EW19_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 14
    },
    {
      "tripId": "EWL_1_EW19_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 20
    },
    {
      "tripId": "EWL_1_EW19_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 26
    },
    {
      "tripId": "EWL_1_EW19_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 32
    }
  ],
  "EW18|EWL|0": [
    {
      "tripId": "EWL_0_EW18_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "EWL_0_EW18_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "EWL_0_EW18_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "EWL_0_EW18_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "EWL_0_EW18_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "EW18|EWL|1": [
    {
      "tripId": "EWL_1_EW18_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "EWL_1_EW18_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "EWL_1_EW18_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "EWL_1_EW18_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "EWL_1_EW18_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "EW17|EWL|0": [
    {
      "tripId": "EWL_0_EW17_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "EWL_0_EW17_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "EWL_0_EW17_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "EWL_0_EW17_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "EWL_0_EW17_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "EW17|EWL|1": [
    {
      "tripId": "EWL_1_EW17_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 4
    },
    {
      "tripId": "EWL_1_EW17_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 10
    },
    {
      "tripId": "EWL_1_EW17_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 16
    },
    {
      "tripId": "EWL_1_EW17_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 22
    },
    {
      "tripId": "EWL_1_EW17_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 28
    }
  ],
  "EW16|EWL|0": [
    {
      "tripId": "EWL_0_EW16_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "EWL_0_EW16_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "EWL_0_EW16_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "EWL_0_EW16_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "EWL_0_EW16_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "EW16|EWL|1": [
    {
      "tripId": "EWL_1_EW16_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "EWL_1_EW16_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "EWL_1_EW16_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "EWL_1_EW16_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "EWL_1_EW16_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "EW15|EWL|0": [
    {
      "tripId": "EWL_0_EW15_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "EWL_0_EW15_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "EWL_0_EW15_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "EWL_0_EW15_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "EWL_0_EW15_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "EW15|EWL|1": [
    {
      "tripId": "EWL_1_EW15_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 8
    },
    {
      "tripId": "EWL_1_EW15_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 14
    },
    {
      "tripId": "EWL_1_EW15_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 20
    },
    {
      "tripId": "EWL_1_EW15_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 26
    },
    {
      "tripId": "EWL_1_EW15_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 32
    }
  ],
  "EW14|EWL|0": [
    {
      "tripId": "EWL_0_EW14_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "EWL_0_EW14_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "EWL_0_EW14_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "EWL_0_EW14_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "EWL_0_EW14_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "EW14|EWL|1": [
    {
      "tripId": "EWL_1_EW14_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "EWL_1_EW14_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "EWL_1_EW14_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "EWL_1_EW14_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "EWL_1_EW14_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "EW13|EWL|0": [
    {
      "tripId": "EWL_0_EW13_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "EWL_0_EW13_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "EWL_0_EW13_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "EWL_0_EW13_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "EWL_0_EW13_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "EW13|EWL|1": [
    {
      "tripId": "EWL_1_EW13_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 4
    },
    {
      "tripId": "EWL_1_EW13_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 10
    },
    {
      "tripId": "EWL_1_EW13_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 16
    },
    {
      "tripId": "EWL_1_EW13_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 22
    },
    {
      "tripId": "EWL_1_EW13_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 28
    }
  ],
  "DT14|EWL|0": [
    {
      "tripId": "EWL_0_DT14_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "EWL_0_DT14_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "EWL_0_DT14_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "EWL_0_DT14_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "EWL_0_DT14_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "DT14|EWL|1": [
    {
      "tripId": "EWL_1_DT14_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 4
    },
    {
      "tripId": "EWL_1_DT14_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 10
    },
    {
      "tripId": "EWL_1_DT14_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 16
    },
    {
      "tripId": "EWL_1_DT14_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 22
    },
    {
      "tripId": "EWL_1_DT14_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 28
    }
  ],
  "EW11|EWL|0": [
    {
      "tripId": "EWL_0_EW11_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "EWL_0_EW11_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "EWL_0_EW11_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "EWL_0_EW11_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "EWL_0_EW11_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "EW11|EWL|1": [
    {
      "tripId": "EWL_1_EW11_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 8
    },
    {
      "tripId": "EWL_1_EW11_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 14
    },
    {
      "tripId": "EWL_1_EW11_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 20
    },
    {
      "tripId": "EWL_1_EW11_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 26
    },
    {
      "tripId": "EWL_1_EW11_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 32
    }
  ],
  "EW10|EWL|0": [
    {
      "tripId": "EWL_0_EW10_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "EWL_0_EW10_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "EWL_0_EW10_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "EWL_0_EW10_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "EWL_0_EW10_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "EW10|EWL|1": [
    {
      "tripId": "EWL_1_EW10_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "EWL_1_EW10_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "EWL_1_EW10_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "EWL_1_EW10_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "EWL_1_EW10_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "EW9|EWL|0": [
    {
      "tripId": "EWL_0_EW9_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "EWL_0_EW9_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "EWL_0_EW9_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "EWL_0_EW9_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "EWL_0_EW9_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "EW9|EWL|1": [
    {
      "tripId": "EWL_1_EW9_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 3
    },
    {
      "tripId": "EWL_1_EW9_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "EWL_1_EW9_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "EWL_1_EW9_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "EWL_1_EW9_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 27
    }
  ],
  "CC9|EWL|0": [
    {
      "tripId": "EWL_0_CC9_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "EWL_0_CC9_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "EWL_0_CC9_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "EWL_0_CC9_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "EWL_0_CC9_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "CC9|EWL|1": [
    {
      "tripId": "EWL_1_CC9_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "EWL_1_CC9_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "EWL_1_CC9_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "EWL_1_CC9_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "EWL_1_CC9_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "EW7|EWL|0": [
    {
      "tripId": "EWL_0_EW7_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "EWL_0_EW7_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "EWL_0_EW7_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "EWL_0_EW7_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "EWL_0_EW7_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "EW7|EWL|1": [
    {
      "tripId": "EWL_1_EW7_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "EWL_1_EW7_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "EWL_1_EW7_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "EWL_1_EW7_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "EWL_1_EW7_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "EW6|EWL|0": [
    {
      "tripId": "EWL_0_EW6_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "EWL_0_EW6_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "EWL_0_EW6_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "EWL_0_EW6_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "EWL_0_EW6_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "EW6|EWL|1": [
    {
      "tripId": "EWL_1_EW6_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "EWL_1_EW6_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "EWL_1_EW6_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "EWL_1_EW6_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "EWL_1_EW6_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "EW5|EWL|0": [
    {
      "tripId": "EWL_0_EW5_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "EWL_0_EW5_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "EWL_0_EW5_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "EWL_0_EW5_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "EWL_0_EW5_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "EW5|EWL|1": [
    {
      "tripId": "EWL_1_EW5_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 3
    },
    {
      "tripId": "EWL_1_EW5_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "EWL_1_EW5_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "EWL_1_EW5_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "EWL_1_EW5_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 27
    }
  ],
  "EW4|EWL|0": [
    {
      "tripId": "EWL_0_EW4_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "EWL_0_EW4_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "EWL_0_EW4_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "EWL_0_EW4_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "EWL_0_EW4_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "EW4|EWL|1": [
    {
      "tripId": "EWL_1_EW4_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "EWL_1_EW4_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "EWL_1_EW4_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "EWL_1_EW4_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "EWL_1_EW4_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "EW3|EWL|0": [
    {
      "tripId": "EWL_0_EW3_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "EWL_0_EW3_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "EWL_0_EW3_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "EWL_0_EW3_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "EWL_0_EW3_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "EW3|EWL|1": [
    {
      "tripId": "EWL_1_EW3_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "EWL_1_EW3_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "EWL_1_EW3_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "EWL_1_EW3_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "EWL_1_EW3_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "DT32|EWL|0": [
    {
      "tripId": "EWL_0_DT32_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "EWL_0_DT32_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "EWL_0_DT32_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "EWL_0_DT32_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "EWL_0_DT32_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "DT32|EWL|1": [
    {
      "tripId": "EWL_1_DT32_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "EWL_1_DT32_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "EWL_1_DT32_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "EWL_1_DT32_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "EWL_1_DT32_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "EW1|EWL|0": [
    {
      "tripId": "EWL_0_EW1_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "EWL_0_EW1_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "EWL_0_EW1_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "EWL_0_EW1_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "EWL_0_EW1_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "EW1|EWL|1": [
    {
      "tripId": "EWL_1_EW1_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 3
    },
    {
      "tripId": "EWL_1_EW1_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "EWL_1_EW1_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "EWL_1_EW1_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "EWL_1_EW1_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 27
    }
  ],
  "CG1|EWL|0": [
    {
      "tripId": "EWL_0_CG1_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "EWL_0_CG1_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "EWL_0_CG1_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "EWL_0_CG1_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "EWL_0_CG1_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "CG1|EWL|1": [
    {
      "tripId": "EWL_1_CG1_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "EWL_1_CG1_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "EWL_1_CG1_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "EWL_1_CG1_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "EWL_1_CG1_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "CG2|EWL|0": [
    {
      "tripId": "EWL_0_CG2_1",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "EWL_0_CG2_2",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "EWL_0_CG2_3",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "EWL_0_CG2_4",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "EWL_0_CG2_5",
      "line": "EWL",
      "direction": "0",
      "headsign": "Tuas Link",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "CG2|EWL|1": [
    {
      "tripId": "EWL_1_CG2_1",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 8
    },
    {
      "tripId": "EWL_1_CG2_2",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 14
    },
    {
      "tripId": "EWL_1_CG2_3",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 20
    },
    {
      "tripId": "EWL_1_CG2_4",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 26
    },
    {
      "tripId": "EWL_1_CG2_5",
      "line": "EWL",
      "direction": "1",
      "headsign": "Changi Airport",
      "platform": "B",
      "offsetMinutes": 32
    }
  ],
  "CC29|NEL|0": [
    {
      "tripId": "NEL_0_CC29_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "NEL_0_CC29_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "NEL_0_CC29_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "NEL_0_CC29_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "NEL_0_CC29_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "CC29|NEL|1": [
    {
      "tripId": "NEL_1_CC29_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 4
    },
    {
      "tripId": "NEL_1_CC29_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 10
    },
    {
      "tripId": "NEL_1_CC29_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 16
    },
    {
      "tripId": "NEL_1_CC29_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 22
    },
    {
      "tripId": "NEL_1_CC29_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 28
    }
  ],
  "EW16|NEL|0": [
    {
      "tripId": "NEL_0_EW16_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "NEL_0_EW16_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "NEL_0_EW16_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "NEL_0_EW16_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "NEL_0_EW16_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "EW16|NEL|1": [
    {
      "tripId": "NEL_1_EW16_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NEL_1_EW16_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NEL_1_EW16_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NEL_1_EW16_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NEL_1_EW16_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "DT19|NEL|0": [
    {
      "tripId": "NEL_0_DT19_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "NEL_0_DT19_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "NEL_0_DT19_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "NEL_0_DT19_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "NEL_0_DT19_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "DT19|NEL|1": [
    {
      "tripId": "NEL_1_DT19_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NEL_1_DT19_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NEL_1_DT19_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NEL_1_DT19_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NEL_1_DT19_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "NE5|NEL|0": [
    {
      "tripId": "NEL_0_NE5_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "NEL_0_NE5_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "NEL_0_NE5_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "NEL_0_NE5_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "NEL_0_NE5_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "NE5|NEL|1": [
    {
      "tripId": "NEL_1_NE5_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "NEL_1_NE5_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "NEL_1_NE5_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "NEL_1_NE5_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "NEL_1_NE5_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "NS24|NEL|0": [
    {
      "tripId": "NEL_0_NS24_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "NEL_0_NS24_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "NEL_0_NS24_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "NEL_0_NS24_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "NEL_0_NS24_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "NS24|NEL|1": [
    {
      "tripId": "NEL_1_NS24_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "NEL_1_NS24_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "NEL_1_NS24_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "NEL_1_NS24_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "NEL_1_NS24_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "DT12|NEL|0": [
    {
      "tripId": "NEL_0_DT12_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "NEL_0_DT12_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "NEL_0_DT12_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "NEL_0_DT12_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "NEL_0_DT12_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "DT12|NEL|1": [
    {
      "tripId": "NEL_1_DT12_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NEL_1_DT12_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NEL_1_DT12_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NEL_1_DT12_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NEL_1_DT12_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "NE8|NEL|0": [
    {
      "tripId": "NEL_0_NE8_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "NEL_0_NE8_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "NEL_0_NE8_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "NEL_0_NE8_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "NEL_0_NE8_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "NE8|NEL|1": [
    {
      "tripId": "NEL_1_NE8_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 8
    },
    {
      "tripId": "NEL_1_NE8_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 14
    },
    {
      "tripId": "NEL_1_NE8_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 20
    },
    {
      "tripId": "NEL_1_NE8_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 26
    },
    {
      "tripId": "NEL_1_NE8_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 32
    }
  ],
  "NE9|NEL|0": [
    {
      "tripId": "NEL_0_NE9_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "NEL_0_NE9_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "NEL_0_NE9_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "NEL_0_NE9_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "NEL_0_NE9_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "NE9|NEL|1": [
    {
      "tripId": "NEL_1_NE9_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "NEL_1_NE9_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "NEL_1_NE9_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "NEL_1_NE9_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "NEL_1_NE9_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "NE10|NEL|0": [
    {
      "tripId": "NEL_0_NE10_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "NEL_0_NE10_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "NEL_0_NE10_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "NEL_0_NE10_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "NEL_0_NE10_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "NE10|NEL|1": [
    {
      "tripId": "NEL_1_NE10_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NEL_1_NE10_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NEL_1_NE10_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NEL_1_NE10_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NEL_1_NE10_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "NE11|NEL|0": [
    {
      "tripId": "NEL_0_NE11_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "NEL_0_NE11_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "NEL_0_NE11_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "NEL_0_NE11_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "NEL_0_NE11_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "NE11|NEL|1": [
    {
      "tripId": "NEL_1_NE11_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NEL_1_NE11_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NEL_1_NE11_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NEL_1_NE11_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NEL_1_NE11_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "CC13|NEL|0": [
    {
      "tripId": "NEL_0_CC13_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "NEL_0_CC13_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "NEL_0_CC13_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "NEL_0_CC13_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "NEL_0_CC13_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "CC13|NEL|1": [
    {
      "tripId": "NEL_1_CC13_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NEL_1_CC13_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NEL_1_CC13_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NEL_1_CC13_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NEL_1_CC13_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "NE13|NEL|0": [
    {
      "tripId": "NEL_0_NE13_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "NEL_0_NE13_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "NEL_0_NE13_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "NEL_0_NE13_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "NEL_0_NE13_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "NE13|NEL|1": [
    {
      "tripId": "NEL_1_NE13_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "NEL_1_NE13_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "NEL_1_NE13_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "NEL_1_NE13_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 27
    },
    {
      "tripId": "NEL_1_NE13_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 33
    }
  ],
  "NE14|NEL|0": [
    {
      "tripId": "NEL_0_NE14_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "NEL_0_NE14_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "NEL_0_NE14_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "NEL_0_NE14_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "NEL_0_NE14_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "NE14|NEL|1": [
    {
      "tripId": "NEL_1_NE14_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NEL_1_NE14_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NEL_1_NE14_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NEL_1_NE14_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NEL_1_NE14_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "NE15|NEL|0": [
    {
      "tripId": "NEL_0_NE15_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "NEL_0_NE15_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "NEL_0_NE15_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "NEL_0_NE15_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "NEL_0_NE15_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "NE15|NEL|1": [
    {
      "tripId": "NEL_1_NE15_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NEL_1_NE15_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NEL_1_NE15_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NEL_1_NE15_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NEL_1_NE15_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "NE16|NEL|0": [
    {
      "tripId": "NEL_0_NE16_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "NEL_0_NE16_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "NEL_0_NE16_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "NEL_0_NE16_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "NEL_0_NE16_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "NE16|NEL|1": [
    {
      "tripId": "NEL_1_NE16_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NEL_1_NE16_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NEL_1_NE16_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NEL_1_NE16_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NEL_1_NE16_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "NE17|NEL|0": [
    {
      "tripId": "NEL_0_NE17_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "NEL_0_NE17_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "NEL_0_NE17_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "NEL_0_NE17_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "NEL_0_NE17_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "NE17|NEL|1": [
    {
      "tripId": "NEL_1_NE17_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "NEL_1_NE17_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "NEL_1_NE17_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "NEL_1_NE17_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 27
    },
    {
      "tripId": "NEL_1_NE17_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 33
    }
  ],
  "NE18|NEL|0": [
    {
      "tripId": "NEL_0_NE18_1",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "NEL_0_NE18_2",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "NEL_0_NE18_3",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "NEL_0_NE18_4",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "NEL_0_NE18_5",
      "line": "NEL",
      "direction": "0",
      "headsign": "HarbourFront",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "NE18|NEL|1": [
    {
      "tripId": "NEL_1_NE18_1",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "NEL_1_NE18_2",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "NEL_1_NE18_3",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "NEL_1_NE18_4",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "NEL_1_NE18_5",
      "line": "NEL",
      "direction": "1",
      "headsign": "Punggol Coast",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "CC4|CCL|0": [
    {
      "tripId": "CCL_0_CC4_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "CCL_0_CC4_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "CCL_0_CC4_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "CCL_0_CC4_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "CCL_0_CC4_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "CC4|CCL|1": [
    {
      "tripId": "CCL_1_CC4_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "CCL_1_CC4_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "CCL_1_CC4_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "CCL_1_CC4_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "CCL_1_CC4_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "CC5|CCL|0": [
    {
      "tripId": "CCL_0_CC5_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "CCL_0_CC5_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "CCL_0_CC5_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "CCL_0_CC5_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "CCL_0_CC5_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "CC5|CCL|1": [
    {
      "tripId": "CCL_1_CC5_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 4
    },
    {
      "tripId": "CCL_1_CC5_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 10
    },
    {
      "tripId": "CCL_1_CC5_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 16
    },
    {
      "tripId": "CCL_1_CC5_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 22
    },
    {
      "tripId": "CCL_1_CC5_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 28
    }
  ],
  "CC6|CCL|0": [
    {
      "tripId": "CCL_0_CC6_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "CCL_0_CC6_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "CCL_0_CC6_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "CCL_0_CC6_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "CCL_0_CC6_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "CC6|CCL|1": [
    {
      "tripId": "CCL_1_CC6_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "CCL_1_CC6_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "CCL_1_CC6_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "CCL_1_CC6_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "CCL_1_CC6_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "CC7|CCL|0": [
    {
      "tripId": "CCL_0_CC7_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_0_CC7_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_0_CC7_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_0_CC7_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_0_CC7_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "CC7|CCL|1": [
    {
      "tripId": "CCL_1_CC7_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 8
    },
    {
      "tripId": "CCL_1_CC7_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 14
    },
    {
      "tripId": "CCL_1_CC7_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 20
    },
    {
      "tripId": "CCL_1_CC7_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 26
    },
    {
      "tripId": "CCL_1_CC7_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 32
    }
  ],
  "CC8|CCL|0": [
    {
      "tripId": "CCL_0_CC8_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "CCL_0_CC8_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "CCL_0_CC8_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "CCL_0_CC8_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "CCL_0_CC8_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "CC8|CCL|1": [
    {
      "tripId": "CCL_1_CC8_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "CCL_1_CC8_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "CCL_1_CC8_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "CCL_1_CC8_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "CCL_1_CC8_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "CC9|CCL|0": [
    {
      "tripId": "CCL_0_CC9_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "CCL_0_CC9_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "CCL_0_CC9_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "CCL_0_CC9_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "CCL_0_CC9_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "CC9|CCL|1": [
    {
      "tripId": "CCL_1_CC9_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 4
    },
    {
      "tripId": "CCL_1_CC9_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 10
    },
    {
      "tripId": "CCL_1_CC9_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 16
    },
    {
      "tripId": "CCL_1_CC9_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 22
    },
    {
      "tripId": "CCL_1_CC9_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 28
    }
  ],
  "CC10|CCL|0": [
    {
      "tripId": "CCL_0_CC10_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "CCL_0_CC10_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "CCL_0_CC10_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "CCL_0_CC10_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "CCL_0_CC10_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "CC10|CCL|1": [
    {
      "tripId": "CCL_1_CC10_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_1_CC10_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_1_CC10_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_1_CC10_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_1_CC10_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "CC11|CCL|0": [
    {
      "tripId": "CCL_0_CC11_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_0_CC11_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_0_CC11_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_0_CC11_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_0_CC11_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "CC11|CCL|1": [
    {
      "tripId": "CCL_1_CC11_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "CCL_1_CC11_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "CCL_1_CC11_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "CCL_1_CC11_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 27
    },
    {
      "tripId": "CCL_1_CC11_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 33
    }
  ],
  "CC12|CCL|0": [
    {
      "tripId": "CCL_0_CC12_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "CCL_0_CC12_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "CCL_0_CC12_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "CCL_0_CC12_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "CCL_0_CC12_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "CC12|CCL|1": [
    {
      "tripId": "CCL_1_CC12_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_1_CC12_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_1_CC12_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_1_CC12_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_1_CC12_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "CC13|CCL|0": [
    {
      "tripId": "CCL_0_CC13_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "CCL_0_CC13_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "CCL_0_CC13_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "CCL_0_CC13_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "CCL_0_CC13_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "CC13|CCL|1": [
    {
      "tripId": "CCL_1_CC13_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_1_CC13_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_1_CC13_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_1_CC13_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_1_CC13_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "CC14|CCL|0": [
    {
      "tripId": "CCL_0_CC14_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "CCL_0_CC14_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "CCL_0_CC14_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "CCL_0_CC14_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "CCL_0_CC14_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "CC14|CCL|1": [
    {
      "tripId": "CCL_1_CC14_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_1_CC14_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_1_CC14_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_1_CC14_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_1_CC14_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "CC15|CCL|0": [
    {
      "tripId": "CCL_0_CC15_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_0_CC15_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_0_CC15_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_0_CC15_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_0_CC15_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "CC15|CCL|1": [
    {
      "tripId": "CCL_1_CC15_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "CCL_1_CC15_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "CCL_1_CC15_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "CCL_1_CC15_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 27
    },
    {
      "tripId": "CCL_1_CC15_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 33
    }
  ],
  "CC16|CCL|0": [
    {
      "tripId": "CCL_0_CC16_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "CCL_0_CC16_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "CCL_0_CC16_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "CCL_0_CC16_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "CCL_0_CC16_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "CC16|CCL|1": [
    {
      "tripId": "CCL_1_CC16_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_1_CC16_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_1_CC16_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_1_CC16_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_1_CC16_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "CC17|CCL|0": [
    {
      "tripId": "CCL_0_CC17_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "CCL_0_CC17_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "CCL_0_CC17_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "CCL_0_CC17_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "CCL_0_CC17_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "CC17|CCL|1": [
    {
      "tripId": "CCL_1_CC17_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_1_CC17_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_1_CC17_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_1_CC17_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_1_CC17_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "CC19|CCL|0": [
    {
      "tripId": "CCL_0_CC19_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "CCL_0_CC19_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "CCL_0_CC19_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "CCL_0_CC19_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "CCL_0_CC19_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "CC19|CCL|1": [
    {
      "tripId": "CCL_1_CC19_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 8
    },
    {
      "tripId": "CCL_1_CC19_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 14
    },
    {
      "tripId": "CCL_1_CC19_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 20
    },
    {
      "tripId": "CCL_1_CC19_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 26
    },
    {
      "tripId": "CCL_1_CC19_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 32
    }
  ],
  "CC20|CCL|0": [
    {
      "tripId": "CCL_0_CC20_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_0_CC20_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_0_CC20_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_0_CC20_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_0_CC20_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "CC20|CCL|1": [
    {
      "tripId": "CCL_1_CC20_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "CCL_1_CC20_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "CCL_1_CC20_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "CCL_1_CC20_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 27
    },
    {
      "tripId": "CCL_1_CC20_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 33
    }
  ],
  "CC21|CCL|0": [
    {
      "tripId": "CCL_0_CC21_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "CCL_0_CC21_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "CCL_0_CC21_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "CCL_0_CC21_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "CCL_0_CC21_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "CC21|CCL|1": [
    {
      "tripId": "CCL_1_CC21_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 3
    },
    {
      "tripId": "CCL_1_CC21_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "CCL_1_CC21_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "CCL_1_CC21_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "CCL_1_CC21_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 27
    }
  ],
  "CC22|CCL|0": [
    {
      "tripId": "CCL_0_CC22_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "CCL_0_CC22_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "CCL_0_CC22_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "CCL_0_CC22_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "CCL_0_CC22_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "CC22|CCL|1": [
    {
      "tripId": "CCL_1_CC22_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_1_CC22_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_1_CC22_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_1_CC22_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_1_CC22_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "CC23|CCL|0": [
    {
      "tripId": "CCL_0_CC23_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "CCL_0_CC23_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "CCL_0_CC23_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "CCL_0_CC23_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "CCL_0_CC23_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "CC23|CCL|1": [
    {
      "tripId": "CCL_1_CC23_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "CCL_1_CC23_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "CCL_1_CC23_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "CCL_1_CC23_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "CCL_1_CC23_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "CC24|CCL|0": [
    {
      "tripId": "CCL_0_CC24_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_0_CC24_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_0_CC24_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_0_CC24_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_0_CC24_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "CC24|CCL|1": [
    {
      "tripId": "CCL_1_CC24_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "CCL_1_CC24_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "CCL_1_CC24_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "CCL_1_CC24_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 27
    },
    {
      "tripId": "CCL_1_CC24_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 33
    }
  ],
  "CC25|CCL|0": [
    {
      "tripId": "CCL_0_CC25_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "CCL_0_CC25_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "CCL_0_CC25_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "CCL_0_CC25_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "CCL_0_CC25_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "CC25|CCL|1": [
    {
      "tripId": "CCL_1_CC25_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 3
    },
    {
      "tripId": "CCL_1_CC25_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "CCL_1_CC25_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "CCL_1_CC25_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "CCL_1_CC25_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 27
    }
  ],
  "CC26|CCL|0": [
    {
      "tripId": "CCL_0_CC26_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "CCL_0_CC26_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "CCL_0_CC26_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "CCL_0_CC26_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "CCL_0_CC26_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "CC26|CCL|1": [
    {
      "tripId": "CCL_1_CC26_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_1_CC26_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_1_CC26_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_1_CC26_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_1_CC26_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "CC27|CCL|0": [
    {
      "tripId": "CCL_0_CC27_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "CCL_0_CC27_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "CCL_0_CC27_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "CCL_0_CC27_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "CCL_0_CC27_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "CC27|CCL|1": [
    {
      "tripId": "CCL_1_CC27_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "CCL_1_CC27_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "CCL_1_CC27_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "CCL_1_CC27_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "CCL_1_CC27_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "CC28|CCL|0": [
    {
      "tripId": "CCL_0_CC28_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_0_CC28_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_0_CC28_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_0_CC28_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_0_CC28_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "CC28|CCL|1": [
    {
      "tripId": "CCL_1_CC28_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "CCL_1_CC28_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "CCL_1_CC28_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "CCL_1_CC28_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 27
    },
    {
      "tripId": "CCL_1_CC28_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 33
    }
  ],
  "CC29|CCL|0": [
    {
      "tripId": "CCL_0_CC29_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "CCL_0_CC29_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "CCL_0_CC29_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "CCL_0_CC29_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "CCL_0_CC29_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "CC29|CCL|1": [
    {
      "tripId": "CCL_1_CC29_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 3
    },
    {
      "tripId": "CCL_1_CC29_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "CCL_1_CC29_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "CCL_1_CC29_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "CCL_1_CC29_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 27
    }
  ],
  "CC30|CCL|0": [
    {
      "tripId": "CCL_0_CC30_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "CCL_0_CC30_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "CCL_0_CC30_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "CCL_0_CC30_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "CCL_0_CC30_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "CC30|CCL|1": [
    {
      "tripId": "CCL_1_CC30_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "CCL_1_CC30_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "CCL_1_CC30_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "CCL_1_CC30_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "CCL_1_CC30_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "CC31|CCL|0": [
    {
      "tripId": "CCL_0_CC31_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "CCL_0_CC31_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "CCL_0_CC31_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "CCL_0_CC31_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "CCL_0_CC31_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "CC31|CCL|1": [
    {
      "tripId": "CCL_1_CC31_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "CCL_1_CC31_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "CCL_1_CC31_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "CCL_1_CC31_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "CCL_1_CC31_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "CC32|CCL|0": [
    {
      "tripId": "CCL_0_CC32_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_0_CC32_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_0_CC32_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_0_CC32_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_0_CC32_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "CC32|CCL|1": [
    {
      "tripId": "CCL_1_CC32_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "CCL_1_CC32_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "CCL_1_CC32_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "CCL_1_CC32_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "CCL_1_CC32_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "CC33|CCL|0": [
    {
      "tripId": "CCL_0_CC33_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "CCL_0_CC33_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "CCL_0_CC33_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "CCL_0_CC33_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "CCL_0_CC33_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "CC33|CCL|1": [
    {
      "tripId": "CCL_1_CC33_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "CCL_1_CC33_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "CCL_1_CC33_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "CCL_1_CC33_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "CCL_1_CC33_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "CC34|CCL|0": [
    {
      "tripId": "CCL_0_CC34_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "CCL_0_CC34_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "CCL_0_CC34_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "CCL_0_CC34_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "CCL_0_CC34_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "CC34|CCL|1": [
    {
      "tripId": "CCL_1_CC34_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "CCL_1_CC34_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "CCL_1_CC34_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "CCL_1_CC34_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "CCL_1_CC34_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "CC2|CCL|0": [
    {
      "tripId": "CCL_0_CC2_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "CCL_0_CC2_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "CCL_0_CC2_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "CCL_0_CC2_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "CCL_0_CC2_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "CC2|CCL|1": [
    {
      "tripId": "CCL_1_CC2_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "CCL_1_CC2_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "CCL_1_CC2_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "CCL_1_CC2_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "CCL_1_CC2_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "CC3|CCL|0": [
    {
      "tripId": "CCL_0_CC3_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_0_CC3_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_0_CC3_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_0_CC3_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_0_CC3_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "CC3|CCL|1": [
    {
      "tripId": "CCL_1_CC3_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 8
    },
    {
      "tripId": "CCL_1_CC3_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 14
    },
    {
      "tripId": "CCL_1_CC3_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 20
    },
    {
      "tripId": "CCL_1_CC3_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 26
    },
    {
      "tripId": "CCL_1_CC3_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 32
    }
  ],
  "NS24|CCL|0": [
    {
      "tripId": "CCL_0_NS24_1",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "CCL_0_NS24_2",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "CCL_0_NS24_3",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "CCL_0_NS24_4",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "CCL_0_NS24_5",
      "line": "CCL",
      "direction": "0",
      "headsign": "Promenade",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "NS24|CCL|1": [
    {
      "tripId": "CCL_1_NS24_1",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "CCL_1_NS24_2",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "CCL_1_NS24_3",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "CCL_1_NS24_4",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "CCL_1_NS24_5",
      "line": "CCL",
      "direction": "1",
      "headsign": "Dhoby Ghaut",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "DT1|DTL|0": [
    {
      "tripId": "DTL_0_DT1_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "DTL_0_DT1_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "DTL_0_DT1_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "DTL_0_DT1_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "DTL_0_DT1_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "DT1|DTL|1": [
    {
      "tripId": "DTL_1_DT1_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 3
    },
    {
      "tripId": "DTL_1_DT1_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_1_DT1_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_1_DT1_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_1_DT1_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 27
    }
  ],
  "DT2|DTL|0": [
    {
      "tripId": "DTL_0_DT2_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "DTL_0_DT2_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_0_DT2_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_0_DT2_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_0_DT2_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "DT2|DTL|1": [
    {
      "tripId": "DTL_1_DT2_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "DTL_1_DT2_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "DTL_1_DT2_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "DTL_1_DT2_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "DTL_1_DT2_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "DT3|DTL|0": [
    {
      "tripId": "DTL_0_DT3_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "DTL_0_DT3_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "DTL_0_DT3_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "DTL_0_DT3_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "DTL_0_DT3_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "DT3|DTL|1": [
    {
      "tripId": "DTL_1_DT3_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "DTL_1_DT3_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "DTL_1_DT3_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "DTL_1_DT3_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "DTL_1_DT3_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "DT4|DTL|0": [
    {
      "tripId": "DTL_0_DT4_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "DTL_0_DT4_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "DTL_0_DT4_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "DTL_0_DT4_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "DTL_0_DT4_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "DT4|DTL|1": [
    {
      "tripId": "DTL_1_DT4_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_1_DT4_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_1_DT4_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_1_DT4_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 27
    },
    {
      "tripId": "DTL_1_DT4_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 33
    }
  ],
  "DT5|DTL|0": [
    {
      "tripId": "DTL_0_DT5_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "DTL_0_DT5_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "DTL_0_DT5_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "DTL_0_DT5_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "DTL_0_DT5_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "DT5|DTL|1": [
    {
      "tripId": "DTL_1_DT5_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 3
    },
    {
      "tripId": "DTL_1_DT5_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_1_DT5_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_1_DT5_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_1_DT5_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 27
    }
  ],
  "DT6|DTL|0": [
    {
      "tripId": "DTL_0_DT6_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "DTL_0_DT6_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_0_DT6_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_0_DT6_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_0_DT6_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "DT6|DTL|1": [
    {
      "tripId": "DTL_1_DT6_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "DTL_1_DT6_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "DTL_1_DT6_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "DTL_1_DT6_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "DTL_1_DT6_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "DT7|DTL|0": [
    {
      "tripId": "DTL_0_DT7_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "DTL_0_DT7_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "DTL_0_DT7_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "DTL_0_DT7_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "DTL_0_DT7_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "DT7|DTL|1": [
    {
      "tripId": "DTL_1_DT7_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "DTL_1_DT7_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "DTL_1_DT7_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "DTL_1_DT7_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "DTL_1_DT7_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "DT8|DTL|0": [
    {
      "tripId": "DTL_0_DT8_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "DTL_0_DT8_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "DTL_0_DT8_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "DTL_0_DT8_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "DTL_0_DT8_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "DT8|DTL|1": [
    {
      "tripId": "DTL_1_DT8_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_1_DT8_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_1_DT8_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_1_DT8_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 27
    },
    {
      "tripId": "DTL_1_DT8_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 33
    }
  ],
  "CC19|DTL|0": [
    {
      "tripId": "DTL_0_CC19_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "DTL_0_CC19_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "DTL_0_CC19_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "DTL_0_CC19_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "DTL_0_CC19_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "CC19|DTL|1": [
    {
      "tripId": "DTL_1_CC19_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 4
    },
    {
      "tripId": "DTL_1_CC19_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 10
    },
    {
      "tripId": "DTL_1_CC19_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 16
    },
    {
      "tripId": "DTL_1_CC19_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 22
    },
    {
      "tripId": "DTL_1_CC19_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 28
    }
  ],
  "DT10|DTL|0": [
    {
      "tripId": "DTL_0_DT10_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "DTL_0_DT10_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_0_DT10_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_0_DT10_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_0_DT10_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "DT10|DTL|1": [
    {
      "tripId": "DTL_1_DT10_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 4
    },
    {
      "tripId": "DTL_1_DT10_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 10
    },
    {
      "tripId": "DTL_1_DT10_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 16
    },
    {
      "tripId": "DTL_1_DT10_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 22
    },
    {
      "tripId": "DTL_1_DT10_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 28
    }
  ],
  "DT11|DTL|0": [
    {
      "tripId": "DTL_0_DT11_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "DTL_0_DT11_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "DTL_0_DT11_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "DTL_0_DT11_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "DTL_0_DT11_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "DT11|DTL|1": [
    {
      "tripId": "DTL_1_DT11_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 8
    },
    {
      "tripId": "DTL_1_DT11_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 14
    },
    {
      "tripId": "DTL_1_DT11_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 20
    },
    {
      "tripId": "DTL_1_DT11_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 26
    },
    {
      "tripId": "DTL_1_DT11_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 32
    }
  ],
  "DT12|DTL|0": [
    {
      "tripId": "DTL_0_DT12_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "DTL_0_DT12_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "DTL_0_DT12_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "DTL_0_DT12_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "DTL_0_DT12_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "DT12|DTL|1": [
    {
      "tripId": "DTL_1_DT12_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 8
    },
    {
      "tripId": "DTL_1_DT12_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 14
    },
    {
      "tripId": "DTL_1_DT12_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 20
    },
    {
      "tripId": "DTL_1_DT12_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 26
    },
    {
      "tripId": "DTL_1_DT12_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 32
    }
  ],
  "DT13|DTL|0": [
    {
      "tripId": "DTL_0_DT13_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "DTL_0_DT13_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "DTL_0_DT13_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "DTL_0_DT13_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "DTL_0_DT13_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "DT13|DTL|1": [
    {
      "tripId": "DTL_1_DT13_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 4
    },
    {
      "tripId": "DTL_1_DT13_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 10
    },
    {
      "tripId": "DTL_1_DT13_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 16
    },
    {
      "tripId": "DTL_1_DT13_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 22
    },
    {
      "tripId": "DTL_1_DT13_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 28
    }
  ],
  "DT14|DTL|0": [
    {
      "tripId": "DTL_0_DT14_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "DTL_0_DT14_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_0_DT14_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_0_DT14_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_0_DT14_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "DT14|DTL|1": [
    {
      "tripId": "DTL_1_DT14_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 4
    },
    {
      "tripId": "DTL_1_DT14_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 10
    },
    {
      "tripId": "DTL_1_DT14_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 16
    },
    {
      "tripId": "DTL_1_DT14_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 22
    },
    {
      "tripId": "DTL_1_DT14_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 28
    }
  ],
  "CC4|DTL|0": [
    {
      "tripId": "DTL_0_CC4_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "DTL_0_CC4_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "DTL_0_CC4_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "DTL_0_CC4_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "DTL_0_CC4_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "CC4|DTL|1": [
    {
      "tripId": "DTL_1_CC4_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "DTL_1_CC4_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "DTL_1_CC4_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "DTL_1_CC4_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "DTL_1_CC4_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "CC34|DTL|0": [
    {
      "tripId": "DTL_0_CC34_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "DTL_0_CC34_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "DTL_0_CC34_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "DTL_0_CC34_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "DTL_0_CC34_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "CC34|DTL|1": [
    {
      "tripId": "DTL_1_CC34_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "DTL_1_CC34_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "DTL_1_CC34_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "DTL_1_CC34_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "DTL_1_CC34_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "DT17|DTL|0": [
    {
      "tripId": "DTL_0_DT17_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "DTL_0_DT17_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "DTL_0_DT17_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "DTL_0_DT17_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "DTL_0_DT17_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "DT17|DTL|1": [
    {
      "tripId": "DTL_1_DT17_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 4
    },
    {
      "tripId": "DTL_1_DT17_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 10
    },
    {
      "tripId": "DTL_1_DT17_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 16
    },
    {
      "tripId": "DTL_1_DT17_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 22
    },
    {
      "tripId": "DTL_1_DT17_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 28
    }
  ],
  "DT18|DTL|0": [
    {
      "tripId": "DTL_0_DT18_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "DTL_0_DT18_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_0_DT18_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_0_DT18_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_0_DT18_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "DT18|DTL|1": [
    {
      "tripId": "DTL_1_DT18_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 4
    },
    {
      "tripId": "DTL_1_DT18_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 10
    },
    {
      "tripId": "DTL_1_DT18_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 16
    },
    {
      "tripId": "DTL_1_DT18_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 22
    },
    {
      "tripId": "DTL_1_DT18_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 28
    }
  ],
  "DT19|DTL|0": [
    {
      "tripId": "DTL_0_DT19_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "DTL_0_DT19_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "DTL_0_DT19_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "DTL_0_DT19_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "DTL_0_DT19_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "DT19|DTL|1": [
    {
      "tripId": "DTL_1_DT19_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 8
    },
    {
      "tripId": "DTL_1_DT19_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 14
    },
    {
      "tripId": "DTL_1_DT19_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 20
    },
    {
      "tripId": "DTL_1_DT19_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 26
    },
    {
      "tripId": "DTL_1_DT19_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 32
    }
  ],
  "DT20|DTL|0": [
    {
      "tripId": "DTL_0_DT20_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "DTL_0_DT20_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "DTL_0_DT20_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "DTL_0_DT20_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "DTL_0_DT20_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "DT20|DTL|1": [
    {
      "tripId": "DTL_1_DT20_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_1_DT20_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_1_DT20_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_1_DT20_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 27
    },
    {
      "tripId": "DTL_1_DT20_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 33
    }
  ],
  "DT21|DTL|0": [
    {
      "tripId": "DTL_0_DT21_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "DTL_0_DT21_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "DTL_0_DT21_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "DTL_0_DT21_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "DTL_0_DT21_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "DT21|DTL|1": [
    {
      "tripId": "DTL_1_DT21_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 3
    },
    {
      "tripId": "DTL_1_DT21_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_1_DT21_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_1_DT21_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_1_DT21_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 27
    }
  ],
  "DT22|DTL|0": [
    {
      "tripId": "DTL_0_DT22_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "DTL_0_DT22_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_0_DT22_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_0_DT22_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_0_DT22_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "DT22|DTL|1": [
    {
      "tripId": "DTL_1_DT22_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 5
    },
    {
      "tripId": "DTL_1_DT22_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 11
    },
    {
      "tripId": "DTL_1_DT22_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 17
    },
    {
      "tripId": "DTL_1_DT22_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 23
    },
    {
      "tripId": "DTL_1_DT22_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 29
    }
  ],
  "DT23|DTL|0": [
    {
      "tripId": "DTL_0_DT23_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "DTL_0_DT23_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "DTL_0_DT23_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "DTL_0_DT23_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "DTL_0_DT23_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "DT23|DTL|1": [
    {
      "tripId": "DTL_1_DT23_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "DTL_1_DT23_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "DTL_1_DT23_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "DTL_1_DT23_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "DTL_1_DT23_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "DT24|DTL|0": [
    {
      "tripId": "DTL_0_DT24_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "DTL_0_DT24_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "DTL_0_DT24_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "DTL_0_DT24_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "DTL_0_DT24_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "DT24|DTL|1": [
    {
      "tripId": "DTL_1_DT24_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_1_DT24_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_1_DT24_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_1_DT24_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 27
    },
    {
      "tripId": "DTL_1_DT24_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 33
    }
  ],
  "DT25|DTL|0": [
    {
      "tripId": "DTL_0_DT25_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "DTL_0_DT25_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "DTL_0_DT25_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "DTL_0_DT25_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "DTL_0_DT25_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "DT25|DTL|1": [
    {
      "tripId": "DTL_1_DT25_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 3
    },
    {
      "tripId": "DTL_1_DT25_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_1_DT25_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_1_DT25_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_1_DT25_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 27
    }
  ],
  "CC10|DTL|0": [
    {
      "tripId": "DTL_0_CC10_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "DTL_0_CC10_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_0_CC10_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_0_CC10_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_0_CC10_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "CC10|DTL|1": [
    {
      "tripId": "DTL_1_CC10_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "DTL_1_CC10_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "DTL_1_CC10_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "DTL_1_CC10_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "DTL_1_CC10_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "DT27|DTL|0": [
    {
      "tripId": "DTL_0_DT27_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "DTL_0_DT27_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "DTL_0_DT27_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "DTL_0_DT27_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "DTL_0_DT27_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "DT27|DTL|1": [
    {
      "tripId": "DTL_1_DT27_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "DTL_1_DT27_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "DTL_1_DT27_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "DTL_1_DT27_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "DTL_1_DT27_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "DT28|DTL|0": [
    {
      "tripId": "DTL_0_DT28_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "DTL_0_DT28_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "DTL_0_DT28_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "DTL_0_DT28_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "DTL_0_DT28_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "DT28|DTL|1": [
    {
      "tripId": "DTL_1_DT28_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_1_DT28_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_1_DT28_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_1_DT28_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 27
    },
    {
      "tripId": "DTL_1_DT28_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 33
    }
  ],
  "DT29|DTL|0": [
    {
      "tripId": "DTL_0_DT29_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "DTL_0_DT29_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "DTL_0_DT29_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "DTL_0_DT29_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "DTL_0_DT29_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "DT29|DTL|1": [
    {
      "tripId": "DTL_1_DT29_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 3
    },
    {
      "tripId": "DTL_1_DT29_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_1_DT29_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_1_DT29_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_1_DT29_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 27
    }
  ],
  "DT30|DTL|0": [
    {
      "tripId": "DTL_0_DT30_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "DTL_0_DT30_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_0_DT30_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_0_DT30_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_0_DT30_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "DT30|DTL|1": [
    {
      "tripId": "DTL_1_DT30_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "DTL_1_DT30_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "DTL_1_DT30_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "DTL_1_DT30_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "DTL_1_DT30_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "DT31|DTL|0": [
    {
      "tripId": "DTL_0_DT31_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "DTL_0_DT31_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "DTL_0_DT31_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "DTL_0_DT31_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "DTL_0_DT31_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "DT31|DTL|1": [
    {
      "tripId": "DTL_1_DT31_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "DTL_1_DT31_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "DTL_1_DT31_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "DTL_1_DT31_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "DTL_1_DT31_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "DT32|DTL|0": [
    {
      "tripId": "DTL_0_DT32_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 5
    },
    {
      "tripId": "DTL_0_DT32_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 11
    },
    {
      "tripId": "DTL_0_DT32_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 17
    },
    {
      "tripId": "DTL_0_DT32_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 23
    },
    {
      "tripId": "DTL_0_DT32_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 29
    }
  ],
  "DT32|DTL|1": [
    {
      "tripId": "DTL_1_DT32_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "DTL_1_DT32_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "DTL_1_DT32_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "DTL_1_DT32_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "DTL_1_DT32_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "DT33|DTL|0": [
    {
      "tripId": "DTL_0_DT33_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 2
    },
    {
      "tripId": "DTL_0_DT33_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 8
    },
    {
      "tripId": "DTL_0_DT33_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 14
    },
    {
      "tripId": "DTL_0_DT33_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 20
    },
    {
      "tripId": "DTL_0_DT33_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 26
    }
  ],
  "DT33|DTL|1": [
    {
      "tripId": "DTL_1_DT33_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "DTL_1_DT33_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "DTL_1_DT33_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "DTL_1_DT33_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "DTL_1_DT33_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "DT34|DTL|0": [
    {
      "tripId": "DTL_0_DT34_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 3
    },
    {
      "tripId": "DTL_0_DT34_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 9
    },
    {
      "tripId": "DTL_0_DT34_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 15
    },
    {
      "tripId": "DTL_0_DT34_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 21
    },
    {
      "tripId": "DTL_0_DT34_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 27
    }
  ],
  "DT34|DTL|1": [
    {
      "tripId": "DTL_1_DT34_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 6
    },
    {
      "tripId": "DTL_1_DT34_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 12
    },
    {
      "tripId": "DTL_1_DT34_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 18
    },
    {
      "tripId": "DTL_1_DT34_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 24
    },
    {
      "tripId": "DTL_1_DT34_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 30
    }
  ],
  "CG1|DTL|0": [
    {
      "tripId": "DTL_0_CG1_1",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 4
    },
    {
      "tripId": "DTL_0_CG1_2",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 10
    },
    {
      "tripId": "DTL_0_CG1_3",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 16
    },
    {
      "tripId": "DTL_0_CG1_4",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 22
    },
    {
      "tripId": "DTL_0_CG1_5",
      "line": "DTL",
      "direction": "0",
      "headsign": "Bukit Panjang",
      "platform": "A",
      "offsetMinutes": 28
    }
  ],
  "CG1|DTL|1": [
    {
      "tripId": "DTL_1_CG1_1",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 7
    },
    {
      "tripId": "DTL_1_CG1_2",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 13
    },
    {
      "tripId": "DTL_1_CG1_3",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 19
    },
    {
      "tripId": "DTL_1_CG1_4",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 25
    },
    {
      "tripId": "DTL_1_CG1_5",
      "line": "DTL",
      "direction": "1",
      "headsign": "Expo",
      "platform": "B",
      "offsetMinutes": 31
    }
  ],
  "TE29|TEL|0": [
    {
      "tripId": "TEL_0_TE29_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 2
    },
    {
      "tripId": "TEL_0_TE29_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 8
    },
    {
      "tripId": "TEL_0_TE29_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 14
    },
    {
      "tripId": "TEL_0_TE29_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 20
    },
    {
      "tripId": "TEL_0_TE29_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 26
    }
  ],
  "TE29|TEL|1": [
    {
      "tripId": "TEL_1_TE29_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_1_TE29_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_1_TE29_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_1_TE29_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_1_TE29_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 29
    }
  ],
  "TE28|TEL|0": [
    {
      "tripId": "TEL_0_TE28_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 3
    },
    {
      "tripId": "TEL_0_TE28_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 9
    },
    {
      "tripId": "TEL_0_TE28_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 15
    },
    {
      "tripId": "TEL_0_TE28_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 21
    },
    {
      "tripId": "TEL_0_TE28_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 27
    }
  ],
  "TE28|TEL|1": [
    {
      "tripId": "TEL_1_TE28_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_1_TE28_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_1_TE28_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_1_TE28_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_1_TE28_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 29
    }
  ],
  "TE27|TEL|0": [
    {
      "tripId": "TEL_0_TE27_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 4
    },
    {
      "tripId": "TEL_0_TE27_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 10
    },
    {
      "tripId": "TEL_0_TE27_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 16
    },
    {
      "tripId": "TEL_0_TE27_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 22
    },
    {
      "tripId": "TEL_0_TE27_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 28
    }
  ],
  "TE27|TEL|1": [
    {
      "tripId": "TEL_1_TE27_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_1_TE27_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_1_TE27_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_1_TE27_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_1_TE27_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 29
    }
  ],
  "TE26|TEL|0": [
    {
      "tripId": "TEL_0_TE26_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_0_TE26_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_0_TE26_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_0_TE26_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_0_TE26_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 29
    }
  ],
  "TE26|TEL|1": [
    {
      "tripId": "TEL_1_TE26_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 9
    },
    {
      "tripId": "TEL_1_TE26_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 15
    },
    {
      "tripId": "TEL_1_TE26_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 21
    },
    {
      "tripId": "TEL_1_TE26_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 27
    },
    {
      "tripId": "TEL_1_TE26_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 33
    }
  ],
  "TE25|TEL|0": [
    {
      "tripId": "TEL_0_TE25_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 2
    },
    {
      "tripId": "TEL_0_TE25_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 8
    },
    {
      "tripId": "TEL_0_TE25_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 14
    },
    {
      "tripId": "TEL_0_TE25_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 20
    },
    {
      "tripId": "TEL_0_TE25_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 26
    }
  ],
  "TE25|TEL|1": [
    {
      "tripId": "TEL_1_TE25_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_1_TE25_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_1_TE25_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_1_TE25_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_1_TE25_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 29
    }
  ],
  "TE24|TEL|0": [
    {
      "tripId": "TEL_0_TE24_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 3
    },
    {
      "tripId": "TEL_0_TE24_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 9
    },
    {
      "tripId": "TEL_0_TE24_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 15
    },
    {
      "tripId": "TEL_0_TE24_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 21
    },
    {
      "tripId": "TEL_0_TE24_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 27
    }
  ],
  "TE24|TEL|1": [
    {
      "tripId": "TEL_1_TE24_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_1_TE24_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_1_TE24_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_1_TE24_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_1_TE24_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 29
    }
  ],
  "TE23|TEL|0": [
    {
      "tripId": "TEL_0_TE23_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 4
    },
    {
      "tripId": "TEL_0_TE23_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 10
    },
    {
      "tripId": "TEL_0_TE23_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 16
    },
    {
      "tripId": "TEL_0_TE23_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 22
    },
    {
      "tripId": "TEL_0_TE23_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 28
    }
  ],
  "TE23|TEL|1": [
    {
      "tripId": "TEL_1_TE23_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_1_TE23_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_1_TE23_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_1_TE23_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_1_TE23_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 29
    }
  ],
  "TE22|TEL|0": [
    {
      "tripId": "TEL_0_TE22_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_0_TE22_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_0_TE22_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_0_TE22_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_0_TE22_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 29
    }
  ],
  "TE22|TEL|1": [
    {
      "tripId": "TEL_1_TE22_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 9
    },
    {
      "tripId": "TEL_1_TE22_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 15
    },
    {
      "tripId": "TEL_1_TE22_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 21
    },
    {
      "tripId": "TEL_1_TE22_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 27
    },
    {
      "tripId": "TEL_1_TE22_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 33
    }
  ],
  "CC33|TEL|0": [
    {
      "tripId": "TEL_0_CC33_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 2
    },
    {
      "tripId": "TEL_0_CC33_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 8
    },
    {
      "tripId": "TEL_0_CC33_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 14
    },
    {
      "tripId": "TEL_0_CC33_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 20
    },
    {
      "tripId": "TEL_0_CC33_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 26
    }
  ],
  "CC33|TEL|1": [
    {
      "tripId": "TEL_1_CC33_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 3
    },
    {
      "tripId": "TEL_1_CC33_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 9
    },
    {
      "tripId": "TEL_1_CC33_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 15
    },
    {
      "tripId": "TEL_1_CC33_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 21
    },
    {
      "tripId": "TEL_1_CC33_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 27
    }
  ],
  "TE19|TEL|0": [
    {
      "tripId": "TEL_0_TE19_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 3
    },
    {
      "tripId": "TEL_0_TE19_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 9
    },
    {
      "tripId": "TEL_0_TE19_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 15
    },
    {
      "tripId": "TEL_0_TE19_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 21
    },
    {
      "tripId": "TEL_0_TE19_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 27
    }
  ],
  "TE19|TEL|1": [
    {
      "tripId": "TEL_1_TE19_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_1_TE19_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_1_TE19_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_1_TE19_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_1_TE19_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 29
    }
  ],
  "TE18|TEL|0": [
    {
      "tripId": "TEL_0_TE18_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 4
    },
    {
      "tripId": "TEL_0_TE18_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 10
    },
    {
      "tripId": "TEL_0_TE18_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 16
    },
    {
      "tripId": "TEL_0_TE18_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 22
    },
    {
      "tripId": "TEL_0_TE18_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 28
    }
  ],
  "TE18|TEL|1": [
    {
      "tripId": "TEL_1_TE18_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 7
    },
    {
      "tripId": "TEL_1_TE18_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 13
    },
    {
      "tripId": "TEL_1_TE18_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 19
    },
    {
      "tripId": "TEL_1_TE18_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 25
    },
    {
      "tripId": "TEL_1_TE18_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 31
    }
  ],
  "EW16|TEL|0": [
    {
      "tripId": "TEL_0_EW16_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_0_EW16_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_0_EW16_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_0_EW16_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_0_EW16_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 29
    }
  ],
  "EW16|TEL|1": [
    {
      "tripId": "TEL_1_EW16_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 9
    },
    {
      "tripId": "TEL_1_EW16_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 15
    },
    {
      "tripId": "TEL_1_EW16_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 21
    },
    {
      "tripId": "TEL_1_EW16_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 27
    },
    {
      "tripId": "TEL_1_EW16_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 33
    }
  ],
  "TE16|TEL|0": [
    {
      "tripId": "TEL_0_TE16_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 2
    },
    {
      "tripId": "TEL_0_TE16_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 8
    },
    {
      "tripId": "TEL_0_TE16_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 14
    },
    {
      "tripId": "TEL_0_TE16_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 20
    },
    {
      "tripId": "TEL_0_TE16_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 26
    }
  ],
  "TE16|TEL|1": [
    {
      "tripId": "TEL_1_TE16_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 3
    },
    {
      "tripId": "TEL_1_TE16_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 9
    },
    {
      "tripId": "TEL_1_TE16_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 15
    },
    {
      "tripId": "TEL_1_TE16_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 21
    },
    {
      "tripId": "TEL_1_TE16_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 27
    }
  ],
  "TE15|TEL|0": [
    {
      "tripId": "TEL_0_TE15_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 3
    },
    {
      "tripId": "TEL_0_TE15_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 9
    },
    {
      "tripId": "TEL_0_TE15_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 15
    },
    {
      "tripId": "TEL_0_TE15_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 21
    },
    {
      "tripId": "TEL_0_TE15_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 27
    }
  ],
  "TE15|TEL|1": [
    {
      "tripId": "TEL_1_TE15_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_1_TE15_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_1_TE15_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_1_TE15_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_1_TE15_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 29
    }
  ],
  "NS22|TEL|0": [
    {
      "tripId": "TEL_0_NS22_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 4
    },
    {
      "tripId": "TEL_0_NS22_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 10
    },
    {
      "tripId": "TEL_0_NS22_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 16
    },
    {
      "tripId": "TEL_0_NS22_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 22
    },
    {
      "tripId": "TEL_0_NS22_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 28
    }
  ],
  "NS22|TEL|1": [
    {
      "tripId": "TEL_1_NS22_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 8
    },
    {
      "tripId": "TEL_1_NS22_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 14
    },
    {
      "tripId": "TEL_1_NS22_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 20
    },
    {
      "tripId": "TEL_1_NS22_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 26
    },
    {
      "tripId": "TEL_1_NS22_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 32
    }
  ],
  "TE13|TEL|0": [
    {
      "tripId": "TEL_0_TE13_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_0_TE13_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_0_TE13_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_0_TE13_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_0_TE13_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 29
    }
  ],
  "TE13|TEL|1": [
    {
      "tripId": "TEL_1_TE13_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 9
    },
    {
      "tripId": "TEL_1_TE13_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 15
    },
    {
      "tripId": "TEL_1_TE13_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 21
    },
    {
      "tripId": "TEL_1_TE13_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 27
    },
    {
      "tripId": "TEL_1_TE13_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 33
    }
  ],
  "TE12|TEL|0": [
    {
      "tripId": "TEL_0_TE12_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 2
    },
    {
      "tripId": "TEL_0_TE12_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 8
    },
    {
      "tripId": "TEL_0_TE12_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 14
    },
    {
      "tripId": "TEL_0_TE12_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 20
    },
    {
      "tripId": "TEL_0_TE12_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 26
    }
  ],
  "TE12|TEL|1": [
    {
      "tripId": "TEL_1_TE12_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 3
    },
    {
      "tripId": "TEL_1_TE12_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 9
    },
    {
      "tripId": "TEL_1_TE12_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 15
    },
    {
      "tripId": "TEL_1_TE12_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 21
    },
    {
      "tripId": "TEL_1_TE12_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 27
    }
  ],
  "DT10|TEL|0": [
    {
      "tripId": "TEL_0_DT10_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 3
    },
    {
      "tripId": "TEL_0_DT10_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 9
    },
    {
      "tripId": "TEL_0_DT10_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 15
    },
    {
      "tripId": "TEL_0_DT10_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 21
    },
    {
      "tripId": "TEL_0_DT10_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 27
    }
  ],
  "DT10|TEL|1": [
    {
      "tripId": "TEL_1_DT10_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_1_DT10_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_1_DT10_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_1_DT10_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_1_DT10_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 29
    }
  ],
  "CC17|TEL|0": [
    {
      "tripId": "TEL_0_CC17_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 4
    },
    {
      "tripId": "TEL_0_CC17_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 10
    },
    {
      "tripId": "TEL_0_CC17_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 16
    },
    {
      "tripId": "TEL_0_CC17_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 22
    },
    {
      "tripId": "TEL_0_CC17_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 28
    }
  ],
  "CC17|TEL|1": [
    {
      "tripId": "TEL_1_CC17_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 7
    },
    {
      "tripId": "TEL_1_CC17_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 13
    },
    {
      "tripId": "TEL_1_CC17_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 19
    },
    {
      "tripId": "TEL_1_CC17_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 25
    },
    {
      "tripId": "TEL_1_CC17_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 31
    }
  ],
  "TE8|TEL|0": [
    {
      "tripId": "TEL_0_TE8_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_0_TE8_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_0_TE8_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_0_TE8_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_0_TE8_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 29
    }
  ],
  "TE8|TEL|1": [
    {
      "tripId": "TEL_1_TE8_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 9
    },
    {
      "tripId": "TEL_1_TE8_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 15
    },
    {
      "tripId": "TEL_1_TE8_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 21
    },
    {
      "tripId": "TEL_1_TE8_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 27
    },
    {
      "tripId": "TEL_1_TE8_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 33
    }
  ],
  "TE7|TEL|0": [
    {
      "tripId": "TEL_0_TE7_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 2
    },
    {
      "tripId": "TEL_0_TE7_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 8
    },
    {
      "tripId": "TEL_0_TE7_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 14
    },
    {
      "tripId": "TEL_0_TE7_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 20
    },
    {
      "tripId": "TEL_0_TE7_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 26
    }
  ],
  "TE7|TEL|1": [
    {
      "tripId": "TEL_1_TE7_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_1_TE7_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_1_TE7_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_1_TE7_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_1_TE7_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 29
    }
  ],
  "TE6|TEL|0": [
    {
      "tripId": "TEL_0_TE6_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 3
    },
    {
      "tripId": "TEL_0_TE6_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 9
    },
    {
      "tripId": "TEL_0_TE6_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 15
    },
    {
      "tripId": "TEL_0_TE6_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 21
    },
    {
      "tripId": "TEL_0_TE6_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 27
    }
  ],
  "TE6|TEL|1": [
    {
      "tripId": "TEL_1_TE6_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_1_TE6_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_1_TE6_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_1_TE6_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_1_TE6_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 29
    }
  ],
  "TE5|TEL|0": [
    {
      "tripId": "TEL_0_TE5_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 4
    },
    {
      "tripId": "TEL_0_TE5_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 10
    },
    {
      "tripId": "TEL_0_TE5_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 16
    },
    {
      "tripId": "TEL_0_TE5_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 22
    },
    {
      "tripId": "TEL_0_TE5_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 28
    }
  ],
  "TE5|TEL|1": [
    {
      "tripId": "TEL_1_TE5_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_1_TE5_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_1_TE5_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_1_TE5_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_1_TE5_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 29
    }
  ],
  "TE4|TEL|0": [
    {
      "tripId": "TEL_0_TE4_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_0_TE4_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_0_TE4_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_0_TE4_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_0_TE4_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 29
    }
  ],
  "TE4|TEL|1": [
    {
      "tripId": "TEL_1_TE4_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 9
    },
    {
      "tripId": "TEL_1_TE4_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 15
    },
    {
      "tripId": "TEL_1_TE4_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 21
    },
    {
      "tripId": "TEL_1_TE4_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 27
    },
    {
      "tripId": "TEL_1_TE4_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 33
    }
  ],
  "TE3|TEL|0": [
    {
      "tripId": "TEL_0_TE3_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 2
    },
    {
      "tripId": "TEL_0_TE3_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 8
    },
    {
      "tripId": "TEL_0_TE3_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 14
    },
    {
      "tripId": "TEL_0_TE3_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 20
    },
    {
      "tripId": "TEL_0_TE3_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 26
    }
  ],
  "TE3|TEL|1": [
    {
      "tripId": "TEL_1_TE3_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_1_TE3_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_1_TE3_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_1_TE3_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_1_TE3_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 29
    }
  ],
  "NS9|TEL|0": [
    {
      "tripId": "TEL_0_NS9_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 3
    },
    {
      "tripId": "TEL_0_NS9_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 9
    },
    {
      "tripId": "TEL_0_NS9_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 15
    },
    {
      "tripId": "TEL_0_NS9_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 21
    },
    {
      "tripId": "TEL_0_NS9_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 27
    }
  ],
  "NS9|TEL|1": [
    {
      "tripId": "TEL_1_NS9_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 4
    },
    {
      "tripId": "TEL_1_NS9_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 10
    },
    {
      "tripId": "TEL_1_NS9_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 16
    },
    {
      "tripId": "TEL_1_NS9_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 22
    },
    {
      "tripId": "TEL_1_NS9_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 28
    }
  ],
  "TE1|TEL|0": [
    {
      "tripId": "TEL_0_TE1_1",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 4
    },
    {
      "tripId": "TEL_0_TE1_2",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 10
    },
    {
      "tripId": "TEL_0_TE1_3",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 16
    },
    {
      "tripId": "TEL_0_TE1_4",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 22
    },
    {
      "tripId": "TEL_0_TE1_5",
      "line": "TEL",
      "direction": "0",
      "headsign": "Bayshore",
      "platform": "C",
      "offsetMinutes": 28
    }
  ],
  "TE1|TEL|1": [
    {
      "tripId": "TEL_1_TE1_1",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 5
    },
    {
      "tripId": "TEL_1_TE1_2",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 11
    },
    {
      "tripId": "TEL_1_TE1_3",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 17
    },
    {
      "tripId": "TEL_1_TE1_4",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 23
    },
    {
      "tripId": "TEL_1_TE1_5",
      "line": "TEL",
      "direction": "1",
      "headsign": "Woodlands North",
      "platform": "D",
      "offsetMinutes": 29
    }
  ],
  "BP1|BPL|0": [
    {
      "tripId": "BPL_0_BP1_1",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 2
    },
    {
      "tripId": "BPL_0_BP1_2",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 8
    },
    {
      "tripId": "BPL_0_BP1_3",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 14
    },
    {
      "tripId": "BPL_0_BP1_4",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 20
    },
    {
      "tripId": "BPL_0_BP1_5",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 26
    }
  ],
  "BP1|BPL|1": [
    {
      "tripId": "BPL_1_BP1_1",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 3
    },
    {
      "tripId": "BPL_1_BP1_2",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 9
    },
    {
      "tripId": "BPL_1_BP1_3",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 15
    },
    {
      "tripId": "BPL_1_BP1_4",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 21
    },
    {
      "tripId": "BPL_1_BP1_5",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 27
    }
  ],
  "BP2|BPL|0": [
    {
      "tripId": "BPL_0_BP2_1",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 3
    },
    {
      "tripId": "BPL_0_BP2_2",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 9
    },
    {
      "tripId": "BPL_0_BP2_3",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 15
    },
    {
      "tripId": "BPL_0_BP2_4",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 21
    },
    {
      "tripId": "BPL_0_BP2_5",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 27
    }
  ],
  "BP2|BPL|1": [
    {
      "tripId": "BPL_1_BP2_1",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 5
    },
    {
      "tripId": "BPL_1_BP2_2",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 11
    },
    {
      "tripId": "BPL_1_BP2_3",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 17
    },
    {
      "tripId": "BPL_1_BP2_4",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 23
    },
    {
      "tripId": "BPL_1_BP2_5",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 29
    }
  ],
  "BP3|BPL|0": [
    {
      "tripId": "BPL_0_BP3_1",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 4
    },
    {
      "tripId": "BPL_0_BP3_2",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 10
    },
    {
      "tripId": "BPL_0_BP3_3",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 16
    },
    {
      "tripId": "BPL_0_BP3_4",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 22
    },
    {
      "tripId": "BPL_0_BP3_5",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 28
    }
  ],
  "BP3|BPL|1": [
    {
      "tripId": "BPL_1_BP3_1",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 7
    },
    {
      "tripId": "BPL_1_BP3_2",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 13
    },
    {
      "tripId": "BPL_1_BP3_3",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 19
    },
    {
      "tripId": "BPL_1_BP3_4",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 25
    },
    {
      "tripId": "BPL_1_BP3_5",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 31
    }
  ],
  "BP4|BPL|0": [
    {
      "tripId": "BPL_0_BP4_1",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 5
    },
    {
      "tripId": "BPL_0_BP4_2",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 11
    },
    {
      "tripId": "BPL_0_BP4_3",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 17
    },
    {
      "tripId": "BPL_0_BP4_4",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 23
    },
    {
      "tripId": "BPL_0_BP4_5",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 29
    }
  ],
  "BP4|BPL|1": [
    {
      "tripId": "BPL_1_BP4_1",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 9
    },
    {
      "tripId": "BPL_1_BP4_2",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 15
    },
    {
      "tripId": "BPL_1_BP4_3",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 21
    },
    {
      "tripId": "BPL_1_BP4_4",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 27
    },
    {
      "tripId": "BPL_1_BP4_5",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 33
    }
  ],
  "BP5|BPL|0": [
    {
      "tripId": "BPL_0_BP5_1",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 2
    },
    {
      "tripId": "BPL_0_BP5_2",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 8
    },
    {
      "tripId": "BPL_0_BP5_3",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 14
    },
    {
      "tripId": "BPL_0_BP5_4",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 20
    },
    {
      "tripId": "BPL_0_BP5_5",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 26
    }
  ],
  "BP5|BPL|1": [
    {
      "tripId": "BPL_1_BP5_1",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 3
    },
    {
      "tripId": "BPL_1_BP5_2",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 9
    },
    {
      "tripId": "BPL_1_BP5_3",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 15
    },
    {
      "tripId": "BPL_1_BP5_4",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 21
    },
    {
      "tripId": "BPL_1_BP5_5",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 27
    }
  ],
  "BP6|BPL|0": [
    {
      "tripId": "BPL_0_BP6_1",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 3
    },
    {
      "tripId": "BPL_0_BP6_2",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 9
    },
    {
      "tripId": "BPL_0_BP6_3",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 15
    },
    {
      "tripId": "BPL_0_BP6_4",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 21
    },
    {
      "tripId": "BPL_0_BP6_5",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 27
    }
  ],
  "BP6|BPL|1": [
    {
      "tripId": "BPL_1_BP6_1",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 5
    },
    {
      "tripId": "BPL_1_BP6_2",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 11
    },
    {
      "tripId": "BPL_1_BP6_3",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 17
    },
    {
      "tripId": "BPL_1_BP6_4",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 23
    },
    {
      "tripId": "BPL_1_BP6_5",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 29
    }
  ],
  "BP13|BPL|0": [
    {
      "tripId": "BPL_0_BP13_1",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 4
    },
    {
      "tripId": "BPL_0_BP13_2",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 10
    },
    {
      "tripId": "BPL_0_BP13_3",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 16
    },
    {
      "tripId": "BPL_0_BP13_4",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 22
    },
    {
      "tripId": "BPL_0_BP13_5",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 28
    }
  ],
  "BP13|BPL|1": [
    {
      "tripId": "BPL_1_BP13_1",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 6
    },
    {
      "tripId": "BPL_1_BP13_2",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 12
    },
    {
      "tripId": "BPL_1_BP13_3",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 18
    },
    {
      "tripId": "BPL_1_BP13_4",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 24
    },
    {
      "tripId": "BPL_1_BP13_5",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 30
    }
  ],
  "BP12|BPL|0": [
    {
      "tripId": "BPL_0_BP12_1",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 5
    },
    {
      "tripId": "BPL_0_BP12_2",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 11
    },
    {
      "tripId": "BPL_0_BP12_3",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 17
    },
    {
      "tripId": "BPL_0_BP12_4",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 23
    },
    {
      "tripId": "BPL_0_BP12_5",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 29
    }
  ],
  "BP12|BPL|1": [
    {
      "tripId": "BPL_1_BP12_1",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 8
    },
    {
      "tripId": "BPL_1_BP12_2",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 14
    },
    {
      "tripId": "BPL_1_BP12_3",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 20
    },
    {
      "tripId": "BPL_1_BP12_4",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 26
    },
    {
      "tripId": "BPL_1_BP12_5",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 32
    }
  ],
  "BP11|BPL|0": [
    {
      "tripId": "BPL_0_BP11_1",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 2
    },
    {
      "tripId": "BPL_0_BP11_2",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 8
    },
    {
      "tripId": "BPL_0_BP11_3",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 14
    },
    {
      "tripId": "BPL_0_BP11_4",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 20
    },
    {
      "tripId": "BPL_0_BP11_5",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 26
    }
  ],
  "BP11|BPL|1": [
    {
      "tripId": "BPL_1_BP11_1",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 6
    },
    {
      "tripId": "BPL_1_BP11_2",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 12
    },
    {
      "tripId": "BPL_1_BP11_3",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 18
    },
    {
      "tripId": "BPL_1_BP11_4",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 24
    },
    {
      "tripId": "BPL_1_BP11_5",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 30
    }
  ],
  "BP10|BPL|0": [
    {
      "tripId": "BPL_0_BP10_1",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 3
    },
    {
      "tripId": "BPL_0_BP10_2",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 9
    },
    {
      "tripId": "BPL_0_BP10_3",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 15
    },
    {
      "tripId": "BPL_0_BP10_4",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 21
    },
    {
      "tripId": "BPL_0_BP10_5",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 27
    }
  ],
  "BP10|BPL|1": [
    {
      "tripId": "BPL_1_BP10_1",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 4
    },
    {
      "tripId": "BPL_1_BP10_2",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 10
    },
    {
      "tripId": "BPL_1_BP10_3",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 16
    },
    {
      "tripId": "BPL_1_BP10_4",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 22
    },
    {
      "tripId": "BPL_1_BP10_5",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 28
    }
  ],
  "BP9|BPL|0": [
    {
      "tripId": "BPL_0_BP9_1",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 4
    },
    {
      "tripId": "BPL_0_BP9_2",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 10
    },
    {
      "tripId": "BPL_0_BP9_3",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 16
    },
    {
      "tripId": "BPL_0_BP9_4",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 22
    },
    {
      "tripId": "BPL_0_BP9_5",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 28
    }
  ],
  "BP9|BPL|1": [
    {
      "tripId": "BPL_1_BP9_1",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 5
    },
    {
      "tripId": "BPL_1_BP9_2",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 11
    },
    {
      "tripId": "BPL_1_BP9_3",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 17
    },
    {
      "tripId": "BPL_1_BP9_4",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 23
    },
    {
      "tripId": "BPL_1_BP9_5",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 29
    }
  ],
  "BP8|BPL|0": [
    {
      "tripId": "BPL_0_BP8_1",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 5
    },
    {
      "tripId": "BPL_0_BP8_2",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 11
    },
    {
      "tripId": "BPL_0_BP8_3",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 17
    },
    {
      "tripId": "BPL_0_BP8_4",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 23
    },
    {
      "tripId": "BPL_0_BP8_5",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 29
    }
  ],
  "BP8|BPL|1": [
    {
      "tripId": "BPL_1_BP8_1",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 9
    },
    {
      "tripId": "BPL_1_BP8_2",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 15
    },
    {
      "tripId": "BPL_1_BP8_3",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 21
    },
    {
      "tripId": "BPL_1_BP8_4",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 27
    },
    {
      "tripId": "BPL_1_BP8_5",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 33
    }
  ],
  "BP7|BPL|0": [
    {
      "tripId": "BPL_0_BP7_1",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 2
    },
    {
      "tripId": "BPL_0_BP7_2",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 8
    },
    {
      "tripId": "BPL_0_BP7_3",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 14
    },
    {
      "tripId": "BPL_0_BP7_4",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 20
    },
    {
      "tripId": "BPL_0_BP7_5",
      "line": "BPL",
      "direction": "0",
      "headsign": "Choa Chu Kang",
      "platform": "1",
      "offsetMinutes": 26
    }
  ],
  "BP7|BPL|1": [
    {
      "tripId": "BPL_1_BP7_1",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 5
    },
    {
      "tripId": "BPL_1_BP7_2",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 11
    },
    {
      "tripId": "BPL_1_BP7_3",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 17
    },
    {
      "tripId": "BPL_1_BP7_4",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 23
    },
    {
      "tripId": "BPL_1_BP7_5",
      "line": "BPL",
      "direction": "1",
      "headsign": "Petir",
      "platform": "2",
      "offsetMinutes": 29
    }
  ],
  "NE16|SKL|0": [
    {
      "tripId": "SKL_0_NE16_1",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 2
    },
    {
      "tripId": "SKL_0_NE16_2",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 8
    },
    {
      "tripId": "SKL_0_NE16_3",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 14
    },
    {
      "tripId": "SKL_0_NE16_4",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 20
    },
    {
      "tripId": "SKL_0_NE16_5",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 26
    }
  ],
  "NE16|SKL|1": [
    {
      "tripId": "SKL_1_NE16_1",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 4
    },
    {
      "tripId": "SKL_1_NE16_2",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 10
    },
    {
      "tripId": "SKL_1_NE16_3",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 16
    },
    {
      "tripId": "SKL_1_NE16_4",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 22
    },
    {
      "tripId": "SKL_1_NE16_5",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 28
    }
  ],
  "SW1|SKL|0": [
    {
      "tripId": "SKL_0_SW1_1",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 3
    },
    {
      "tripId": "SKL_0_SW1_2",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 9
    },
    {
      "tripId": "SKL_0_SW1_3",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 15
    },
    {
      "tripId": "SKL_0_SW1_4",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 21
    },
    {
      "tripId": "SKL_0_SW1_5",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 27
    }
  ],
  "SW1|SKL|1": [
    {
      "tripId": "SKL_1_SW1_1",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 4
    },
    {
      "tripId": "SKL_1_SW1_2",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 10
    },
    {
      "tripId": "SKL_1_SW1_3",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 16
    },
    {
      "tripId": "SKL_1_SW1_4",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 22
    },
    {
      "tripId": "SKL_1_SW1_5",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 28
    }
  ],
  "SW2|SKL|0": [
    {
      "tripId": "SKL_0_SW2_1",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 4
    },
    {
      "tripId": "SKL_0_SW2_2",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 10
    },
    {
      "tripId": "SKL_0_SW2_3",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 16
    },
    {
      "tripId": "SKL_0_SW2_4",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 22
    },
    {
      "tripId": "SKL_0_SW2_5",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 28
    }
  ],
  "SW2|SKL|1": [
    {
      "tripId": "SKL_1_SW2_1",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 6
    },
    {
      "tripId": "SKL_1_SW2_2",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 12
    },
    {
      "tripId": "SKL_1_SW2_3",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 18
    },
    {
      "tripId": "SKL_1_SW2_4",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 24
    },
    {
      "tripId": "SKL_1_SW2_5",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 30
    }
  ],
  "SW3|SKL|0": [
    {
      "tripId": "SKL_0_SW3_1",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 5
    },
    {
      "tripId": "SKL_0_SW3_2",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 11
    },
    {
      "tripId": "SKL_0_SW3_3",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 17
    },
    {
      "tripId": "SKL_0_SW3_4",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 23
    },
    {
      "tripId": "SKL_0_SW3_5",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 29
    }
  ],
  "SW3|SKL|1": [
    {
      "tripId": "SKL_1_SW3_1",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 8
    },
    {
      "tripId": "SKL_1_SW3_2",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 14
    },
    {
      "tripId": "SKL_1_SW3_3",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 20
    },
    {
      "tripId": "SKL_1_SW3_4",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 26
    },
    {
      "tripId": "SKL_1_SW3_5",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 32
    }
  ],
  "SW4|SKL|0": [
    {
      "tripId": "SKL_0_SW4_1",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 2
    },
    {
      "tripId": "SKL_0_SW4_2",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 8
    },
    {
      "tripId": "SKL_0_SW4_3",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 14
    },
    {
      "tripId": "SKL_0_SW4_4",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 20
    },
    {
      "tripId": "SKL_0_SW4_5",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 26
    }
  ],
  "SW4|SKL|1": [
    {
      "tripId": "SKL_1_SW4_1",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 6
    },
    {
      "tripId": "SKL_1_SW4_2",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 12
    },
    {
      "tripId": "SKL_1_SW4_3",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 18
    },
    {
      "tripId": "SKL_1_SW4_4",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 24
    },
    {
      "tripId": "SKL_1_SW4_5",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 30
    }
  ],
  "SW5|SKL|0": [
    {
      "tripId": "SKL_0_SW5_1",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 3
    },
    {
      "tripId": "SKL_0_SW5_2",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 9
    },
    {
      "tripId": "SKL_0_SW5_3",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 15
    },
    {
      "tripId": "SKL_0_SW5_4",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 21
    },
    {
      "tripId": "SKL_0_SW5_5",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 27
    }
  ],
  "SW5|SKL|1": [
    {
      "tripId": "SKL_1_SW5_1",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 4
    },
    {
      "tripId": "SKL_1_SW5_2",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 10
    },
    {
      "tripId": "SKL_1_SW5_3",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 16
    },
    {
      "tripId": "SKL_1_SW5_4",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 22
    },
    {
      "tripId": "SKL_1_SW5_5",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 28
    }
  ],
  "SW6|SKL|0": [
    {
      "tripId": "SKL_0_SW6_1",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 4
    },
    {
      "tripId": "SKL_0_SW6_2",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 10
    },
    {
      "tripId": "SKL_0_SW6_3",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 16
    },
    {
      "tripId": "SKL_0_SW6_4",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 22
    },
    {
      "tripId": "SKL_0_SW6_5",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 28
    }
  ],
  "SW6|SKL|1": [
    {
      "tripId": "SKL_1_SW6_1",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 6
    },
    {
      "tripId": "SKL_1_SW6_2",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 12
    },
    {
      "tripId": "SKL_1_SW6_3",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 18
    },
    {
      "tripId": "SKL_1_SW6_4",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 24
    },
    {
      "tripId": "SKL_1_SW6_5",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 30
    }
  ],
  "SW7|SKL|0": [
    {
      "tripId": "SKL_0_SW7_1",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 5
    },
    {
      "tripId": "SKL_0_SW7_2",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 11
    },
    {
      "tripId": "SKL_0_SW7_3",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 17
    },
    {
      "tripId": "SKL_0_SW7_4",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 23
    },
    {
      "tripId": "SKL_0_SW7_5",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 29
    }
  ],
  "SW7|SKL|1": [
    {
      "tripId": "SKL_1_SW7_1",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 8
    },
    {
      "tripId": "SKL_1_SW7_2",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 14
    },
    {
      "tripId": "SKL_1_SW7_3",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 20
    },
    {
      "tripId": "SKL_1_SW7_4",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 26
    },
    {
      "tripId": "SKL_1_SW7_5",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 32
    }
  ],
  "SW8|SKL|0": [
    {
      "tripId": "SKL_0_SW8_1",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 2
    },
    {
      "tripId": "SKL_0_SW8_2",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 8
    },
    {
      "tripId": "SKL_0_SW8_3",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 14
    },
    {
      "tripId": "SKL_0_SW8_4",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 20
    },
    {
      "tripId": "SKL_0_SW8_5",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 26
    }
  ],
  "SW8|SKL|1": [
    {
      "tripId": "SKL_1_SW8_1",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 6
    },
    {
      "tripId": "SKL_1_SW8_2",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 12
    },
    {
      "tripId": "SKL_1_SW8_3",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 18
    },
    {
      "tripId": "SKL_1_SW8_4",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 24
    },
    {
      "tripId": "SKL_1_SW8_5",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 30
    }
  ],
  "SE1|SKL|0": [
    {
      "tripId": "SKL_0_SE1_1",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 3
    },
    {
      "tripId": "SKL_0_SE1_2",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 9
    },
    {
      "tripId": "SKL_0_SE1_3",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 15
    },
    {
      "tripId": "SKL_0_SE1_4",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 21
    },
    {
      "tripId": "SKL_0_SE1_5",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 27
    }
  ],
  "SE1|SKL|1": [
    {
      "tripId": "SKL_1_SE1_1",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 6
    },
    {
      "tripId": "SKL_1_SE1_2",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 12
    },
    {
      "tripId": "SKL_1_SE1_3",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 18
    },
    {
      "tripId": "SKL_1_SE1_4",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 24
    },
    {
      "tripId": "SKL_1_SE1_5",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 30
    }
  ],
  "SE2|SKL|0": [
    {
      "tripId": "SKL_0_SE2_1",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 4
    },
    {
      "tripId": "SKL_0_SE2_2",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 10
    },
    {
      "tripId": "SKL_0_SE2_3",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 16
    },
    {
      "tripId": "SKL_0_SE2_4",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 22
    },
    {
      "tripId": "SKL_0_SE2_5",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 28
    }
  ],
  "SE2|SKL|1": [
    {
      "tripId": "SKL_1_SE2_1",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 8
    },
    {
      "tripId": "SKL_1_SE2_2",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 14
    },
    {
      "tripId": "SKL_1_SE2_3",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 20
    },
    {
      "tripId": "SKL_1_SE2_4",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 26
    },
    {
      "tripId": "SKL_1_SE2_5",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 32
    }
  ],
  "SE3|SKL|0": [
    {
      "tripId": "SKL_0_SE3_1",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 5
    },
    {
      "tripId": "SKL_0_SE3_2",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 11
    },
    {
      "tripId": "SKL_0_SE3_3",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 17
    },
    {
      "tripId": "SKL_0_SE3_4",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 23
    },
    {
      "tripId": "SKL_0_SE3_5",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 29
    }
  ],
  "SE3|SKL|1": [
    {
      "tripId": "SKL_1_SE3_1",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 6
    },
    {
      "tripId": "SKL_1_SE3_2",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 12
    },
    {
      "tripId": "SKL_1_SE3_3",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 18
    },
    {
      "tripId": "SKL_1_SE3_4",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 24
    },
    {
      "tripId": "SKL_1_SE3_5",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 30
    }
  ],
  "SE4|SKL|0": [
    {
      "tripId": "SKL_0_SE4_1",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 2
    },
    {
      "tripId": "SKL_0_SE4_2",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 8
    },
    {
      "tripId": "SKL_0_SE4_3",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 14
    },
    {
      "tripId": "SKL_0_SE4_4",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 20
    },
    {
      "tripId": "SKL_0_SE4_5",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 26
    }
  ],
  "SE4|SKL|1": [
    {
      "tripId": "SKL_1_SE4_1",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 4
    },
    {
      "tripId": "SKL_1_SE4_2",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 10
    },
    {
      "tripId": "SKL_1_SE4_3",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 16
    },
    {
      "tripId": "SKL_1_SE4_4",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 22
    },
    {
      "tripId": "SKL_1_SE4_5",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 28
    }
  ],
  "SE5|SKL|0": [
    {
      "tripId": "SKL_0_SE5_1",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 3
    },
    {
      "tripId": "SKL_0_SE5_2",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 9
    },
    {
      "tripId": "SKL_0_SE5_3",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 15
    },
    {
      "tripId": "SKL_0_SE5_4",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 21
    },
    {
      "tripId": "SKL_0_SE5_5",
      "line": "SKL",
      "direction": "0",
      "headsign": "Sengkang",
      "platform": "1",
      "offsetMinutes": 27
    }
  ],
  "SE5|SKL|1": [
    {
      "tripId": "SKL_1_SE5_1",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 6
    },
    {
      "tripId": "SKL_1_SE5_2",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 12
    },
    {
      "tripId": "SKL_1_SE5_3",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 18
    },
    {
      "tripId": "SKL_1_SE5_4",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 24
    },
    {
      "tripId": "SKL_1_SE5_5",
      "line": "SKL",
      "direction": "1",
      "headsign": "Ranggung",
      "platform": "2",
      "offsetMinutes": 30
    }
  ],
  "NE17|PGL|0": [
    {
      "tripId": "PGL_0_NE17_1",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 2
    },
    {
      "tripId": "PGL_0_NE17_2",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 8
    },
    {
      "tripId": "PGL_0_NE17_3",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 14
    },
    {
      "tripId": "PGL_0_NE17_4",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 20
    },
    {
      "tripId": "PGL_0_NE17_5",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 26
    }
  ],
  "NE17|PGL|1": [
    {
      "tripId": "PGL_1_NE17_1",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 6
    },
    {
      "tripId": "PGL_1_NE17_2",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 12
    },
    {
      "tripId": "PGL_1_NE17_3",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 18
    },
    {
      "tripId": "PGL_1_NE17_4",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 24
    },
    {
      "tripId": "PGL_1_NE17_5",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 30
    }
  ],
  "PE1|PGL|0": [
    {
      "tripId": "PGL_0_PE1_1",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 3
    },
    {
      "tripId": "PGL_0_PE1_2",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 9
    },
    {
      "tripId": "PGL_0_PE1_3",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 15
    },
    {
      "tripId": "PGL_0_PE1_4",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 21
    },
    {
      "tripId": "PGL_0_PE1_5",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 27
    }
  ],
  "PE1|PGL|1": [
    {
      "tripId": "PGL_1_PE1_1",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 6
    },
    {
      "tripId": "PGL_1_PE1_2",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 12
    },
    {
      "tripId": "PGL_1_PE1_3",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 18
    },
    {
      "tripId": "PGL_1_PE1_4",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 24
    },
    {
      "tripId": "PGL_1_PE1_5",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 30
    }
  ],
  "PE2|PGL|0": [
    {
      "tripId": "PGL_0_PE2_1",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 4
    },
    {
      "tripId": "PGL_0_PE2_2",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 10
    },
    {
      "tripId": "PGL_0_PE2_3",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 16
    },
    {
      "tripId": "PGL_0_PE2_4",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 22
    },
    {
      "tripId": "PGL_0_PE2_5",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 28
    }
  ],
  "PE2|PGL|1": [
    {
      "tripId": "PGL_1_PE2_1",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 8
    },
    {
      "tripId": "PGL_1_PE2_2",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 14
    },
    {
      "tripId": "PGL_1_PE2_3",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 20
    },
    {
      "tripId": "PGL_1_PE2_4",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 26
    },
    {
      "tripId": "PGL_1_PE2_5",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 32
    }
  ],
  "PE3|PGL|0": [
    {
      "tripId": "PGL_0_PE3_1",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 5
    },
    {
      "tripId": "PGL_0_PE3_2",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 11
    },
    {
      "tripId": "PGL_0_PE3_3",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 17
    },
    {
      "tripId": "PGL_0_PE3_4",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 23
    },
    {
      "tripId": "PGL_0_PE3_5",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 29
    }
  ],
  "PE3|PGL|1": [
    {
      "tripId": "PGL_1_PE3_1",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 6
    },
    {
      "tripId": "PGL_1_PE3_2",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 12
    },
    {
      "tripId": "PGL_1_PE3_3",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 18
    },
    {
      "tripId": "PGL_1_PE3_4",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 24
    },
    {
      "tripId": "PGL_1_PE3_5",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 30
    }
  ],
  "PE4|PGL|0": [
    {
      "tripId": "PGL_0_PE4_1",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 2
    },
    {
      "tripId": "PGL_0_PE4_2",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 8
    },
    {
      "tripId": "PGL_0_PE4_3",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 14
    },
    {
      "tripId": "PGL_0_PE4_4",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 20
    },
    {
      "tripId": "PGL_0_PE4_5",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 26
    }
  ],
  "PE4|PGL|1": [
    {
      "tripId": "PGL_1_PE4_1",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 4
    },
    {
      "tripId": "PGL_1_PE4_2",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 10
    },
    {
      "tripId": "PGL_1_PE4_3",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 16
    },
    {
      "tripId": "PGL_1_PE4_4",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 22
    },
    {
      "tripId": "PGL_1_PE4_5",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 28
    }
  ],
  "PE5|PGL|0": [
    {
      "tripId": "PGL_0_PE5_1",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 3
    },
    {
      "tripId": "PGL_0_PE5_2",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 9
    },
    {
      "tripId": "PGL_0_PE5_3",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 15
    },
    {
      "tripId": "PGL_0_PE5_4",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 21
    },
    {
      "tripId": "PGL_0_PE5_5",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 27
    }
  ],
  "PE5|PGL|1": [
    {
      "tripId": "PGL_1_PE5_1",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 6
    },
    {
      "tripId": "PGL_1_PE5_2",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 12
    },
    {
      "tripId": "PGL_1_PE5_3",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 18
    },
    {
      "tripId": "PGL_1_PE5_4",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 24
    },
    {
      "tripId": "PGL_1_PE5_5",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 30
    }
  ],
  "PE6|PGL|0": [
    {
      "tripId": "PGL_0_PE6_1",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 4
    },
    {
      "tripId": "PGL_0_PE6_2",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 10
    },
    {
      "tripId": "PGL_0_PE6_3",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 16
    },
    {
      "tripId": "PGL_0_PE6_4",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 22
    },
    {
      "tripId": "PGL_0_PE6_5",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 28
    }
  ],
  "PE6|PGL|1": [
    {
      "tripId": "PGL_1_PE6_1",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 8
    },
    {
      "tripId": "PGL_1_PE6_2",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 14
    },
    {
      "tripId": "PGL_1_PE6_3",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 20
    },
    {
      "tripId": "PGL_1_PE6_4",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 26
    },
    {
      "tripId": "PGL_1_PE6_5",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 32
    }
  ],
  "PE7|PGL|0": [
    {
      "tripId": "PGL_0_PE7_1",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 5
    },
    {
      "tripId": "PGL_0_PE7_2",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 11
    },
    {
      "tripId": "PGL_0_PE7_3",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 17
    },
    {
      "tripId": "PGL_0_PE7_4",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 23
    },
    {
      "tripId": "PGL_0_PE7_5",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 29
    }
  ],
  "PE7|PGL|1": [
    {
      "tripId": "PGL_1_PE7_1",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 6
    },
    {
      "tripId": "PGL_1_PE7_2",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 12
    },
    {
      "tripId": "PGL_1_PE7_3",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 18
    },
    {
      "tripId": "PGL_1_PE7_4",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 24
    },
    {
      "tripId": "PGL_1_PE7_5",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 30
    }
  ],
  "PW1|PGL|0": [
    {
      "tripId": "PGL_0_PW1_1",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 2
    },
    {
      "tripId": "PGL_0_PW1_2",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 8
    },
    {
      "tripId": "PGL_0_PW1_3",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 14
    },
    {
      "tripId": "PGL_0_PW1_4",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 20
    },
    {
      "tripId": "PGL_0_PW1_5",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 26
    }
  ],
  "PW1|PGL|1": [
    {
      "tripId": "PGL_1_PW1_1",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 3
    },
    {
      "tripId": "PGL_1_PW1_2",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 9
    },
    {
      "tripId": "PGL_1_PW1_3",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 15
    },
    {
      "tripId": "PGL_1_PW1_4",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 21
    },
    {
      "tripId": "PGL_1_PW1_5",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 27
    }
  ],
  "PW2|PGL|0": [
    {
      "tripId": "PGL_0_PW2_1",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 3
    },
    {
      "tripId": "PGL_0_PW2_2",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 9
    },
    {
      "tripId": "PGL_0_PW2_3",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 15
    },
    {
      "tripId": "PGL_0_PW2_4",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 21
    },
    {
      "tripId": "PGL_0_PW2_5",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 27
    }
  ],
  "PW2|PGL|1": [
    {
      "tripId": "PGL_1_PW2_1",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 5
    },
    {
      "tripId": "PGL_1_PW2_2",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 11
    },
    {
      "tripId": "PGL_1_PW2_3",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 17
    },
    {
      "tripId": "PGL_1_PW2_4",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 23
    },
    {
      "tripId": "PGL_1_PW2_5",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 29
    }
  ],
  "PW3|PGL|0": [
    {
      "tripId": "PGL_0_PW3_1",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 4
    },
    {
      "tripId": "PGL_0_PW3_2",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 10
    },
    {
      "tripId": "PGL_0_PW3_3",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 16
    },
    {
      "tripId": "PGL_0_PW3_4",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 22
    },
    {
      "tripId": "PGL_0_PW3_5",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 28
    }
  ],
  "PW3|PGL|1": [
    {
      "tripId": "PGL_1_PW3_1",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 7
    },
    {
      "tripId": "PGL_1_PW3_2",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 13
    },
    {
      "tripId": "PGL_1_PW3_3",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 19
    },
    {
      "tripId": "PGL_1_PW3_4",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 25
    },
    {
      "tripId": "PGL_1_PW3_5",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 31
    }
  ],
  "PW4|PGL|0": [
    {
      "tripId": "PGL_0_PW4_1",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 5
    },
    {
      "tripId": "PGL_0_PW4_2",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 11
    },
    {
      "tripId": "PGL_0_PW4_3",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 17
    },
    {
      "tripId": "PGL_0_PW4_4",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 23
    },
    {
      "tripId": "PGL_0_PW4_5",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 29
    }
  ],
  "PW4|PGL|1": [
    {
      "tripId": "PGL_1_PW4_1",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 9
    },
    {
      "tripId": "PGL_1_PW4_2",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 15
    },
    {
      "tripId": "PGL_1_PW4_3",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 21
    },
    {
      "tripId": "PGL_1_PW4_4",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 27
    },
    {
      "tripId": "PGL_1_PW4_5",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 33
    }
  ],
  "PW5|PGL|0": [
    {
      "tripId": "PGL_0_PW5_1",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 2
    },
    {
      "tripId": "PGL_0_PW5_2",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 8
    },
    {
      "tripId": "PGL_0_PW5_3",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 14
    },
    {
      "tripId": "PGL_0_PW5_4",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 20
    },
    {
      "tripId": "PGL_0_PW5_5",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 26
    }
  ],
  "PW5|PGL|1": [
    {
      "tripId": "PGL_1_PW5_1",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 3
    },
    {
      "tripId": "PGL_1_PW5_2",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 9
    },
    {
      "tripId": "PGL_1_PW5_3",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 15
    },
    {
      "tripId": "PGL_1_PW5_4",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 21
    },
    {
      "tripId": "PGL_1_PW5_5",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 27
    }
  ],
  "PW6|PGL|0": [
    {
      "tripId": "PGL_0_PW6_1",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 3
    },
    {
      "tripId": "PGL_0_PW6_2",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 9
    },
    {
      "tripId": "PGL_0_PW6_3",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 15
    },
    {
      "tripId": "PGL_0_PW6_4",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 21
    },
    {
      "tripId": "PGL_0_PW6_5",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 27
    }
  ],
  "PW6|PGL|1": [
    {
      "tripId": "PGL_1_PW6_1",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 5
    },
    {
      "tripId": "PGL_1_PW6_2",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 11
    },
    {
      "tripId": "PGL_1_PW6_3",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 17
    },
    {
      "tripId": "PGL_1_PW6_4",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 23
    },
    {
      "tripId": "PGL_1_PW6_5",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 29
    }
  ],
  "PW7|PGL|0": [
    {
      "tripId": "PGL_0_PW7_1",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 4
    },
    {
      "tripId": "PGL_0_PW7_2",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 10
    },
    {
      "tripId": "PGL_0_PW7_3",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 16
    },
    {
      "tripId": "PGL_0_PW7_4",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 22
    },
    {
      "tripId": "PGL_0_PW7_5",
      "line": "PGL",
      "direction": "0",
      "headsign": "Punggol",
      "platform": "1",
      "offsetMinutes": 28
    }
  ],
  "PW7|PGL|1": [
    {
      "tripId": "PGL_1_PW7_1",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 7
    },
    {
      "tripId": "PGL_1_PW7_2",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 13
    },
    {
      "tripId": "PGL_1_PW7_3",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 19
    },
    {
      "tripId": "PGL_1_PW7_4",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 25
    },
    {
      "tripId": "PGL_1_PW7_5",
      "line": "PGL",
      "direction": "1",
      "headsign": "Soo Teck",
      "platform": "2",
      "offsetMinutes": 31
    }
  ]
};
