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
    const { Marker } = _this.google.maps;

    // eslint-disable-next-line no-new
    new Marker({
      position: _this.marker.position,
      marker: _this.marker,
      map: _this.map,
      // icon: POINT_MARKER_ICON_CONFIG,
    });
  },

  // eslint-disable-next-line vue/require-render-return
  render(): any {},
};
</script>
