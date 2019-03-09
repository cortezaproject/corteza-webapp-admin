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
        { path: 'roles',
          name: 'roles',
          component: view('Roles/Index'),
          children: [
            { path: ':roleID', name: 'roles.role', component: view('Roles/Role'), props: true, canReuse: false },
          ],
        },
        { path: 'users',
          name: 'users',
          component: view('Users/Index'),
          children: [
            { path: ':userID', name: 'users.user', component: view('Users/User'), props: true },
          ],
        },
        { path: 'permissions',
          name: 'permissions',
          component: view('Permissions/Index'),
          children: [
            { path: ':roleID', name: 'permissions.per-role', component: view('Permissions/PerRole'), props: true },
          ],
        },
        { path: 'applications',
          name: 'applications',
          component: view('Applications/Index'),
          children: [
            { path: ':applicationID', name: 'applications.application', component: view('Applications/Application'), props: true },
          ],
        },
      ],
    },

    {
      path: '*',
      redirect: { name: 'root' },
    },
  ],
})
