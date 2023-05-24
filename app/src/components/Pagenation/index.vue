<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)" :class="{active:pageNo == 1}">
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button
      v-for="page in startNumAndEndNum.end" :key="page"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }">
      {{ page }}
    </button>

    <!-- 下 -->
    <button v-if="startNumAndEndNum.end < totalPage -1 ">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)" :class="{active:pageNo == totalPage}">
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNo', pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagenation",
  // 父组件传递给子组件的数据：当前页码、每一页展示多少条数据、数据总数、连续页码数
  props: ["pageNo", "pageSize", "total", "continue"],
  computed: {
    // 计算出总共页码数
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续页码起始的数字与结束的数字【连续的页码数至少是5】
    startNumAndEndNum() {
      // 先定义两个变量，存储起始的数字与结束的数字
      let start = 0;
      let end = 0;
      // const { totalPage,pageNo,continue } = this;
      // 如果数据过少，不够5页(不正常的现象)
      if (this.continue > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        // 总页数大于5(正常现象)
        // 起始数字
        start = this.pageNo - parseInt(this.continue / 2);
        // 结束数字
        end = this.pageNo + parseInt(this.continue / 2);
        // 当起始数字出现为零或者负数的情况
        if (start < 1) {
          start = 1;
          end = this.continue;
        }
        // 当出现结束数字大于总页数的情况
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - this.continue + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background: skyblue;
}
</style>
