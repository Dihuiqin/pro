<template>
  <!--第四屏 结果层 中奖结果-->
  <!--奖品图尺寸：礼金券：419*174 大礼包：454*238 免单券：308*251-->
  <div class="last-screen">
    <div class="curtain_bg"></div>
    <template v-if="!isShare">
      <!--未中奖-->
      <template v-if="prize.type === '9'">
        <div class="ls_dislog ls_error">
          <div class="ls_errorBg">
            <div class="is_eCon">
              很遗憾没中奖<br/>
              多玩几次<br/>
              也许就有好运气了<br/>
            </div>
            <div class="ls_BtnKnow ls_closeBtn" @click="goIndex">我知道了</div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="ls_dislog"
             :class="className"
        >
          <div class="ls_images ls_dialogBottom">
            <div v-if="!shareClick" class="ls_BtnKnow share" @click="goShare">分享后领取></div>
            <div v-else class="ls_BtnKnow share" @click="getSendPrize">立即领取></div>
            <div class="ls_robRule ruleEntrance" @click="showRegular">查看详细活动规则</div>
          </div>
          <!--6:免单  11:大礼包-->
          <div class="ls_dialogMiddle">
            <div class="ls_images ls_dBg"></div>
            <div class="ls_cCon_desc">好神奇啊 抢了<span class="scoreNum">{{userNum}}</span>个红包</div>
            <div class="ls_cCon_title">小鲨送您:</div>
            <img v-if="prize.alert_img && prize.alert_img.url" class="lrCenter ls_cCon_img" :src="prize.alert_img.url">
          </div>
          <div class="ls_images ls_dialogTop"></div>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="ls_dislog ls_succ"
           :class="className"
      >
        <div class="ls_dialogMiddle">
          <div class="ls_images ls_dBg"></div>
          <div class="ls_cCon_title">恭喜您</div>
          <div class="ls_cCon_desc"><span class="ls_images dialogCheck"></span>您已成功领取</div>
          <img v-if="prize.alert_img && prize.alert_img.url" class="lrCenter ls_cCon_img" :src="prize.alert_img.url">
          <div class="ls_cCon_txt">奖品已发放至您的账户</div>
          <div class="ls_diaKnow ls_closeBtn" @click="goIndex">现在去使用</div>
        </div>
        <div class="ls_images ls_dialogTop"></div>
      </div>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'RPR-regular',
    props: ['shareClick', 'userNum', 'isShare', 'prize'],
    data() {
      return {
        className: 'ls_coupon',
      };
    },
    created() {
      if (this.prize.type === '11') { // 大礼包
        this.className = 'ls_dialogBigMiddle';
      } else if (this.prize.type === '6') { // 免单
        this.className = 'ls_dialogFreeMiddle';
      }
    },
    methods: {
      /**
       * 去APP index
       */
      goIndex() {
        this.$emit('goIndex');
      },
      /**
       * 查看活动规则
       */
      showRegular() {
        this.$emit('showRegular');
      },
      /**
       * 去分享
       */
      goShare() {
        this.$emit('goShare');
      },
      /**
       * 领取奖励
       */
      getSendPrize() {
        this.$emit('getSendPrize');
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

  .ls_images {
    background: url('/static/img/redPacket/result.png') no-repeat top left/277.6vw 114vw;
  }

  .last-screen {
    z-index: 200;
  }

  .ls_close {
    position: fixed;
    top: 3.47vw;
    right: 3.47vw;
    width: 12.8vw;
    height: 12.8vw;
    background-position: -47.73vw -25.87vw;
  }

  .ls_dislog > div {
    left: 0;
    right: 0;
    margin: auto;
  }

  .ls_dislog > div > div {
    left: 0;
    right: 0;
    margin: auto;
  }

  .ls_dislog {
    top: 0;
    bottom: 0;
    margin: auto;
    width: 100vw;
    height: 139.73vw;
  }

  .ls_dialogBottom {
    top: 73.87vw;
    width: 100vw;
    height: 68.27vw;
    background-position: -3.47vw -41.6vw;
  }

  .ls_dialogBottom div {
    text-align: center;
  }

  .ls_BtnKnow {
    top: 27.2vw;
    color: #fa3e33;
    font-weight: 600;
    letter-spacing: 2px;
    background: #fbdd23;
    width: 58.67vw;
    height: 11.47vw;
    line-height: 11.47vw;
    font-size: 4.8vw;
    border-radius: 5.73vw;
  }

  .ls_robRule {
    top: 44.93vw;
    color: #fff;
    font-size: 3.73vw;
    font-weight: lighter;
  }

  .ls_dialogMiddle {
    bottom: 54.5vw;
    width: 76.53vw;
    background: #fff7f7;
    border-top-left-radius: 2.67vw;
    border-top-right-radius: 2.67vw;
  }

  .ls_dialogMiddle > div {
    height: 6.4vw;
    line-height: 6.4vw;
    font-size: 5.6vw;
    color: #333;
    text-align: center;
  }

  .ls_dialogMiddle .ls_dBg {
    width: 76.53vw;
    height: 56vw;
    background-position: -193.07vw 0;
  }

  .ls_dialogTop {
    top: 3vw;
    width: 25.2vw;
    height: 25.2vw;
    background-position: -47.6vw 0;
  }

  .ls_cCon_title {
    top: 17.33vw;
    font-weight: 600;
  }

  .ls_cCon_desc {
    top: 9.6vw;
  }

  .ls_dialogMiddle {
    height: 56vw;
  }

  .ls_coupon .ls_dialogTop {
    top: 10vw;
  }

  .ls_coupon .ls_dBg {
    top: 4vw;
  }

  .ls_cCon_img {
    top: 25.73vw;
    width: 57.33vw;
  }

  .ls_package_jifen {
    left: 18vw;
    top: 3.4vw;
    font-size: 4vw;
  }

  .ls_package_desc {
    width: 2.67vw;
    line-height: 3.6vw;
    top: 2.4vw;
    left: 3vw;
    font-size: 2.93vw;
  }

  div.ls_succ .ls_dialogMiddle {
    bottom: 24vw;
    height: 89.33vw;
    border-radius: 2.67vw;
  }

  .ls_succ .ls_dBg {
    top: 4vw;
  }

  div.ls_succ .ls_cCon_img {
    top: 30.67vw;
  }

  .ls_succ .ls_dialogTop {
    top: 8vw;
    width: 25.2vw;
    height: 25.2vw;
    background-position: -47.6vw 0;
  }

  .ls_succ .ls_cCon_title {
    top: 10.13vw;
    font-size: 7.47vw;
    font-weight: 600;
  }

  .ls_succ .ls_cCon_desc {
    top: 19.47vw;
  }

  .ls_succ .dialogCheck {
    display: inline-block;
    width: 6.4vw;
    height: 6.4vw;
    background-position: -68.53vw -30.93vw;
    vertical-align: top;
    margin-right: 1vw;
  }

  .ls_succ .ls_cCon_txt {
    font-size: 3.47vw;
    color: #222;
    top: 60vw;
  }

  .ls_succ .ls_cCon_txt2 {
    font-size: 3.47vw;
    color: #222;
    top: 63.2vw;
  }

  .ls_succ .ls_diaKnow {
    top: 71.73vw;
    width: 58.67vw;
    height: 11.2vw;
    line-height: 11.2vw;
    border-radius: 5.6vw;
    font-weight: 600;
    font-size: 4.8vw;
    background: #fbdd23;
    color: #fa3e33;
    text-align: center;
  }

  .ls_succ .ls_dBg {
    height: 70vw;
    top: 6vw;
  }

  /* 区分奖项 样式 */
  .ls_dialogBigMiddle .ls_dialogMiddle {
    height: 62vw;
  }

  .ls_dialogFreeMiddle .ls_dialogMiddle {
    height: 62vw;
  }

  .ls_dialogFreeMiddle .ls_cCon_img {
    width: 42.13vw;
    top: 24.8vw;
  }

  .ls_succ.ls_dialogFreeMiddle .ls_dialogMiddle {
    height: 99.47vw;
    bottom: 14vw;
  }

  .ls_succ.ls_dialogFreeMiddle .ls_cCon_txt {
    top: 70vw;
  }

  .ls_succ.ls_dialogFreeMiddle .ls_diaKnow {
    top: 81.73vw;
  }

  .ls_succ.ls_dialogBigMiddle .ls_cCon_txt {
    top: 63vw;
  }

  .ls_succ.ls_dialogFreeMiddle .ls_cCon_img {
    top: 30.67vw;
  }

  .ls_error {
    width: 100vw;
    height: 100vh;
    background: url('/static/img/redPacket/error.png') no-repeat top center/100vw 177.87vw #d80001;
  }

  .ls_errorBg {
    top: 59.2vw;
    width: 78.67vw;
    height: 52.8vw;
    background: #fff;
    border-radius: 2.67vw;
    text-align: center;
  }

  .is_eCon {
    padding-top: 15.47vw;
    line-height: 8vw;
    font-size: 5.33vw;
    color: #333;
  }

  .ls_error .ls_BtnKnow {
    top: 72.53vw;
    background: #fff151;
    color: #f0240c;
  }

</style>
