<script lang="ts">
  import { T } from "@threlte/core";
  import { TextureLoader } from "three";
  import { onMount } from "svelte";

  export let globeRadius: number;
  export const basePath = import.meta.env.MODE === "production" ? "" : "";

  let earthTexture: THREE.Texture | null = null;

  onMount(() => {
    const loader = new TextureLoader();
    loader.load(
      basePath + "/earth-night-max.jpg",
      (texture) => {
        earthTexture = texture; // Set the texture once it's loaded
      },
      undefined, // Progress function (optional)
      (error) => {
        console.error("Texture loading failed", error);
      },
    );
  });
</script>

<T.Mesh>
  <T.SphereGeometry args={[globeRadius, 64, 64]} />
  {#if earthTexture}
    <T.MeshStandardMaterial
      map={earthTexture}
      roughness={0.5}
      metalness={0.1}
    />
  {:else}
    <T.MeshStandardMaterial roughness={0.5} metalness={0.1} />
  {/if}
</T.Mesh>
