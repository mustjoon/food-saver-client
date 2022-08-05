<template>
  <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
    <div id="Chat-form" class="container">
      <binput-with-validation rules="required" type="text" v-model="formValues.message" />
      <b-field>
        <b-button @click="handleSubmit(() => submit(formValues.message))" type="submit">click</b-button>
      </b-field>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import Vue from 'vue';
import BinputWithValidation from './BinputWithValidation.vue';
import { ValidationObserver } from 'vee-validate';
import { mapGetters } from 'vuex';
import { ActionTypes } from '@/store/actions.type';
import { ChatService } from '@/common/api.service';

export default Vue.extend({
  name: 'ChatForm',
  components: {
    BinputWithValidation,
    ValidationObserver,
  },
  data(): any {
    const formValues: { [key: string]: string } = {
      message: '',
    };
    return { formValues };
  },
  computed: {
    ...mapGetters(['chatByOpportunity']),
    chatId(): string {
      return this.chatByOpportunity[this.$route.params.id]?._id;
    },
  },
  mounted() {
    this.$store.dispatch(ActionTypes.FETCH_CHATS, this.$route.params.id);
    this.$store.dispatch(ActionTypes.CONNECT_SOCKET, this.$route.params.id);
  },
  methods: {
    async submit(text: string) {
      let chatId: any = this.chatId;
      // Create chat if it doesnt exist and then post new message
      if (!chatId) {
        chatId = await this.$store.dispatch(ActionTypes.CHAT_CREATE, this.$route.params.id);
        ChatService.joinRoom(chatId);
      }
      // (this as any).formValues.message = '';
      this.formValues.message = '';
      ChatService.sendMessage(chatId, text);
    },
  },
});
</script>
