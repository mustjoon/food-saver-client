<template>
  <li @click="onClick">
    <article class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <b-skeleton circle width="64px" height="64px"></b-skeleton>
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <div class="has-text-left">
            <h5>
              {{ opportunity.creator.profile && opportunity.creator.profile.name }}
            </h5>
            <div class="info">
              <p>{{ opportunity.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  </li>
</template>

<script lang="ts">
import { Opportunity as OpportunityType } from '@/types/opportunity.types';
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'Opportunity',
  methods: {
    onClick() {
      if (this.$props.onItemClick) {
        this.$props.onItemClick(this.$props.opportunity._id);
      }
    },
  },
  props: {
    opportunity: {
      type: Object as PropType<OpportunityType>,
      required: true,
    },
    onItemClick: {
      type: Function,
      required: false,
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.media {
  padding: 5px;
  margin: 10px 0;
  border-radius: 20px;
  border: 1px solid #f8f8f8;
}

li {
  list-style: none;
}
</style>
