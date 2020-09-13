<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <pokemon-list></pokemon-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PokemonList from '@/components/Pokemon-List.vue';

import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'Home',
  components: { PokemonList },

  watch: {
    '$store.state.pokemons': function (oldValue, newValue) {
      console.log('WATCH');
      console.log(oldValue, newValue);
    },
  },

  computed: {
    ...mapGetters(['pokemons', 'activePokemon']),
  },
  methods: {
    increment() {
      console.log(this.$store.state.count);
    },
    decrement() {
      console.log(this.$store.state.count);
    },
  },
});
</script>
