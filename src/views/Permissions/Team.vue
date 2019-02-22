<template>
  <div class="settings">
    <router-link :to="{ name: 'roles' }" class="float-right">close</router-link>
    <h2 class="header-subtitle header-row">
      Permissions
    </h2>
      <b-form @submit.prevent="onSubmit">
        <permission title="foo"
                    subtitle="bar"></permission>

        <b-button type="submit" variant="primary" :disabled="processing">Submit</b-button>
      </b-form>
  </div>
</template>

<script>
import Permission from '../../components/Permission'
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
        this.fetchUsers()
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
    fetchUsers () {
      this.$system.roleRead({ roleID: this.roleID }).then(t => {
        this.role = t
        this.processing = false
      })
    },

    onSubmit () {
      this.processing = true
      this.$system.roleUpdate(this.role).then(t => {
        this.processing = false
      })
    },
  },

  components: {
    Permission,
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
