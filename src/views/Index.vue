<template>
  <div id="app" class="main_area container h-100">
    <div class="row h-100">
      <div class="col-4">
        <div class="side-panel h-100">
          <template v-if="isAuthenticated">
            <p>Hello {{currentUser.name}}</p>

            <ul>
              <li v-for="(item, idx) in menu" :key="'side-menu-' + idx">
                <a :href="item.link">{{item.title}}</a>
              </li>
            </ul>

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
import menu from '@/api/menu'
import auth from '@/mixins/auth'

export default {
  mixins: [auth],
  data () {
    return {
      menu: menu,
    }
  },
}
</script>
