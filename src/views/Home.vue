<template>
  <home-component></home-component>
</template>

<script lang="ts">
import Vue from 'vue';

import HomeComponent from '@/components/Home.vue';

export default Vue.extend({
  name: 'Home',
  components: { HomeComponent },
});
</script>
<style lang="scss" scoped></style>
