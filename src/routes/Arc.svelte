<script lang="ts">
  import { latLongToVector3 } from "$lib/helpers/latlong";
  import { CatmullRomCurve3, Mesh, Vector3 } from "three";
  import { T } from "@threlte/core";
  import { onMount } from "svelte";

  export let startLoc: { lat: number; lon: number } = { lat: 0, lon: 0 };
  export let endLoc: { lat: number; lon: number } = { lat: 0, lon: 0 };

  const start = latLongToVector3(startLoc.lat, startLoc.lon, 5);
  const end = latLongToVector3(endLoc.lat, endLoc.lon, 5);

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

<T.Mesh position.x={pos.x} position.y={pos.y} position.z={pos.z}>
  <T.SphereGeometry args={[0.025]} />
  <T.MeshBasicMaterial color="teal" />
</T.Mesh>
<T.PointLight
  color="teal"
  intensity={2}
  distance={1}
  position.x={pos.x}
  position.y={pos.y}
  position.z={pos.z}
/>

<T.Mesh>
  <T.TubeGeometry args={[curve, 124, 0.01]} />
  <T.MeshBasicMaterial color="white" transparent={true} opacity={0.05} />
</T.Mesh>
