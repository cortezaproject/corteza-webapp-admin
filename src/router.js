import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function view (name, resolve) {
  return function (resolve) {
    return require([`./views/${name}.vue`], resolve)
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin/',
      name: 'root',
      component: view('IndexNestedProtected'),
      children: [
        { path: 'satosa', name: 'satosa', component: view('SATOSA/Index') },
        { path: 'satosa/:name', component: view('SATOSA/Provider') },
        { path: 'users', name: 'users', component: view('Users/Index') },
        { path: 'teams', name: 'teams', component: view('Teams/Index') },
      ],
    },
    {
      path: '/auth',
      component: view('IndexNested'),
      redirect: '/auth/signin',
      children: [
        { path: 'signin', name: 'signin', component: view('Auth/SignIn') },
        { path: 'signout', name: 'signout', component: view('Auth/SignOut') },
      ],
    },
    {
      path: '*',
      redirect: { name: 'root' },
    },
  ],
})
