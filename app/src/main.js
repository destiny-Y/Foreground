import Vue from 'vue'
import App from './App.vue'
// 引入VueRouter
import VueRouter from 'vue-router';
// 引入路由
import router from '@/router';
// 三级联动的组件 -- 注册为全局组件
import TypeNav from '@/components/Type-nav'
// 轮播图的组件 -- 注册为全局组件
import Carousel from '@/components/Carousel';
// 分页器的组件 -- 注册为全局组件
import Pagenation from '@/components/Pagenation';
// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagenation.name, Pagenation);
// 引入mockServer.js
import '@/mock/mockServer';
// 引入Swiper样式
import 'swiper/css/swiper.css';
// 引入仓库
import store from '@/store';
// 统一引入接口
import * as API from '@/api';
// 按需引入elementUI
import { MessageBox } from 'element-ui';
// 引入Vue-lazyload
import VueLazyload from 'vue-lazyload';
// 引入图片(默认对外暴露)
import tu from "@/assets/1.gif"
// 引入表单校验插件
import "@/plugins/validate"

Vue.config.productionTip = false
// 应用插件
Vue.use(VueRouter);
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: tu,
});
// 注册组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;  // 后续组件再使用请求接口时，不需要再次引入了
  },
  // 注册路由 下面的写法是 kv一致，省略v【router】
  router,
  // 注册仓库,组件实例的身上，会多一个属性，$store属性
  store,
}).$mount('#app')
