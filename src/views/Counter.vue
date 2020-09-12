<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <counter></counter>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Counter from '@/components/Counter.vue' // @ is an alias to /src

export default Vue.extend({
  name: 'Counter',
  components: {
    Counter
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  methods: {
    increment () {
      this.$store.commit('increment')
      console.log(this.$store.state.count)
    },
    decrement () {
      this.$store.commit('decrement')
      console.log(this.$store.state.count)
    }
  }
})
</script>
