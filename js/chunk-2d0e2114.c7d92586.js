(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e2114"],{"7cb4":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("loading",{attrs:{active:t.isLoading},on:{"update:active":function(s){t.isLoading=s}}}),e("div",{staticClass:"container pt-5"},[e("div",{staticClass:"row justify-content-center"},[t._m(0),e("div",{staticClass:"col-md-8 my-5"},[!1===t.order.is_paid?e("div",{},[e("form",{},[e("table",{staticClass:"table table-hover checkout_table"},[t._m(1),e("tbody",t._l(t.order.products,(function(s){return e("tr",{key:s.id},[e("td",{staticClass:"align-middle"},[e("div",{staticClass:"d-flex justify-content-start"},[e("div",{staticClass:"imgSize",style:"background-image:url('"+s.product.imageUrl+"');"}),e("div",{staticClass:"align-self-center ml-4"},[e("span",{},[t._v(t._s(s.product.title))])])])]),e("td",{staticClass:"align-middle text-right"},[t._v(" "+t._s(t._f("currency")(s.product.price))+" ")]),e("td",{staticClass:"align-middle text-center"},[t._v(" "+t._s(s.qty)+" / "+t._s(s.product.unit)+" ")]),e("td",{staticClass:"align-middle text-right"},[t._v(" "+t._s(t._f("currency")(s.final_total))+" ")])])})),0),e("tfoot",[e("tr",[e("td",{staticClass:"text-right",attrs:{colspan:"3"}},[t._v("合計")]),e("td",{staticClass:"text-right"},[t._v(t._s(t._f("currency")(t.order.total)))])])])]),e("table",{staticClass:"table my-5 checkout_table"},[t._m(2),e("tbody",[e("tr",[e("th",{attrs:{width:""}},[t._v("購買日期")]),e("td",{},[t._v(t._s(t._f("date")(t.order.create_at)))])]),e("tr",[e("th",[t._v("訂單編號")]),e("td",[t._v(t._s(t.order.id))])]),e("tr",[e("th",{attrs:{width:""}},[t._v("Email")]),e("td",[t._v(t._s(t.order.user.email))])]),e("tr",[e("th",[t._v("姓名")]),e("td",[t._v(t._s(t.order.user.name))])]),e("tr",[e("th",[t._v("收件人電話")]),e("td",[t._v(t._s(t.order.user.tel))])]),e("tr",[e("th",[t._v("收件人地址")]),e("td",[t._v(t._s(t.order.user.address))])]),e("tr",[e("th",[t._v("付款狀態")]),e("td",[t.order.is_paid?e("span",{staticClass:"text-success"},[t._v("付款完成")]):e("span",{staticClass:"text-danger"},[t._v("尚未付款")])])])])]),e("button",{staticClass:"btn btn-other",on:{click:t.payFinish}},[t._v(" 確認付款去 ")])])]):e("div",[t._m(3),e("div",{staticClass:"d-flex justify-content-between mt-5"},[e("router-link",{staticClass:"btn btn-outline-major",attrs:{to:"/"}},[t._v("返回首頁")]),e("router-link",{staticClass:"btn btn-other",attrs:{to:"/productlist/全部分類"}},[t._v("繼續選購")])],1)])])])])],1)},i=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"col-md-10"},[e("div",{staticClass:"row justify-content-around process_style"},[e("div",{staticClass:"col-md-3 p-2 rounded-pill process_undone text-center"},[t._v(" 1.購物車內容 ")]),e("div",{staticClass:"col-md-3 p-2 rounded-pill process_undone text-center my-3 my-md-0"},[t._v(" 2.訂單填寫 ")]),e("div",{staticClass:"col-md-3 p-2 rounded-pill process_now text-center"},[t._v(" 3.結帳 ")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("thead",[e("tr",{},[e("th",{attrs:{width:""}},[t._v("商品資訊")]),e("th",{staticClass:"text-center",attrs:{width:""}},[t._v("單價")]),e("th",{staticClass:"text-center",attrs:{width:""}},[t._v("數量")]),e("th",{staticClass:"text-center",attrs:{width:""}},[t._v("小計")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("thead",[e("tr",{},[e("th",{attrs:{colspan:"2"}},[t._v("訂單資訊")])])])},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"Checkout_wall"},[e("div",{staticClass:"Checkout_wallTitle"},[e("h2",{},[t._v("付款已完成")])])])}],r=(e("99af"),{data:function(){return{isLoading:!1,orderId:"",order:{user:{}},isPaid:!1}},methods:{getOrder:function(){var t=this,s="".concat("https://vue-course-api.hexschool.io","/api/").concat("elephklin","/order/").concat(t.orderId);t.isLoading=!0,t.$http.get(s).then((function(s){s.data.success&&(t.order=s.data.order,t.isPaid=s.data.order.is_paid,t.isLoading=!1)}))},payFinish:function(){var t=this,s="".concat("https://vue-course-api.hexschool.io","/api/").concat("elephklin","/pay/").concat(t.orderId);t.isLoading=!0,t.$http.post(s).then((function(s){s.data.success?(t.isPaid=!0,t.getOrder(),t.isLoading=!1):(t.$bus.$emit("message:push","付款失敗","danger"),t.isLoading=!1)}))}},created:function(){this.orderId=this.$route.params.orderId,this.getOrder()}}),d=r,c=e("2877"),n=Object(c["a"])(d,a,i,!1,null,null,null);s["default"]=n.exports}}]);
//# sourceMappingURL=chunk-2d0e2114.c7d92586.js.map