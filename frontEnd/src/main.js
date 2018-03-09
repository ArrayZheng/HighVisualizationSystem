// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import './element-ui'
import 'element-ui/lib/theme-default/index.css'
import "./locales"
Vue.use(Vuex);
Vue.config.productionTip = false;

// 路由跳转
Vue.prototype.$goRoute = function (index) {
  this.$router.push(index);
}
//全局配置axios
import axios from './axios/axios'
Vue.prototype.$axios=axios;
axios.baseConfig({}).then(function (response) {
  axios.setBaseURL(response.data.baseUrl);
  Vue.prototype.$localServerUrl=axios.getBaseURL();
  Vue.config.lang = response.data.locales;
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
  });
}).catch(function(error){
  console.log(error)
})
