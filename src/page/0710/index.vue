<!--
 * @Author: zhengrui
 * @Date: 2021-07-13 20:07:58
 * @LastEditTime: 2021-07-13 21:27:51
 * @LastEditors: Please set LastEditors
 * @Description: 读取本地图片转换成灰度图保存
    参考：
        https://www.cnblogs.com/zhouyangla/p/7975429.html
        https://blog.csdn.net/weixin_39770416/article/details/111834448
 * @FilePath: /jike/src/page/0710/index.vue
-->
<template>
  <div class="saveGrayImg">
    <section>
      <span class="item">
        <input type="file" name="img" accept="image/*" @change="getPicture" />
      </span>
      <button @click="toSave">保存灰色图片</button>
    </section>
    <section class="view">
      <span class="item">
        <img :src="uploadImg" alt="" class="view-img" />
      </span>
      <span class="item">
        <img :src="uploadImg" alt="" class="view-img-gray" id="imageWrapper" />
      </span>
    </section>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  name: "SaveGrayImg",
  data() {
    return {
      uploadImg: "",
    };
  },
  methods: {
    getPicture(e) {
      //使用 createObjectURL() 或者 FileReader 预览图片
      console.log(e.target.files[0]);
      //预览图片
      this.uploadImg = window.URL.createObjectURL(e.target.files[0]);
    },
    toSave() {
      html2canvas(document.getElementById("imageWrapper")).then((canvas) => {
        let saveUrl = canvas.toDataURL("image/png");
        let aLink = document.createElement("a");
        let blob = this.base64ToBlob(saveUrl);
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", true, true);
        aLink.download = "save.png";
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
        console.log(aLink.href);
        if (aLink.href) {
          console.log("保存成功");
        }
      });
    },
    // 这里把图片转base64
    base64ToBlob(code) {
      let parts = code.split(";base64,");
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    },
  },
};
</script>

<style lang="less">
.saveGrayImg {
  display: flex;
  flex-direction: column;
  padding: 18px;
  .view {
    display: flex;
    flex-direction: column;
    &-img {
      display: block;
      width: 200px;
      &-gray {
        display: block;
        width: 200px;
        filter: gray;
        -webkit-filter: grayscale(1); /* Webkit */
      }
    }
  }
}
</style>
