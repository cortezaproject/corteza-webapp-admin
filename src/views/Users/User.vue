<template>
  <div class="settings">
    <router-link :to="{ name: 'users' }" class="float-right">close</router-link>
    <h2 class="header-subtitle header-row">
      User Information
    </h2>
    <b-form @submit.prevent="onSubmit">
      <b-form-group label="Handle / username" horizontal>
        <b-form-input v-model="user.handle" />
      </b-form-group>

      <b-form-group label="Email" horizontal>
        <b-form-input v-model="user.email" />
      </b-form-group>

      <b-form-group label="Name" horizontal>
        <b-form-input v-model="user.name" />
      </b-form-group>

      <b-form-group label="Kind/Type" horizontal>
        <b-form-text>{{ user.kind }}</b-form-text>
      </b-form-group>

      <b-form-group label="Last update" horizontal>
        <b-form-text>{{ user.updatedAt }}</b-form-text>
      </b-form-group>

      <b-form-group label="Created" horizontal>
        <b-form-text>{{ user.createdAt }}</b-form-text>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="processing">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    userID: {
      type: String,
      required: true,
    },
  },

  watch: {
    userID: {
      immediate: true,
      handler () {
        this.fetchUsers()
      },
    },
  },

  data () {
    return {
      processing: true,
      user: {},
    }
  },

  methods: {
    fetchUsers () {
      this.$system.userRead({ userID: this.userID }).then(u => {
        this.user = u
        this.processing = false
      })
    },

    onSubmit () {
      this.processing = true
      this.$system.userUpdate(this.user).then(u => {
        this.processing = false
      })
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';
@import '@/assets/sass/menu-layer.scss';

.settings {
  h2 {
    padding-top: 15px;
  }
  .list-settings {
    max-height: calc(100vh - 110px);
    overflow: scroll;
  }
}

</style>
