<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <login-form></login-form>
    <google-login-button></google-login-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import LoginForm from '@/components/LoginForm.vue';
import GoogleLoginButton from '@/components/GoogleLoginButton.vue';

export default Vue.extend({
  name: 'Login',
  components: { LoginForm, GoogleLoginButton },
});
</script>
