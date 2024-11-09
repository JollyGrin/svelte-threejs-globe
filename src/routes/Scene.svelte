<script lang="ts">
  import Camera from "./Camera.svelte";
  import Lights from "./Lights.svelte";
  import Earth from "./Earth.svelte";
  import Dot from "./Dot.svelte";
  let globeRadius: number = 5;

  const locations = [
    { lat: 40.7128, lon: -74.006 }, // New York
    { lat: 51.5074, lon: -0.1278 }, // London
  ];
</script>

<Lights />
<Camera />
<Earth bind:globeRadius />

{#each locations as location}
  <Dot {location} />
{/each}
