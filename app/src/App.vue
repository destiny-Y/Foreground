<template>
  <div id="app">
    <Header />
    <!-- 路由组件 -->
    <router-view></router-view>
    <!-- 在home或search显示的，在登录、注册隐藏 -->
    <!-- 通过路由路径判断 -->
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"/> -->
    <!-- 通过路由元信息来判断 -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  // 派发一个请求action，获取商品分类的三级列表的数据(减少发请求的次数，优化性能)
  mounted() {
    // 通知Vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
