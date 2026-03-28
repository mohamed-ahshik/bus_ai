import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, type ViewStyle } from "react-native";
import { GOOGLE_MAPS_API_KEY } from "../lib/mapConfig";

export type LatLng = { latitude: number; longitude: number };
export type Region = LatLng & { latitudeDelta: number; longitudeDelta: number };

export type MapMarker = {
  id: string;
  coordinate: LatLng;
  title?: string;
  description?: string;
  pinColor?: string;
  onPress?: () => void;
};

export type MapPolyline = {
  coordinates: LatLng[];
  strokeColor?: string;
  strokeWidth?: number;
};

export type MapCircleData = {
  center: LatLng;
  radius: number;
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
};

type Props = {
  style?: ViewStyle;
  region?: Region;
  initialRegion?: Region;
  markers?: MapMarker[];
  polylines?: MapPolyline[];
  circles?: MapCircleData[];
  showsUserLocation?: boolean;
  showsMyLocationButton?: boolean;
};

let scriptLoaded = false;
let scriptLoading = false;
const loadCallbacks: (() => void)[] = [];

function loadGoogleMapsScript(): Promise<void> {
  if (scriptLoaded) return Promise.resolve();
  return new Promise((resolve) => {
    loadCallbacks.push(resolve);
    if (scriptLoading) return;
    scriptLoading = true;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=marker`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      scriptLoaded = true;
      loadCallbacks.forEach((cb) => cb());
      loadCallbacks.length = 0;
    };
    document.head.appendChild(script);
  });
}

function toGLatLng(c: LatLng) {
  return { lat: c.latitude, lng: c.longitude };
}

export default function GoogleMap({
  style,
  region,
  initialRegion,
  markers = [],
  polylines = [],
  circles = [],
  showsUserLocation = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const overlaysRef = useRef<(google.maps.Marker | google.maps.Polyline | google.maps.Circle)[]>([]);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const [ready, setReady] = useState(scriptLoaded);

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY) return;
    loadGoogleMapsScript().then(() => setReady(true));
  }, []);

  const r = region ?? initialRegion;

  const initMap = useCallback(() => {
    if (!ready || !containerRef.current || !r) return;
    if (mapRef.current) return;

    mapRef.current = new google.maps.Map(containerRef.current, {
      center: toGLatLng(r),
      zoom: Math.round(Math.log2(360 / (r.longitudeDelta || 0.01)) + 1),
      disableDefaultUI: true,
      zoomControl: true,
      gestureHandling: "greedy",
      styles: [
        { featureType: "poi", stylers: [{ visibility: "simplified" }] },
      ],
    });
  }, [ready, r]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  // Sync region
  useEffect(() => {
    if (!mapRef.current || !region) return;
    mapRef.current.panTo(toGLatLng(region));
  }, [region?.latitude, region?.longitude]);

  // Sync markers, polylines, circles
  useEffect(() => {
    if (!mapRef.current) return;
    overlaysRef.current.forEach((o) => o.setMap(null));
    overlaysRef.current = [];

    markers.forEach((m) => {
      const gm = new google.maps.Marker({
        position: toGLatLng(m.coordinate),
        map: mapRef.current!,
        title: m.title,
        ...(m.pinColor
          ? {
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: m.pinColor,
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
                scale: 8,
              },
            }
          : {}),
      });
      if (m.onPress) gm.addListener("click", m.onPress);
      overlaysRef.current.push(gm);
    });

    polylines.forEach((p) => {
      const gp = new google.maps.Polyline({
        path: p.coordinates.map(toGLatLng),
        strokeColor: p.strokeColor ?? "#2e7d32",
        strokeWeight: p.strokeWidth ?? 4,
        map: mapRef.current!,
      });
      overlaysRef.current.push(gp);
    });

    circles.forEach((c) => {
      const gc = new google.maps.Circle({
        center: toGLatLng(c.center),
        radius: c.radius,
        fillColor: c.fillColor ?? "rgba(59,130,246,0.13)",
        strokeColor: c.strokeColor ?? "rgba(59,130,246,0.4)",
        strokeWeight: c.strokeWidth ?? 2,
        map: mapRef.current!,
      });
      overlaysRef.current.push(gc);
    });
  }, [ready, markers, polylines, circles]);

  // User location
  useEffect(() => {
    if (!mapRef.current || !showsUserLocation) return;
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        if (userMarkerRef.current) {
          userMarkerRef.current.setPosition(loc);
        } else {
          userMarkerRef.current = new google.maps.Marker({
            position: loc,
            map: mapRef.current!,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 3,
              scale: 8,
            },
            title: "You are here",
            zIndex: 999,
          });
        }
      },
      undefined,
      { enableHighAccuracy: true }
    );
    return () => {
      userMarkerRef.current?.setMap(null);
      userMarkerRef.current = null;
    };
  }, [ready, showsUserLocation]);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <View style={[{ backgroundColor: "#e0e0e0", alignItems: "center", justifyContent: "center" }, style]}>
      </View>
    );
  }

  return (
    <View style={style}>
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%", borderRadius: "inherit" }}
      />
    </View>
  );
}
