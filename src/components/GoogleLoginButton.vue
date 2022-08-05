<template>
  <div>
    <button @click="login">Login using google</button>
  </div>
</template>

<script lang="ts">
import { ActionTypes } from '@/store/actions.type';
import Vue from 'vue';
import { mapState } from 'vuex';

export default Vue.extend({
  name: 'Counter',
  computed: mapState(['count']),
  methods: {
    login() {
      this.$store.dispatch(ActionTypes.LOGIN_GOOGLE);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
