import { reqGetSerachInfo } from '@/api';
// search模块的小仓库
const state = {
  // 数据的初始状态
  serachList: {},
};
const actions = {
  // 获取search模块中的数据
  async getSearchList({ commit }, params = {}) {
    // reqGetSerachInfo在调用时，要传递一个参数
    // params形参，是当用户派发action的时候，第二个参数传递过来的，且至少是一个空对象
    let result = await reqGetSerachInfo(params);
    // console.log(result);
    if (result.code === 200) {
      commit("GETSERACHLIST", result.data);
    }
  }
};
const mutations = {
  GETSERACHLIST(state, serachList) {
    state.serachList = serachList;
  }
};
// 计算属性(为了简化仓库中的数据)
const getters = {
  goodsList(state) {
    // 这样写是有一个潜在的问题的(当请求失败的时候，返回的是undefined),如果请求数据失败，则返回一个空数组
    return state.serachList.goodsList || [];
  },
  trademarkList(state) {
    // 这样写是有一个潜在的问题的(当请求失败的时候，返回的是undefined)
    return state.serachList.trademarkList || [];
  },
  attrsList(state) {
    // 这样写是有一个潜在的问题的(当请求失败的时候，返回的是undefined)
    return state.serachList.attrsList || [];
  },
};

export default {
  state,
  actions,
  mutations,
  getters
}

