<template>
  <GoogleMapLoader
    v-if="show"
    :isFullScreen="isFullScreen"
    :mapConfig="mapConfig"
    apiKey="AIzaSyBiK8zmKPcS2sPz1TqTlIlH_h0FkqIbjuo"
  >
    <template slot-scope="{ google, map }">
      <GoogleMapsMarker v-for="marker in markers" :key="marker.id" :marker="marker" :google="google" :map="map" />
    </template>
  </GoogleMapLoader>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { mapSettings } from '@/constants/map-settings';
import GoogleMapLoader from './GoogleMapLoader.vue';
import GoogleMapCircle from './GoogleMapCircle.vue';
import GoogleMapsMarker from './GoogleMapMarker.vue';
import { ActionTypes } from '@/store/actions.type';
import { mapGetters } from 'vuex';
import { Coordinates } from '@/types/profile.types';

const defaultPos = {
  lat: 0,
  lng: 0,
};

export default Vue.extend({
  name: 'OpportunityMap',
  components: {
    GoogleMapLoader,
    //  GoogleMapCircle,
    GoogleMapsMarker,
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    isFullScreen: {
      type: Boolean,
      default: false,
    },
    markers: {
      default: [],
    },
    center: {
      type: Object as PropType<Coordinates>,
    },
  },
  mounted() {
    this.$store.dispatch(ActionTypes.POSITION_GET);
  },
  computed: {
    ...mapGetters(['currentPosition']),
    mapConfig() {
      return {
        ...mapSettings,
        center: this.$props.center ? this.$props.center : this.currentPosition ? this.currentPosition : defaultPos,
      };
    },
  },
});
</script>
