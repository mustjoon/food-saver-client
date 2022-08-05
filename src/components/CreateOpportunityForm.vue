<template>
  <div class="container">
    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
      <div id="Create-opportunity-form" class="container">
        <div v-if="currentPage == 1">
          <h2 class="title is-6 has-text-left">Create a donation</h2>
          <binput-with-validation
            rules="required"
            type="textarea"
            placeholder="Description of donation, eg. amount of items, expiration date and pickup info"
            v-model="formValues.description"
          />
          <binput-with-validation
            type="number"
            placeholder="If you want a small fee from items, enter it here"
            v-model="formValues.price"
          />

          <b-field>
            <b-button class="button is-primary" @click="handleSubmit(() => setPage(2))" type="submit"
              >Continue</b-button
            >
          </b-field>
        </div>
      </div>
      <div v-if="currentPage == 2">
        <h2 class="title is-6 has-text-left">Select pickup location</h2>
        <GoogleMapLoader
          :onDragEnd="handlePositionChange"
          :isFullScreen="false"
          :mapConfig="mapConfig"
          apiKey="AIzaSyBiK8zmKPcS2sPz1TqTlIlH_h0FkqIbjuo"
        >
        </GoogleMapLoader>
        <i class="fake-marker fas fa-map-marker"></i>
        <b-field class="submit-button-container">
          <b-button class="button is-primary" @click="handleSubmit(submit)" type="submit">Continue</b-button>
          <b-button class="button is-secondary" @click="handleSubmit(submitWithProfileAddress)" type="submit"
            >Use my address</b-button
          >
        </b-field>
      </div>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BinputWithValidation from './BinputWithValidation.vue';
import { ValidationObserver } from 'vee-validate';

import { mapSettings } from '@/constants/map-settings';
import GoogleMapLoader from './GoogleMapLoader.vue';
import { ActionTypes } from '@/store/actions.type';
import { Opportunity, OpportunityTemplate } from '@/types/opportunity.types';
import { mapGetters } from 'vuex';

// export type OnSubmit = (profile: ProfileType) => void;

export default Vue.extend({
  name: 'CreateOpportunityForm',
  components: {
    BinputWithValidation,
    ValidationObserver,
    GoogleMapLoader,
  },

  data: function () {
    const formValues: OpportunityTemplate = {
      description: '',
      location: '',
      coordinates: {
        lat: 0,
        lng: 0,
      },
    };

    return { formValues, currentPage: 1, currentPosition: { lat: 0, lng: 0 } };
  },
  mounted() {
    this.$store.dispatch(ActionTypes.FETCH_PROFILE);
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const coordinates = { lat: coords.latitude, lng: coords.longitude };
      this.currentPosition = coordinates;
      this.formValues.coordinates = coordinates;
    });
  },

  computed: {
    ...mapGetters(['profile']),
    mapConfig(): any {
      return {
        ...mapSettings,
        center: this.currentPosition,
      };
    },
  },

  methods: {
    setPage: function (page: number) {
      this.currentPage = page;
    },
    handlePositionChange: function (pos: Coordinates) {
      this.formValues.coordinates = { lat: pos.latitude, lng: pos.longitude };
    },
    submit: async function () {
      const id = await this.$store.dispatch(ActionTypes.CREATE_OPPORTUNITY, this.formValues);
      this.$router.push('/opportunity/' + id);
    },
    submitWithProfileAddress: async function () {
      this.formValues.coordinates = this.profile.coordinates;
      const id = await this.$store.dispatch(ActionTypes.CREATE_OPPORTUNITY, this.formValues);
      this.$router.push('/opportunity/' + id);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../main.scss';
.container {
  padding: 0px 10px;
  text-align: left;
  margin-top: $top-spacing;
}

.fake-marker {
  font-size: 36px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transform: translateY(-50%);
  top: 50%;
}

.submit-button-container {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  button {
    margin: 0px 5px;
  }
}
</style>
