<template>
  <b-container
    class="py-3"
  >
    <c-content-header
      :title="$t('external.title.create')"
    />

    <c-external-data-sources-editor-info
      class="mt-4"
    />
  </b-container>
</template>

<script>
import CExternalDataSourcesEditorInfo from 'corteza-webapp-admin/src/components/DataSources/External/CExternalDataSourcesEditorInfo'

export default {
  i18nOptions: {
    namespaces: 'system.datasources',
  },

  components: {
    CExternalDataSourcesEditorInfo,
  },
}
</script>
