import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		file: 'public/bundle.js',
		format: 'iife'
	},
	plugins: [
		svelte({
			// By default, all ".svelte" files are compiled
			// extensions: ['.my-custom-extension'],

			// You can restrict which files are compiled
			// using `include` and `exclude`
			include: 'src/components/**/*.svelte',

			// By default, the client-side compiler is used. You
			// can also use the server-side rendering compiler
			generate: 'ssr',

			// ensure that extra attributes are added to head
			// elements for hydration (used with generate: 'ssr')
			hydratable: true,

			// Optionally, preprocess components with svelte.preprocess:
			// https://svelte.dev/docs#svelte_preprocess
			// preprocess: {
			// 	style: ({ content }) => {
			// 		return transformStyles(content);
			// 	}
			// },

			// Emit CSS as "files" for other plugins to process
			emitCss: true,

			// You can optionally set 'customElement' to 'true' to compile
			// your components to custom elements (aka web elements)
			customElement: false,

			// Extract CSS into a single bundled file (recommended).
			// See note below
			css: css => {
				console.log(css.code); // the concatenated CSS
				console.log(css.map); // a sourcemap

				// creates `main.css` and `main.css.map`
				// using a falsy name will default to the bundle name
				// — pass `false` as the second argument if you don't want the sourcemap
				css.write('main.css');
			},

			// Warnings are normally passed straight to Rollup. You can
			// optionally handle them here, for example to squelch
			// warnings with a particular code
			onwarn: (warning, handler) => {
				// e.g. don't warn on <marquee> elements, cos they're cool
				if (warning.code === 'a11y-distracting-elements') return;

				// let Rollup handle all other warnings normally
				handler(warning);
			}
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		!production && livereload('public')
	],
	watch: {
		clearScreen: false
	}
};
