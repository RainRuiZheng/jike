<!--
 * @Author: your name
 * @Date: 2021-07-21 10:37:14
 * @LastEditTime: 2021-07-21 18:07:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /online-advisory/Users/zhengrui/Desktop/jike/src/page/0715/index.vue
-->
/* * @Author: your name * @Date: 2021-07-21 10:37:14 * @LastEditTime: 2021-07-21
10:37:15 * @LastEditors: Please set LastEditors * @Description: 作业 请在以下 2
个题目中任选一题解答： 1、链表反转 2、数组中第 K 大的元素 提交链接：
https://jinshuju.net/f/IQnNT9 * @FilePath:
/online-advisory/Users/zhengrui/Desktop/jike/src/page/0715/index.js */
<template>
  <div class="kth">
    <section class="show-area">
      <span>数组：{{ arr }}</span>
    <!--<span>有序数组：{{arr.sort(function(a,b){return b-a})}}</span>-->
      <span class="item">
        寻找数组中第 K 大的元素:<input v-model="k" min="1" :max="arr.length" />
      </span>
      <span class="item">
        <button @click="findKth">计算</button>
      </span>
    </section>
    <section>输出:{{ kth }}</section>
  </div>
</template>

<script>
export default {
  name: "Kth",
  data() {
    let arr = [7, 5, 15, 3, 17, 2, 20, 24, 1, 9, 12, 8];
    return {
      arr,
      k: 0,
      kth: "",
      aLen: arr.length,
    };
  },
  methods: {
    findKth() {
      let mid = this.quickSort(this.arr, 0, this.aLen - 1);
      if (mid > this.aLen - this.k) {
        mid = this.quickSort(this.arr, 0, mid - 1);
      } else if (mid < this.aLen - this.k) {
        mid = this.quickSort(this.arr, mid + 1, this.aLen - 1);
      }

      this.kth = this.arr[mid];
    },
    quickSort( left, right) {
      if (!this.arr) {
        return -1;
      }
      if (left > right) {
        return -1;
      }

      let low = left;
      let high = right;

      // 选择基准数
      let temp = this.arr[left];
      while (low < high) {
        while (low < high && this.arr[high] >= temp) {
          high--;
        }

        while (low < high && this.arr[low] <= temp) {
          low++;
        }

        if (low < high) {
          let t = this.arr[low];
          this.arr[low] = this.arr[high];
          this.arr[high] = t;
        }
      }

      // 到这里说明low==high, 交换基准数和相遇点的位置

      this.arr[left] = this.arr[low];
      this.arr[low] = temp;
      return low;
    },
  },
};
</script>

<style lang="less">
.kth {
  display: flex;
  flex-direction: column;
  padding: 18px;
  .show-area{
      display: flex;
      flex-direction: column;
  }
  .item {
    padding-right: 10px;
  }
}
</style>
