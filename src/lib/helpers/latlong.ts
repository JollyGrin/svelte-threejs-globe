import { Vector3 } from "three";

// Convert latitude/longitude to 3D position on the globe's surface
export function latLongToVector3(
  lat: number,
  lon: number,
  radius: number = 1,
): Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}
