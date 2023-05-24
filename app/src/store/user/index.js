import { reqGetCode, reqUserRegister, reqUsrLogin, reqUserInfo, reqSignOut } from "@/api";
import { setToken, getToken, removeToken } from '@/utils/token';

// 登录与注册的模块
const state = {
  code: "",
  // token:localStorage.getItem("token"),
  token: getToken(),
  //用户名
  nickName: '',
  userInfo: {},
};
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    // 获取验证码的这个接口，会把验证码返回，但是正常情况，后台会把验证码发到用户手机上【省钱】
    let result = await reqGetCode(phone);
    // console.log(result);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("失败啦~~"));
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    // 发请求
    let result = await reqUserRegister(user);
    // console.log(result);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  // 用户登录【token】
  async userLogin({ commit }, data) {
    let result = await reqUsrLogin(data);
    // console.log("用户登录后返回的信息",result);
    // 服务器下发的token，是用户的唯一标识(类似于uuid)
    // 将来通过带token去找服务器要用户的信息进行展示
    if (result.code == 200) {
      commit("USERLOGIN", result.data.token);
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
  // 通过token获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    // console.log("用户信息",result);
    if (result.code == 200) {
      // 提交用户信息
      // 用户已经登录成功并且获取到了token
      // commit("GETUSERINFO",result.data.token);
      commit("GETUSERINFO", result.data.nickName);
      return "ok";
    } else {
      return Promise.reject(new Error("失败啦~~"));
    }
  },
  // 退出登录
  async userSignOut({ commit }) {
    // 只是向服务器发起一次请求，通知服务器清除数据
    let result = await reqSignOut();
    // console.log(result);
    if (result.code == 200) {
      // 清除本地存储的数据
      commit("CLEAR");
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },
};
const mutations = {
  // 存储后台返回的验证码
  GETCODE(state, code) {
    state.code = code;
  },
  // 存储服务器下发的token
  USERLOGIN(state, token) {
    state.token = token;
  },
  // 获取用户的信息
  GETUSERINFO(state, nickName) {
    state.nickName = nickName;
  },
  // 清除本地的用户数据
  CLEAR(state) {
    // 把仓库中相关的用户信息清空，并清除本地存储的token 
    state.token = "";
    state.userInfo = "";
    state.nickName = "";
    // 清空本地存储的token
    removeToken();
  }
};
const getters = {};

export default {
  state,
  actions,
  mutations,
  getters
}