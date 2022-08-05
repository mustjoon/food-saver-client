<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <div id="Login-form" class="container">
      <binput-with-validation rules="required|email" type="email" label="Email" v-model="formValues.email" />
      <binput-with-validation
        rules="required"
        type="password"
        label="Password"
        vid="password"
        v-model="formValues.password"
      />
      <b-field>
        <b-button @click="handleSubmit(submit)" type="submit">click</b-button>
      </b-field>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import Vue from 'vue';
import BinputWithValidation from './BinputWithValidation.vue';
import { ValidationObserver } from 'vee-validate';

export default Vue.extend({
  name: 'LoginForm',
  components: {
    BinputWithValidation,
    ValidationObserver,
  },
  data: function () {
    const formValues: { [key: string]: string } = {
      email: 'perkele',
      password: '',
    };
    return { formValues };
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
.container {
  padding: 0px 10px;
  text-align: left;
}
</style>
