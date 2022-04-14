<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="title"
    />

    <c-external-datasource-editor-info
      :datasource="datasource"
      :processing="info.processing"
      :success="info.success"
      @submit="onInfoSubmit"
    />

    <c-external-datasource-capabilities
      v-if="datasource && datasourceID"
      :datasource="datasource"
      :processing="capabilities.processing"
      :success="capabilities.success"
      class="mt-4"
      @submit="onCapabilitiesSubmit"
    />
  </b-container>
</template>

<script>
import editorHelpers from 'corteza-webapp-admin/src/mixins/editorHelpers'
import CExternalDatasourceEditorInfo from 'corteza-webapp-admin/src/components/Datasource/External/CExternalDatasourceEditorInfo'
import CExternalDatasourceCapabilities from 'corteza-webapp-admin/src/components/Datasource/External/CExternalDatasourceCapabilities'
import { mapGetters } from 'vuex'

export default {
  components: {
    CExternalDatasourceEditorInfo,
    CExternalDatasourceCapabilities,
  },

  i18nOptions: {
    namespaces: 'system.datasources',
    keyPrefix: 'external',
  },

  mixins: [
    editorHelpers,
  ],

  props: {
    datasourceID: {
      type: String,
      default: undefined,
    },
  },

  data () {
    return {
      datasources: [
        { datasourceID: '1', name: 'Primary Data Lake', dsn: 'postgresql:://*************@dlacke.acme.internnal/acme-db', location: 'Switzerland', ownership: 'ACME Ltd.', sensitiveData: true },
      ],

      datasource: {},

      info: {
        processing: false,
        success: false,
      },

      capabilities: {
        processing: false,
        success: false,
      },
    }
  },

  computed: {
    ...mapGetters({
      can: 'rbac/can',
    }),

    title () {
      return this.datasourceID ? this.$t('title.edit') : this.$t('title.create')
    },
  },

  watch: {
    datasourceID: {
      immediate: true,
      handler (datasourceID) {
        if (datasourceID) {
          this.datasource = this.datasources.find(ds => ds.datasourceID === datasourceID)
        } else {
          this.datasource = {}
        }
      },
    },
  },

  methods: {
    onInfoSubmit (datasource) {
      this.info.processing = true

      this.animateSuccess('info')
      if (datasource.datasourceID) {
        this.toastSuccess(this.$t('notification:datasource.update.success'))
      } else {
        this.toastSuccess(this.$t('notification:datasource.create.success'))
      }
      this.$router.push({ name: 'system.datasource.edit', params: { datasourceID: '1' } })

      this.info.processing = false
    },

    onCapabilitiesSubmit () {
      this.capabilities.processing = true

      this.animateSuccess('capabilities')
      this.toastSuccess(this.$t('notification:datasource.update-capabilities.success'))

      this.capabilities.processing = false
    },
  },
}
</script>
