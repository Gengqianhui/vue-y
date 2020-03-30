import Vue from 'vue'

// 引入挂载组件
import App from './App.vue'
// import TransitionBox from './demo/transition/transitionBox.vue'  // 测试transition标签使用
// import Vuex from './demo/vuex/vuexdemo.vue'  // 测试vuex使用
import Counter from './demo/counter/Counter.vue'  // 测试vuex计数器使用

import router from "./router"
// import store from "./demo/vuex/store/store.js"
// import store from "./demo/counter/store/store.js"
import store from "./store/store.js"

// import Axios from "axios";
import Axios from "./utils/axios.js";
import Jsonp from "jsonp"

Vue.config.productionTip = false

// 将axios和jsonp挂载到vue的实例对象上，在组件中都能调用
Vue.prototype.$axios=Axios
Vue.prototype.$jsonp=Jsonp

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
