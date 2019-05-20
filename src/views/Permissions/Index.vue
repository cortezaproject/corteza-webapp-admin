<template>
  <div>
    <p>Set base permissions for Crust systems:</p>
    <ul>
      <li>
        <permissions-button resource="system"
                            title="System">System</permissions-button>
      </li>
      <li>
        <permissions-button resource="messaging"
                            title="Messaging">Messaging</permissions-button>
      </li>
      <li>
        <permissions-button resource="compose"
                            title="Compose">Compose</permissions-button>
      </li>
    </ul>

  </div>
</template>

<script>
import ListWithDetails from '@/components/ListWithDetails'

export default {
  components: {
    ListWithDetails,
  },

  data () {
    return {
      query: '',
      roles: [],
    }
  },

  computed: {
    title () {
      return this.$t('role.managePermissions')
    },
  },

}
</script>
<style scoped lang="scss">
@import '@/assets/sass/_0.commons.scss';
@import '@/assets/sass/menu-layer.scss';

div {
  margin: 10px;
}
</style>
