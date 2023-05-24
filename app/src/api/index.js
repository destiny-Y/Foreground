// 对所有的api接口进行统一管理
import req from './request';
import mockRequest from './mockAjax';

// 三级联动接口
// /api/product/getBaseCategoryList  get  无参数
export const reqBaseCategoryList = () => {
  // 发请求 axios发请求返回的是Promise对象
  return req({ url: "/product/getBaseCategoryList" });
};

// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => {
  return mockRequest.get('/banner');
};

// 获取floor数据
export const reqFloorList = () => {
  return mockRequest.get('/floor');
};

// 获取搜索模块的数据 地址：/api/list  请求方式：POST  需要参数
// 当前函数需不需要外部传进来的参数？
// 当前接口(获取搜索模块的数据)给服务器传递的参数，至少是一个空对象
export const reqGetSerachInfo = (params) => {
  return req({
    url: "/list",
    method: "post",
    data: params
  });
};

// 获取产品详情信息的接口   URL /api/item/${skuId}  请求方式 get
export const reqGetGoodsInfo = (skuId) => {
  return req({
    url: `/item/${skuId}`,
    method: "get",
  })
};

// 将产品添加到购物车中，或者更新购物车中的产品信息
//  /api/cart/addToCart/{ skuId }/{ skuNum }  请求方式 POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return req({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post"
  });
};

// 发送请求获取购物车列表的数据   URL /api/cart/cartList   GET  没有参数
export const reqCartList = () => {
  return req({
    url: "/cart/cartList",
    method: "GET"
  });
};

// 删除购物车商品信息的接口  URL  /api/cart/deleteCart/{skuId}  method:DELETE
export const reqDeleteCartById = (skuId) => {
  return req({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete"
  })
};

// 修改购物车中商品的选中状态  URL /api/cart/checkCart/{skuId}/{isChecked}  method:get
export const reqUpdateCheckedById = (skuId, isChecked) => {
  return req({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get"
  });
};

// 获取手机验证码  URL  /api/user/passport/sendCode/{phone}   请求方式 GET
export const reqGetCode = (phone) => {
  return req({
    url: `/user/passport/sendCode/${phone} `,
    method: "get"
  });
};

// 用户注册  URL /api/user/passport/register   请求方式 POST
export const reqUserRegister = (data) => {
  return req({
    url: "/user/passport/register",
    data,
    method: "post"
  });
};

// 用户登录的接口 URL /api/user/passport/login   method: POST  参数：phone password
export const reqUsrLogin = (data) => {
  return req({
    url: "/user/passport/login",
    data,
    method: "POST"
  });
};

// 通过token获取用户信息  URL /api/user/passport/auth/getUserInfo   method:get  
export const reqUserInfo = () => {
  return req({
    url: "/user/passport/auth/getUserInfo",
    method: "get",
  })
};

// 退出登录  URL /api/user/passport/logout   method get
export const reqSignOut = () => {
  return req({
    url: "/user/passport/logout",
    method: "get"
  });
};

// 获取用户地址信息的接口  URL /api/user/userAddress/auth/findUserAddressList  method  get
export const reqAddressInfo = () => {
  return req({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get"
  })
};

// 获取用户的商品清单信息  URL /api/order/auth/trade  method get
export const reqOrderInfo = () => {
  return req({
    url: "/order/auth/trade",
    method: "get"
  })
};

// 提交订单的接口   URL  /api/order/auth/submitOrder?tradeNo={tradeNo}     method post
export const reqSubmitOrder = (tradeNo, data) => {
  return req({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post"
  });
};

// 获取支付信息  URL /api/payment/wenxin/createNative/{orderId}  GET
export const reqPayInfo = (orderId) => {
  return req({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get"
  });
};

// 获取支付订单状态  URL /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId) => {
  return req({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get"
  });
};

// 获取我的订单列表   URL /api/order/auth/{page}/{limit}   GET
export const reqMyOrderList = (page, limit) => {
  return req({
    url: `/order/auth/${page}/${limit}`,
    method: "get"
  })
}

