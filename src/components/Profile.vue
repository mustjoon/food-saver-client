<template>
  <section id="profile">
    <div v-if="profile" class="container">
      <div class="settings-container">
        <h2 class="title is-6 has-text-left">Profiili</h2>
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <b-skeleton circle width="64px" height="64px"></b-skeleton>
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
              <div class="has-text-left">
                <strong class="mr-3">
                  {{ profile.name }}
                </strong>
                <span title="Pelastettuja ruokia: 1" class="has-text-left">
                  <span class="mr-1"> <i class="fas fa-tag"></i></span>
                  <span>1</span>
                  <button
                    @click="isModalActive = true"
                    class="button is-rounded is-primary is-64x64 is-pulled-right settings-button"
                  >
                    <i class="fas fa-cog"></i>
                  </button>
                </span>
              </div>
              <div class="has-text-left">
                <span class="mr-5">{{ profile.gender }}</span>

                <span>{{ profile.location }}</span>
              </div>
            </div>
          </div>
        </article>
        <b-modal v-model="isModalActive">
          <profile-form v-bind:onSubmit="submitForm" v-bind:profile="profile"></profile-form>
        </b-modal>
      </div>
      <div class="logout-container has-text-right">
        <router-link to="/logout" class="button is-primary">Logout</router-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ActionTypes } from '@/store/actions.type';
import { Profile } from '@/types/profile.types';
import Vue from 'vue';
import { mapGetters } from 'vuex';
import ProfileForm from './ProfileForm.vue';

export default Vue.extend({
  name: 'Profile',
  components: {
    ProfileForm,
  },

  data() {
    return {
      isModalActive: false,
    };
  },

  mounted() {
    this.$store.dispatch(ActionTypes.FETCH_PROFILE);
  },
  computed: {
    ...mapGetters(['profile', 'isProfileLoading', 'profileErrors']),
  },
  methods: {
    submitForm(profile: Profile) {
      console.log('submit', profile.name);
      this.$store.dispatch(ActionTypes.PROFILE_EDIT, profile);
      // this.$store.commit('increment');
      // console.log(this.$store.state.count);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#profile {
  height: 100%;
}
.container {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.settings-button {
  width: 42px;
  height: 42px;
}
</style>
