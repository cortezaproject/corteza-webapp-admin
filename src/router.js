import store from '@/store'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function protect (to, from, next) {
  console.log('protect=' + store.getters['auth/isAuthenticated'])
  next(store.getters['auth/isAuthenticated'] ? true : '/auth/signin')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin/',
      name: 'root',
      beforeEnter: protect,
      component: view('Users/Index'),
      children: [
        { path: 'users', name: 'users', component: view('Users/Index') },
        { path: 'teams', name: 'teams', component: view('Teams/Index') },
      ],
    },
    {
      path: '/auth',
      component: view('Auth/Index'),
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

function view (name, resolve) {
  return function (resolve) {
    return require([`./views/${name}.vue`], resolve)
  }
}
