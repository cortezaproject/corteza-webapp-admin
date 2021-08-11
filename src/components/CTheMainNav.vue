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
import { mapGetters } from 'vuex'
import { components } from '@cortezaproject/corteza-vue'
const { CSidebarNavItems } = components

export default {
  components: {
    CSidebarNavItems,
  },

  data () {
    return {
      nav: [
        {
          items: [
            {
              label: 'dashboard:navItem.label',
              route: 'dashboard',
              icon: 'tachometer-alt',
            },
          ],
        },
        {
          header: {
            label: 'system:navGroup.label',
          },
          items: [
            {
              label: 'system.users:navItem.label',
              route: 'system.user',
              icon: 'users',
              can: ['system/', 'users.search'],
            },
            {
              label: 'system.roles:navItem.label',
              route: 'system.role',
              icon: 'hat-cowboy',
              can: ['system/', 'roles.search'],
            },
            {
              label: 'system.applications:navItem.label',
              route: 'system.application',
              icon: 'th-large',
              can: ['system/', 'applications.search'],
            },
            {
              label: 'system.templates:navItem.label',
              route: 'system.template',
              icon: 'file-code',
              can: ['system/', 'templates.search'],
            },
            {
              label: 'system.settings:navItem.label',
              route: 'system.settings',
              icon: 'sliders-h',
              can: ['system/', 'settings.read'],
            },
            {
              label: 'system.permissions:navItem.label',
              route: 'system.permissions',
              icon: 'lock',
              can: ['system/', 'grant'],
            },
            {
              label: 'system.authclients:navItem.label',
              route: 'system.authClient',
              icon: 'key',
              can: ['system/', 'auth-clients.search'],
            },
            {
              label: 'system.actionlog:navItem.label',
              route: 'system.actionlog',
              icon: 'glasses',
              can: ['system/', 'action-log.read'],
            },
            {
              label: 'system.queues:navItem.label',
              route: 'system.queue',
              icon: 'stream',
              can: ['system/', 'queues.search'],
            },
            {
              label: 'system.routes:navItem.label',
              route: 'system.route',
              icon: 'archway',
              can: ['system/', 'apigw-routes.search'],
            },
          ],
        },

        {
          header: { label: 'compose:navGroup.label' },
          items: [
            {
              label: 'compose.settings:navItem.label',
              route: 'compose.settings',
              icon: 'sliders-h',
              can: ['compose/', 'settings.read'],
            },

            {
              label: 'compose.permissions:navItem.label',
              route: 'compose.permissions',
              icon: 'lock',
              can: ['compose/', 'grant'],
            },
          ],
        },

        {
          header: { label: 'automation:navGroup.label' },
          items: [
            {
              label: 'automation.workflows:navItem.label',
              route: 'automation.workflow',
              icon: 'project-diagram',
              can: ['automation/', 'workflows.search'],
            },

            {
              label: 'automation.sessions:navItem.label',
              route: 'automation.session',
              icon: 'business-time',
              can: ['automation/', 'sessions.search'],
            },

            {
              label: 'automation.scripts:navItem.label',
              route: 'automation.scripts',
              icon: 'scroll',
              can: ['automation/', 'workflows.search'],
            },

            {
              label: 'automation.permissions:navItem.label',
              route: 'automation.permissions',
              icon: 'lock',
              can: ['automation/', 'grant'],
            },
          ],
        },
        {
          header: { label: 'federation:navGroup.label' },
          items: [
            {
              label: 'federation.nodes:navItem.label',
              route: 'federation.nodes',
              icon: 'share-alt',
              can: ['federation/', 'pair'],
            },
            {
              label: 'federation.permissions:navItem.label',
              route: 'federation.permissions',
              icon: 'lock',
              can: ['federation/', 'grant'],
            },
          ],
        },
        {
          header: { label: 'ui:navGroup.label' },
          items: [
            {
              label: 'ui.settings:navItem.label',
              route: 'ui.settings',
              icon: 'eye',
              can: ['system/', 'settings.read'],
            },
          ],
        },
      ],
    }
  },

  computed: {
    ...mapGetters({
      can: 'rbac/can',
    }),

    navigation () {
      return this.nav.map(grp => {
        grp = JSON.parse(JSON.stringify(grp))
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
