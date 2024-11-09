export const prerender = true;

export function load() {
	const basePath =
		import.meta.env.MODE === 'production' ? '/svelte-threejs-globe' : '';
	return { basePath };
}
