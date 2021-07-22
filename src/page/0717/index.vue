<!--
 * @Author: your name
 * @Date: 2021-07-21 18:10:18
 * @LastEditTime: 2021-07-22 09:59:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 let tmpl = `<div class="newslist">
    <div class="img" v-if="info.showImage"><img src="{{image}}"/></div>
    <div class="date" v-if="info.showDate">{{info.name}}</div>
    <div class="img">{{info.name}}</div>
</div>`;

render(tmpl, {
	image: "some img",
    info: {showImage: true, showDate:false, name: "aaa"}
})
 * @FilePath: /online-advisory/Users/zhengrui/Desktop/jike/src/page/0717/index.vue
-->

<template>
  <div class="tmpl"></div>
</template>

<script>
import Engine from "./engine";
export default {
  name: "Tmpl",

  mounted() {
    let tmpl = `<div class="newslist">
                    <div class="img" v-if="info.showImage"><img src="{{image}}"/></div>
                    <div class="date" v-if="info.showDate">{{info.name}}</div>
                    <div class="img">{{info.name}}</div>
                </div>`;

    let data = {
      image: require("./gift.png"),
      info: { showImage: true, showDate: false, name: "aaa" },
    };
    const engine = new Engine();
    let dom = engine.render(tmpl, data);
    console.log(dom);
      document.querySelector(".tmpl").appendChild(dom);
  },
};
</script>

<style lang="less">
.tmpl {
  display: flex;
  flex-direction: column;
  padding: 18px;
}
</style>
