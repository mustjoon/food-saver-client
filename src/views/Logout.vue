<template>
  <div></div>
</template>

<script lang="ts">
import { ActionTypes } from '@/store/actions.type';
import Vue from 'vue';

export default Vue.extend({
  name: 'Logout',
  mounted() {
    this.$store.dispatch(ActionTypes.LOGOUT);
    this.$router.push('/');
  },
});
</script>
