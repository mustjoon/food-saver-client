<template>
  <profile-component></profile-component>
</template>

<script lang="ts">
import Vue from 'vue';
import ProfileComponent from '@/components/Profile.vue';

export default Vue.extend({
  name: 'Profile',
  components: { ProfileComponent },
  computed: {
    count() {
      return this.$store.state.count;
    },
  },
});
</script>
