import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import cjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import fs from 'fs'
import CleanCSS from 'clean-css'

const config = require('../package.json')

export default {
	input: 'src/index.js',
	plugins: [
		resolve({
			mainFields: ['jsnext:module', 'jsnext:main'],
		}),
		cjs({
			namedExports: {
				'node_modules/vue-resize/dist/vue-resize.umd.js': [ 'ResizeObserver' ],
				'node_modules/vue-observe-visibility/dist/vue-observe-visibility.umd.js': [ 'ObserveVisibility' ],
			},
		}),
		vue({
			css (style) {
				fs.writeFileSync('dist/vue-googlemaps.css', new CleanCSS().minify(style).styles)
			},
		}),
		babel({
			babelrc: false,
		}),
		replace({
			VERSION: JSON.stringify(config.version),
		}),
	],
	watch: {
		include: 'src/**',
	},
}
