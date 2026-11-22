import type { MapStyleElement } from "react-native-maps";

/** Neutral dark basemap that matches the app's dark theme. */
export const DARK_MAP_STYLE: MapStyleElement[] = [
  { elementType: "geometry", stylers: [{ color: "#202622" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#c0c9c0" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#202622" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#3d453e" }],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d6ded6" }],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d6ded6" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#a9b3aa" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#1a2e21" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#7f9c86" }],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#343b35" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#c0c9c0" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#3d453e" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#49524a" }],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [{ color: "#59655b" }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ color: "#a7b1a8" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [{ color: "#c0c9c0" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0f1f2a" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#4c6878" }],
  },
];

/** Existing light treatment: keep POI clutter down without recolouring the map. */
export const LIGHT_MAP_STYLE: MapStyleElement[] = [
  { featureType: "poi", stylers: [{ visibility: "simplified" }] },
];
