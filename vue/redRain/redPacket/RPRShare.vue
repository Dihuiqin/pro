<template>
  <div class="share-down">
    <a class="lrCenter" href="http://a.app.qq.com/o/simple.jsp?pkgname=net.ghs.app"></a>
  </div>
</template>
<script>
  export default {
    name: 'RPR-share',
    data() {
      return {
        title: '红包雨-分享',
      };
    },
  };
</script>
<style lang="scss" scoped>
  .share-down {
    width: px2vw(750);
    height: 100vh;
    overflow: hidden;
    background: url('/static/img/redPacket/share.png') no-repeat top center/px2vw(750) px2vw(1334) #000;

    a {
      position: absolute;
      left: 0;
      right: 0;
      top: px2vw(824);
      width: px2vw(624);
      height: px2vw(262);
      margin: auto;
    }
  }
</style>
