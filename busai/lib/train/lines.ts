import type { TrainLineCode } from "./types";

export type MrtLineInfo = {
  code: TrainLineCode;
  name: string;
  color: string;
  matchKeys: string[];
};

export const TRAIN_LINES: MrtLineInfo[] = [
  {
    code: "NSL",
    name: "North-South Line",
    color: "#D42E12",
    matchKeys: ["nsl", "north-south", "north south", "red"],
  },
  {
    code: "EWL",
    name: "East-West Line",
    color: "#009530",
    matchKeys: ["ewl", "east-west", "east west", "green"],
  },
  {
    code: "NEL",
    name: "North East Line",
    color: "#9900AA",
    matchKeys: ["nel", "north east", "north-east", "purple"],
  },
  {
    code: "CCL",
    name: "Circle Line",
    color: "#FA9E0D",
    matchKeys: ["ccl", "circle", "orange", "yellow"],
  },
  {
    code: "DTL",
    name: "Downtown Line",
    color: "#005EC4",
    matchKeys: ["dtl", "downtown", "blue"],
  },
  {
    code: "TEL",
    name: "Thomson-East Coast Line",
    color: "#9D5B25",
    matchKeys: ["tel", "thomson", "brown"],
  },
  {
    code: "BPL",
    name: "Bukit Panjang LRT",
    color: "#748577",
    matchKeys: ["bpl", "bukit panjang", "bp lrt"],
  },
  {
    code: "SKL",
    name: "Sengkang LRT",
    color: "#748577",
    matchKeys: ["skl", "sengkang", "sk lrt"],
  },
  {
    code: "PGL",
    name: "Punggol LRT",
    color: "#748577",
    matchKeys: ["pgl", "punggol", "pg lrt"],
  },
];

export const LINE_META = Object.fromEntries(
  TRAIN_LINES.map((line) => [line.code, line]),
) as Record<TrainLineCode, MrtLineInfo>;

export const LRT_LINES: TrainLineCode[] = ["BPL", "SKL", "PGL"];
