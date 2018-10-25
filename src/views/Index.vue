<template>
  <div id="app" class="container h-100">
    <div class="row h-100">
      <div class="col-4">
        <div class="side-panel h-100">
          <template v-if="isAuthenticated">
            <p>Hello {{user.name}}</p>
            <a href="/auth/signout">Sign Out</a>
          </template>
          <template v-else>
            <p>You're not signed in</p>
          </template>
        </div>
      </div>
      <div class="col-8">
        <div class="main-view h-100">
          <router-view class="view"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', [
      'user',
      'isAuthenticated',
    ]),
  },
}
</script>

<style scoped>
.side-panel {
  background: #ccc;
  box-shadow: 5px 0 10px rgba(0,0,0,0.15);
}
.side-panel,
.main-view {
  padding: 1em;
  border-right: 1px solid #ccc;
}
</style>
