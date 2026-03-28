import React from "react";
import { Iconify } from "react-native-iconify";

interface IconProps {
  icon: string;
  size?: number;
  color?: string;
  className?: string;
}

/**
 * Wrapper around react-native-iconify using the Solar icon set.
 * icon: e.g. "solar:compass-bold" or "solar:bus-bold"
 */
export function Icon({ icon, size = 24, color = "currentColor", className }: IconProps) {
  return <Iconify icon={icon} size={size} color={color} />;
}
