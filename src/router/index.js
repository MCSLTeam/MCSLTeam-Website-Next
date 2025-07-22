import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import About from '../views/About.vue'
import Partners from '../views/Partners.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/partners',
    name: 'Partners',
    component: Partners
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, __, savedPosition) {
    // 如果有保存的位置（比如浏览器前进/后退），使用保存的位置
    if (savedPosition) {
      return savedPosition
    }
    // 否则滚动到页面顶部
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
