<!--
 * @Author: your name
 * @Date: 2021-07-13 13:52:25
 * @LastEditTime: 2021-07-13 14:43:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /online-advisory/Users/zhengrui/Desktop/jike/src/page/0708/index.vue
-->
<template>
  <div class="string10to64">
    <section>
      <span class="item">
        <input v-model="string10" />
      </span>
      <span class="item">
        <button @click="string10to64">进制转换</button>
      </span>
    </section>
    <section>string10to64输出:{{ to64 }}</section>
  </div>
</template>

<script>
export default {
  name: "String10to64",
  data() {
    return {
      string10: "",
      to64: null,
    };
  },
  methods: {
    string10to64() {
      let qutient = Number.parseInt(this.string10);
      if (qutient) {
        let chars = "0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ!@".split("");
        let radix = chars.length;
        let arr = [];
        let mod;
        do {
          mod = qutient % radix;
          qutient = (qutient - mod) / radix;
          arr.unshift(chars[mod]);
        } while (qutient);
        this.to64 = arr.join("");
      } else {
        this.to64 = NaN;
      }
    },
  },
};
</script>

<style lang="less">
.string10to64 {
  display: flex;
  flex-direction: column;
  padding: 18px;
  .item{
      padding-right: 10px;
  }
}
</style>
