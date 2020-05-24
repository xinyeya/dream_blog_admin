import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/article')
      },
      {
        path: '/label',
        name: 'label',
        component: () => import('@/views/label')
      },
      {
        path: 'user_info',
        name: 'userInfo',
        component: () => import('@/views/userinfo')
      },
      {
        path: '/music',
        name: 'music',
        component: () => import('@/views/music')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
