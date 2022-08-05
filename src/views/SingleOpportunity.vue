<template>
  <div class="container">
    <opportunity-actions></opportunity-actions>
    <opportunity v-if="activeOpportunity" :opportunity="activeOpportunity"></opportunity>
    <opportunity-map :center="center" :markers="markers"></opportunity-map>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import OpportunityMap from '@/components/OpportunityMap.vue';
import { ActionTypes } from '@/store/actions.type';
import Opportunity from '@/components/Opportunity.vue';
import OpportunityActions from '@/components/OpportunityActions.vue';
import { MutationTypes } from '@/store/mutations.type';

export default Vue.extend({
  name: 'SingleOpportunity',
  components: { OpportunityMap, Opportunity, OpportunityActions },
  mounted() {
    this.$store.dispatch(ActionTypes.FETCH_OPPORTUNITIES);
    this.$store.commit(MutationTypes.SET_ACTIVE_OPPORTUNITY, this.$route.params.id);
  },

  computed: {
    ...mapGetters([
      'activeOpportunity',
      'isOpportunityLoading',
      'opportunityById',
      'opportunityList',
      'opportunityErrors',
    ]),
    markers() {
      return this.activeOpportunity ? [{ position: this.activeOpportunity.coordinates }] : [];
    },
    center() {
      return this.activeOpportunity ? this.activeOpportunity.coordinates : undefined;
    },
  },
});
</script>
<style lang="scss" scoped>
.google-map {
  max-height: 200px;
}
</style>
