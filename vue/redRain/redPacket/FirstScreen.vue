<template>
  <div class="first-screen">
    <div class="red_images fs_bgT fs_bgTMove"></div>
    <div class="red_images fs_bgB fs_bgBMove"></div>
    <div class="red_images fs_redEnve fs_redEnve1"></div>
    <div class="red_images fs_redEnve fs_redEnve2"></div>
    <div class="red_images fs_redEnve fs_redEnve3"></div>
    <div class="red_images fs_redEnve fs_redEnve4"></div>
    <div class="fs_robRule ls_ruleEntrance" @click="showRegular">游戏规则</div>
    <div class="fs_conB">
      <div class="lrCenter fs_btnRobCir fs_btnChange"></div>
      <div class="lrCenter fs_btnRob red_images btnRobZoom">马上<br/>开抢</div>
      <div class="fs_hand red_images fs_handMove"></div>
      <div class="lrCenter fs_btnClk" @click="gameStart"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'RPR-regular',
    data() {
      return {};
    },
    methods: {
      /**
       * 显示活动规则
       */
      showRegular() {
        this.$emit('showRegular');
      },
      /**
       * 点击按钮，开始游戏
       */
      gameStart() {
        this.$emit('gameStart');
      },
    },
  };
</script>
<style lang="scss" scoped>
  $textColor: #333;
  $timeColor: #f12d18;
  $buttonColor: #f0240c;
  $buttonBgColor: #fff151;
  // 由小猪平台迁移过来，数值变化转换规则: 1rem = 10vw

  div,
  p {
    background-color: transparent;
  }

  .first-screen {
    background: url('/static/img/redPacket/fs_bg.jpg') no-repeat center center/px2vw(750) px2vw(1624) #d80001;

    .fs_bgT,
    .fs_bgB {
      width: px2vw(690);
    }

    .fs_bgT {
      height: px2vw(568);
      background-position: left top;
    }

    .fs_bgB {
      bottom: px2vw(240);
      height: px2vw(440);
      background-position: left bottom;
      opacity: 0.6;
    }

    .fs_robRule {
      top: 4.53vw;
      right: 4.53vw;
      width: 22vw;
      text-decoration: underline;
      color: #fff;
      font-size: 5.07vw;
      text-align: right;
    }

    .fs_redEnve {
      width: 26.67vw;
      height: 23.2vw;
      background-position: -15.33vw 0;
      opacity: 0.8;
      -webkit-filter: blur(5px);
      left: 100vw;
    }

    .fs_redEnve1 {
      top: -30vw;
    }

    .fs_redEnve2 {
      top: 20vw;
    }

    .fs_redEnve3 {
      top: 0;
    }

    .fs_redEnve4 {
      top: 40vw;
    }

    .fs_conB {
      width: 100vw;
      height: 46.67vw;
      bottom: 0;

      .fs_btnRobCir {
        top: 0;
        width: 32.27vw;
        height: 32.27vw;
        background: #ffe55c;
        opacity: 0.15;
        border-radius: 50%;
      }

      .fs_btnRob {
        top: 1.87vw;
        width: 29.33vw;
        height: 29.33vw;
        background-position: -109.6vw -3.6vw;
        font-size: 8vw;
        color: #ed1d07;
        text-align: center;
        line-height: 9.07vw;
        padding: 4.8vw 0;
        box-sizing: border-box;
      }

      .fs_hand {
        top: 19vw;
        left: 56vw;
        width: 32.53vw;
        height: 28.53vw;
        background-position: -174.67vw -39.87vw;
      }

      .fs_btnClk {
        top: 0;
        width: 40vw;
        height: 40vw;
      }
    }
  }
