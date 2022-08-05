<template>
  <div>
    <ul id="messages">
      <li v-for="message in messages" v-bind:key="message._id">
        <div>
          {{ message.text }} <span>{{ message.createdAt }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'Chatmessages',
  computed: {
    ...mapGetters(['chatByOpportunity']),
    messages() {
      if (this.chatByOpportunity[this.$route.params.id]) {
        return this.chatByOpportunity[this.$route.params.id].messages;
      }
      return [];
    },
  },
});
</script>
