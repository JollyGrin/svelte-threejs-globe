<script lang="ts">
	import { T } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { TextureLoader, Vector3 } from 'three';

	const basePath = import.meta.env.MODE === 'production' ? '/svelte-threejs-globe' : '';

	// Load Earth texture
	const earthTexture = new TextureLoader().load(basePath + '/earth-night-max.jpg'); // Replace with your texture path

	// Radius of the globe
	const globeRadius = 5;

	// Single test location (New York)
	const testLocation = { lat: 40.7128, lon: -74.006 };

	// Convert latitude/longitude to 3D position on the globe's surface
	function latLongToVector3(lat: number, lon: number, radius: number = 1): Vector3 {
		const phi = (90 - lat) * (Math.PI / 180);
		const theta = (lon + 180) * (Math.PI / 180);

		return new Vector3(
			-radius * Math.sin(phi) * Math.cos(theta),
			radius * Math.cos(phi),
			radius * Math.sin(phi) * Math.sin(theta)
		);
	}

	// Convert testLocation to a position vector
	const testPosition = latLongToVector3(testLocation.lat, testLocation.lon, globeRadius);
	const pos = {
		x: testPosition.x,
		y: testPosition.y,
		z: testPosition.z
	};
	console.log({ testPosition, pos });
</script>

<T.AmbientLight intensity={1} />
<!-- Camera -->
<T.PerspectiveCamera makeDefault position={[0, 10, 15]} fov={45}>
	<OrbitControls autoRotate enableZoom={true} enableDamping autoRotateSpeed={0.5} />
</T.PerspectiveCamera>

<!-- Debug Directional Light -->
<T.DirectionalLight intensity={0.3} position={[5, 10, 5]} color="white" />

<T.Mesh>
	<T.SphereGeometry args={[globeRadius, 64, 64]} />
	<T.MeshStandardMaterial map={earthTexture} roughness={0.5} metalness={0.1} />
</T.Mesh>

<T.Mesh position.x={pos.x} position.y={pos.y} position.z={pos.z}>
	<T.SphereGeometry args={[0.2, 24, 24]} />
	<T.MeshStandardMaterial color="blue" emissive="blue" emissiveIntensity={1} />
</T.Mesh>

<!-- Single Test PointLight at New York position -->
<T.PointLight color="blue" intensity={500} distance={3} position={testPosition} />

<!-- Small marker sphere for light position visibility -->
<T.Mesh position={testPosition}>
	<T.SphereGeometry args={[0.2, 16, 16]} />
	<T.MeshStandardMaterial color="blue" emissive="blue" emissiveIntensity={1} />
</T.Mesh>

<!-- Ambient Light for Additional Illumination -->
<T.AmbientLight intensity={0.1} />
