<template>
  <div
    class="overflow-auto"
  >
    <b-list-group
      v-for="(grp, g) in navigation"
      :key="g"
      tag="ul"
    >
      <h2
        v-if="grp.header"
        class="small ml-1 mt-2 font-weight-light text-uppercase"
      >
        {{ $t(grp.header.label) }}
      </h2>

      <c-sidebar-nav-items
        :items="grp.items"
        default-route-name="dashboard"
        class="overflow-auto h-100"
      />
    </b-list-group>
  </div>
</template>
<script>
import def from 'corteza-webapp-admin/src/nav'
import { mapGetters } from 'vuex'
import { components } from '@cortezaproject/corteza-vue'
const { CSidebarNavItems } = components

export default {
  components: {
    CSidebarNavItems,
  },

  computed: {
    ...mapGetters({
      can: 'rbac/can',
    }),

    navigation () {
      return def.map(grp => {
        grp.items = grp.items
          .map(itm => {
            const page = {
              name: itm.route,
              title: this.$t(itm.label),
              icon: [ 'fas', itm.icon ],
            }

            if (!itm.can) {
              // if not explicitly set, allow
              itm.can = true
            }

            if (Array.isArray(itm.can)) {
              // if array then call the perm checking function
              itm.can = this.can(...itm.can)
            }

            return { page, can: itm.can }
          })
          .filter(({ can }) => can)

        if (grp.items.length === 0) {
          return null
        }

        return grp
      }).filter(i => i)
    },
  },
}
</script>
