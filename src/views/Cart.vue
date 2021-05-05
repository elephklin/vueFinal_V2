<template>
  <div>
    <AlertMessage />
    <loading :active.sync="isLoading"></loading>
    <div class="cart__wrap">
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-sm-12 col-md-10">
            <ul class="process_style">
              <li>
                <span class="process_now">1</span>
                <p>購物車內容</p>
              </li>
              <li>
                <span class="process_undone">2</span>
                <p>訂單填寫</p>
              </li>
              <li>
                <span class="process_undone">3</span>
                <p>結帳</p>
              </li>
            </ul>
          </div>
          <div class="col-sm-12 col-md-10">
            <div class="cart__table">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">商品資訊</th>
                    <th scope="col" class="text-center">單價</th>
                    <th scope="col" class="text-center">數量</th>
                    <th scope="col" class="text-center">小計</th>
                    <th scope="col" class="text-center">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cart.carts" :key="item.id">
                    <td class="align-middle">
                      <div class="d-flex justify-content-start">
                        <div
                          class="imgSize img-fluid"
                          :style="
                            `background-image:url('${item.product.imageUrl}');`
                          "
                        ></div>
                        <div class="align-self-center ml-sm-4">
                          <span>{{ item.product.title }}</span>
                          <div class="text-success" v-if="item.coupon">
                            已套用優惠券
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-right">
                      {{ item.product.price | currency }}
                    </td>
                    <td class="align-middle">
                      <div class="d-flex justify-content-start text-center">
                        <select
                          style="text-align: center; text-align-last: center;"
                          id="cartNum"
                          class="form-control"
                          v-model="item.qty"
                          @change="changeCart(item.id, item.qty, item.product_id)"
                        >
                          <option class="text-center" :value="num" v-for="num in 20" :key="num">{{ num }}</option>
                        </select>
                        <div class="align-self-center ml-2 ml-sm-3">
                          {{ item.product.unit }}
                        </div>
                      </div>
                    </td>
                    <td class="align-middle text-right">
                      <span class>{{ (item.product.price * item.qty) | currency }}</span>
                    </td>
                    <td class="align-middle text-center">
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm"
                        @click.prevent="removeCart(item.id)"
                      >
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>

                <tfoot>
                  <tr v-if="cart.final_total === cart.total">
                    <td colspan="6" class="text-right">
                      合計：
                      <span>{{ cart.total | currency }}</span>
                    </td>
                  </tr>
                  <tr v-if="cart.final_total !== cart.total">
                    <td colspan="6" class="text-right text-secondary">
                      折扣前合計：<span>{{ cart.total | currency }}</span>
                    </td>
                  </tr>
                  <tr v-if="cart.final_total !== cart.total">
                    <td colspan="6" class="h5 text-right">
                      折扣後合計：<span class="h4 text-danger">{{ cart.final_total | currency }}</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div class="input-group mb-3">
              <input
                name="code"
                type="text"
                class="form-control"
                v-model="coupons.code"
                :class="{ 'is-invalid': errors.has('code') }"
                v-validate="'required'"
                required
                placeholder="請輸入優惠碼"
                @keyup.enter="useCoupon"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-major"
                  @click.prevent="useCoupon"
                  type="button"
                >
                  套用優惠碼
                </button>
              </div>
            </div>
            <div class="text-danger code__feedback" v-if="errors.has('code')">
              建議輸入優惠碼享折扣
            </div>

            <div class="d-flex justify-content-between mt-5">
              <router-link class="btn btn-outline-major" to="/productlist/全部分類">返回繼續購物</router-link>
              <router-link class="btn btn-other" to="/order">下一步</router-link>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertMessage from '@/components/AlertMessage.vue'

export default {
  data () {
    return {
      isLoading: false,
      quantity: 1,
      cart: {
        carts: {}
      },
      coupons: {
        code: ''
      }
    }
  },
  created () {
    const vm = this
    vm.getCart()
  },
  methods: {
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
    removeCart (id) {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart/${id}`
      vm.isLoading = true
      vm.$http.delete(api).then((res) => {
        if (res.data.success) {
          vm.$bus.$emit('change_cart')
          vm.getCart()
          vm.isLoading = false
        }
      })
    },

    changeCart (orderId, num, id) {
      const vm = this
      const removeUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart/${orderId}`
      vm.isLoading = true
      vm.$http.delete(removeUrl).then((res) => {
        const changeData = {
          product_id: id,
          qty: num
        }
        const addUrl = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/cart`

        vm.$http.post(addUrl, { data: changeData }).then((res) => {
          if (res.data.success) {
            vm.$bus.$emit('change_cart')
            vm.getCart()
          }
        })
        vm.isLoading = false
      })
    },

    useCoupon () {
      const vm = this
      vm.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/coupon`
      vm.$http.post(api, { data: vm.coupons }).then((res) => {
        if (res.data.success) {
          vm.getCart()
          vm.isLoading = false
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger')
          vm.coupons.code = ''
          vm.isLoading = false
        }
      })
    }

  },
  components: {
    AlertMessage
  }
}
</script>
