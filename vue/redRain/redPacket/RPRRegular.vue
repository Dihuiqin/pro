<template>
  <div class="rain-regular">
    <div class="content lrCenter">
      <div class="ruleTitle">&nbsp;活动规则</div>
      <div class="tips" v-html="ruleInfo"></div>
      <div class="button lrCenter" @click="hideRegular">我知道了</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'RPR-regular',
    props: ['ruleInfo'],
    data() {
      return {
        title: '红包雨',
      };
    },
    created() {
    },
    methods: {
      /**
       * 返回 - 去主会场
       * 如果入口为主会场，则返回
       * 如果入口为其他区域，则跳转主会场
       */
      hideRegular() {
        this.$emit('hideRegular');
      },
    },
  };
</script>
<style lang="scss" scoped>
  $textColor: #333;
  $timeColor: #f12d18;
  $buttonColor: #f0240c;
  $buttonBgColor: #fff151;

  .rain-regular {
    position: absolute;
    width: px2vw(750);
    height: 100vh;
    overflow: hidden;
    background: url('/static/img/redPacket/regular.png') no-repeat top center/px2vw(750) px2vw(1334) #d80001;

    div {
      background: transparent;
    }

    .content {
      top: px2vw(380);
      width: px2vw(525);
      height: px2vw(396);
      border-radius: px2vw(20);
      text-align: center;

      .ruleTitle {
        line-height: 9vw;
        font-size: px2vw(50);
        color: $timeColor;
      }

      .tips {
        margin-top: px2vw(52);
        width: px2vw(525);
        height: px2vw(400);
        overflow-y: scroll;
        text-align: left;
        line-height: px2vw(50);
        font-size: px2vw(32);
        color: $textColor;

        span {
          color: $timeColor;
        }
      }

      .button {
        top: px2vw(580);
        width: px2vw(440);
        height: px2vw(86);
        line-height: px2vw(86);
        font-weight: 500;
        font-size: px2vw(40);
        border-radius: px2vw(43);
        color: $buttonColor;
        background: $buttonBgColor;
      }
    }
  }
</style>
