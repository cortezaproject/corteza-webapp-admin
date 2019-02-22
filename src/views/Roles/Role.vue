<template>
  <div class="settings">
    <router-link :to="{ name: 'roles' }" class="float-right">close</router-link>
    <h2 class="header-subtitle header-row">
      Role Information
    </h2>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label="Name" horizontal>
          <b-form-input v-model="role.name" />
        </b-form-group>

        <b-form-group label="Last update" horizontal>
          <b-form-text>{{ role.updatedAt }}</b-form-text>
        </b-form-group>

        <b-form-group label="Created" horizontal>
          <b-form-text>{{ role.createdAt }}</b-form-text>
        </b-form-group>

        <b-button type="submit" variant="primary" :disabled="processing">Submit</b-button>
      </b-form>
  </div>
</template>

<script>
export default {
  props: {
    roleID: {
      type: String,
      required: true,
    },
  },

  watch: {
    roleID: {
      immediate: true,
      handler () {
        this.fetchRole()
      },
    },
  },

  data () {
    return {
      processing: true,
      role: {},
    }
  },

  methods: {
    fetchRole () {
      this.$system.roleRead({ roleID: this.roleID }).then(r => {
        this.role = r
        this.processing = false
      })
    },

    onSubmit () {
      this.processing = true
      this.$system.roleUpdate(this.role).then(r => {
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
