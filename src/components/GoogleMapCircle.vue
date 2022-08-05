<script lang="ts">
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable vue/require-render-return */
export default {
  props: {
    google: {
      type: Object,
      required: true,
    },
    map: {
      type: Object,
      required: true,
    },
    marker: {
      type: Object,
      required: true,
    },
  },

  mounted() {
    const _this = this as any;
    const { Circle } = _this.google.maps;

    // eslint-disable-next-line no-new
    new Circle({
      center: _this.marker.position,
      marker: _this.marker,
      map: _this.map,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      radius: 500,
      // icon: POINT_MARKER_ICON_CONFIG,
    });
  },

  // eslint-disable-next-line vue/require-render-return
  render(): any {},
};
</script>
