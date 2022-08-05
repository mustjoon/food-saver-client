<template>
  <div class="opportunity-actions">
    <b-button @click="navigateToChat" v-if="!isCreator" class="button is-primary">Chat with creator</b-button>
    <b-button v-if="isCreator" class="button is-primary">Edit</b-button>
    <b-button v-if="isCreator" class="button is-secondary">Mark as sold</b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'OpportunityActions',
  computed: {
    ...mapGetters(['activeOpportunity', 'createdOpportunitys']),
    isCreator() {
      if (this.activeOpportunity) {
        return this.createdOpportunitys.includes(this.activeOpportunity._id);
      }
      return false;
    },
  },
  methods: {
    navigateToChat: function () {
      this.$router.push(this.$route.path + '/chat');
    },
  },
});
</script>

<style lang="scss" scoped>
@import '../main.scss';
.opportunity-actions {
  margin: $top-spacing;

  button {
    margin: 0 10px;
    min-width: 80px;
  }
}
</style>
