<template>
  <div class="list" v-bind:class="{ full: isFullScreen }">
    <loading-indicator v-if="isLoading"></loading-indicator>
    <ul id="opportunity-list">
      <opportunity
        v-for="opportunity in opportunitys"
        :key="opportunity._id"
        v-bind:onItemClick="() => onItemClick(opportunity._id)"
        v-bind:opportunity="opportunity"
      >
      </opportunity>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { ActionTypes } from '@/store/actions.type';
import Opportunity from './Opportunity.vue';
import LoadingIndicator from './LoadingIndicator.vue';
import { Opportunity as OpportunityType } from '@/types/opportunity.types';

export default Vue.extend({
  name: 'OpportunityList',
  components: {
    Opportunity,
    LoadingIndicator,
  },
  props: {
    opportunitys: {
      type: Array as PropType<OpportunityType[]>,
    },
    isLoading: Boolean,
    isFullScreen: Boolean,
  },

  methods: {
    onItemClick(id: string) {
      this.$router.push('/opportunity/' + id);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list {
  @import '../main.scss';
  text-align: center;
  font-family: sans-serif;
  flex: 1;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  background: $background;
  width: 100%;
  min-height: 100%;
  top: 30vh;
  animation: hide 0.3s ease-in forwards;

  &.full {
    animation: show 0.3s ease-in forwards;
  }
}
@keyframes show {
  to {
    top: 100vh;
  }
}

@keyframes hide {
  from {
    top: 100vh;
  }
  to {
    top: 30vh;
  }
}
</style>
