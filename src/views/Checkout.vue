<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="checkout_base">
      <div class="container pt-5">
        <div class="row justify-content-center">
          <div class="col-sm-12 col-md-10">
            <ul class="process_style">
              <li>
                <span class="process_undone">1</span>
                <p>購物車內容</p>
              </li>
              <li>
                <span class="process_undone">2</span>
                <p>訂單填寫</p>
              </li>
              <li>
                <span class="process_now">3</span>
                <p>結帳</p>
              </li>
            </ul>
          </div>
          <div class="col-md-8 mb-5">
            <div v-if="!order.is_paid">
              <form @submit.prevent="payFinish">
                <table class="table table-hover checkout_table">
                  <thead>
                    <tr>
                      <th>商品資訊</th>
                      <th class="text-center">單價</th>
                      <th class="text-center">數量</th>
                      <th class="text-center">小計</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in order.products" :key="item.id">
                      <td class="align-middle">
                        <div class="d-flex justify-content-start">
                          <div
                            class="imgSize"
                            :style="
                              `background-image:url('${item.product.imageUrl}');`
                            "
                          ></div>
                          <div class="align-self-center ml-4">
                            <span>{{ item.product.title }}</span>
                          </div>
                        </div>
                      </td>
                      <td class="align-middle text-right">
                        {{ item.product.price | currency }}
                      </td>

                      <td class="align-middle text-center">
                        {{ item.qty }} / {{ item.product.unit }}
                      </td>

                      <td class="align-middle text-right">
                        {{ item.final_total | currency }}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" class="text-right">合計</td>
                      <td class="text-right">{{ order.total | currency }}</td>
                    </tr>
                  </tfoot>
                </table>
                <table class="table my-5 checkout_table">
                  <thead>
                    <tr>
                      <th colspan="2">訂單資訊</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>購買日期</th>
                      <td>{{ order.create_at | date }}</td>
                    </tr>
                    <tr>
                      <th>訂單編號</th>
                      <td>{{ order.id }}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                      <th>姓名</th>
                      <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                      <th>收件人電話</th>
                      <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                      <th>收件人地址</th>
                      <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                      <th>付款狀態</th>
                      <td>
                        <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
                        <span v-else class="text-success">付款完成</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="text-right">
                  <button type="submit" class="btn btn-other">
                    確認付款去
                  </button>
                </div>
              </form>
            </div>
            <div v-else>
              <div class="Checkout_wall">
                <div class="Checkout_wallTitle">
                  <h2>付款已完成</h2>
                </div>
              </div>
              <div class="d-flex justify-content-between mt-5">
                <router-link to="/" class="btn btn-outline-major">返回首頁</router-link>
                <router-link to="/productlist/全部分類" class="btn btn-other">繼續選購</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isLoading: false,
      orderId: '',
      order: {
        user: {}
      },
      isPaid: false
    }
  },
  methods: {
    getOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/order/${vm.orderId}`
      vm.isLoading = true
      vm.$http.get(api).then((res) => {
        if (res.data.success) {
          vm.order = res.data.order
          vm.isLoading = false
        }
      })
    },

    payFinish () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/pay/${vm.orderId}`
      vm.isLoading = true
      vm.$http.post(api).then(res => {
        if (res.data.success) {
          vm.isLoading = false
          vm.getOrder()
        } else {
          vm.isLoading = false
          vm.$bus.$emit('message:push', '付款失敗', 'danger')
        }
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
