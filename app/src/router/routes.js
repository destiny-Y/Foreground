// 引入路由组件
/* import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
// 引入二级路由
import GroupOrder from '@/pages/Center/GroupOrder';
import MyOrder from '@/pages/Center/MyOrder'; */

export default [
  {
    path: "/home",
    // 懒加载
    component: () => import("@/pages/Home"),
    meta: { show: true }
  },
  {
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: { show: false }
  },
  {
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: { show: false }
  },
  {
    path: "/search/:keyword?",
    component: () => import("@/pages/Search"),
    meta: { show: true },
    name: "search",
    // 路由组件能不能传递props数据？
    // 第一种：布尔值的写法:只能传params参数
    // props:true,
    // 第二种：对象写法，额外地给路由组件传递一些props
    // props:{a:1,b:2},
    // 第三种：函数写法，常用 可以把params、query参数通过props传递给路由组件
    props: ($route) => {
      return { keyword: $route.params.keyword, k: $route.query.k }
    }
  },
  {
    path: "/detail/:skuId",
    component: () => import("@/pages/Detail"),
    meta: { isShow: true }
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: { isShow: true }
  },
  {
    path: "/shopcart",
    // name:"shopcart",
    component: () => import("@/pages/ShopCart"),
    meta: { isShow: true }
  },
  {
    path: "/trade",
    // name:"trade",
    component: () => import("@/pages/Trade"),
    meta: { isShow: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart") {
        next();
      } else {
        // 中断当前的导航(其他页面来的，停留在当前)
        next(false);
      }
    }
  },
  {
    path: "/pay",
    component: () => import("@/pages/Pay"),
    meta: { isShow: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next(false);
      }
    }
  },
  {
    path: "/paysuccess",
    component: () => import("@/pages/PaySuccess"),
    meta: { isShow: true }
  },
  {
    path: "/center",
    component: () => import("@/pages/Center"),
    meta: { isShow: true },
    // 二级路由组件
    children: [
      {
        path: "myorder",
        component: () => import("@/pages/Center/MyOrder"),
      },
      {
        path: "grouporder",
        component: () => import("@/pages/Center/GroupOrder"),
      },
      {
        path: "/center",
        redirect: "/center/myorder"
      }
    ]
  },
  // 重定向
  {
    path: '*',
    redirect: "/home"
  }
]
