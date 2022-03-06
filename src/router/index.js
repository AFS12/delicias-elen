import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'add',
    component: () => import('../components/home')
  },
  {
    path: '/produtos',
    name: 'products',
    component: () => import('../components/products/productList'),
  },
  {
    path: '/vendas',
    name: 'sales',
    component: () => import('../components/transactions/sales'),
  },
  {
    path: '/compras',
    name: 'buy',
    component: () => import('../components/transactions/buy'),
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
