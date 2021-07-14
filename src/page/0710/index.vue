<!--
 * @Author: zhengrui
 * @Date: 2021-07-13 20:07:58
 * @LastEditTime: 2021-07-14 18:09:24
 * @LastEditors: Please set LastEditors
 * @Description: 读取本地图片转换成灰度图保存
    参考：
        https://www.cnblogs.com/zhouyangla/p/7975429.html
        https://blog.csdn.net/weixin_39770416/article/details/111834448
 * @FilePath: /jike/src/page/0710/index.vue
-->
<template>
  <div class="saveGrayImg">
    <section class="operation">
      <span class="item">
        <input type="file" name="img" accept="image/*" @change="getPicture" />
      </span>
      <span class="item">
        <button @click="createGSCanvas">canvas灰色图片</button>
      </span>
      <span class="item">
        <button @click="toSave">保存灰色图片</button>
      </span>
    </section>
    <section class="view">
      <span class="item">
        <img :src="uploadImg" alt="" class="view-img" ref="imageWrapper"/>
      </span>
      <!--<span class="item-gray" >
        <img :src="uploadImg" alt="" class="view-img" />
      </span>-->
      <span class="item" ref="canvas">
        <img :src="canvasImg" alt="" class="canvas-img-gray" />
      </span>
    </section>
  </div>
</template>

<script>
export default {
  name: "SaveGrayImg",
  data() {
    return {
      uploadImg: "",
      canvasImg: "",
    };
  },
  methods: {
    /* 读取上传图片 */
    getPicture(e) {
      //使用 createObjectURL() 或者 FileReader 预览图片
      this.uploadImg = window.URL.createObjectURL(e.target.files[0]);
    },
    /* 置灰图片 */
    createGSCanvas() {
      let img=this.$refs.imageWrapper;
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var c = ctx.getImageData(0, 0, img.width, img.height);
      for (let i = 0; i < c.height; i++) {
        for (let j = 0; j < c.width; j++) {
          var x = i * 4 * c.height + j * 4;
          var r = c.data[x];
          var g = c.data[x + 1];
          var b = c.data[x + 2];
          c.data[x] = c.data[x + 1] = c.data[x + 2] = (r + g + b) / 3;
        }
      }

      ctx.putImageData(c, 0, 0, 0, 0, c.width, c.height);
      this.canvasImg=canvas.toDataURL();
    },
    /* 下载置灰的图片 */
    toSave() {
        let aLink = document.createElement("a");
        let blob = this.base64ToBlob(this.canvasImg);
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", true, true);
        aLink.download = "save.png";
        aLink.href = URL.createObjectURL(blob);
        aLink.click();
        if (aLink.href) {
          console.log("保存成功");
        }
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
  .operation{
    display: flex;
    flex-direction: column;
    .item{
       margin: 10px 0;
    }
  }
  .view {
    display: flex;
    flex-direction: column;
    &-img {
      display: block;
      width: 200px;
    }
    .item-gray {
      display: block;
      width: 200px;
      height: 200px;
      filter: gray;
      -webkit-filter: grayscale(1); /* Webkit */

    }
  }
}
</style>
