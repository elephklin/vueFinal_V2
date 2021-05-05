<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <header>

      <nav class="navbar navbar-expand-md container nav__wrap">
        <router-link title="點擊至首頁" class="navbar-brand nav__wrap__logo" to="/">LOGO</router-link>
        <button class="navbar-toggler p-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i class="navbar-toggler-icon mt-2 fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse text-center" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/productlist/全部分類" class="nav-link font-weight-bold">商品</router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="openLoginModal" v-if="!isLogin">
                <i class="fas fa-sign-in-alt"></i> 登入
              </a>
              <a class="nav-link" href="#" @click.prevent="logout" v-if="isLogin">
                <i class="fas fa-sign-out-alt"></i> 登出
              </a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" href="#" to="/admin" v-if="isLogin">
                <i class="fas fa-user"></i> 後台
              </router-link>
            </li>
          </ul>

          <div class="dropdown">
            <button class="btn btn-lg dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-shopping-cart"></i>
              <span class="badge badge-pill badge-danger" v-if="cart.carts.length !== 0">{{ cart.carts.length }}</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right px-2 mt-2" aria-labelledby="dropdownMenuButton">
              <div v-if="cart.final_total !== 0">
                <p class="h5 text-center">選購商品</p>
                <table class="table">
                  <tbody>
                    <tr v-for="item in cart.carts" :key="item.id">
                      <td class="align-middle text-center">
                        <button class="btn btn-outline-danger btn-sm" @click="removeCart(item.id)">
                          <i class="far fa-trash-alt "></i>
                        </button>
                      </td>
                      <td class="align-middle text-center">
                        {{ item.product.title }}
                      </td>
                      <td class="align-middle text-center">
                        {{ item.qty }}/{{ item.product.unit }}
                      </td>
                      <td class="align-middle text-right" v-if="item.product.price">
                        {{ item.total | currency }}
                      </td>
                    </tr>
                    <tr>
                      <td colspan="3" class="text-right">總計</td>
                      <td class="text-right">{{ cart.total | currency }}</td>
                    </tr>
                  </tbody>
                </table>
                <router-link href="#" class="btn btn-other btn-block" to="/cart">
                  結帳去
                </router-link>
              </div>
              <div v-else class="py-2">
                <p class="h2 text-center">尚未選購商品</p>
                <router-link href="#" class="btn btn-other btn-block" to="/productlist/全部分類">
                  來去逛逛
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header mb-3">
              <h5 class="modal-title mx-auto" id="exampleModalLabel">
                管理者登入
              </h5>
              <button type="button" class="close p-0 m-0" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body mx-auto">
              <form @submit.prevent="login">
                <div class="form-group user d-flex">
                  <i class="fas fa-user user_icon"></i>
                  <input type="email" v-model="user.username" class="form-control py-3 rounded-sm placeholder_site user_mail" placeholder="帳號"/>
                </div>
                <div class="form-group key">
                  <i class="fas fa-key key_icon"></i>
                  <input type="password" v-model="user.password" class="form-control py-3 rounded-sm placeholder_site" placeholder="密碼"/>
                </div>
                <button type="submit" class="btn btn-other d-block w-100 border-0 rounded-sm mb-3">
                  登入後台管理
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </header>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'Header',
  data () {
    return {
      isLoading: false,
      isLogin: false,
      user: {
        username: '',
        password: ''
      },
      cart: {
        carts: {}
      },
      products: [],
      category: '',
      categoryItem: [],
      isHide: false
    }
  },

  created () {
    const vm = this
    vm.checklogin()
    vm.getProducts()
    vm.getCart()
    vm.$bus.$on('add_cart', (id, qty) => {
      vm.updateCart(id, qty)
    })
    vm.$bus.$on('change_cart', () => {
      vm.getCart()
    })
  },
  beforeDestroy () {
    this.$bus.$off('add_cart')
    this.$bus.$off('change_cart')
  },

  methods: {
    openLoginModal () {
      $('#loginModal').modal('show')
    },
    login () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/admin/signin`
      vm.isLoading = true
      vm.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          vm.$router.push('/admin')
          $('#loginModal').modal('hide')
          vm.isLogin = true
          vm.isLoading = false
        } else {
          vm.isLoading = false
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    logout () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/logout`
      vm.isLoading = true
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.isLogin = !this.isLogin
          vm.$router.push('/')
          vm.isLoading = false
        }
      })
    },
    checklogin () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/user/check`
      vm.$http.post(api).then((response) => {
        if (response.data.success === true) {
          vm.isLogin = true
        } else {
          vm.isLogin = false
        }
      })
    },

    getCart () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`
      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.cart = res.data.data
        }
        vm.isLoading = false
      })
    },

    updateCart (id, qty = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`
      let cartData = {}
      const sameItem = vm.cart.carts.find((item) => {
        return item.product_id === id
      })
      vm.isLoading = true
      if (!sameItem) {
        cartData = {
          product_id: id,
          qty
        }
        vm.$http.post(api, { data: cartData }).then((res) => {
          if (res.data.success) {
            vm.getCart()
            vm.$bus.$emit('message:push', `" ${res.data.data.product.title} " 已成功加入購物車！`, 'success')
            vm.isLoading = false
          }
        })
      } else {
        const removeApi = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart/${sameItem.id}`
        vm.$http.delete(removeApi).then(() => {
          cartData = {
            product_id: sameItem.product_id,
            qty: sameItem.qty + qty
          }
          vm.$http.post(api, { data: cartData }).then((res) => {
            if (res.data.success) {
              vm.getCart()
              vm.$bus.$emit('message:push', `" ${res.data.data.product.title} " 已成功加入購物車！`, 'success')
            }
          })
          vm.isLoading = false
        })
      }
    },

    removeCart (id) {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart/${id}`
      vm.isLoading = true
      vm.$http.delete(api).then((res) => {
        if (res.data.success) {
          vm.getCart()
          vm.$bus.$emit('message:push', res.data.message, 'success')
          vm.isLoading = false
        }
      })
    },

    getProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/products/all`
      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        vm.products = res.data.products
        vm.isLoading = false
      })
    },
    changeCategory (item) {
      const vm = this
      vm.category = item
    },

    meunSwitch () {
      const vm = this
      vm.isHide = true
    }
  },

  computed: {
    filterCategory () {
      const vm = this
      vm.products.forEach((item) => {
        vm.categoryItem.push(item.category)
      })
      return vm.categoryItem.filter((item, index, ary) => ary.indexOf(item) === index)
    }
  }
}
</script>

<style lang="scss"></style>
