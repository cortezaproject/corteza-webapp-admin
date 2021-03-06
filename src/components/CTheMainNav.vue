<template>
  <div
    class="overflow-auto"
  >
    <b-list-group tag="ul">
      <c-main-nav-item
        :label="$t('dashboard:navItem.label')"
        :to="{ name: 'dashboard' }"
        :icon="['fas', 'tachometer-alt']"
      />
    </b-list-group>

    <b-list-group tag="ul">
      <h2 class="small ml-1 mt-2 font-weight-light text-uppercase">
        {{ $t('system:navGroup.label') }}
      </h2>

      <c-main-nav-item
        :label="$t('system.users:navItem.label')"
        :to="{ name: 'system.user' }"
        :icon="['fas', 'users']"
      />

      <c-main-nav-item
        :label="$t('system.roles:navItem.label')"
        :to="{ name: 'system.role' }"
        :icon="['fas', 'hat-cowboy']"
      />

      <c-main-nav-item
        :label="$t('system.applications:navItem.label')"
        :to="{ name: 'system.application' }"
        :icon="['fas', 'th-large']"
      />

      <c-main-nav-item
        :label="$t('system.templates:navItem.label')"
        :to="{ name: 'system.template' }"
        :icon="['fas', 'file-code']"
      />

      <c-main-nav-item
        v-if="canReadSettings.system"
        :label="$t('system.settings:navItem.label')"
        :to="{ name: 'system.settings' }"
        :icon="['fas', 'sliders-h']"
      />

      <c-main-nav-item
        v-if="canGrant.system"
        :label="$t('system.permissions:navItem.label')"
        :to="{ name: 'system.permissions' }"
        :icon="['fas', 'lock']"
      />

      <c-main-nav-item
        v-if="true"
        :label="$t('system.authclients:navItem.label')"
        :to="{ name: 'system.authClient' }"
        :icon="['fas', 'key']"
      />

      <c-main-nav-item
        v-if="canGrant.system"
        :label="$t('system.actionlog:navItem.label')"
        :to="{ name: 'system.actionlog' }"
        :icon="['fas', 'glasses']"
      />

      <c-main-nav-item
        v-if="true"
        :label="$t('system.queues:navItem.label')"
        :to="{ name: 'system.queue' }"
        :icon="['fas', 'stream']"
      />
    </b-list-group>

    <b-list-group
      v-if="canGrant.compose || canReadSettings.compose"
    >
      <h2 class="small ml-1 mt-3 font-weight-light text-uppercase">
        {{ $t('compose:navGroup.label') }}
      </h2>

      <c-main-nav-item
        v-if="canReadSettings.compose"
        :label="$t('compose.settings:navItem.label')"
        :to="{ name: 'compose.settings' }"
        :icon="['fas', 'sliders-h']"
      />

      <c-main-nav-item
        v-if="canGrant.compose"
        :label="$t('compose.permissions:navItem.label')"
        :to="{ name: 'compose.permissions' }"
        :icon="['fas', 'lock']"
      />
    </b-list-group>

    <b-list-group
      v-if="canGrant.automation || canAccess.automation"
    >
      <h2 class="small ml-1 mt-3 font-weight-light text-uppercase">
        {{ $t('automation:navGroup.label') }}
      </h2>

      <c-main-nav-item
        v-if="canAccess.automation"
        :label="$t('automation.workflows:navItem.label')"
        :to="{ name: 'automation.workflow' }"
        :icon="['fas', 'project-diagram']"
      />

      <c-main-nav-item
        v-if="canAccess.automation"
        :label="$t('automation.sessions:navItem.label')"
        :to="{ name: 'automation.session' }"
        :icon="['fas', 'business-time']"
      />

      <c-main-nav-item
        v-if="canAccess.automation"
        :label="$t('automation.scripts:navItem.label')"
        :to="{ name: 'automation.scripts' }"
        :icon="['fas', 'scroll']"
      />

      <c-main-nav-item
        v-if="canGrant.automation"
        :label="$t('automation.permissions:navItem.label')"
        :to="{ name: 'automation.permissions' }"
        :icon="['fas', 'lock']"
      />
    </b-list-group>

    <b-list-group
      v-if="canGrant.federation || canPairNodes()"
    >
      <h2 class="small ml-1 mt-3 font-weight-light text-uppercase">
        {{ $t('federation:navGroup.label') }}
      </h2>

      <c-main-nav-item
        v-if="canPairNodes()"
        :label="$t('federation.nodes:navItem.label')"
        :to="{ name: 'federation.nodes' }"
        :icon="['fas', 'share-alt']"
      />

      <c-main-nav-item
        v-if="canGrant.federation"
        :label="$t('federation.permissions:navItem.label')"
        :to="{ name: 'federation.permissions' }"
        :icon="['fas', 'lock']"
      />
    </b-list-group>
  </div>
</template>
<script>
import CMainNavItem from 'corteza-webapp-admin/src/components/CMainNavItem'
import federationMixin from 'corteza-webapp-admin/src/mixins/federation'

export default {
  components: {
    CMainNavItem,
  },

  mixins: [
    federationMixin,
  ],

  props: {
    access: {
      type: Array,
      required: true,
    },
  },

  data () {
    return {
      canAccess: {
        automation: false,
      },
      canGrant: {
        system: false,
        compose: false,
        federation: false,
        automation: false,
      },
      canReadSettings: {
        system: false,
        compose: false,
        federation: false,
        automation: false,
      },
    }
  },

  watch: {
    access: {
      immediate: true,
      handler () {
        ['system', 'compose', 'federation', 'automation'].forEach(res => {
          this.canAccess[res] = (this.access.find(({ resource, operation }) => resource === res && operation === 'access') || {}).allow
          this.canGrant[res] = (this.access.find(({ resource, operation }) => resource === res && operation === 'grant') || {}).allow
          this.canReadSettings[res] = (this.access.find(({ resource, operation }) => resource === res && operation === 'settings.read') || {}).allow
        })
      },
    },
  },
}
</script>
