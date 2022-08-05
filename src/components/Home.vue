<template>
  <div class="container" v-bind:class="{ full: isFullScreen }">
    <div @click="() => setFullScreen(true)">
      {{ opportunityErrors }}
      <opportunity-map :show="show" :isFullScreen="isFullScreen" :markers="markers"></opportunity-map>
    </div>
    <div class="toggle-button-container">
      <b-button @click="() => setFullScreen(false)" type="is-primary is-light">Näytä lista</b-button>
    </div>

    <opportunity-list
      :isFullScreen="isFullScreen"
      v-bind:opportunitys="opportunityList"
      v-bind:isLoading="isOpportunityLoading"
    ></opportunity-list>
    <b-loading :is-full-page="false" v-model="isOpportunityLoading" :can-cancel="true"></b-loading>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { ActionTypes } from '@/store/actions.type';

import GoogleMapLoader from './GoogleMapLoader.vue';
import OpportunityMap from './OpportunityMap.vue';

import GoogleMapCircle from './GoogleMapCircle.vue';
import { mapSettings } from '@/constants/map-settings';
import { Opportunity as OpportunityType } from '@/types/opportunity.types';
import OpportunityList from './OpportunityList.vue';

export default Vue.extend({
  name: 'HomeComponent',
  mounted() {
    this.$store.dispatch(ActionTypes.FETCH_OPPORTUNITIES);
  },
  components: {
    OpportunityList,
    OpportunityMap,
  },
  data: function (): { isFullScreen: boolean } {
    return {
      isFullScreen: false,
    };
  },
  methods: {
    toggleFullScreen: function () {
      const _this = this as any;
      _this.isFullScreen = !_this.isFullScreen;
    },
    setFullScreen: function (val: boolean) {
      const _this = this as any;
      _this.isFullScreen = val;
    },
  },
  computed: {
    ...mapGetters([
      'activeOpportunity',
      'isOpportunityLoading',
      'opportunityById',
      'opportunityList',
      'opportunityErrors',
    ]),
    show() {
      return !this.opportunityErrors && !this.isOpportunityLoading;
    },
    mapCenter() {
      return { lat: 60.97141759999999, lng: 25.7523712 };
    },
    markers() {
      return this.opportunityList
        .filter((item: any) => {
          return item?.creator?.profile?.coordinates;
        })
        .map((item: any, index: number) => {
          return {
            id: index,
            position: {
              lat: item.creator.profile.coordinates.lat,
              lng: item.creator.profile.coordinates.lng,
            },
          };
        });
    },
    mapConfig() {
      return {
        ...mapSettings,
        center: this.mapCenter,
      };
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.container {
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  &.full {
    .toggle-button-container {
      animation: show 0.5s ease-in forwards;
    }
  }

  .toggle-button-container {
    text-align: center;
    position: absolute;
    bottom: 40px;
    z-index: 9;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    opacity: 0;
  }
}

@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
