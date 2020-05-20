import Vue from 'vue'
import App from './App.vue'
import {Button, Input, Message, Icon, Upload, ButtonGroup, Notification, MessageBox, Loading, Container,
Row, Col, Menu, MenuItem} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import router from './router'
import {targetURL} from './url'

Vue.config.productionTip = false;
axios.defaults.baseURL = targetURL;
axios.defaults.withCredentials=true;
Vue.prototype.$http=axios;
Vue.use(Button);
Vue.use(Container);
Vue.use(Input);
Vue.use(Icon);
Vue.use(Upload);
Vue.use(ButtonGroup);
Vue.use(Loading);
Vue.use(Col);
Vue.use(Row);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.prototype.$message=Message;
Vue.prototype.$alert=MessageBox.alert;
Vue.prototype.$notify=Notification;


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
