// 引入接口 
import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"

const state = {
  // 初始数据为一个空数组
  cartList: [],
};
const actions = {
  // 获取购物车列表的数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    // console.log(result);
    if (result.code === 200) {
      commit('GETCARTLIST', result.data);
    }
  },
  // 删除购物车某一个商品的数据
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    // console.log(result);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject("失败啦~~");
    }
  },
  // 修改购物车中商品的勾选状态
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    // console.log(result);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject("失败啦~~~");
    }
  },
  // 删除购物车中所有勾选的商品
  deleteAllCheckedCart({ dispatch, getters }) {
    // context:小仓库，commit【提交mutation修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库的数据】
    // 调用deleteCartListBySkuId，逐个删除选中的商品
    // 获取购物车中全部的产品,遍历
    // 数组，用于接收每一次的返回值
    let promiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch("deleteCartListBySkuId", item.skuId) : "";
      // 将每一次的返回的promise添加到数组当中
      promiseAll.push(promise);
    });
    // 只有全部的p1|p2...都成功，返回的结果才为成功;如果有一个失败，返回的结果即为失败
    return Promise.all(promiseAll);
  },
  // 修改全部商品的选中状态
  updataAllCartIsChecked({ dispatch, state }, isChecked) {
    // 数组
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch("updateCheckedById", { skuId: item.skuId, isChecked });
      promiseAll.push(promise);
    });
    // 最终返回结果
    return Promise.all(promiseAll);
  }
};
const mutations = {
  // 存储数据
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  }
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },

};

export default {
  state,
  actions,
  mutations,
  getters
}