import { $, Glob } from 'bun';
import pkg from '../package.json';

await $`rm -rf dist`;
await $`cp ../../README.md ../../LICENSE .`;
const files = new Glob('./src/**/*.{ts,tsx}').scan();
for await (const file of files) {
	await Bun.build({
		format: 'esm',
		outdir: 'dist/esm',
		external: ['*'],
		root: 'src',
		entrypoints: [file],
	});
}
await Bun.build({
	format: 'esm',
	outdir: 'dist/esm',
	external: [
		...Object.keys(pkg.dependencies),
		...Object.keys(pkg.peerDependencies),
	],
	root: 'src',
	entrypoints: ['./src/ui/base.tsx'],
});
await $`bun run --silent typegen`;
await $`tsc --outDir dist/types --declaration --emitDeclarationOnly --declarationMap`;
