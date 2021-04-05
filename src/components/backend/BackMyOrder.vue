<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="backOrder__wrap table-responsive my-4">
      <table class="table table-hover">
        <thead>
          <tr>
            <th class="text-nowrap text-center" width="120">購買日期</th>
            <th class="text-center text-nowrap th__hide">訂單編號</th>
            <th class="text-nowrap text-center">購買產品</th>
            <th class="text-nowrap text-center">應付金額</th>
            <th class="text-nowrap text-center">是否付款</th>
            <th class="text-nowrap text-center">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td class="align-middle text-center">
              {{ item.create_at | date }}
            </td>
            <td class="align-middle text-center th__hide">{{ item.id }}</td>
            <td class="text-center">
              <ul class="mb-0">
                <li v-for="i in item.products" :key="i.id">
                  {{ i.product.title }}：{{ i.qty }} {{ i.product.unit }}
                </li>
              </ul>
            </td>
            <td class="align-middle text-right">{{ item.total | currency }}</td>
            <td class="align-middle">
              <div v-if="item.is_paid" class="text-success text-center">
                已付款
              </div>
              <div v-else class="text-danger text-center">
                未付款
              </div>
            </td>
            <td class="align-middle text-center">
              <button
                class="btn btn-other btn-sm"
                @click="openModal(item)"
              >
                編輯
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header">
            <h5 class="modal-title text-major" id="exampleModalLabel">
              編輯訂單
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">x</span>
            </button>
          </div>
          <div class="modal-body w-100">
            <table class="table table-hover mt-3">
              <thead>
                <tr>
                  <th>訂購商品資訊</th>
                  <th class="text-center">單價</th>
                  <th class="text-center">數量</th>
                  <th class="text-center">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-bottom"
                  v-for="item in tempOrder.products"
                  :key="item.id"
                >
                  <td class="align-middle">
                    <div class="d-flex justify-content-start">
                      <div class="imgSize" :style="`background-image:url('${item.product.imageUrl}');`"
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
                  <td class="text-right">{{ tempOrder.total | currency }}</td>
                </tr>
              </tfoot>
            </table>

            <div class="form-row mt-4">
              <form class="col-12 mt-md-2">
                <div class="form-row mb-3">
                  <div class="col-12 h6 my-3 userData">收件人資料</div>
                  <div class="col-md-6">
                    <label for="username">收件人姓名</label>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      id="username"
                      placeholder="輸入姓名"
                      v-model="tempOrder.user.name"
                    />
                  </div>
                  <div class="col-md-6">
                    <label for="usertel">收件人電話</label>
                    <input
                      type="tel"
                      class="form-control form-control-sm"
                      id="usertel"
                      name="tel"
                      placeholder="請輸入電話"
                      v-model="tempOrder.user.tel"
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="useremail">Email</label>
                  <input
                    type="email"
                    class="form-control form-control-sm"
                    name="email"
                    id="useremail"
                    placeholder="請輸入 Email"
                    v-model="tempOrder.user.email"
                  />
                </div>

                <div class="form-group">
                  <label for="useraddress">收件人地址</label>
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    name="address"
                    id="useraddress"
                    placeholder="請輸入地址"
                    v-model="tempOrder.user.address"
                  />
                </div>

                <div class="form-group">
                  <label for="comment">
                    客戶留言
                    <small class="text-muted"></small>
                  </label>
                  <textarea
                    name
                    id="comment"
                    rows="4"
                    cols="30"
                    class="form-control form-control-sm"
                    v-model="tempOrder.message"
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-major"
              data-dismiss="modal"
            >
              關閉
            </button>
            <button type="button" class="btn btn-other" @click="updateOrders">
              儲存變更
            </button>
          </div>
        </div>
      </div>
    </div>

    <Pagination :sendPage="pagination" @changePage="getOrders"></Pagination>
  </div>
</template>

<script>
import $ from 'jquery'
import Pagination from '../Pagination'

export default {
  data () {
    return {
      orders: [],
      tempOrder: {
        user: {
        }
      },
      pagination: {},
      isLoading: false
    }
  },
  components: {
    Pagination
  },
  methods: {
    getOrders (page = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/orders?page=${page}`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
        vm.isLoading = false
      })
    },
    openModal (item) {
      this.tempOrder = { ...item }
      $('#orderModal').modal('show')
    },
    updateOrders () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/admin/order/${vm.tempOrder.id}`
      vm.$http.put(api, { data: vm.tempOrder }).then((response) => {
        vm.getOrders()
        $('#orderModal').modal('hide')
      })
    }
  },

  created () {
    const vm = this
    vm.getOrders()
  }
}
</script>

<style lang="scss" scoped></style>
