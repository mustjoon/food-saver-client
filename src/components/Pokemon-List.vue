<template>
  <div>
    <loading-indicator v-if="isLoading"></loading-indicator>
    <ul id="pokemon-list">
      <pokemon
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        v-bind:onItemClick="() => onItemClick(pokemon.id)"
        v-bind:onRemoveClick="() => onRemoveClick(pokemon.id)"
        v-bind:pokemon="pokemon"
      >
      </pokemon>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { ActionTypes } from '@/store/actions.type';
import Pokemon from './Pokemon.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import { Pokemon as PokemonType } from '@/types/pokemon.types';

export default Vue.extend({
  name: 'PokemonList',
  mounted() {
    this.$store.dispatch(ActionTypes.FETCH_POKEMONS);
  },
  components: {
    Pokemon,
    LoadingIndicator,
  },
  computed: {
    ...mapGetters(['pokemons', 'activePokemon', 'byId', 'isLoading']),
  },

  methods: {
    onRemoveClick(id: string): void {
      this.$store.dispatch(ActionTypes.POKEMON_DELETE, id);
    },
    onItemClick(id: string) {
      this.$store.dispatch(ActionTypes.POKEMON_SET_ACTIVE, id);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
