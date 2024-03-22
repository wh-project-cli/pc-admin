/*** * 生成二维码 * @desc 生成二维码 * @author huangbo * @date 2021年12月28日 *
@param {String} [content] - 内容(url地址) * @param {String} [text] -
显示在二维码上的文字 * @param {String} [logo] - 显示在二维码上的logo图片
-参数说明 * @example调用示例（公共组件提供示例说明） ***/
<template>
  <div class="qrcode-box" id="qrcode" ref="qrcode">
    <img class="qrcode-img" ref="qrcodeImg" alt="二维码图片" />
    <img
      v-if="logo"
      class="qrcode-logo"
      ref="qrcodeLogo"
      :src="logo"
      alt="二维码logo"
    />
  
    <canvas
      :width="width"
      :height="height"
      class="canvas"
      ref="canvas"
    ></canvas>
  </div>
</template>

<script>
  const QRCode = require('qrcode')
  export default {
    name: 'qrcodes',
    props: ['content', 'text', 'logo'],
    data() {
      return {
        option: {
          errorCorrectionLevel: 'H', //纠错等级
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        },
        width: 220,
        height: 220,
      }
    },
    watch: {
      logo: function(val) {
        this.$nextTick(() => {
          this.createQRCode()
        })
      },
    },
    created() {},
    mounted() {
      this.width = this.$refs.qrcode.offsetWidth
      this.height = this.$refs.qrcode.offsetHeight
      this.$nextTick(() => {
        this.createQRCode()
      })
    },
    methods: {
      createQRCode() {
        let qrcodeImg = this.$refs.qrcodeImg
        let qrcodeLogo = this.$refs.qrcodeLogo
        let canvas = this.$refs.canvas
        QRCode.toDataURL(this.content, this.option, (err, url) => {
          qrcodeImg.src = url
          // 画二维码里的logo// 在canvas里进行拼接
          let ctx = canvas.getContext('2d')
          setTimeout(() => {
            //获取图片
            ctx.drawImage(qrcodeImg, 0, 0, this.width, this.height)
            if (this.logo && this.logo.indexOf('.') > -1) {
              //设置logo大小
              let logoPosition = (this.width - 46) / 2 //logo相对于canvas居中定位
              //设置获取的logo将其变为圆角以及添加白色背景
              /* ctx.fillStyle = "#fff";
							ctx.beginPath();
							let h = 46; //圆角高 10为基数(logo四周白色背景为10/2)
							let w = 46; //圆角宽
							let x = logoPosition - 5;
							let y = logoPosition - 5;
							let r = 5; //圆角半径
							ctx.moveTo(x + r, y);
							ctx.arcTo(x + w, y, x + w, y + h, r);
							ctx.arcTo(x + w, y + h, x, y + h, r);
							ctx.arcTo(x, y + h, x, y, r);
							ctx.arcTo(x, y, x + w, y, r);
							ctx.closePath();
							ctx.fill(); */
              ctx.drawImage(qrcodeLogo, logoPosition, logoPosition, 46, 46)
            } else if (this.text) {
              //设置字体
              let fpadd = 10 //规定内间距
              ctx.font = 'bold 16px Arial'
              let tw = ctx.measureText(this.text).width //文字真实宽度
              let ftop = (this.height - 16) / 2 //根据字体大小计算文字top
              let fleft = (this.width - tw) / 2 //根据字体大小计算文字left
              let tp = 16 / 2 //字体边距为字体大小的一半可以自己设置
              ctx.fillStyle = '#fff'
              ctx.fillRect(fleft - tp / 2, ftop - tp / 2, tw + tp, 16 + tp)
              ctx.textBaseline = 'top' //设置绘制文本时的文本基线。
              ctx.fillStyle = '#f40'
              ctx.fillText(this.text, fleft, ftop)
            }
            canvas.style.display = 'none'
            qrcodeImg.src = canvas.toDataURL()
            qrcodeImg.style.display = 'inline-block'
          }, 500)
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .qrcode-box {
    width: 100%;
    padding-bottom: 100%;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    box-sizing: border-box;
    .qrcode-img,
    .qrcode-logo {
      display: none;
      // position: absolute;
      // width: 20%;
      // height: 20%;
      // left: 40%;
      // top: 40%;
    }
    .qrcode-img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 10px;
      box-sizing: border-box;
    }
  }
</style>
