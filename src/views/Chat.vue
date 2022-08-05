<template>
  <div class="container">
    <chat-messages></chat-messages>
    <chat-form></chat-form>
  </div>
</template>

<script lang="ts">
import { ActionTypes } from '@/store/actions.type';
import { MutationTypes } from '@/store/mutations.type';
import Vue from 'vue';
import { mapGetters } from 'vuex';

import ChatForm from '@/components/ChatForm.vue';
import ChatMessages from '@/components/ChatMessages.vue';

export default Vue.extend({
  name: 'Chat',
  components: {
    ChatForm,
    ChatMessages,
  },
  computed: {
    ...mapGetters(['chatByOpportunity']),
    chatId() {
      return this.chatByOpportunity[this.$route.params.id]?._id;
    },
  },
});
</script>
