<template>
  <div
    class="d-flex flex-column vh-100 bg-light"
  >
    <c-the-header />

    <div
      class="d-flex flex-row overflow-hidden"
    >
      <c-the-main-nav />

      <main
        class="flex-fill overflow-auto"
      >
        <c-the-alert-container />
        <router-view />
        <permissions-modal />
      </main>
    </div>
  </div>
</template>
<script>
import CTheAlertContainer from '../components/CTheAlertContainer'
import CTheHeader from '../components/CTheHeader'
import CTheMainNav from '../components/CTheMainNav'
import { PermissionsModal } from 'corteza-webapp-common/components'

export default {
  components: {
    PermissionsModal,
    CTheAlertContainer,
    CTheHeader,
    CTheMainNav,
  },
}
</script>
