<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @change="updateChecked(cart, $event)"/>
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus', -1, cart)">-</a>
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @change="handler('change', $event.target.value, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cart)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length > 0"
          @change="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// 引入lodash，实现节流
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    // 派发action，发送请求获取数据
    this.getData();
  },
  methods: {
    // 将派发action封装为一个函数，获取个人的购物车数据
    getData() {
      this.$store.dispatch("getCartList");
    },
    // 点击事件和输入框数据改变的回调(修改某一个商品的数量)  节流
    handler: throttle(async function (type, disNum, cart) {
      // type: 为了区分这三个元素
      // disNum: + 变化量 1  - 变化量 -1   input传过来的是最终的个数(并不是变化量),需要后面再处理
      // cart: 需要知道修改的是哪一个商品(要用到id)
      switch (type) {
        // 加号
        case "add":
          disNum = 1;
          break;
        case "mins":
          // 判断商品的数量，大于1才能传递给服务器-1
          /* if(cart.skuNum > 1){
            disNum = -1;
          }else{  // 商品的数量小于等于1,传递给服务器的数据为0
            disNum = 0;
          } */
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // 用户输入非法(带有汉字，字母，字符...)
          if (isNaN(disNum * 1) || disNum < 1) {
            disNum = 0;
          } else {
            // 小数...
            // 带给服务器变化的量：用户输入进来的数 - 商品的起始个数(在cart里面通过skuNum属性可以拿到)
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }
      // 派发action
      try {
        // 表示修改成功
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 再次发送请求获取最新的数据
        this.getData();
      } catch (e) {
        console.log(e.message);
      }
    }, 1000),
    // 删除购物车某一个商品信息的回调
    async deleteCartById(cart) {
      //整理参数
      let skuId = cart.skuId;
      try {
        await this.$store.dispatch("deleteCartListBySkuId", skuId);
        // 删除成功之后再次发送请求获取最新的数据重新展示
        this.getData();
      } catch (e) {
        console.log(e.message);
      }
    },
    // 修改某一个商品的勾选状态
    async updateChecked(cart, event) {
      try {
        // 带给服务器的参数isChecked不是布尔值，应该是0|1
        let checked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateCheckedById", {
          skuId: cart.skuId,
          isChecked: checked,
        });
        // 修改成功,再次发请求获取最新的数据进行展示
        this.getData();
      } catch (e) {
        console.log(e.message);
      }
    },
    // 删除全部已选中的商品(没办法收集到有用的数据，比如id，拿不到商品的id)
    async deleteAllCheckedCart() {
      try {
        // 派发action
        await this.$store.dispatch("deleteAllCheckedCart");
        // 再次发送请求，获取最新的数据
        this.getData();
      } catch (e) {
        alert(e.message);
      }
    },
    // 修改全部商品的选中状态
    async updateAllCartChecked(event) {
      let isChecked = event.target.checked ? "1" : "0";
      try {
        // 派发action
        await this.$store.dispatch("updataAllCartIsChecked", isChecked);
        // 成功之后再次发送请求获取最新的数据
        this.getData();
      } catch (e) {
        alert(e.message);
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    // 最终想要的购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 计算购物车中产品的总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    // 是否全部勾选(全部产品都选中，才勾选)
    isAllChecked() {
      // 遍历数组里面的属性，只要全部元素的isChecked属性都为1，返回true
      // 只要有一个不是1，就会返回false
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>