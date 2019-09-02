<template>
  <list-with-details :title="$t('automation.manage', { count: scripts.length })"
                     :create-button-label="$t('automation.add')"
                     permissions-resource-type="system:automation-script:*"
                     :permissions-button-label="$t('automation.manage-wc-permissions')"
                     @update="fetch"
                     @create="$router.push({ name: 'automation.script' })">
    <ul class="menu-layer">
      <li v-for="s in scripts" :key="s.scriptID" class="script">
        <router-link :to="{ name: 'automation.script', params: { scriptID: s.scriptID } }">{{ s.name || s.scriptID }}</router-link>
      </li>
    </ul>
  </list-with-details>
</template>

<script>
import ListWithDetails from 'corteza-webapp-admin/src/components/ListWithDetails'

export default {
  components: {
    ListWithDetails,
  },

  data () {
    return {
      scripts: [],
      error: null,
    }
  },

  created () {
    this.fetch()
  },

  methods: {
    onUpdate (e) {
      this.fetch(e)
    },

    onCreate () {
      this.$router.push({ name: 'automation.script' })
    },

    fetch () {
      const filter = {
        incDeleted: false,
      }

      this.$SystemAPI.automationScriptList(filter).then(({ set }) => {
        this.scripts = set
      }).catch(err => {
        this.error = err.message
        console.log(err)
      })
    },
  },
}
</script>
