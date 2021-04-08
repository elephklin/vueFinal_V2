<template>
  <div class="home">
    <loading :active.sync="isLoading"></loading>

    <carousel
      :per-page="1"
      :navigate-to="someLocalProperty"
      :mouse-drag="true"
      :autoplay="true"
      :autoplayTimeout="5000"
      :loop="true"
      :autoplayHoverPause="false"
      :speed="2000"
      paginationPosition="bottom-overlay"
      paginationActiveColor="#24305E"
      paginationColor="#e0e0e0"
    >
      <slide v-for="(item, index) in slideContent" :key="index">
        <div
          class="carousel-img"
          :style="`background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.3)),url('${item.imgUrl}')`"
        >
          <div class="content text-center">
            <div class="content_text text-light">想輕鬆擁有質感生活嗎？</div>
            <router-link href="#" class="btn btn-other mt-3" to="/productlist/全部分類">
              <i class="fas fa-shopping-cart"></i> 去購物
            </router-link>
          </div>
        </div>
      </slide>
    </carousel>

    <div class="container activity mt-5">
      <h3 class="activity__title text-other mb-3">活動快訊</h3>
      <div class="row justify-content-around">
        <div class="col-md-6">
          <div class="activity__wrap activity__wrap__bgLeft">
            <div class="news text-center">
              <h4>端午節</h4>
              <p>
                即日起到 ~ <span class="text-danger">2021/06/30</span>，於結帳流程中優惠碼輸入 <span class="text-danger">test</span> 即可享有 <span class="text-danger">九折</span> 優惠
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="activity__wrap activity__wrap__bgRight">
            <div class="news text-center">
              <h4>中秋節</h4>
              <p>
                即日起到 ~ <span class="text-danger">2021/09/30</span>，於結帳流程中優惠碼輸入 <span class="text-danger">moon</span> 即可享有 <span class="text-danger">八折</span> 優惠
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container features mt-5">
      <h3 class="features__title mb-3 text-other">商店特色</h3>
      <div class="row align-items-center">
        <div class="col-md-6 mb-4 mb-sm-4 mb-md-0">
          <img class="features__img mx-auto" src="https://upload.cc/i1/2021/01/29/xQB5La.jpg" alt="店鋪諮詢示意圖">
        </div>
        <div class="col-md-6">
          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-6 features__card">
              <h4>
                <i class="fas fa-home"></i> 商品質感又實用
              </h4>
              <p>
                尋找優質材料，經過嚴格的產品測試，用心打造的誠意之作。
              </p>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 features__card">
              <h4>
                <i class="fas fa-money-bill-wave"></i> 價格公開透明
              </h4>
              <p>
                官網透明公開商品價格、來源、詳細的規格材質。
              </p>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 features__card">
              <h4>
                <i class="fas fa-user-tie"></i> 設計師專業諮詢
              </h4>
              <p>
                耐心引導客人的需求，規劃出合適的空間配置，並客製化個人的風格。
              </p>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 features__card">
              <h4>
                <i class="fas fa-truck"></i> 物流快速方便
              </h4>
              <p>
                集貨站點眾多、人力充足、商品運送謹慎小心，帶給客戶最放心的物流品質。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container showGoods mt-5">
      <h3 class="text-other text-left mb-3">熱銷商品</h3>
      <div class="swiper_shell mx-auto">
        <div class="swiper-button swiper-button-left fas fa-angle-double-left fa-2x" slot="button-prev"></div>
        <swiper ref="mySwiper" class="swiper" :options="swiperOption">
          <swiper-slide v-for="(item, index) in products" :key="index">
            <router-link class="card card-round" :to="`/product/${item.id}`" data-toggle="tooltip" data-placement="top" title="點擊查看更多">
              <div class="card-cover">
                <div
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                  class="card-img"
                ></div>
              </div>
              <div class="card-body">
                <div class="badge badge-other mb-2">{{ item.category }}</div>
                <div class="h5 card-title mb-0">{{ item.title }}</div>
                <div class="row mt-4">
                  <div class="col-xl-7">
                    <div class="h5 text-other">NT{{ item.price | currency }}</div>
                  </div>
                  <div class="col-xl-5">
                    <del class="h6 text-major">{{ item.origin_price | currency }}</del>
                  </div>
                </div>
              </div>
            </router-link>
            <div class="card-footer">
              <div
                class="d-flex justify-content-between align-items-baseline"
              >
                <a
                  href="#"
                  class="btn btn-sm btn-other btn-block"
                  @click.prevent="addCart(item.id)"
                  ><i class="fas fa-shopping-cart"></i> 加入購物車</a
                >
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="swiper-button swiper-button-right fas fa-angle-double-right fa-2x" slot="button-next"></div>
      </div>
    </div>

    <div class="container mt-5 pb-5 shop">
      <h3 class="mb-4 text-other">店鋪地址</h3>
      <div class="row">
        <div class="col-sm-12 col-md-6 col-lg-6">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.1470511617913!2d120.35859074770434!3d22.625267699042706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e1b3f790e2ff3%3A0xb81edd0b0258dc0a!2z5aSn5p2x5paH5YyW6Jed6KGT5Lit5b-D!5e0!3m2!1szh-TW!2stw!4v1611910517000!5m2!1szh-TW!2stw" frameborder="0" style="border:0;" aria-hidden="false" tabindex="0"></iframe>
        </div>
        <div class="col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center shop__data">
          <div class="d-flex flex-column justify-content-center">
            <h4 class="mb-5 text-other">高雄鳳山旗艦店</h4>
            <ul>
              <li>
                <i class="text-other fas fa-map-marker-alt pr-3"></i> 地址：高雄市鳳山區光遠路161號
              </li>
              <li>
                <i class="text-other fas fa-clock pr-3"></i>營業時間：每天 9 : 00 ~ 22 : 00 每週三公休
              </li>
              <li>
                <i class="text-other fas fa-user pr-3"></i>負責人：林先生
              </li>
              <li>
                <i class="text-other fas fa-phone pr-3"></i>電話：09-87654321
              </li>
              <li>
                <i class="text-other fas fa-envelope pr-3"></i>信箱：elephant@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

export default {
  name: 'Home',
  data () {
    return {
      isLoading: false,
      products: [],
      coupons: [],
      someLocalProperty: [],
      slideContent: [
        {
          imgUrl: 'https://upload.cc/i1/2021/01/07/7IX5bj.jpg',
          title: ''
        },
        {
          imgUrl: 'https://upload.cc/i1/2021/01/07/1nFEZG.jpg',
          title: ''
        },
        {
          imgUrl: 'https://upload.cc/i1/2021/01/07/6x0mIf.jpg',
          title: ''
        },
        {
          imgUrl: 'https://upload.cc/i1/2021/01/07/sFu8lH.jpg',
          title: ''
        },
        {
          imgUrl: 'https://upload.cc/i1/2021/01/07/jCp2rV.jpg',
          title: ''
        }
      ],

      swiperOption: {
        spaceBetween: 30,
        slidesPerGroup: 3,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 1,
        breakpoints: {
          576: {
            slidesPerView: 2
          },
          768: {
            slidesPerView: 3
          },
          992: {
            slidesPerView: 4
          }
        },
        navigation: {
          prevEl: '.swiper-button-left',
          nextEl: '.swiper-button-right',
          disabledClass: '.swiper-button-disabled'
        }
      }
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

  components: {
    Carousel,
    Slide,
    swiper,
    swiperSlide
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  }
}
</script>
