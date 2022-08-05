<template>
  <div>
    <div v-bind:class="{ full: isFullScreen }" class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';

export default {
  props: {
    mapConfig: Object,
    apiKey: String,
    isFullScreen: Boolean,
    onDragEnd: Function,
    center: Object,
  },

  data() {
    return {
      google: null,
      map: null,
    };
  },

  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey,
    });
    this.google = googleMapApi;
    this.initializeMap();
  },
  watch: {
    isFullScreen: function (val) {
      const extraLat = 0.25 / this.mapConfig.zoom;
      const lat = val ? this.mapConfig?.center?.lat : this.mapConfig?.center?.lat + extraLat;
      const lng = this.mapConfig?.center?.lng;
      const center = new this.google.maps.LatLng(lat, lng);
      this.map.panTo(center);
    },
    mapConfig: function (val) {
      if (val.center && this.google) {
        const center = new this.google.maps.LatLng(val.center.lat, val.center.lng);
        this.map.panTo(center);
      }
    },
  },

  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap;

      if (!mapContainer) {
        return;
      }

      this.map = new this.google.maps.Map(mapContainer, this.mapConfig);

      if (this.onDragEnd) {
        this.google.maps.event.addListener(this.map, 'mouseover', () => {
          this.google.maps.event.clearListeners(this.map, 'mouseover');
          this.google.maps.event.addListener(this.map, 'dragend', (e) => {
            const center = this.map.getCenter();
            const latitude = center.lat();
            const longitude = center.lng();
            setTimeout(() => this.onDragEnd({ latitude, longitude }), 1);
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.google-map {
  width: 100%;
  min-height: 80vw;
  min-height: calc(100vh - 100px);
}

@keyframes fullscreen {
  from {
    min-height: 85vw;
  }
  to {
    min-height: calc(100vh - 100px);
  }
}

@keyframes reverse {
  from {
    min-height: 85vw;
  }
  to {
    min-height: calc(100vh - 100px);
  }
}
</style>
