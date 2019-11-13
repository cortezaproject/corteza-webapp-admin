<template>
  <div
    class="d-flex flex-column vh-100 bg-light"
  >
    <span
      class="p-1 position-fixed text-black text-sm"
      style="bottom: 0px; right: 0px; z-index: 0; opacity: .3"
    >
      {{ frontendVersion }}
    </span>

    <c-the-header />

    <div
      class="d-flex flex-row overflow-hidden"
    >
      <c-the-main-nav />

      <main
        class="flex-fill overflow-auto pb-5"
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

  data () {
    return {
      /* eslint-disable no-undef */
      frontendVersion: VERSION,
    }
  },
}
</script>
