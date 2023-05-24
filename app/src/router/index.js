// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
// 引入store
import store from '@/store';

// 使用插件
Vue.use(VueRouter);

// 引入路由配置信息
import routes from './routes';

// 先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
// 第一个参数，告诉原来的push方法,往哪里跳转(传递哪些参数)
// 第二个参数：成功的回调
// 第三个参数：失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // call 与 apply区别：相同点，都可以调用函数一次，都可以改变函数的上下文一次
    // 不同点：call与apply传递参数，call传递参数用逗号隔开，apply方法执行时，要传递数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    // call 与 apply区别：相同点，都可以调用函数一次，都可以改变函数的上下文一次
    // 不同点：call与apply传递参数，call传递参数用逗号隔开，apply方法执行，要传递数组
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { });
  }
}

// 配置路由
let router = new VueRouter({
  // 配置路由
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
});
// 全局守卫  前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to, from, next) => {
  // to: 可以获取到要跳转的目标路由
  // from: 可以获取到从哪个路由跳转而来
  // next: 放行函数  next(path)
  // next("/login");  // 放行到指定的位置
  // next();
  // 用户登录了，才会有token,未登录一定不会有token
  let token = store.state.user.token;
  // 用户信息
  let name = store.state.user.name;
  if (token) {   // 用户已经登录了,不能再去login或者注册界面了
    if (to.path == "/login" || to.path == "/register") {
      next("/");  // 停留在首页
    }
    else {   // 登录了，但是跳转的页面不是login
      if (name) {   // 如果用户名已经存在
        next();
      } else {
        // 没有用户信息,就再次发请求获取用户信息
        try {
          // 获取用户信息成功
          await store.dispatch("getUserInfo");
          // 放行
          next();
        } catch (e) {  // 获取用户信息失败
          // token失效了(清除token，重新登录获取新的token)
          await store.dispatch("userSignOut")
          next("/login");
        }
      }
      next();
    }
  } else {    // 未登录，全部放行
    // 还没有处理完毕，先这样，后期再处理
    // 未登录: 不能去交易相关、不能去支付相关【pay| paysuccess】、不能去个人中心
    // 未登录去上面这些页面，重定向到登录页面
    let toPath = to.path;
    if (toPath.indexOf("/trade") != -1 || toPath.indexOf("/pay") != -1 || toPath.indexOf("/center") != -1) {
      // 
      next("/login?redirect=" + toPath);
    }
    next();
  }
});

export default router;