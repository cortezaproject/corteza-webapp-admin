import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function view (name, resolve) {
  return function (resolve) {
    return require([`./views/${name}.vue`], resolve)
  }
}

export default new Router({
  base: '/admin',
  mode: 'history',
  routes: [
    { path: '/auth/signin', name: 'signin', component: view('Auth/SignIn') },
    { path: '/auth/signout', name: 'signout', component: view('Auth/SignOut') },

    {
      path: '/',
      name: 'root',
      component: view('Index'),
      children: [
        { path: 'satosa', name: 'satosa', component: view('SATOSA/Index') },
        { path: 'satosa/:name', component: view('SATOSA/Provider'), props: true },
        { path: 'teams',
          name: 'teams',
          component: view('Teams/Index'),
          children: [
            { path: ':teamID', name: 'teams.team', component: view('Teams/Team'), props: true, canReuse: false },
          ],
        },
        { path: 'users',
          name: 'users',
          component: view('Users/Index'),
          children: [
            { path: ':userID', name: 'users.user', component: view('Users/User'), props: true },
          ],
        },
        { path: 'permissions', name: 'permissions', component: view('Permissions/Index') },
      ],
    },

    {
      path: '*',
      redirect: { name: 'root' },
    },
  ],
})
