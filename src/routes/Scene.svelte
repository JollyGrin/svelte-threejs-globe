<script lang="ts">
  import Camera from "./Camera.svelte";
  import Lights from "./Lights.svelte";
  import Earth from "./Earth.svelte";
  import Dot from "./Dot.svelte";
  import { latLongToVector3 } from "$lib/helpers/latlong";
  import { CatmullRomCurve3, Mesh, Vector3 } from "three";
  import { T } from "@threlte/core";
  import { onMount } from "svelte";
  import Arc from "./Arc.svelte";
  let globeRadius: number = 5;

  const locations = [
    { lat: 52.3676, lon: 4.9041 }, // Amsterdam
    { lat: 35.6762, lon: 139.6503 }, // Tokyo
    { lat: 30.2672, lon: -97.7431 }, // Austin
    { lat: 51.5074, lon: -0.1278 }, // London
    { lat: 40.7128, lon: -74.006 }, // New York
    { lat: 34.0522, lon: -118.2437 }, // Los Angeles
    { lat: 39.9042, lon: 116.4074 }, // Beijing
    { lat: -33.8688, lon: 151.2093 }, // Sydney
    { lat: 40.7306, lon: -73.9352 }, // Brooklyn
    { lat: 55.7558, lon: 37.6173 }, // Moscow
    { lat: 41.9028, lon: 12.4964 }, // Rome
    { lat: -34.6037, lon: -58.3816 }, // Buenos Aires
    { lat: 22.3964, lon: 114.1095 }, // Hong Kong
    { lat: 40.7306, lon: -73.9352 }, // Chicago
    { lat: 19.4326, lon: -99.1332 }, // Mexico City
    { lat: 37.7749, lon: -122.4194 }, // San Francisco
    { lat: 43.6532, lon: -79.3832 }, // Toronto
    { lat: 34.0522, lon: -118.2437 }, // Los Angeles
  ];

  const start = latLongToVector3(locations[0].lat, locations[0].lon, 5);
  const end = latLongToVector3(locations[1].lat, locations[1].lon, 5);
  // const controlPoint = new Vector3(
  //   (start.x + end.x) / 2,
  //   (start.y + end.y) / 2 + 2.5, // Add some height to make the arc curve
  //   (start.z + end.z) / 2,
  // );

  const controlPoints = [
    new Vector3(
      start.x + (end.x - start.x) * 0.25, // Closer to start
      start.y + Math.max((end.y - start.y) * 1.25, 2), // Slightly elevated
      start.z + (end.z - start.z) * 0.25,
    ),
    new Vector3(
      end.x - (end.x - start.x) * 0.25, // Closer to end
      end.y + Math.max((end.y - start.y) * 1.25, 3), // Elevated similarly to create symmetry
      end.z - (end.z - start.z) * 0.25,
    ),
  ];

  const curve = new CatmullRomCurve3([start, ...controlPoints, end]);
  curve.closed = false;

  let pos: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 }; // Initialize mesh variable
  let t = 0; // Parameter for interpolation along the curve
  let speed = 0.005; // Adjust the speed of the animation

  // Animation function to update position along the curve
  const animate = () => {
    t += speed; // Increase 't' to move along the curve
    if (t > 1) t = 0; // Reset to the start when reaching the end
    const position = curve.getPointAt(t); // Get point at 't' along the curve
    console.log({ position });
    if (pos) pos.x = position.x; // Update mesh position
    if (pos) pos.y = position.y; // Update mesh position
    if (pos) pos.z = position.z; // Update mesh position
    requestAnimationFrame(animate); // Call the animate function recursively
  };

  onMount(() => {
    animate(); // Start animation when the component mounts
  });
</script>

<Lights />
<Camera />
<Earth bind:globeRadius />

{#each locations as location}
  <Dot {location} />
{/each}

{#each locations as location, i}
  <Arc startLoc={locations[i]} endLoc={locations[i + 1]} />
{/each}

<!-- <T.Mesh position.x={pos.x} position.y={pos.y} position.z={pos.z}> -->
<!--   <T.SphereGeometry args={[0.025]} /> -->
<!--   <T.MeshBasicMaterial color="teal" /> -->
<!-- </T.Mesh> -->
<!-- <T.PointLight -->
<!--   color="teal" -->
<!--   intensity={2} -->
<!--   distance={1} -->
<!--   position.x={pos.x} -->
<!--   position.y={pos.y} -->
<!--   position.z={pos.z} -->
<!-- /> -->

<!-- <T.Mesh> -->
<!--   <T.TubeGeometry args={[curve, 124, 0.01]} /> -->
<!--   <T.MeshBasicMaterial color="white" transparent={true} opacity={0.05} /> -->
<!-- </T.Mesh> -->
