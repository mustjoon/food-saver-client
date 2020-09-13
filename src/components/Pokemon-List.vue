<template>
  <ul id="pokemon-list">
    <pokemon
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      v-bind:onRemoveClick="() => onRemoveClick(pokemon.id)"
      v-bind:pokemon="pokemon"
    >
    </pokemon>
    {{
      JSON.stringify(byId)
    }}
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { FETCH_POKEMONS, POKEMON_DELETE } from '@/store/actions.type';
import Pokemon from './Pokemon.vue';

export default Vue.extend({
  name: 'PokemonList',
  mounted() {
    this.$store.dispatch(FETCH_POKEMONS);
  },
  components: {
    Pokemon,
  },
  computed: {
    ...mapGetters(['pokemons', 'activePokemon', 'byId']),
  },

  methods: {
    onRemoveClick(id: string): void {
      this.$store.dispatch(POKEMON_DELETE, id);
      console.log('remove will happen here');
    },
    decrement() {
      this.$store.commit('decrement');
      console.log(this.$store.state.count);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
