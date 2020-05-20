import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
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
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