</style>
<style>
  /* animals */
  .fs_bgTMove {
    -moz-animation: fs_bgMove 0.7s ease-in-out infinite alternate;
    -webkit-animation: fs_bgMove 0.7s ease-in-out infinite alternate;
    -o-animation: fs_bgMove 0.7s ease-in-out infinite alternate;
    animation: fs_bgMove 0.7s ease-in-out infinite alternate;
  }

  .fs_bgBMove {
    -moz-animation: fs_bgBMove 0.7s ease-in-out infinite alternate;
    -webkit-animation: fs_bgBMove 0.7s ease-in-out infinite alternate;
    -o-animation: fs_bgBMove 0.7s ease-in-out infinite alternate;
    animation: fs_bgBMove 0.7s ease-in-out infinite alternate;
  }

  .fs_redEnve1 {
    -moz-animation: fs_redMove 1.8s ease-in-out 0.5s infinite;
    -webkit-animation: fs_redMove 1.8s ease-in-out 0.5s infinite;
    -o-animation: fs_redMove 1.8s ease-in-out 0.5s infinite;
    animation: fs_redMove 1.8s ease-in-out 0.5s infinite;
    -moz-transform: scale(0.8, 0.8);
    -webkit-transform: scale(0.8, 0.8);
    -o-transform: scale(0.8, 0.8);
    transform: scale(0.8, 0.8);
  }

  .fs_redEnve2 {
    -moz-animation: fs_redMove 1.8s ease-in-out infinite;
    -webkit-animation: fs_redMove 1.8s ease-in-out infinite;
    -o-animation: fs_redMove 1.8s ease-in-out infinite;
    animation: fs_redMove 1.8s ease-in-out infinite;
  }

  .fs_redEnve3 {
    -moz-animation: fs_redMove 1.8s ease-in-out 1s infinite;
    -webkit-animation: fs_redMove 1.8s ease-in-out 1s infinite;
    -o-animation: fs_redMove 1.8s ease-in-out 1s infinite;
    animation: fs_redMove 1.8s ease-in-out 1s infinite;
    -moz-transform: scale(0.5, 0.5);
    -webkit-transform: scale(0.5, 0.5);
    -o-transform: scale(0.5, 0.5);
    transform: scale(0.5, 0.5);
  }

  .fs_redEnve4 {
    -moz-animation: fs_redMove 1.8s ease-in-out 1.4s infinite;
    -webkit-animation: fs_redMove 1.8s ease-in-out 1.4s infinite;
    -o-animation: fs_redMove 1.8s ease-in-out 1.4s infinite;
    animation: fs_redMove 1.8s ease-in-out 1.4s infinite;
    -moz-transform: scale(0.3, 0.3);
    -webkit-transform: scale(0.3, 0.3);
    -o-transform: scale(0.3, 0.3);
    transform: scale(0.3, 0.3);
  }

  .fs_handMove {
    -moz-animation: fs_handMove 1.5s linear infinite;
    -webkit-animation: fs_handMove 1.5s linear infinite;
    -o-animation: fs_handMove 1.5s linear infinite;
    animation: fs_handMove 1.5s linear infinite;
  }

  .btnRobZoom {
    -moz-animation: btnRobZoom 1.5s linear 0.1s infinite;
    -webkit-animation: btnRobZoom 1.5s linear 0.1s infinite;
    -o-animation: btnRobZoom 1.5s linear 0.1s infinite;
    animation: btnRobZoom 1.5s linear 0.1s infinite;
  }

  .fs_btnChange {
    -moz-animation: fs_btnChange 1.5s linear 0.6s infinite;
    -webkit-animation: fs_btnChange 1.5s linear 0.6s infinite;
    -o-animation: fs_btnChange 1.5s linear 0.6s infinite;
    animation: fs_btnChange 1.5s linear 0.6s infinite;
  }

  /* fs_bgMove */
  @-webkit-keyframes fs_bgMove {
    0% {
      -webkit-transform: translate(0, 0) scale(1, 1);
    }

    100% {
      -webkit-transform: translate(3vw, -3vw) scale(0.98, 0.98);
    }
  }

  @keyframes fs_bgMove {
    0% {
      transform: translate(0, 0) scale(1, 1);
    }

    100% {
      transform: translate(3vw, -3vw) scale(0.98, 0.98);
    }
  }

  @-o-keyframes fs_bgMove {
    0% {
      -o-transform: translate(0, 0) scale(1, 1);
    }

    100% {
      -o-transform: translate(3vw, -3vw) scale(0.98, 0.98);
    }
  }

  @-moz-keyframes fs_bgMove {
    0% {
      -moz-transform: translate(0, 0) scale(1, 1);
    }

    100% {
      -moz-transform: translate(3vw, -3vw) scale(0.98, 0.98);
    }
  }

  /* fs_bgBMove */
  @-webkit-keyframes fs_bgBMove {
    0% {
      -webkit-transform: translate(0, 0) scale(1, 1);
    }

    100% {
      -webkit-transform: translate(1.5vw, -1.5vw) scale(0.98, 0.98);
    }
  }

  @keyframes fs_bgBMove {
    0% {
      transform: translate(0, 0) scale(1, 1);
    }

    100% {
      transform: translate(1.5vw, -1.5vw) scale(0.98, 0.98);
    }
  }

  @-o-keyframes fs_bgBMove {
    0% {
      -o-transform: translate(0, 0) scale(1, 1);
    }

    100% {
      -o-transform: translate(1.5vw, -1.5vw) scale(0.98, 0.98);
    }
  }

  @-moz-keyframes fs_bgBMove {
    0% {
      -moz-transform: translate(0, 0) scale(1, 1);
    }

    100% {
      -moz-transform: translate(1.5vw, -1.5vw) scale(0.98, 0.98);
    }
  }

  /* hand move */
  @-webkit-keyframes fs_handMove {
    0% {
      -webkit-transform: translate(0, 0) scale(1, 1);
    }

    15% {
      -webkit-transform: translate(-6vw, -6vw) scale(0.9, 0.9);
    }

    30% {
      -webkit-transform: translate(0, 0) scale(1, 1);
    }

    100% {
      -webkit-transform: translate(0, 0) scale(1, 1);
    }
  }

  @keyframes fs_handMove {
    0% {
      transform: translate(0, 0) scale(1, 1);
    }

    15% {
      transform: translate(-6vw, -6vw) scale(0.9, 0.9);
    }

    30% {
      transform: translate(0, 0) scale(1, 1);
    }

    100% {
      transform: translate(0, 0) scale(1, 1);
    }
  }

  @-o-keyframes fs_handMove {
    0% {
      -o-transform: translate(0, 0) scale(1, 1);
    }

    15% {
      -o-transform: translate(-6vw, -6vw) scale(0.9, 0.9);
    }

    30% {
      -o-transform: translate(0, 0) scale(1, 1);
    }

    100% {
      -o-transform: translate(0, 0) scale(1, 1);
    }
  }

  @-moz-keyframes fs_handMove {
    0% {
      -moz-transform: translate(0, 0) scale(1, 1);
    }

    15% {
      -moz-transform: translate(-6vw, -6vw) scale(0.9, 0.9);
    }

    30% {
      -moz-transform: translate(0, 0) scale(1, 1);
    }

    100% {
      -moz-transform: translate(0, 0) scale(1, 1);
    }
  }

  /* btnRobZoom */
  @-webkit-keyframes btnRobZoom {
    0% {
      -webkit-transform: scale(1, 1);
    }

    15% {
      -webkit-transform: scale(0.92, 0.92);
    }

    30% {
      -webkit-transform: scale(1, 1);
    }

    100% {
      -webkit-transform: scale(1, 1);
    }
  }

  @keyframes btnRobZoom {
    0% {
      transform: scale(1, 1);
    }

    15% {
      transform: scale(0.92, 0.92);
    }

    30% {
      transform: scale(1, 1);
    }

    100% {
      transform: scale(1, 1);
    }
  }

  @-o-keyframes btnRobZoom {
    0% {
      -o-transform: scale(1, 1);
    }

    15% {
      -o-transform: scale(0.92, 0.92);
    }

    30% {
      -o-transform: scale(1, 1);
    }

    100% {
      -o-transform: scale(1, 1);
    }
  }

  @-moz-keyframes btnRobZoom {
    0% {
      -moz-transform: scale(1, 1);
    }

    15% {
      -moz-transform: scale(0.92, 0.92);
    }

    30% {
      -moz-transform: scale(1, 1);
    }

    100% {
      -moz-transform: scale(1, 1);
    }
  }

  /* fs_btnChange */
  @-webkit-keyframes fs_btnChange {
    0% {
      -webkit-transform: scale(0.9, 0.9);
      -webkit-filter: blur(0);
      opacity: 0.3;
    }

    15% {
      -webkit-transform: scale(1.2, 1.2);
      -webkit-filter: blur(1px);
      opacity: 0.1;
    }

    100% {
      -webkit-transform: scale(1.2, 1.2);
      -webkit-filter: blur(8px);
      opacity: 0;
    }
  }

  @keyframes fs_btnChange {
    0% {
      transform: scale(0.9, 0.9);
      -webkit-filter: blur(0);
      opacity: 0.3;
    }

    15% {
      transform: scale(1.2, 1.2);
      -webkit-filter: blur(3px);
      opacity: 0.1;
    }

    100% {
      transform: scale(1.2, 1.2);
      -webkit-filter: blur(8px);
      opacity: 0;
    }
  }

  @-o-keyframes fs_btnChange {
    0% {
      -o-transform: scale(0.9, 0.9);
      -webkit-filter: blur(0);
      opacity: 0.3;
    }

    15% {
      -o-transform: scale(1.2, 1.2);
      -webkit-filter: blur(1px);
      opacity: 0.1;
    }

    100% {
      -o-transform: scale(1.2, 1.2);
      -webkit-filter: blur(8px);
      opacity: 0;
    }
  }

  @-moz-keyframes fs_btnChange {
    0% {
      -moz-transform: scale(0.9, 0.9);
      -webkit-filter: blur(0);
      opacity: 0.3;
    }

    15% {
      -moz-transform: scale(1.2, 1.2);
      -webkit-filter: blur(1px);
      opacity: 0.1;
    }

    100% {
      -moz-transform: scale(1.2, 1.2);
      -webkit-filter: blur(8px);
      opacity: 0;
    }
  }

  /* fs_redMove */
  @-webkit-keyframes fs_redMove {
    0% {
      -webkit-transform: translate(0, 0);
    }

    50% {
      -webkit-transform: translate(-150vw, 150vw);
    }

    100% {
      -webkit-transform: translate(-150vw, 150vw);
    }
  }

  @keyframes fs_redMove {
    0% {
      transform: translate(0, 0);
    }

    50% {
      transform: translate(-150vw, 150vw);
    }

    100% {
      transform: translate(-150vw, 150vw);
    }
  }

  @-o-keyframes fs_redMove {
    0% {
      -o-transform: translate(0, 0);
    }

    50% {
      -o-transform: translate(-150vw, 150vw);
    }

    100% {
      -o-transform: translate(-150vw, 150vw);
    }
  }

  @-moz-keyframes fs_redMove {
    0% {
      -moz-transform: translate(0, 0);
    }

    50% {
      -moz-transform: translate(-150vw, 150vw);
    }

    100% {
      -moz-transform: translate(-150vw, 150vw);
    }
  }
</style>
