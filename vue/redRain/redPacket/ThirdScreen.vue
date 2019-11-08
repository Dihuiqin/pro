<template>
  <!--第三屏 倒计时-->
  <div class="third-screen">
    <!--背景-->
    <div class="curtain_bg"></div>
    <!--星星背景-->
    <div class="ts_bgStar">
      <div class="red_images ts_bgStarOne"></div>
      <div class="red_images ts_bgStarTwo"></div>
      <div class="red_images ts_bgStarThree"></div>
      <div class="red_images ts_bgStarFour"></div>
    </div>
    <!--倒计时-->
    <div v-if="time > 0" class="ts_info ts_cd_info">
      <div class="ts_subTitle">倒计时</div>
      <div class="ts_countNum">
        <div class="ts_cd_bg"></div>
        <div class="ts_cd_time">{{time}}s</div>
      </div>
    </div>
    <!--红包计数-->
    <div class="ts_info ts_rob_info">
      <div class="ts_subTitle">已抢<span class="red_images"></span></div>
      <div class="ts_countNum">
        <div class="ts_rob_bg"></div>
        <div class="ts_rob_cn">{{totalScore}}个</div>
      </div>
    </div>
    <!--惊喜提示-->
    <div class="red_images ts_surpComing ab-center"
         :class="{'ts_scMove': this.time === 0}"
         @webkitAnimationEnd="surpriseInit"
         @animationend="surpriseInit"
    ></div>
    <!--红包容器-->
    <div id="redArea">
      <!--拆红包结果-->
      <div class="redRain_WrapResult">
        <template v-for="(item, index) in packagesResultArr">
          <div class="clickResult"
               :style="`left: ${item.left};top: ${item.top}`"
               :data-ind="index"
          >+1红包
          </div>
        </template>
      </div>
      <!--红包-->
      <div class="redRain_Wrap">
        <template v-for="(item, index) in packagesArr">
          <div v-if="!(item.isClick || item.isEnd)"
               :class="item.class"
               :style="`left: ${item.left};`"
               @click.once="clickFun"
               @webkitAnimationEnd="packageAnimalEnd"
               @animationend="packageAnimalEnd"
               :data-ind="index"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'RPR-regular',
    props: ['musicFlag'],
    data() {
      return {
        time: 10, // 红包倒计时
        surpriseTime: 5, // 惊喜红包下落时间
        timer: '', // 倒计时定时器
        envInterval: '', // 红包定时器
        firstScore: 0, // 小红包数量
        totalScore: 0, // 红包总数量
        packagesArr: [], // 红包容器
        packagesResultArr: [], // 红包结果容器
      };
    },
    methods: {
      /**
       * 初始化
       */
      Init() {
        // 10s 倒计时
        this.timer = this.timeControl(this.timeCounter, 1000);
        // 红包生成
        this.envInterval = this.timeControl(this.packageInit, 350);
      },
      /**
       * 定时器
       */
      timeControl(func, time) {
        return setInterval(func, time);
      },
      /**
       * 游戏10s倒计时
       */
      timeCounter() {
        this.time = this.time - 1;
        //  停止生成红包
        if (this.time === 1) {
          clearInterval(this.envInterval);
        }
        //  游戏10s结束
        if (this.time <= 0) {
          this.time = 0;
          clearInterval(this.timer);
          this.$emit('gameAction');
        }
      },
      /**
       * 绘制红包
       */
      packageInit() {
        /* 随机生成 */
        const myPackage = this.everyObj();
        myPackage.class = 'envelope red_images';
        this.packagesArr.push(myPackage);
      },
      /**
       * 红包点击
       */
      clickFun(e) {
        // 红包点击音乐
        if (this.musicFlag) {
          this.$emit('musicControl', 'btn');
        }
        this.packagesArr[e.target.dataset.ind].isClick = true;
        const myObj = {};
        myObj.left = `${e.x}px`; // 红包结果距左位置
        myObj.top = `${e.y}px`; // 红包结果距左位置
        this.packagesResultArr.push(myObj);
        this.totalScore = this.totalScore + 1;
      },
      /**
       * 红包下落动画执行完毕
       */
      packageAnimalEnd(e) {
        const ind = e.target.dataset.ind;
        this.packagesArr[ind].isEnd = true;
        if (+ind === this.packagesArr.length - 1) {
          this.firstScore = this.totalScore; // 记录用户第一次的红包数
          this.packagesArr = [];  // 清空第一波红包
        }
      },
      /**
       * 惊喜到来
       */
      surpriseInit() {
        // 惊喜红包生成
        this.envInterval = this.timeControl(this.packageSurpriseInit, 350);
        // 停止生成惊喜红包
        setTimeout(this.packageSurpriseEnd, this.surpriseTime * 1000);
        // 请求中奖结果
        setTimeout(this.getResult, (this.surpriseTime + 1) * 1000);
      },
      /**
       * 惊喜红包生成
       */
      packageSurpriseInit() {
        /* 随机生成大小红包 */
        const myPackage = this.everyObj();
        const random = Math.random() * 10; // 0-10
        myPackage.class = 'bigRed_images envelope2'; // 红包大小样式
        if ((+random) % 2 === 0) {
          myPackage.class = 'bigRed_images envelope3';
        }
        this.packagesArr.push(myPackage);
      },
      /**
       * 停止生成惊喜红包
       */
      packageSurpriseEnd() {
        clearInterval(this.envInterval);
      },
      /**
       * 定义单个红包及属性
       */
      everyObj() {
        /* 随机生成 */
        const myObj = {};
        const xRandom = Math.random() * 80; // 0-86
        myObj.left = `${xRandom}%`; // 红包随机距左位置
        myObj.isEnd = false; // 动画是否执行完毕
        myObj.isClick = false; // 是否被点击过
        return myObj;
      },
      /**
       * 请求中奖结果
       */
      getResult() {
        this.$emit('getResult', this.totalScore);
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

  /* thirdScreen */
  .third-screen {
    div {
      width: 100vw;
      height: 100vh;
    }

    .ts_info {
      top: 4.4vw;
      width: 18.13vw;
      height: 24.53vw;
    }

    .ts_subTitle {
      top: 0;
      left: 0;
      width: 100%;
      height: 6.13vw;
      line-height: 6.13vw;
      font-size: 4.27vw;
      text-align: center;

      span {
        width: 4vw;
        height: 5.6vw;
        margin-left: 0.8vw;
        display: inline-block;
        vertical-align: top;
        background-position: -122.93vw -132.27vw;
      }
    }

    .ts_cd_info {
      left: 5.07vw;
      color: #fff;

      .ts_cd_bg {
        background: #d95c30;
      }

      .ts_cd_time {
        background: #d6681e;
      }
    }

    .ts_rob_info {
      left: 40.93vw;
      color: #fdf75b;

      .ts_rob_cn {
        color: #ce1500;
      }
    }

    .ts_cd_bg,
    .ts_rob_bg {
      top: 5.87vw;
      left: 0;
      width: 18.13vw;
      height: 18.13vw;
      opacity: 0.25;
      border-radius: 50%;
    }

    .ts_cd_time,
    .ts_rob_cn {
      top: 7vw;
      left: 1.4vw;
      width: 15.47vw;
      height: 15.47vw;
      line-height: 15.47vw;
      font-size: 6.4vw;
      text-align: center;
      border-radius: 50%;
    }

    .ts_rob_bg,
    .ts_rob_cn {
      background: #feec4d;
    }

    .ts_bgStar {
      div {
        width: 10.13vw;
        height: 13.07vw;
        background-position: -159.07vw -114.4vw;
        opacity: 0;
      }

      .ts_bgStarOne {
        top: 50vw;
        left: 8vw;
        -moz-animation: ts_bgStar 4s linear 1s infinite;
        -webkit-animation: ts_bgStar 4s linear 1s infinite;
        -o-animation: ts_bgStar 4s linear 1s infinite;
        animation: ts_bgStar 4s linear 1s infinite;
      }

      .ts_bgStarTwo {
        bottom: 16vw;
        left: 1vw;
        -moz-transform: scale(0.5, 0.5);
        -webkit-transform: scale(0.5, 0.5);
        -o-transform: scale(0.5, 0.5);
        transform: scale(0.5, 0.5);
        -moz-animation: ts_bgStar 4s linear 2s infinite;
        -webkit-animation: ts_bgStar 4s linear 2s infinite;
        -o-animation: ts_bgStar 4s linear 2s infinite;
        animation: ts_bgStar 4s linear 2s infinite;
      }

      .ts_bgStarThree {
        top: 70vw;
        right: 5vw;
        -moz-transform: scale(0.6, 0.6);
        -webkit-transform: scale(0.6, 0.6);
        -o-transform: scale(0.6, 0.6);
        transform: scale(0.6, 0.6);
        -moz-animation: ts_bgStar 4s linear 2.8s infinite;
        -webkit-animation: ts_bgStar 4s linear 2.8s infinite;
        -o-animation: ts_bgStar 4s linear 2.8s infinite;
        animation: ts_bgStar 4s linear 2.8s infinite;
      }

      .ts_bgStarFour {
        bottom: 25vw;
        right: 30vw;
        -moz-transform: scale(0.8, 0.8);
        -webkit-transform: scale(0.8, 0.8);
        -o-transform: scale(0.8, 0.8);
        transform: scale(0.8, 0.8);
        -moz-animation: ts_bgStar 4s linear 3.6s infinite;
        -webkit-animation: ts_bgStar 4s linear 3.6s infinite;
        -o-animation: ts_bgStar 4s linear 3.6s infinite;
        animation: ts_bgStar 4s linear 3.6s infinite;
      }
    }

    .ts_surpComing {
      width: 59.47vw;
      height: 41.33vw;
      opacity: 0;
      background-position: -109.73vw -34.8vw;
    }

    #redArea {
      .redRain_Wrap {
        .envelope { // todo
          width: 14.67vw;
          height: 21.07vw;
          position: absolute;
          top: -21.07vw;
          background-position: -185.2vw -109.2vw;
          -webkit-animation: packageDown 2s linear; /* Safari and Chrome */
          -ms-animation: packageDown 2s linear; /* IE 9 */
          animation: packageDown 2s linear;
        }

        .envelope2,
        .envelope3 {
          width: 30.67vw;
          height: 38.13vw;
          position: absolute;
          top: -21.07vw;
          background-position: left top;
        }
      }
    }

    .redRain_WrapResult {
      .clickResult {
        width: 21.33vw;
        height: 6.67vw;
        font-size: 6.4vw;
        color: #fdf75b;
        text-align: center;
        -moz-animation: clickResult 0.6s linear forwards;
        -webkit-animation: clickResult 0.6s linear forwards;
        -o-animation: clickResult 0.6s linear forwards;
        animation: clickResult 0.6s linear forwards;
      }
    }
  }

</style>
<style>
  @-webkit-keyframes packageDown {
    0% {
      -webkit-transform: translateY(0);
    }

    100% {
      -webkit-transform: translateY(calc(100vh + 100px));
    }
  }

  @-ms-keyframes packageDown {
    0% {
      -ms-transform: translateY(0);
    }

    100% {
      -ms-transform: translateY(calc(100vh + 100px));
    }
  }

  @keyframes packageDown {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(calc(100vh + 100px));
    }
  }

  .ts_scMove {
    -moz-animation: ts_scMove 2s linear 1.5s;
    -webkit-animation: ts_scMove 2s linear 1.5s;
    -o-animation: ts_scMove 2s linear 1.5s;
    animation: ts_scMove 2s linear 1.5s;
  }

  /* 时间待确认 */
  .envelope2 {
    -moz-animation: envelopeMove 1.2s linear forwards;
    -webkit-animation: envelopeMove 1.2s linear forwards;
    -o-animation: envelopeMove 1.2s linear forwards;
    animation: envelopeMove 1.2s linear forwards;
  }

  .envelope3 {
    -moz-animation: envelopeRotate 1.5s linear forwards;
    -webkit-animation: envelopeRotate 1.5s linear forwards;
    -o-animation: envelopeRotate 1.5s linear forwards;
    animation: envelopeRotate 1.5s linear forwards;
  }

  .emScale {
    -moz-animation: emScale 0.25s linear;
    -webkit-animation: emScale 0.25s linear;
    -o-animation: emScale 0.25s linear;
    animation: emScale 0.25s linear;
  }

  @-webkit-keyframes ts_bgStar {
    0% {
      opacity: 0;
    }

    10% {
      opacity: 1;
    }

    20% {
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes ts_bgStar {
    0% {
      opacity: 0;
    }

    10% {
      opacity: 1;
    }

    20% {
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  }

  @-o-keyframes ts_bgStar {
    0% {
      opacity: 0;
    }

    10% {
      opacity: 1;
    }

    20% {
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  }

  @-moz-keyframes ts_bgStar {
    0% {
      opacity: 0;
    }

    10% {
      opacity: 1;
    }

    20% {
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  }

  @-webkit-keyframes clickResult {
    0% {
      opacity: 0;
    }

    50% {
      -webkit-transform: translate(0, -10vw);
      opacity: 1;
    }

    100% {
      -webkit-transform: translate(0, -15vw);
      opacity: 0;
    }
  }

  @keyframes clickResult {
    0% {
      opacity: 0;
    }

    50% {
      transform: translate(0, -10vw);
      opacity: 1;
    }

    100% {
      transform: translate(0, -15vw);
      opacity: 0;
    }
  }

  @-o-keyframes clickResult {
    0% {
      opacity: 0;
    }

    50% {
      -o-transform: translate(0, -10vw);
      opacity: 1;
    }

    100% {
      -o-transform: translate(0, -15vw);
      opacity: 0;
    }
  }

  @-moz-keyframes clickResult {
    0% {
      opacity: 0;
    }

    50% {
      -moz-transform: translate(0, -10vw);
      opacity: 1;
    }

    100% {
      -moz-transform: translate(0, -15vw);
      opacity: 0;
    }
  }

  @-webkit-keyframes ts_scMove {
    0% {
      -webkit-transform: scale(0, 0);
      opacity: 0;
    }

    15% {
      -webkit-transform: scale(1.1, 1.1);
      opacity: 1;
    }

    20% {
      -webkit-transform: scale(1, 1);
      opacity: 1;
    }

    90% {
      -webkit-transform: scale(1, 1);
      opacity: 1;
    }

    100% {
      -webkit-transform: scale(5, 5);
      opacity: 0;
    }
  }

  @keyframes ts_scMove {
    0% {
      transform: scale(0, 0);
      opacity: 0;
    }

    15% {
      transform: scale(1.1, 1.1);
      opacity: 1;
    }

    20% {
      transform: scale(1, 1);
      opacity: 1;
    }

    90% {
      transform: scale(1, 1);
      opacity: 1;
    }

    100% {
      transform: scale(5, 5);
      opacity: 0;
    }
  }

  @-o-keyframes ts_scMove {
    0% {
      -o-transform: scale(0, 0);
      opacity: 0;
    }

    15% {
      -o-transform: scale(1.1, 1.1);
      opacity: 1;
    }

    20% {
      -o-transform: scale(1, 1);
      opacity: 1;
    }

    90% {
      -o-transform: scale(1, 1);
      opacity: 1;
    }

    100% {
      -o-transform: scale(5, 5);
      opacity: 0;
    }
  }

  @-moz-keyframes ts_scMove {
    0% {
      -moz-transform: scale(0, 0);
      opacity: 0;
    }

    15% {
      -moz-transform: scale(1.1, 1.1);
      opacity: 1;
    }

    20% {
      -moz-transform: scale(1, 1);
      opacity: 1;
    }

    90% {
      -moz-transform: scale(1, 1);
      opacity: 1;
    }

    100% {
      -moz-transform: scale(5, 5);
      opacity: 0;
    }
  }

  @-webkit-keyframes envelopeMove {
    0% {
      -webkit-transform: translate(0, 0);
    }

    100% {
      -webkit-transform: translate(0, 200vw);
    }
  }

  @keyframes envelopeMove {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(0, 200vw);
    }
  }

  @-o-keyframes envelopeMove {
    0% {
      -o-transform: translate(0, 0);
    }

    100% {
      -o-transform: translate(0, 200vw);
    }
  }

  @-moz-keyframes envelopeMove {
    0% {
      -moz-transform: translate(0, 0);
    }

    100% {
      -moz-transform: translate(0, 200vw);
    }
  }

  @-webkit-keyframes envelopeRotate {
    0% {
      -webkit-transform: translate(0, 0) rotateY(180deg) scale(0.8, 0.8);
    }

    100% {
      -webkit-transform: translate(0, 180vw) rotateY(180deg) scale(0.8, 0.8);
    }
  }

  @keyframes envelopeRotate {
    0% {
      transform: translate(0, 0) rotateY(180deg) scale(0.8, 0.8);
    }

    100% {
      transform: translate(0, 180vw) rotateY(180deg) scale(0.8, 0.8);
    }
  }

  @-o-keyframes envelopeRotate {
    0% {
      -o-transform: translate(0, 0) rotateY(180deg) scale(0.8, 0.8);
    }

    100% {
      -o-transform: translate(0, 180vw) rotateY(180deg) scale(0.8, 0.8);
    }
  }

  @-moz-keyframes envelopeRotate {
    0% {
      -moz-transform: translate(0, 0) rotateY(180deg) scale(0.8, 0.8);
    }

    100% {
      -moz-transform: translate(0, 180vw) rotateY(180deg) scale(0.8, 0.8);
    }
  }

  @-webkit-keyframes emScale {
    0% {
      -webkit-transform: scale(1, 1);
    }

    20% {
      -webkit-transform: scale(0.6, 0.6);
    }

    40% {
      -webkit-transform: scale(1.2, 1.2);
    }

    60% {
      -webkit-transform: scale(0.6, 0.6);
    }

    80% {
      -webkit-transform: scale(1.2, 1.2);
    }

    100% {
      -webkit-transform: scale(0.8, 0.8);
    }
  }

  @keyframes emScale {
    0% {
      transform: scale(1, 1);
    }

    20% {
      transform: scale(0.6, 0.6);
    }

    40% {
      transform: scale(1.2, 1.2);
    }

    60% {
      transform: scale(0.6, 0.6);
    }

    80% {
      transform: scale(1.2, 1.2);
    }

    100% {
      transform: scale(0.8, 0.8);
    }
  }

  @-o-keyframes emScale {
    0% {
      -o-transform: scale(1, 1);
    }

    20% {
      -o-transform: scale(0.6, 0.6);
    }

    40% {
      -o-transform: scale(1.2, 1.2);
    }

    60% {
      -o-transform: scale(0.6, 0.6);
    }

    80% {
      -o-transform: scale(1.2, 1.2);
    }

    100% {
      -o-transform: scale(0.8, 0.8);
    }
  }

  @-moz-keyframes emScale {
    0% {
      -moz-transform: scale(1, 1);
    }

    20% {
      -moz-transform: scale(0.6, 0.6);
    }

    40% {
      -moz-transform: scale(1.2, 1.2);
    }

    60% {
      -moz-transform: scale(0.6, 0.6);
    }

    80% {
      -moz-transform: scale(1.2, 1.2);
    }

    100% {
      -moz-transform: scale(0.8, 0.8);
    }
  }
</style>
