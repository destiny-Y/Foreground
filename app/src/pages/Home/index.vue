<template>
  <div>
    <!-- 三级联动的全局组件(已经注册为全局组件，因此不需要再引入了) -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <!-- Floor这个组件，自己在组件内部是没有发请求的，数据是父组件传给他的 -->
    <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"/>
    <!-- <Floor/> -->
    <Brand/>
  </div>
</template>

<script>
import ListContainer from './ListContainer';
import Recommend from './Recommend';
import Rank from './Rank';
import Like from './Like';
import Floor from './Floor';
import Brand from './Brand';
import {mapState} from 'vuex';

export default {
    name:"Home",
    computed:{
      ...mapState({
        floorList:(state) => state.home.floorList
      })
    },
    components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    mounted(){
      // 派发action，获取floor组件中的数据
      this.$store.dispatch("getFloorList");
      // 获取用户信息，在首页显示
      // this.$store.dispatch("getUserInfo");
    },
}
</script>

<style>

</style>