<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link v-if="isAuthenticated" to="/create-opporunity">Donate food</router-link>
    <router-link v-if="isAuthenticated" to="/about">About</router-link>
    <router-link v-if="isAuthenticated" to="/profile">Profile</router-link>
    <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
  </div>
</template>

<script lang="ts">
import { ActionTypes } from '@/store/actions.type';
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'Nav',
  computed: {
    ...mapGetters(['isAuthenticated']),
  },

  mounted() {
    this.$store.dispatch(ActionTypes.FETCH_PROFILE);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../main.scss';
#nav {
  position: fixed;
  top: 0;
  height: 80px;
  width: 100%;
  z-index: 10;
  background-color: $background;
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    padding: 0px 10px;
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
