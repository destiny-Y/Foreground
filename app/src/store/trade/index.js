import { reqAddressInfo, reqOrderInfo } from '@/api';

const state = {
  address: [],
  orderInfo: {},
};

const actions = {
  // 获取用户地址信息
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo();
    // console.log(result);
    if (result.code == 200) {
      commit("GETUSERADDRESS", result.data);
      return "ok";
    }
    else {
      return Promise.reject(new Error(result.message));
    }
  },
  // 获取商品清单的数据
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();
    // console.log(result);
    if (result.code == 200) {
      commit("GETORDERINFO", result.data);
      return "ok";
    }
    else {
      return Promise.reject(new Error(result.message));
    }
  }
};

const mutations = {
  // 用户地址信息
  GETUSERADDRESS(state, address) {
    state.address = address;
  },
  // 商品清单的数据
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  }
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters
}