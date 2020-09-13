<template>
  <li>
    <div>
      {{ pokemon.id }}
      {{ pokemon.name }}
      {{ pokemon.type }}
      <button @click="onRemoveClick">Delete</button>
    </div>
  </li>
</template>

<script lang="ts">
import { Pokemon as PokemonType } from '@/types/pokemon.types';
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'Pokemon',
  props: {
    pokemon: {
      type: Object as PropType<PokemonType>,
      required: true,
    },
    onRemoveClick: {
      type: Function,
      required: true,
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
