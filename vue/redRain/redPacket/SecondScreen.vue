<template>
  <!--第二屏 倒计时-->
  <div class="second-screen">
    <div class="curtain_bg"></div>
    <div class="red_images ss_ready ab-center"
         :class="{ 'ss_readySca': ss_readyStart }"
         @webkitAnimationEnd="readyEnd"
         @animationend="readyEnd"
    >
    </div>
    <div class="red_images ss_go ab-center"
         :class="{ 'ss_goSca': ss_readyEnd  }"
         @webkitAnimationEnd="countDownEnd"
         @animationend="countDownEnd"
    >
    </div>
  </div>
</template>
<script>
  export default {
    name: 'RPR-regular',
    props: ['screenNum'],
    data() {
      return {
        ss_readyStart: false, // ready 动画开始
        ss_readyEnd: false, // ready 动画结束
      };
    },
    mounted() {
      setTimeout(this.readyGo, 300);
    },
    methods: {
      /**
       * ready 执行动画
       */
      readyGo() {
        this.ss_readyStart = true;
      },
      /**
       * ready 动画结束
       */
      readyEnd() {
        this.ss_readyEnd = true;
      },
      /**
       * 倒计时321 动画结束
       */
      countDownEnd() {
        this.$emit('gameAction');
      },
    },
  };
</script>
<style lang="scss" scoped>
  // 由小猪平台迁移过来，数值变化转换规则: 1rem = 10vw
  div,
  p {
    background-color: transparent;
  }

  /* secondScreen */
  .second-screen {
    .ss_close {
      top: 6.93vw;
      right: 5.87vw;
    }

    .ss_ready {
      opacity: 0;
      width: 64.2vw;
      height: 26.4vw;
      background-position: -122vw -78.8vw;
    }

    .ss_go {
      opacity: 0;
      width: 47.2vw;
      height: 33.6vw;
      background-position: -150.13vw 0;
    }
  }

</style>
<style>
  .ss_readySca {
    -webkit-animation: ss_readySca 1.2s ease-in 0.1s;
    animation: ss_readySca 1.2s ease-in 0.1s;
  }

  .ss_goSca {
    -webkit-animation: ss_goSca 1s ease-in 0.08s;
    animation: ss_goSca 1s ease-in 0.08s;
  }

  @-webkit-keyframes ss_readySca {
    0% {
      -webkit-transform: translate(0, -20vw);
      opacity: 0.3;
    }

    20% {
      -webkit-transform: translate(0, 0);
      opacity: 1;
    }

    80% {
      -webkit-transform: translate(0, 0);
      opacity: 1;
    }

    100% {
      -webkit-transform: translate(0, 0) scale(0.9, 0.9);
      opacity: 0;
    }
  }

  @keyframes ss_readySca {
    0% {
      transform: translate(0, -20vw);
      opacity: 0.3;
    }

    20% {
      transform: translate(0, 0);
      opacity: 1;
    }

    80% {
      transform: translate(0, 0);
      opacity: 1;
    }

    100% {
      transform: translate(0, 0) scale(0.9, 0.9);
      opacity: 0;
    }
  }

  @-webkit-keyframes ss_goSca {
    0% {
      -webkit-transform: translate(0, -20vw);
      -webkit-filter: blur(5px);
      opacity: 0.3;
    }

    20% {
      -webkit-transform: translate(0, 0);
      -webkit-filter: blur(0);
      opacity: 1;
    }

    80% {
      -webkit-transform: translate(0, 0);
      -webkit-filter: blur(0);
      opacity: 1;
    }

    100% {
      -webkit-transform: translate(0, 0) scale(5, 5);
      -webkit-filter: blur(2px);
      opacity: 1;
    }
  }

  @keyframes ss_goSca {
    0% {
      transform: translate(0, -20vw);
      filter: blur(5px);
      opacity: 0.3;
    }

    20% {
      transform: translate(0, 0);
      filter: blur(0);
      opacity: 1;
    }

    80% {
      transform: translate(0, 0);
      filter: blur(0);
      opacity: 1;
    }

    100% {
      transform: translate(0, 0) scale(5, 5);
      filter: blur(2px);
      opacity: 1;
    }
  }
</style>
