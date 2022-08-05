<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" />
    <Nav></Nav>
    <div id="route-layer">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Nav from '@/components/Nav.vue';

export default {
  name: 'app',
  components: {
    Nav,
  },
};
</script>

<style lang="scss">
@import './main.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  background-color: $light;
}

#route-layer {
  position: absolute;
  top: 80px;
  width: 100%;
  height: calc(100% - 80px);
  height: calc(100% - 80px);
  display: block;
}
</style>
