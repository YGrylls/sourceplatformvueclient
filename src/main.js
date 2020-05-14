import Vue from 'vue'
import App from './App.vue'
import {Button, Input, Message, Icon, Upload, ButtonGroup} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import router from './router'
const targetURL = "http://118.178.181.104:8080";

Vue.config.productionTip = false;
axios.defaults.baseURL = targetURL;
axios.defaults.withCredentials=true;
Vue.prototype.$http=axios;
Vue.use(Button);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Upload);
Vue.use(ButtonGroup);
Vue.prototype.$message=Message;

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
