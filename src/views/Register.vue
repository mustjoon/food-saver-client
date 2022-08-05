<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <register-form></register-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RegisterForm from '@/components/RegisterForm.vue';
export default Vue.extend({
  name: 'Login',
  components: { RegisterForm },
});
</script>
