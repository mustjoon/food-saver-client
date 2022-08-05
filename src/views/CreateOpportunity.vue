<template>
  <div>
    <create-opportunity-form></create-opportunity-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CreateOpportunityForm from '@/components/CreateOpportunityForm.vue';

import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'CreateOpportunity',
  components: { CreateOpportunityForm },

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
<style lang="scss" scoped>
.home {
}
</style>
