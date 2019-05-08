import base from './rollup.config.base'

const config = Object.assign({}, base, {
	output: {
		file: 'dist/vue-googlemaps.umd.js',
		format: 'umd',
		exports: 'named',
		name: 'VueGoogleMaps',
	},
})

export default config
