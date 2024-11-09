<script lang="ts">
  import { T } from "@threlte/core";

  import { latLongToVector3 } from "$lib/helpers/latlong";
  let globeRadius: number = 5;

  // Single test location (New York)
  export let location: { lat: number; lon: number } = {
    lat: 40.7128,
    lon: -74.006,
  };

  // Convert location to a position vector
  const { x, y, z } = latLongToVector3(location.lat, location.lon, globeRadius);
</script>

<T.Mesh position.x={x} position.y={y} position.z={z}>
  <T.SphereGeometry args={[0.05, 24, 24]} />
  <T.MeshStandardMaterial color="teal" emissive="teal" emissiveIntensity={1} />
</T.Mesh>

<T.PointLight
  color="teal"
  intensity={2}
  distance={1}
  position.x={x}
  position.y={y}
  position.z={z}
/>
