import Vue from 'vue'
import Router from 'vue-router'

import home from '../views/home'
import content from '../views/content'
import theme from '../views/theme'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/content',
      name: 'content',
      component: content
    },
    {
      path: '/theme',
      name: 'theme',
      component: theme
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
