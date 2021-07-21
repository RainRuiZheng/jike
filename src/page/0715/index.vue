<!--
 * @Author: your name
 * @Date: 2021-07-21 10:37:14
 * @LastEditTime: 2021-07-21 21:00:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 作业 请在以下 2个题目中任选一题解答： 
 1、链表反转 2、数组中第 K 大的元素
-->
<template>
  <div class="kth">
    <section class="show-area">
      <span>数组：{{ arr }}</span>
      <!--<span>有序数组：{{arr.sort(function(a,b){return b-a})}}</span>-->
      <span class="item">
        寻找数组中第 K 大的元素:<input v-model="k" min="1" :max="arr.length" type="range"/>{{this.k}}
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
      k: 1,
      kth: "",
      aLen: arr.length,
    };
  },
  methods: {
    findKth() {
      let mid = this.quickSort(this.arr, 0, this.aLen - 1);
      while (mid != this.aLen - this.k) {
        if (mid > this.aLen - this.k) {
          mid = this.quickSort(this.arr, 0, mid - 1);
        } else if (mid < this.aLen - this.k) {
          mid = this.quickSort(this.arr, mid + 1, this.aLen - 1);
        }
      }
      this.kth = this.arr[mid]; 
    },
    quickSort(arr, left, right) {
      if (left > right) {
        return -1;
      }

      let low = left;
      let high = right;
      let temp = arr[left];
      while (low < high) {
        while (low < high && arr[high] >= temp) {
          high--;
        }

        while (low < high && arr[low] <= temp) {
          low++;
        }
        console.log('while',low,high,arr)
        if (low < high) {
          let t = arr[low];
          arr[low] = arr[high];
          arr[high] = t;
        }
      }

      arr[left] = arr[low];
      arr[low] = temp;
      console.log('return',low)
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
  .show-area {
    display: flex;
    flex-direction: column;
  }
  .item {
    padding-right: 10px;
  }
}
</style>
