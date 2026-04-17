import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import type { ViewStyle } from "react-native";
import MapView, { Marker, Polyline, Circle } from "react-native-maps";
import type { ReactNode } from "react";
import { SvgXml } from "react-native-svg";
import { MAP_PROVIDER } from "../lib/mapConfig";
import { mapPinSvgXml } from "../lib/mapPinSvg";

export type LatLng = { latitude: number; longitude: number };
export type Region = LatLng & { latitudeDelta: number; longitudeDelta: number };

export type GoogleMapImperativeHandle = {
  animateToRegion: (region: Region, duration?: number) => void;
};

export type MapMarker = {
  id: string;
  coordinate: LatLng;
  title?: string;
  description?: string;
  pinColor?: string;
  children?: ReactNode;
  onPress?: () => void;
};

export type MapPolyline = {
  coordinates: LatLng[];
  strokeColor?: string;
  strokeWidth?: number;
  lineDashPattern?: number[];
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
  fitCoordinates?: LatLng[];
  fitPadding?: { top: number; right: number; bottom: number; left: number };
};

const GoogleMap = forwardRef<GoogleMapImperativeHandle, Props>(function GoogleMap(
  {
    style,
    region,
    initialRegion,
    markers = [],
    polylines = [],
    circles = [],
    showsUserLocation = false,
    showsMyLocationButton = false,
    fitCoordinates,
    fitPadding = { top: 80, right: 40, bottom: 320, left: 40 },
  },
  ref
) {
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef<MapView>(null);

  useImperativeHandle(
    ref,
    () => ({
      animateToRegion: (r: Region, duration = 300) => {
        mapRef.current?.animateToRegion(r, duration);
      },
    }),
    []
  );

  const handleMapReady = useCallback(() => {
    setMapReady(true);
  }, []);

  // Fit viewport whenever the map becomes ready OR the target coordinates change.
  // Using useEffect keeps this logic centralised and avoids double-firing on mount
  // (handleMapReady sets mapReady=true → effect fires once with the correct coords).
  useEffect(() => {
    if (!mapReady || !fitCoordinates || fitCoordinates.length < 2) return;
    const timer = setTimeout(() => {
      mapRef.current?.fitToCoordinates(fitCoordinates, {
        edgePadding: fitPadding,
        animated: true,
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [mapReady, fitCoordinates, fitPadding]);

  return (
    <MapView
      ref={mapRef}
      style={style}
      initialRegion={region ?? initialRegion}
      region={mapReady ? region : undefined}
      provider={MAP_PROVIDER}
      mapType="standard"
      showsUserLocation={showsUserLocation}
      showsMyLocationButton={showsMyLocationButton}
      onMapReady={handleMapReady}
    >
      {markers.map((m) => (
        <Marker
          key={m.id}
          coordinate={m.coordinate}
          title={m.title}
          description={m.description}
          anchor={
            m.children ? undefined : m.pinColor ? { x: 0.5, y: 1 } : undefined
          }
          onPress={m.onPress}
        >
          {m.children ??
            (m.pinColor ? (
              <SvgXml xml={mapPinSvgXml(m.pinColor)} width={34} height={34} />
            ) : null)}
        </Marker>
      ))}
      {polylines.map((p, i) => (
        <Polyline
          key={`pl-${i}`}
          coordinates={p.coordinates}
          strokeColor={p.strokeColor}
          strokeWidth={p.strokeWidth}
          lineDashPattern={p.lineDashPattern}
        />
      ))}
      {circles.map((c, i) => (
        <Circle
          key={`ci-${i}`}
          center={c.center}
          radius={c.radius}
          fillColor={c.fillColor}
          strokeColor={c.strokeColor}
          strokeWidth={c.strokeWidth}
        />
      ))}
    </MapView>
  );
});

export default GoogleMap;
