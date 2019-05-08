import base from './rollup.config.base'
import { terser } from 'rollup-plugin-terser'

const config = Object.assign({}, base, {
	// exports: 'named',
	output: {
		file: 'dist/vue-googlemaps.min.js',
		format: 'iife',
		name: 'VueGoogleMaps',
		exports: 'named',
	},
})

config.plugins.push(terser())

export default config
