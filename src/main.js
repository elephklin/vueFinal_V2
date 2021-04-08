import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueCarousel from 'vue-carousel'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import VeeValidate from 'vee-validate'
import VueI18n from 'vue-i18n'
import zhTW from 'vee-validate/dist/locale/zh_TW'

import App from './App.vue'
import router from './router'
import store from './store'
import './bus'
import currencyFormat from './filters/currency'
import dateFormat from './filters/date'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.component('Loading', Loading)
Vue.filter('currency', currencyFormat)
Vue.filter('date', dateFormat)

Vue.use(VueI18n)

Vue.use(VueCarousel)

Vue.use(VueAwesomeSwiper)

axios.defaults.withCredentials = true

const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur',
  i18n,
  dictionary: {
    zhTW
  }
})

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_API}/api/user/check`
    axios.post(api).then((response) => {
      if (response.data.success) {
        next()
      } else {
        alert('請重新登入')
        next({
          path: '/'
        })
      }
    })
  } else {
    next()
  }
})
