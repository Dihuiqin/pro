<template>
  <div class="rain-error">
    <div class="content lrCenter">
      <div v-if="status === 1"  class="not-begin-tips tips">
        红包雨还没开始哟<br/>
        请在每天的<br/>
        <span>&nbsp;&nbsp;8点、12点、16点、20点<br/></span>再来戳人家哦~<br/>
      </div>
      <div v-if="status === 2" class="no-chance-tips tips">
        别太贪心<br/>
        本时段红包 您已领取完毕！<br/>
        请在每天的<br/>
        <span>&nbsp;&nbsp;8点、12点、16点、20点<br/></span>再来戳人家哦~<br/>
      </div>
      <div class="button lrCenter" @click="goIndex">我知道了</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'RPR-error',
    props: ['status'],
    data() {
      return {
        title: '红包雨',
      };
    },
    created() {
    },
    methods: {
      /**
       * 我知道了 - 去APP index
       */
      goIndex() {
        this.$emit('goIndex');
      },
    },
  };
</script>
<style lang="scss" scoped>
  $colorWhite: #fff;
  $textColor: #333;
  $timeColor: #f12d18;
  $buttonColor: #f0240c;
  $buttonBgColor: #fff151;

  .rain-error {
    position: absolute;
    width: px2vw(750);
    height: 100vh;
    overflow: hidden;
    background: url('/static/img/redPacket/error.png') no-repeat top center/px2vw(750) px2vw(1334) #d80001;

    .content {
      top: px2vw(444);
      width: px2vw(590);
      height: px2vw(396);
      border-radius: px2vw(20);
      background: $colorWhite;
      text-align: center;

      .tips {
        line-height: px2vw(60);
        font-size: px2vw(40);
        background: transparent;
        color: $textColor;

        span {
          color: $timeColor;
        }
      }

      .not-begin-tips {
        padding-top: 9vw;
      }

      .no-chance-tips {
        padding-top: 5vw;
      }

      .button {
        top: px2vw(544);
        width: px2vw(438);
        height: px2vw(84);
        line-height: px2vw(84);
        font-weight: 600;
        font-size: px2vw(34);
        border-radius: px2vw(36);
        color: $buttonColor;
        background: $buttonBgColor;
      }
    }
  }
</style>
