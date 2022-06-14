<template>
  <b-container
    class="py-3 h-100"
  >
    <c-content-header
      :title="$t('title')"
    />

    <div
      class="d-flex flex-column h-100"
    >
      <c-connection-basic-info
        class="mb-4"
      />

      <c-external-connection-list
        class="mb-4 flex-fill"
      />

      <!-- <c-federated-node-list /> -->
    </div>
  </b-container>
</template>
<script>
import CConnectionBasicInfo from 'corteza-webapp-admin/src/components/Connection/CConnectionBasicInfo'
import CExternalConnectionList from 'corteza-webapp-admin/src/components/Connection/CExternalConnectionList'
// import CFederatedNodeList from 'corteza-webapp-admin/src/components/Connection/CFederatedNodeList'

export default {
  name: 'Connection',

  components: {
    CConnectionBasicInfo,
    CExternalConnectionList,
    // CFederatedNodeList,
  },

  i18nOptions: {
    namespaces: 'system.connections',
    keyPrefix: 'list',
  },
}
</script>
