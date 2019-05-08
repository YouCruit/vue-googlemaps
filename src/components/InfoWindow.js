import MapElement from '../mixins/MapElement'

const boundProps = ['options']

const redirectedEvents = ['closeclick', 'content_changed', 'domready', 'position_changed', 'zindex_changed']

export default {
  name: 'GoogleMapsInfoWindow',

  mixins: [MapElement],

  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
    show: {
      type: Boolean,
      default: () => false,
    },
  },

  watch: {
    options: 'updateOptions',
    show: 'updateShow',
  },

  methods: {
    updateShow(show) {
      if (this.$_infoWindow) {
        if (show) {
          this.$_infoWindow.open(this.$_map)
        } else {
          this.$_infoWindow.close()
        }
      }
    },
    updateOptions(options) {
      this.$_infoWindow && this.$_infoWindow.setOptions(options || this.$props)
    },
  },

  render(h) {
    return ''
  },

  googleMapsReady() {
    const options = Object.assign({}, this.$props)
    options.map = this.$_map

    this.$_infoWindow = new google.maps.InfoWindow(options)
    this.bindProps(this.$_infoWindow, boundProps)
    this.redirectEvents(this.$_infoWindow, redirectedEvents)
  },

  beforeDestroy() {
    if (this.$_infoWindow) {
      this.$_infoWindow.setMap(null)
    }
  },
}
