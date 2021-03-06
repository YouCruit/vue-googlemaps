const ASSERT_DELAY = 50
const ASSERT_TIMEOUT = 30000

const loader = {
	loaded: false,
	readyPromises: [],
	assertRetries: Math.floor(ASSERT_TIMEOUT / ASSERT_DELAY),

	/**
	 * @param apiKey    API Key, or object with the URL parameters. For example
	 *                  to use Google Maps Premium API, pass
	 *                    `{ client: <YOUR-CLIENT-ID> }`.
	 *                  You may pass the libraries and/or version (as `v`) parameter into
	 *                  this parameter and skip the next two parameters
	 * @param version   Google for Maps version
	 * @param libraries Libraries to load (@see
	 *                  https://developers.google.com/maps/documentation/javascript/libraries)
	 * @param loadCn    Boolean. If set to true, the map will be loaded form goole maps China
	 *                  (@see https://developers.google.com/maps/documentation/javascript/basics#GoogleMapsChina)
	 */
	load (options = { externalGoogleMaps: true }) {
		if (typeof window === 'undefined') {
			// Do nothing if run from server-side
			return Promise.resolve()
		}
		if (!this.loaded && (!window.google || !window.google.maps)) {
			if (options.externalGoogleMaps) {
				this._assertGoogleMapsLoaded()
			} else {
				const { apiKey, version, libraries, loadCn } = options
				const useNewFeatures = options.useNewFeatures || true
				this._loadScript(apiKey, version, libraries, loadCn, useNewFeatures)
			}
		} else {
			console.info('The Google Maps library is already loaded')
			this._setLoaded()
		}
	},

	_assertGoogleMapsLoaded() {
		if (window.google && window.google.maps) {
			this._setLoaded()
		} else if (this.assertRetries > 0) {
			this.assertRetries--
			window.setTimeout(this._assertGoogleMapsLoaded.bind(this), ASSERT_DELAY)
		} else {
			this._assertFailed()
		}
	},

	_loadScript(apiKey, version, libraries, loadCn, useNewFeatures) {
		const googleMapScript = document.createElement('SCRIPT')

		// Allow apiKey to be an object.
		// This is to support more esoteric means of loading Google Maps,
		// such as Google for business
		// https://developers.google.com/maps/documentation/javascript/get-api-key#premium-auth
		var options = {}
		if (typeof apiKey === 'string') {
			options.key = apiKey
		} else if (typeof apiKey === 'object') {
			for (let k in apiKey) { // transfer values in apiKey to options
				options[k] = apiKey[k]
			}
		} else {
			throw new Error('`apiKey` should either be a string or an object')
		}

		// libraries
		let librariesPath = ''
		if (libraries && libraries.length > 0) {
			librariesPath = libraries.join(',')
			options['libraries'] = librariesPath
		} else if (Array.prototype.isPrototypeOf(options.libraries)) {
			options.libraries = options.libraries.join(',')
		}
		options['callback'] = 'VueGoogleMapsLoaded'

		const baseUrl = (typeof loadCn === 'boolean' && loadCn === true)
			? 'http://maps.google.cn'
			: 'https://maps.googleapis.com'

		const urlParams = Object.keys(options)
			.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
			.join('&')

		let url = `${baseUrl}/maps/api/js?${urlParams}`

		// Override version if they do not want to use the new renderer/base map
		if (!useNewFeatures) {
			version = '3.31'
		}

		if (version) {
			url = `${url}&v=${version}`
		}

		googleMapScript.setAttribute('src', url)
		googleMapScript.setAttribute('async', '')
		googleMapScript.setAttribute('defer', '')
		document.body.appendChild(googleMapScript)

		window.VueGoogleMapsLoaded = this._setLoaded.bind(this)
	},

	ensureReady () {
		if (this.loaded) {
			return Promise.resolve()
		} else {
			const promise = new Promise((resolve) => {
				this.readyPromises.push(resolve)
			})
			return promise
		}
	},

	_setLoaded () {
		this.loaded = true
		for (const resolve of this.readyPromises) {
			resolve()
		}
		this.readyPromises = []
	},

	_assertFailed() {
		this.loaded = true
		for (const reject of this.readyPromises) {
			reject()
		}
		this.readyPromises = []
	}
}

export default loader
