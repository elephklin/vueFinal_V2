(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6474c32a"],{a434:function(t,e,s){"use strict";var a=s("23e7"),n=s("23cb"),i=s("a691"),c=s("50c4"),o=s("7b0b"),r=s("65f0"),l=s("8418"),u=s("1dde"),d=s("ae40"),p=u("splice"),v=d("splice",{ACCESSORS:!0,0:0,1:2}),h=Math.max,f=Math.min,m=9007199254740991,g="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!p||!v},{splice:function(t,e){var s,a,u,d,p,v,_=o(this),C=c(_.length),b=n(t,C),y=arguments.length;if(0===y?s=a=0:1===y?(s=0,a=C-b):(s=y-2,a=f(h(i(e),0),C-b)),C+s-a>m)throw TypeError(g);for(u=r(_,a),d=0;d<a;d++)p=b+d,p in _&&l(u,d,_[p]);if(u.length=a,s<a){for(d=b;d<C-a;d++)p=d+a,v=d+s,p in _?_[v]=_[p]:delete _[v];for(d=C;d>C-a+s;d--)delete _[d-1]}else if(s>a)for(d=C-a;d>b;d--)p=d+a-1,v=d+s-1,p in _?_[v]=_[p]:delete _[v];for(d=0;d<s;d++)_[d+b]=arguments[d+2];return _.length=C-a+s,u}})},b789:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("AlertMessage"),s("loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),s("div",{staticClass:"cart__wrap"},[s("div",{staticClass:"container py-5"},[s("div",{staticClass:"row justify-content-center"},[t._m(0),s("div",{staticClass:"col-sm-12 col-md-10"},[s("div",{staticClass:"cart__table"},[s("table",{staticClass:"table table-hover"},[t._m(1),s("tbody",t._l(t.cart.carts,(function(e){return s("tr",{key:e.id},[s("td",{staticClass:"align-middle"},[s("div",{staticClass:"d-flex justify-content-start"},[s("div",{staticClass:"imgSize img-fluid",style:"background-image:url('"+e.product.imageUrl+"');"}),s("div",{staticClass:"align-self-center ml-sm-4"},[s("span",[t._v(t._s(e.product.title))]),e.coupon?s("div",{staticClass:"text-success"},[t._v(" 已套用優惠券 ")]):t._e()])])]),s("td",{staticClass:"align-middle text-right"},[t._v(" "+t._s(t._f("currency")(e.product.price))+" ")]),s("td",{staticClass:"align-middle"},[s("div",{staticClass:"d-flex justify-content-start text-center"},[s("select",{directives:[{name:"model",rawName:"v-model",value:e.qty,expression:"item.qty"}],staticClass:"form-control",staticStyle:{"text-align":"center","text-align-last":"center"},attrs:{id:"cartNum"},on:{change:[function(s){var a=Array.prototype.filter.call(s.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(e,"qty",s.target.multiple?a:a[0])},function(s){return t.changeCart(e.id,e.qty,e.product_id)}]}},t._l(20,(function(e){return s("option",{key:e,staticClass:"text-center",domProps:{value:e}},[t._v(t._s(e))])})),0),s("div",{staticClass:"align-self-center ml-2 ml-sm-3"},[t._v(" "+t._s(e.product.unit)+" ")])])]),s("td",{staticClass:"align-middle text-right"},[s("span",{},[t._v(t._s(t._f("currency")(e.product.price*e.qty)))])]),s("td",{staticClass:"align-middle text-center"},[s("button",{staticClass:"btn btn-outline-danger btn-sm",attrs:{type:"button"},on:{click:function(s){return s.preventDefault(),t.removeCart(e.id)}}},[s("i",{staticClass:"far fa-trash-alt"})])])])})),0),s("tfoot",[t.cart.final_total===t.cart.total?s("tr",[s("td",{staticClass:"text-right",attrs:{colspan:"6"}},[t._v(" 合計： "),s("span",[t._v(t._s(t._f("currency")(t.cart.total)))])])]):t._e(),t.cart.final_total!==t.cart.total?s("tr",[s("td",{staticClass:"text-right text-secondary",attrs:{colspan:"6"}},[t._v(" 折扣前合計："),s("span",[t._v(t._s(t._f("currency")(t.cart.total)))])])]):t._e(),t.cart.final_total!==t.cart.total?s("tr",[s("td",{staticClass:"h5 text-right",attrs:{colspan:"6"}},[t._v(" 折扣後合計："),s("span",{staticClass:"h4 text-danger"},[t._v(t._s(t._f("currency")(t.cart.final_total)))])])]):t._e()])])]),s("div",{staticClass:"input-group mb-3"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.coupons.code,expression:"coupons.code"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",class:{"is-invalid":t.errors.has("code")},attrs:{name:"code",type:"text",required:"",placeholder:"請輸入優惠碼"},domProps:{value:t.coupons.code},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.useCoupon(e)},input:function(e){e.target.composing||t.$set(t.coupons,"code",e.target.value)}}}),s("div",{staticClass:"input-group-append"},[s("button",{staticClass:"btn btn-outline-major",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.useCoupon(e)}}},[t._v(" 套用優惠碼 ")])])]),t.errors.has("code")?s("div",{staticClass:"text-danger code__feedback"},[t._v(" 建議輸入優惠碼享折扣 ")]):t._e(),s("div",{staticClass:"d-flex justify-content-between mt-5"},[s("router-link",{staticClass:"btn btn-outline-major",attrs:{to:"/productlist/全部分類"}},[t._v("返回繼續購物")]),s("router-link",{staticClass:"btn btn-other",attrs:{to:"/order"}},[t._v("下一步")])],1)])])])])],1)},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"col-sm-12 col-md-10"},[s("ul",{staticClass:"process_style"},[s("li",[s("span",{staticClass:"process_now"},[t._v("1")]),s("p",[t._v("購物車內容")])]),s("li",[s("span",{staticClass:"process_undone"},[t._v("2")]),s("p",[t._v("訂單填寫")])]),s("li",[s("span",{staticClass:"process_undone"},[t._v("3")]),s("p",[t._v("結帳")])])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("thead",[s("tr",[s("th",{attrs:{scope:"col"}},[t._v("商品資訊")]),s("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("單價")]),s("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("數量")]),s("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("小計")]),s("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("操作")])])])}],i=(s("99af"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"message-alert"},t._l(t.messages,(function(e,a){return s("div",{key:a,staticClass:"alert alert-dismissible",class:"alert-"+e.status},[s("div",{staticClass:"alert-body"},[t._v(" "+t._s(e.message)+" "),s("button",{staticClass:"close",attrs:{type:"button","aria-label":"Close"},on:{click:function(e){return t.removeMessage(a)}}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])])})),0)}),c=[],o=(s("4160"),s("a434"),s("159b"),{name:"AlertMessage",data:function(){return{messages:[]}},methods:{updateMessage:function(t,e){var s=Math.floor(new Date/1e3);this.messages.push({message:t,status:e,timestamp:s}),this.removeMessageWithTiming(s)},removeMessage:function(t){this.messages.splice(t,1)},removeMessageWithTiming:function(t){var e=this;setTimeout((function(){e.messages.forEach((function(s,a){s.timestamp===t&&e.messages.splice(a,1)}))}),5e3)}},mounted:function(){var t=this;t.$bus.$on("message:push",(function(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"warning";t.updateMessage(e,s)}))},beforeDestroy:function(){this.$bus.$off()}}),r=o,l=s("2877"),u=Object(l["a"])(r,i,c,!1,null,null,null),d=u.exports,p={data:function(){return{isLoading:!1,quantity:1,cart:{carts:{}},coupons:{code:""}}},created:function(){var t=this;t.getCart()},methods:{getCart:function(){var t=this,e="".concat("https://vue-course-api.hexschool.io","/api/").concat("elephklin","/cart");t.isLoading=!0,t.$http.get(e).then((function(e){e.data.success&&(t.cart=e.data.data),t.isLoading=!1}))},removeCart:function(t){var e=this,s="".concat("https://vue-course-api.hexschool.io","/api/").concat("elephklin","/cart/").concat(t);e.isLoading=!0,e.$http.delete(s).then((function(t){t.data.success&&(e.$bus.$emit("change_cart"),e.getCart(),e.isLoading=!1)}))},changeCart:function(t,e,s){var a=this,n="".concat("https://vue-course-api.hexschool.io","/api/").concat("elephklin","/cart/").concat(t);a.isLoading=!0,a.$http.delete(n).then((function(t){var n={product_id:s,qty:e},i="".concat("https://vue-course-api.hexschool.io","/api/").concat("elephklin","/cart");a.$http.post(i,{data:n}).then((function(t){t.data.success&&(a.$bus.$emit("change_cart"),a.getCart())})),a.isLoading=!1}))},useCoupon:function(){var t=this;t.isLoading=!0;var e="".concat("https://vue-course-api.hexschool.io","/api/").concat("elephklin","/coupon");t.$http.post(e,{data:t.coupons}).then((function(e){e.data.success?(t.getCart(),t.isLoading=!1):(t.$bus.$emit("message:push",e.data.message,"danger"),t.coupons.code="",t.isLoading=!1)}))}},components:{AlertMessage:d}},v=p,h=Object(l["a"])(v,a,n,!1,null,null,null);e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-6474c32a.fd28abbf.js.map