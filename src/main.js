import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import router from './router'
const targetURL = "http://localhost:8080";

Vue.config.productionTip = false;
axios.defaults.baseURL = targetURL;
axios.defaults.withCredentials=true;
Vue.prototype.$http=axios;
Vue.use(ElementUI);

const {createProxyMiddleware} = require('http-proxy-middleware');
Vue.use(
    '/',
    createProxyMiddleware({
      target: targetURL,
      changeOrigin: true
    })
);

new Vue({
    router,
  render: h => h(App),
}).$mount('#app');
