import MapElement from '../mixins/MapElement'

const boundProps = ['options']

const redirectedEvents = [
  'circlecomplete',
  'markercomplete',
  'overlaycomplete',
  'polygoncomplete',
  'polylinecomplete',
  'rectanglecomplete',
]

export default {
  name: 'GoogleMapsDrawingManager',

  mixins: [MapElement],

  props: {
    drawingControl: {
      type: Boolean,
      default: () => true,
    },
    drawingControlOptions: {
      type: Object,
      default: () => {},
    },
    drawingMode: {
      type: String,
      default: () => null,
    },
  },

  watch: {
    drawingControl: 'updateOptions',
    drawingControlOptions: 'updateOptions',
    drawingMode: 'updateOptions',
  },

  methods: {
    updateOptions() {
      const options = {
        drawingMode: this.drawingMode,
        drawingControlOptions: this.drawingControlOptions,
      }
      this.$_drawingManager && this.$_drawingManager.setOptions(options)
    },
  },

  render(h) {
    return ''
  },

  googleMapsReady() {
    const options = Object.assign({}, this.$props)
    options.map = this.$_map

    this.$_drawingManager = new google.maps.drawing.DrawingManager(options)
    this.bindProps(this.$_drawingManager, boundProps)
    this.redirectEvents(this.$_drawingManager, redirectedEvents)
  },

  beforeDestroy() {
    if (this.$_drawingManager) {
      this.$_drawingManager.setMap(null)
    }
  },
}
