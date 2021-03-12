<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="ProductList_wall mb-5">
            <div class="ProductList_wallTitle">
              <h2 class="">商品列表</h2>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link class="" to="/">首頁</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link class="" to="/productlist/全部分類">商品列表</router-link>
              </li>
              <li class="breadcrumb-item" v-if="category !== ''">
                <span class="text-other">{{ category }}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-md-12 mt-5">
          <div class="row">
            <div
              class="col-sm-6 col-md-4 col-lg-3 mb-5"
              v-for="item in filterProducts"
              :key="item.id"
            >
              <router-link class="card card-round" :to="`/product/${item.id}`" data-toggle="tooltip" data-placement="top" title="點擊查看更多">
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
                    <del class="h6 text-major">
                      {{ item.origin_price | currency }}
                    </del>
                    <div class="h5 text-other">
                      NT {{ item.price | currency }}
                    </div>
                  </div>
                </div>
              </router-link>
              <div class="card-footer">
                <div class="d-flex justify-content-between align-items-baseline">
                  <a href="#" class="btn btn-sm btn-other btn-block" @click.prevent="addCart(item.id)">
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
</template>

<script>

export default {
  data () {
    return {
      products: [],
      isLoading: false,
      category: '全部分類',
      categoryItem: []
    }
  },
  created () {
    const vm = this
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
    addCart (id) {
      this.$bus.$emit('add_cart', id)
    }
  },

  computed: {
    filterCategory () {
      const vm = this
      vm.products.forEach((item) => {
        vm.categoryItem.push(item.category)
      })
      return vm.categoryItem.filter((item, index, ary) => {
        return ary.indexOf(item) === index
      })
    },

    filterProducts () {
      const vm = this
      const selectCategory = vm.$route.params.category
      vm.category = selectCategory
      if (selectCategory === '全部分類') {
        return vm.products
      } else {
        return vm.products.filter((item) => {
          return item.category === selectCategory
        })
      }
    }
  }
}
</script>
