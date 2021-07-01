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

      <c-main-nav-item
        v-for="(itm, i) in grp.items"
        :key="i"
        :label="$t(itm.label)"
        :to="itm.route"
        :icon="itm.icon"
      />
    </b-list-group>
  </div>
</template>
<script>
import CMainNavItem from 'corteza-webapp-admin/src/components/CMainNavItem'
import def from 'corteza-webapp-admin/src/nav'
import { mapGetters } from 'vuex'

export default {
  components: {
    CMainNavItem,
  },

  computed: {
    ...mapGetters({
      can: 'rbac/can',
    }),

    navigation () {
      return def.map(grp => {
        grp.items = grp.items
          .map(itm => {
            if (itm.icon && typeof itm.icon === 'string') {
              // default to FAS icons
              itm.icon = [ 'fas', itm.icon ]
            }

            if (itm.route && typeof itm.route === 'string') {
              // assume name of the route if string
              itm.route = { name: itm.route }
            }

            if (!itm.can) {
              // if not explicitly set, allow
              itm.can = true
            }

            if (Array.isArray(itm.can)) {
              // if array then call the perm checking function
              itm.can = this.can(...itm.can)
            }

            return itm
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
