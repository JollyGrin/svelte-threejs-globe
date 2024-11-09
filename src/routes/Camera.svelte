<script lang="ts">
  import { T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
</script>

<T.PerspectiveCamera makeDefault position={[0, 10, 15]} fov={45}>
  <OrbitControls
    autoRotate={true}
    enableZoom={true}
    enableDamping
    autoRotateSpeed={0.5}
  />
</T.PerspectiveCamera>
