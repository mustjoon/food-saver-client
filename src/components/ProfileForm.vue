<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <div id="Profile-form" class="container">
      <binput-with-validation rules="required" type="text" label="name" v-model="formValues.name" />
      <binput-with-validation type="text" label="Gender" value="vittu" v-model="formValues.gender" />
      <binput-with-validation type="text" label="City" v-model="formValues.location" />
      <b-field>
        <b-button @click="handleSubmit(() => onSubmit(formValues))" type="submit">click</b-button>
      </b-field>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import BinputWithValidation from './BinputWithValidation.vue';
import { ValidationObserver } from 'vee-validate';

import { Profile as ProfileType } from '@/types/profile.types';

// export type OnSubmit = (profile: ProfileType) => void;

export default Vue.extend({
  name: 'ProfileForm',
  components: {
    BinputWithValidation,
    ValidationObserver,
  },
  props: {
    profile: {
      type: Object as PropType<ProfileType>,
    },
    onSubmit: {
      type: Function as PropType<(profile: ProfileType) => void>,
    },
  },
  data: function () {
    const formValues: { [key: string]: any } = {
      name: '',
      gender: '',
      location: '',
      picture: '',
      coordinates: {
        lat: 0,
        lng: 0,
      },
    };
    return { formValues };
  },
  watch: {
    /*  Listen for fetched profile info and store them as form values
        Do it this way instead of mapping inputs directly to store
    */
    profile(profile: ProfileType) {
      console.log(profile);
      this.formValues = profile;
    },
  },
  methods: {
    updateFieldValue: function (field: string, value: string): void {
      this.formValues[field] = value;
    },
    submit: function () {
      console.log(this.formValues.email);
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
  background-color: $light2;
}
</style>
