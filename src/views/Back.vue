<template>
  <div>
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-3 mt-4">
          <div class="list-group backList text-center" id="myList" role="tablist">
            <a
              class="list-group-item list-group-item-action active"
              data-toggle="list"
              href="#myOrder"
              role="tab"
              ><i class="far fa-list-alt"></i> 我的訂單
            </a>
            <a
              class="list-group-item list-group-item-action"
              data-toggle="list"
              href="#products"
              role="tab"
              ><i class="fas fa-couch"></i> 商品列表
            </a>
            <a
              class="list-group-item list-group-item-action"
              data-toggle="list"
              href="#coupon"
              role="tab"
              ><i class="fas fa-ticket-alt"></i> 優惠券
            </a>
          </div>
        </div>
        <main class="col-md-9">
          <div class="tab-content back_table">
            <div class="tab-pane active" id="myOrder" role="tabpanel">
              <BackMyOrder></BackMyOrder>
            </div>
            <div class="tab-pane" id="products" role="tabpanel">
              <BackProducts></BackProducts>
            </div>
            <div class="tab-pane" id="coupon" role="tabpanel">
              <BackCoupon></BackCoupon>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import BackMyOrder from '../components/backend/BackMyOrder'
import BackProducts from '../components/backend/BackProducts'
import BackCoupon from '../components/backend/BackCoupon'

export default {
  data () {
    return {}
  },
  components: {
    BackMyOrder,
    BackProducts,
    BackCoupon
  }
}
</script>

<style lang="scss" scoped></style>
