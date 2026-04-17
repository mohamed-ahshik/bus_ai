import React from "react";
import { SvgXml } from "react-native-svg";

const DEFAULT_FILL = "#1a1a1a";

/** Matches `assets/bus-double-decker.svg` (double-deck bus). */
const BUS_DOUBLE_DECKER_XML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${DEFAULT_FILL}" d="M3,4C1.89,4 1,4.89 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V14C23,12.89 22.11,12 21,12H19V9.5H23V6C23,4.89 22.11,4 21,4H3M2.5,5.5H6.5V8H2.5V5.5M8,5.5H12V8H8V5.5M13.5,5.5H17.5V8H13.5V5.5M19,5.5H21.5V8H19V5.5M13.5,9.5H17.5V12H13.5V9.5M2.5,9.5H6.5V12H2.5V9.5M8,9.5H12V12H8V9.5M6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5M18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5Z" /></svg>`;

/** Matches `assets/bus-side.svg` (single-deck / side profile). */
const BUS_SIDE_XML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${DEFAULT_FILL}" d="M3,6C1.89,6 1,6.89 1,8V15H3A3,3 0 0,0 6,18A3,3 0 0,0 9,15H15A3,3 0 0,0 18,18A3,3 0 0,0 21,15H23V8C23,6.89 22.11,6 21,6H3M2.5,7.5H6.5V10H2.5V7.5M8,7.5H12V10H8V7.5M13.5,7.5H17.5V10H13.5V7.5M19,7.5H21.5V13L19,11V7.5M6,13.5A1.5,1.5 0 0,1 7.5,15A1.5,1.5 0 0,1 6,16.5A1.5,1.5 0 0,1 4.5,15A1.5,1.5 0 0,1 6,13.5M18,13.5A1.5,1.5 0 0,1 19.5,15A1.5,1.5 0 0,1 18,16.5A1.5,1.5 0 0,1 16.5,15A1.5,1.5 0 0,1 18,13.5Z" /></svg>`;

export function BusDeckSvg({
  isDoubleDeck,
  width,
  height,
  fillColor = DEFAULT_FILL,
}: {
  isDoubleDeck: boolean;
  width: number;
  height: number;
  /** Path fill; pass theme `colors.fg` on dark surfaces. */
  fillColor?: string;
}) {
  const raw = isDoubleDeck ? BUS_DOUBLE_DECKER_XML : BUS_SIDE_XML;
  const xml = fillColor === DEFAULT_FILL ? raw : raw.replaceAll(DEFAULT_FILL, fillColor);
  return <SvgXml xml={xml} width={width} height={height} />;
}
