<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="Product">
      <div class="Product__wall mb-5">
        <div class="Product__wall__title">
          <h2>商品細節</h2>
        </div>
      </div>
      <div class="container pb-5">
        <div class="row">
          <div class="col-md-7 mb-5">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <router-link to="/">首頁</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link to="/productlist/全部分類">商品列表</router-link>
                </li>
                <li class="breadcrumb-item active text-other">{{ product.title }}</li>
              </ol>
            </nav>
          </div>

          <div class="col-md-12 single_product">
            <div class="row">
              <div class="col-sm-12 col-md-7">
                <img class="img-fluid rounded" alt="商品圖片" :src="product.imageUrl" />
              </div>
              <div class="col-sm-12 col-md-5">
                <div class="badge badge-other mb-3">{{ product.category }}</div>
                <div class="h2 text-major">{{ product.title }}</div>
                <hr>
                <div
                  class="row justify-content-between align-items-baseline mb-3"
                >
                  <div class="col-md-12 col-lg-7">
                    <div class="h4 text-other">
                      NT {{ product.price | currency }} 元
                    </div>
                  </div>
                  <div class="col-md-12 col-lg-5">
                    <del class="h6 text-major">
                      NT {{ product.origin_price | currency }} 元
                    </del>
                  </div>
                </div>

                <form>
                  <div class="form-group">
                    <select class="form-control" id="exampleFormControlSelect1">
                      <option>黑色</option>
                      <option>白色</option>
                      <option>灰色</option>
                    </select>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <a
                        href="#"
                        id="button-addon1"
                        class="btn btn-outline-secondary"
                        :class="{ disabled: quantity === 1 }"
                        @click.prevent="quantity = quantity - 1"
                        >−
                      </a>
                    </div>
                    <input
                      type="number"
                      min="1"
                      class="form-control text-center"
                      v-model.number="quantity"
                    />
                    <div class="input-group-append">
                      <a
                        href="#"
                        id="button-addon2"
                        class="btn btn-outline-secondary"
                        :class="{ disabled: quantity === 99 }"
                        @click.prevent="quantity = quantity + 1"
                        >+
                      </a>
                    </div>
                  </div>
                </form>

                <a
                  class="btn btn-other w-100 mt-5"
                  href="#"
                  role="button"
                  @click.prevent="addCart(product.id, quantity)"
                >
                  <i class="fas fa-cart-plus"></i> 加入購物車
                </a>
              </div>
            </div>
          </div>

          <div class="col-md-12 product_detail">
            <nav class="mt-5">
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a
                  class="nav-item nav-link active"
                  id="nav-home-tab"
                  data-toggle="tab"
                  href="#nav-home"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                  >商品說明
                </a>

                <a
                  class="nav-item nav-link"
                  id="nav-profile-tab"
                  data-toggle="tab"
                  href="#nav-profile"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                  >購買資訊</a
                >

                <a
                  class="nav-item nav-link"
                  id="nav-contact-tab"
                  data-toggle="tab"
                  href="#nav-contact"
                  role="tab"
                  aria-controls="nav-contact"
                  aria-selected="false"
                  >物流說明</a
                >
              </div>
            </nav>

            <div class="tab-content" id="nav-tabContent">
              <div
                class="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <table class="table">
                  <tbody>
                    <tr>
                      <th>商品材質</th>
                      <td>{{ goods.material }}</td>
                    </tr>
                    <tr>
                      <th>製造方式</th>
                      <td>{{ goods.makeMethod }}</td>
                    </tr>
                    <tr>
                      <th>商品產地</th>
                      <td>{{ goods.originPlace }}</td>
                    </tr>
                    <tr>
                      <th>庫存</th>
                      <td>剩餘 {{ goods.inventory }} 件</td>
                    </tr>
                    <tr>
                      <th>商品熱門度</th>
                      <td>已售出 {{ goods.saleHot }} 件</td>
                    </tr>
                    <tr>
                      <th>商品特色</th>
                      <td>{{ goods.itemFeature }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                class="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                <table class="table">
                  <tbody>
                    <tr>
                      <th>付款方式</th>
                      <td>{{ buyData.payMethod }}</td>
                    </tr>
                    <tr>
                      <th>退換貨須知</th>
                      <td>{{ buyData.goodsReturnChange }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                class="tab-pane fade"
                id="nav-contact"
                role="tabpanel"
                aria-labelledby="nav-contact-tab"
              >
                <table class="table">
                  <tbody>
                    <tr>
                      <th>配送注意</th>
                      <td>{{ logistics.deliveryNotice }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="col-md-12 evaluateGoods mt-5">
            <h3 class="text-other text-left mb-4">評價區</h3>
            <div class="row">
              <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div class="card">
                  <div class="card-body">
                    <p class="card-text">很棒喔！下次會選擇購買其他商品</p>
                    <div class="user mt-5">
                      <img src="https://upload.cc/i1/2021/02/19/NhYUdK.png" class="user_img" alt="顧客大頭貼">
                      <div>
                        <div class="user_stars mb-2 text-warning">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                        </div>
                        <div class="user_data">
                          <p class="user_name mb-0">傑森</p>
                          <p class="user_date mb-0">2021/02/19</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div class="card">
                  <div class="card-body">
                    <p class="card-text">商品包裝用心、品質不錯</p>
                    <div class="user mt-5">
                      <img src="https://upload.cc/i1/2021/02/19/kwm0Xd.png" class="user_img" alt="顧客大頭貼">
                      <div>
                        <div class="user_stars mb-2 text-warning">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                        </div>
                        <div class="user_data">
                          <p class="user_name mb-0">珊莎</p>
                          <p class="user_date mb-0">2020/12/01</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div class="card">
                  <div class="card-body">
                    <p class="card-text">交貨速度快，服務周到</p>
                    <div class="user mt-5">
                      <img src="https://upload.cc/i1/2021/02/19/9QABCf.png" class="user_img" alt="顧客大頭貼">
                      <div>
                        <div class="user_stars mb-2 text-warning">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                        </div>
                        <div class="user_data">
                          <p class="user_name mb-0">蜜雪兒</p>
                          <p class="user_date mb-0">2019/11/15</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-12 relatedGoods mt-5">
            <h3 class="text-other text-left mb-4">相關商品</h3>
            <div class="row">
              <div
                class="col-sm-6 col-md-4 col-lg-3 mb-4"
                v-for="item in filterRelated"
                :key="item.id"
              >
                <a class="card card-round" href="#" @click.prevent="goOtherGoods(item.id)" data-toggle="tooltip" data-placement="top" title="點擊查看更多">
                  <div class="card-cover">
                    <div
                      :style="{ backgroundImage: `url(${item.imageUrl})` }"
                      class="card-img"
                    ></div>
                  </div>
                  <div class="card-body">
                    <div class="badge badge-other mb-2">{{ item.category }}</div>
                    <div class="h4 card-title mb-0">{{ item.title }}</div>

                    <div class="d-flex justify-content-between align-items-baseline mt-4">
                      <div class="h5 text-other">
                        NT {{ item.price | currency }}
                      </div>
                      <del class="h6 text-major">
                        {{ item.origin_price | currency }}
                      </del>
                    </div>
                  </div>
                </a>
                <div class="card-footer">
                  <div class="d-flex justify-content-between align-items-baseline">
                    <a href="#" class="btn btn-sm btn-other btn-block" @click.prevent="addCart(item.id, 1)">
                      <i class="fas fa-shopping-cart"></i> 加入購物車
                    </a>
                  </div>
                </div>
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
      products: [],
      productId: '',
      product: {},
      isLoading: false,
      status: false,
      quantity: 1,
      goods: {
        material: '塑膠、金屬、不織布、木材',
        makeMethod: '機器',
        originPlace: '台灣',
        inventory: '5',
        saleHot: '30',
        itemFeature: '方便、實用'
      },
      buyData: {
        payMethod:
          '信用卡/分期, 7-11 ibon 繳費, ATM 轉帳繳費, 全家代碼繳費, LINE Pay',
        goodsReturnChange:
          '退款申請須於收到商品後隔日起算 7 日內提出若申請逾時或不符合退貨政策條件範圍，本公司有權拒絕退貨，敬請見諒!'
      },
      logistics: {
        deliveryNotice:
          '假日快遞休息不配送，運費將依購買總金額及配送地點不同而有所差異。'
      }
    }
  },
  created () {
    const vm = this
    vm.getProductId()
    vm.getProducts()
  },
  methods: {
    getProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/products/all`
      vm.isLoading = true
      vm.$http.get(api).then((response) => {
        vm.products = response.data.products
        vm.isLoading = false
      })
    },
    getProductId () {
      const vm = this
      const id = vm.$route.params.productId
      vm.isLoading = true
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOM}/product/${id}`
      vm.$http.get(api).then((res) => {
        vm.product = res.data.product
        vm.isLoading = false
      })
    },
    goOtherGoods (id) {
      const vm = this
      vm.$router.push(`/product/${id}`)
      vm.getProductId()
    },
    addCart (id, num) {
      this.$bus.$emit('add_cart', id, num)
    }
  },
  computed: {
    // 過濾同種類商品
    filterRelated () {
      const vm = this
      return vm.products.filter((item) => {
        if (item.id !== vm.product.id) {
          return item.category === vm.product.category
        }
      })
    }
  }

}
</script>
