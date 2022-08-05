<template>
  <div>xD</div>
</template>

<script lang="ts">
import Vue from 'vue';
import JwtService from '@/common/jwt.service';

export default Vue.extend({
  name: 'Authed',
  mounted() {
    const token = this.$route.query?.token as string;
    if (token) {
      JwtService.saveToken(token);
    }
    this.$router.push('/');
  },
});
</script>
