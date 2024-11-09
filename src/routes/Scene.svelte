<script lang="ts">
  import Camera from "./Camera.svelte";
  import Lights from "./Lights.svelte";
  import Earth from "./Earth.svelte";
  import Dot from "./Dot.svelte";
  import { latLongToVector3 } from "$lib/helpers/latlong";
  import { CatmullRomCurve3, Vector3 } from "three";
  import { T } from "@threlte/core";
  let globeRadius: number = 5;

  const locations = [
    { lat: 40.7128, lon: -74.006 }, // New York
    { lat: 51.5074, lon: -0.1278 }, // London
    { lat: 48.8566, lon: 2.3522 }, // Paris
    { lat: 34.0522, lon: -118.2437 }, // Los Angeles
    { lat: 35.6762, lon: 139.6503 }, // Tokyo
    { lat: 39.9042, lon: 116.4074 }, // Beijing
    { lat: -33.8688, lon: 151.2093 }, // Sydney
    { lat: 40.7306, lon: -73.9352 }, // Brooklyn
    { lat: 55.7558, lon: 37.6173 }, // Moscow
    { lat: 48.2082, lon: 16.3738 }, // Vienna
    { lat: 41.9028, lon: 12.4964 }, // Rome
    { lat: 52.52, lon: 13.405 }, // Berlin
    { lat: -34.6037, lon: -58.3816 }, // Buenos Aires
    { lat: 22.3964, lon: 114.1095 }, // Hong Kong
    { lat: 40.7306, lon: -73.9352 }, // Chicago
    { lat: 19.4326, lon: -99.1332 }, // Mexico City
    { lat: 37.7749, lon: -122.4194 }, // San Francisco
    { lat: 43.6532, lon: -79.3832 }, // Toronto
    { lat: 34.0522, lon: -118.2437 }, // Los Angeles
    { lat: 37.9838, lon: 23.7275 }, // Athens
  ];

  const start = latLongToVector3(locations[0].lat, locations[0].lon, 5);
  const end = latLongToVector3(locations[1].lat, locations[1].lon, 5);
  const controlPoint = new Vector3(
    (start.x + end.x) / 2,
    (start.y + end.y) / 2 + 1, // Add some height to make the arc curve
    (start.z + end.z) / 2,
  );
  const curve = new CatmullRomCurve3([start, controlPoint, end]);
  curve.closed = false;
</script>

<Lights />
<Camera />
<Earth bind:globeRadius />

{#each locations as location}
  <Dot {location} />
{/each}

<T.Mesh>
  <T.TubeGeometry args={[curve, 124, 0.01]} />
  <T.MeshBasicMaterial color="white" />
</T.Mesh>
