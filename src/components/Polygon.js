import MapElement from '../mixins/MapElement'

const boundProps = ["draggable", "editable", "options", "paths"];

const redirectedEvents = [
	"click",
	"rightclick",
	"dblclick",
	"drag",
	"dragstart",
	"dragend",
	"mouseup",
	"mousedown",
	"mouseover",
	"mouseout"
];

const redirectedPathEvents = ["set_at", "insert_at", "remove_at"];

export default {
	name: "GoogleMapsPolygon",

	mixins: [MapElement],

	props: {
		id: {
			type: String
		},
		editable: {
			type: Boolean,
			default: false
		},
		draggable: {
			type: Boolean,
			default: false
		},
		options: {
			type: Object,
			default: () => ({})
		},
		paths: {
			type: Array
		}
	},

	data() {
		return {
			dragging: false
		};
	},

	watch: {
		paths: "updateOptions",
		options: "updateOptions"
	},

	beforeCreate() {
		this.$_googlePathListeners = [];
	},

	beforeDestroy() {
		if (this.$_polygon) {
			this.$_polygon.setMap(null);
		}
		this.removePathEventListeners();
	},

	methods: {
		updateOptions(options) {
			this.$_polygon && this.$_polygon.setOptions(options || this.$props);
			this.$_polygon && this.$_polygon.setMap(this.$_map);
		},
		// Override redirectEvents to supply polygon
		redirectEvents(target, events) {
			for (const e of events) {
				this.listen(target, e, args => {
					if (e === "dragstart") {
						this.dragging = true;
					} else if (e === "dragend") {
						this.dragging = false;
					} else if (e === "mouseover") {
						// TODO find a way to set path handlers correctly
						this.redirectPathEvents(target);
					}
					this.$emit(e, { event: args, polygon: target, id: this.id });
				});
			}
		},
		listenToPath(target, event, handler) {
			this.$_googlePathListeners.push(target.addListener(event, handler));
		},
		removePathEventListeners() {
			for (const listener of this.$_googlePathListeners) {
				listener.remove();
			}
			this.$_googlePathListeners = [];
		},
		redirectPathEvents(target) {
			this.removePathEventListeners();
			for (const e of redirectedPathEvents) {
				this.listenToPath(target.getPath(), e, args => {
					if (this.dragging && e === "set_at") {
						return;
					}
					this.$emit(e, { event: args, polygon: this.$_polygon, id: this.id });
				});
			}
		}
	},

	render(h) {
		return "";
	},

	googleMapsReady() {
		const options = Object.assign({}, this.$props);
		options.map = this.$_map;

		this.$_polygon = new window.google.maps.Polygon(options);
		this.bindProps(this.$_polygon, boundProps);
		this.redirectEvents(this.$_polygon, redirectedEvents);
	}
}
