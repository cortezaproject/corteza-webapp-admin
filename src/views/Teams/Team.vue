<template>
  <div class="settings">
    <router-link :to="{ name: 'teams' }" class="float-right">close</router-link>
    <h2 class="header-subtitle header-row">
      Team Information
    </h2>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Name" horizontal>
          <b-form-input v-model="team.name" />
        </b-form-group>

        <b-form-group label="Last update" horizontal>
          <b-form-text>{{ team.updatedAt }}</b-form-text>
        </b-form-group>

        <b-form-group label="Created" horizontal>
          <b-form-text>{{ team.createdAt }}</b-form-text>
        </b-form-group>

        <b-button type="submit" variant="primary" :disabled="processing">Submit</b-button>
      </b-form>
  </div>
</template>

<script>
export default {
  props: {
    teamID: {
      type: String,
      required: true,
    },
  },

  watch: {
    teamID: {
      immediate: true,
      handler () {
        this.fetchUsers()
      },
    },
  },

  data () {
    return {
      processing: true,
      team: {},
    }
  },

  methods: {
    fetchUsers () {
      this.$system.teamRead({ teamID: this.teamID }).then(t => {
        this.team = t
        this.processing = false
      })
    },

    onSubmit () {
      this.processing = true
      this.$system.teamUpdate(this.team).then(t => {
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
