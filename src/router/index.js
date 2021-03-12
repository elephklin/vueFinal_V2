import Vue from 'vue'
import VueRouter from 'vue-router'

// @ 代表 src
import Home from '@/views/Home.vue'
import Back from '@/views/Back.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/admin',
    name: 'Back', // 父層預設子路由
    component: Back,
    meta: { requiresAuth: true }
  },

  {
    path: '/productlist',
    name: 'ProductList',
    component: () => import('@/views/ProductList.vue'),
    children: [
      {
        path: ':category',
        name: 'FilterCategory',
        component: () => import('@/views/ProductList.vue')
      }
    ]
  },

  {
    path: '/product',
    name: 'Product',
    component: () => import('@/views/Product.vue'),
    children: [
      {
        path: ':productId',
        name: 'ProductId',
        component: () => import('@/views/Product.vue')
      }
    ]
  },

  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/Order.vue')
  },
  {
    path: '/checkout/:orderId',
    name: 'Checkout',
    component: () => import('@/views/Checkout.vue')
  },

  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

/*
 * 解決報錯問題：原因是路由重複
 * Error: Avoided redundant navigation to current location
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default router
