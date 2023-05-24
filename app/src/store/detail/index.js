// 引入接口
import { reqGetGoodsInfo, reqAddOrUpdateShopCart } from '@/api/index'
// 封装游客身份模块uuid--> 生成一个随机字符串(生成之后不能再改变)
import { getUUID } from "@/utils/uuid_token"

const state = {
  goodInfo: {},
  // 游客的临时身份
  uuid_token: getUUID(),
};
const actions = {
  // 获取产品信息的action
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGetGoodsInfo(skuId);
    if (result.code === 200) {
      commit("GETGOODINFO", result.data)
    }
  },
  // 将产品添加到购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    // 加入购物车返回的结果
    // 加入购物车以后(发送请求),前台将参数带给服务器，服务器写入数据成功，并没有返回其他多余的数据，只是返回code=200，代表这次操作成功
    // 因为服务器没有返回其余的数据，因此我们不需要在仓库中存储数据
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    // console.log(result);
    // 当前这个函数如果执行返回的是一个Promise
    if (result.code == 200) {   // 代表服务器加入购物车成功
      return Promise.resolve("OK");
    } else {   // 代表服务器写入数据失败
      return Promise.reject(new Error("失败啦！！"));
    }
  }
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  }
};
// 简化数据
const getters = {
  // 路径导航简化的数据
  categoryView(state) {
    // 比如：state.goodInfo 初始状态为空对象，空对象的categoryView属性值为undefined
    // 当前返回的categoryView属性值至少是一个空对象，假的报错就不会有了
    return state.goodInfo.categoryView || {};
  },
  // 简化产品信息的数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  // 产品售卖属性的简化(颜色、内存等等)
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  }
};

export default {
  state,
  actions,
  mutations,
  getters
}