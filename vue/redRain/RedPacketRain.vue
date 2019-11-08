<template>
  <div class="container" @click="musicTimerPause">
    <!--活动未开始-->
    <rain-error v-if="status === 1 || status === 2" :status="status" @goIndex="goIndex"></rain-error>
    <rain-regular v-else-if="status === 3 && ruleInfo" :ruleInfo="ruleInfo" @hideRegular="hideRegular"></rain-regular>
    <rain-share v-else-if="status === 5"></rain-share>
    <template v-else>
      <!--音乐控制-->
      <div v-if='screenNum === 2 || screenNum === 3' :class="{ 'ss_vsOff': !musicFlag  }" class="red_images ss_videoSwitch" @click="musicSwitch"></div>
      <!--第一屏 游戏首页-->
      <first-screen v-if="screenNum === 1" @showRegular="showRegular" @gameStart="gameStart"></first-screen>
      <!--第二屏 开始前倒计时-->
      <second-screen v-else-if="screenNum === 2" :screenNum="screenNum" @gameAction="gameAction"></second-screen>
      <!--第四屏 显示中奖结果-->
      <four-screen v-else-if="screenNum === 4"
                   :shareClick="shareClick"
                   :userNum="userNum"
                   :isShare="isShare"
                   :prize="prize"
                   @showRegular="showRegular"
                   @goIndex="goIndex"
                   @goShare="goShare"
                   @getSendPrize="getSendPrize"
      >
      </four-screen>
      <!--第三屏 开始落红包 放在最后是因为调用子元素方法不能用v-if-->
      <third-screen ref="thirdScreen" v-show="screenNum === 3"
                    :musicFlag="musicFlag"
                    @musicControl="musicControl"
                    @getResult="getResult"
      >

      </third-screen>

    </template>
    <div v-if="toast.show" class="toast fixed-center"><span>{{toast.html}}</span></div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import Axios from '@/utils/axios';
  import APIURL from '@/config/APIURL';
  import Qs from 'qs';
  import RainRegular from '$activity/redPacket/RPRRegular';
  import RainError from '$activity/redPacket/RPRError';
  import RainShare from '$activity/redPacket/RPRShare';
  import FirstScreen from '$activity/redPacket/FirstScreen';
  import SecondScreen from '$activity/redPacket/SecondScreen';
  import ThirdScreen from '$activity/redPacket/ThirdScreen';
  import FourScreen from '$activity/redPacket/FourScreen';
  import { catchSourceMixin, maxFontMixin } from '@/utils/mixins';

  Vue.prototype.$ajax = Axios;

  export default {
    mixins: [catchSourceMixin, maxFontMixin],
    name: 'red-packet-rain',
    data() {
      return {
        title: '红包雨',
        status: 4,  // 1-未开始  2-没有机会  3-活动规则  4-红包雨  5-分享后
        timeAble: 0,  // 1-未开始  2-已结束  3-其他异常
        screenNum: 1,  // 当前第几屏
        userNum: 0,  // 用户红包数
        musicFlag: true, // 音乐开关
        musicTimer: '', // 音乐计时开关
        AudioStart: new Audio('/static/gamesMp3/redrain_bg.mp3'), // 背景音乐
        AudioCountDown: new Audio('/static/gamesMp3/ss_resdyM.mp3'), // 倒计时音乐
        AudioButton: new Audio('/static/gamesMp3/fs_btn.wav'),
        shareClick: false,  // 是否点击了分享
        isShare: false, // 是否分享过
        shareInfo: {}, // 分享信息
        ruleInfo: '', // 活动规则信息
        prize: {
          // type: '6',
          // alert_img: {
          //   // url: 'http://ghs-mall-img.oss-cn-beijing.aliyuncs.com//oss/xin/image/100534/1105094100-50_efda3d75.png', // 礼金券 4
          //   // url: 'http://ghs-mall-img.oss-cn-beijing.aliyuncs.com//oss/xin/image/100808/1104151248--2_c86368f0.png', // 大礼包 11
          //   // url: 'http://ghs-mall-img.oss-cn-beijing.aliyuncs.com//oss/xin/image/100286/1104150525-1111_739b8ff7.png', // 免单券 6
          // },
        },
        animate: false,
        toast: {
          show: false,
          html: '',
        },
      };
    },
    components: {
      RainRegular,
      RainError,
      RainShare,
      FirstScreen,
      SecondScreen,
      ThirdScreen,
      FourScreen,
    },
    beforeCreate() {
      this.$store.commit('setTitle', '红包雨');
    },
    created() {
      // 同步用户信息
      this.getRegular();
      if (this.$route.query.uid) {
        this.getSyncUserInfo();
        this.pageInit();
      } else {
        this.screenNum = 1;
      }
    },
    computed: {
      maxFont() {
        return this.$store.getters.maxFont;
      },
    },
    methods: {
      /**
       * 进入页面 查询是否有机会
       */
      pageInit() {
        /* 请求是否有机会 */
        const httpUrl = APIURL.envelopLimit;
        this.$ajax.get(httpUrl, {
          params: {
            user_id: this.$route.query.uid, // 商城用户id
            lid: this.$route.query.lid, // 活动id,配置活动链接时会在链接后面配置上
          },
        }).then((res) => {
          if (res.status === 1) {
            /**
             * 通用错误信息=0
             *用户可以玩=1
             *机会已用完=2
             *未查到活动时间段=3
             *活动未开始=4
             *活动已结束=5
             */
            this.screenNum = 1;
          } else if (res.status === 2) {
            this.status = 2;
          } else if (res.status === 3) {
            this.status = 1;
          } else if (res.status === 4) {
            this.timeAble = 1;
          } else if (res.status === 5) {
            this.timeAble = 2;
          } else {
            this.timeAble = 3;
          }
        });
      },
      /**
       * 进入页面 获取活动规则信息
       */
      getRegular() {
        const httpUrl = APIURL.prizeInfo;
        const data = {
          appid: this.$store.getters.appId,
          version: this.$store.getters.version, // APP版本号
          source: this.$store.getters.source,  // 渠道来源
          lid: this.$route.query.lid, // 活动ID
        };
        this.$ajax.post(httpUrl, Qs.stringify(data))
          .then((res) => {
            const returndata = res.returndata;
            if (res.status && res.status !== 'false') {
              this.ruleInfo = returndata.prize_info.act_rule; // 活动信息
            }
          });
      },
      /**
       * 同步用户信息
       * */
      getSyncUserInfo() {
        const httpUrl = APIURL.syncUserInfo;
        const data = {
          appid: this.$store.getters.appId,
          version: this.$store.getters.version, // APP版本号
          source: this.$store.getters.source, // 渠道来源
          uid: this.$route.query.uid, // 商城用户id
          lid: this.$route.query.lid, // 活动id,配置活动链接时会在链接后面配置上
        };
        this.$ajax.post(httpUrl, Qs.stringify(data))
          .then(() => {
          });
      },
      /**
       * 游戏结束 请求中奖结果
       */
      getResult(score) { // 抽奖
        this.userNum = score;
        const httpUrl = APIURL.luckDraw;
        const data = {
          appid: this.$store.getters.appId,
          version: this.$store.getters.version, // APP版本号
          source: this.$store.getters.source,  // 渠道来源
          uid: this.$route.query.uid, // 商城用户id
          lid: this.$route.query.lid, // 活动id,配置活动链接时会在链接后面配置上
          envelopNum: score, // 用户红包数
        };
        this.$ajax.post(httpUrl, Qs.stringify(data))
          .then((res) => {
            if (res.status && res.status !== 'false') {
              const returndata = res.returndata;
              if (returndata && (returndata.length > 0 || Object.keys(returndata).length > 0)) {
                if (returndata.type) {
                  this.prize = returndata;
                  this.shareInfo.img = returndata.share_img.url;
                  this.shareInfo.title = `我抢到了${returndata.share_title}!`;
                  this.shareInfo.desc = '在聚鲨商城发现个可以抢现金免单、还能领取0元商品的游戏，快来抢！';
                  this.shareInfo.link = returndata.share_url;
                } else {
                  this.prize.type = '9';
                }
              } else {
                this.prize.type = '9';
              }
            } else {
              this.prize.type = '9';
            }

            this.screenNum = 4;
          });
      },
      /**
       * 发奖
       */
      getSendPrize() { // 领取奖品
        const httpUrl = APIURL.sendPrize;
        const data = {
          appid: this.$store.getters.appId,
          version: this.$store.getters.version, // APP版本号
          source: this.$store.getters.source, // 渠道来源
          uid: this.$route.query.uid, // 商城用户id
          sn: this.prize.sn, // 中奖编号
        };
        this.$ajax.post(httpUrl, Qs.stringify(data))
          .then((res) => {
            if (res.status && res.status !== 'false') {
              // 成功
              this.isShare = true;
            } else if (res.message) { // 需要根据接口文档进行跳转
              this.$toast.show({
                text: res.message,
              });
            }
          });
      },
      /**
       * 点击按钮 开始游戏
       */
      gameStart() {
        // 判断用户是否登录
        if (!this.$route.query.uid) {
          this.dialogDisplay('您还未登录,请登录后再来');
        } else if (this.timeAble === 1) {
          this.dialogDisplay('活动未开始');
        } else if (this.timeAble === 2) {
          this.dialogDisplay('活动已结束');
        } else if (this.timeAble === 3) {
          this.dialogDisplay('活动无效');
        } else {
          // 播放音乐
          this.musicControl('start');
          // 切屏
          this.screenNum = 2;
          // 消耗机会(改为请求中奖时再执行，保持逻辑与大转盘统一)
        }
      },
      /**
       * 倒计时321结束 红包开始掉落
       */
      gameAction() {
        // 切屏
        this.screenNum = 3;
        // 红包雨正式开始
        this.$refs.thirdScreen.Init();
      },
      /**
       * 显示/隐藏 活动规则
       */
      hideRegular() {
        this.status = 4;
      },
      showRegular() {
        this.status = 3;
      },
      /**
       * 去分享
       */
      goShare() {
        this.shareClick = true;
        const shareLink = this.shareInfo.link;
        // 调用APP方法
        const dataJson = {};
        dataJson.eventType = 'share';
        const eventData = {
          goodsName: this.shareInfo.title,
          shareLink,
          imgUrl: this.shareInfo.img,
          desc: this.shareInfo.desc,
        };
        dataJson.eventData = eventData;
        this.$store.dispatch('toApp', dataJson);
      },
      /**
       * 现在去使用/我知道了 - 去APP index
       */
      goIndex() {
        // 调用APP方法
        const dataJson = {};
        dataJson.eventType = 'toIndex';
        this.$store.dispatch('toApp', dataJson);
      },
      /**
       * 游戏声音开关
       */
      musicSwitch() {
        if (this.musicFlag) {
          this.musicControl('pause');
        } else {
          this.musicControl('play');
        }
        this.musicFlag = !this.musicFlag;
      },
      /**
       * 游戏声音总控制  start：游戏开始  play:打开音乐  pause:暂停  btn:红包点击
       */
      musicControl(flag) {
        if (flag === 'start') { // 播放
          this.AudioStart.play();
          this.AudioCountDown.play();
          this.AudioButton.play();
        } else if (flag === 'play') { // 播放
          this.AudioStart.play();
        } else if (flag === 'btn') { // 播放
          this.AudioButton.play();
        } else {  // 暂停
          this.AudioStart.pause();
          this.AudioCountDown.pause();
        }
      },
      /**
       * 游戏声音定时暂停 -- 处理异常退出情况
       * */
      musicTimerPause() {
        clearTimeout(this.musicTimer);
        // 音乐正在播放并且不是第一屏
        if (this.musicFlag && this.screenNum > 1) {
          this.musicTimer = setTimeout(this.musicSwitch, 5000);
        }
      },
      /**
       * toast弹框
       * str 字符串
       */
      dialogDisplay(msg) {
        this.toast.show = true;
        this.toast.html = msg;
        setTimeout(() => {
          this.toast.show = false;
        }, 2000);
      },
    },
  };
</script>
<style lang="scss">

  // 由小猪平台迁移过来，数值变化转换规则: 1rem = 10vw
  body {
    font-family: PingFangSC-Regular, Helvetica, Arial, sans-serif;
  }

  .fixed-center {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .ab-center {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .lrCenter {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
  }

  .first-screen,
  .second-screen,
  .third-screen,
  .last-screen {
    position: absolute;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .first-screen div,
  .second-screen div,
  .third-screen div,
  .last-screen div {
    position: absolute;
  }

  .second-screen,
  .third-screen {
    background: #e24332;
  }

  div.curtain_bg {
    width: 100vw;
    height: 100vh;
    top: 0;
    background-color: #000 !important;
    opacity: 0.75;
  }

  .red_images {
    background: url('/static/img/redPacket/icons.png') no-repeat top left/px2vw(1597) px2vw(1097);
  }

  .bigRed_images {
    background: url('/static/img/redPacket/redPacket.png') no-repeat top left/px2vw(346) px2vw(287);
  }

  .ls_closeBtn {
    width: px2vw(50);
    height: px2vw(50);
    background-position: px2vw(-1038) px2vw(-871);
  }
</style>
<style lang="scss" scoped>
  $colorAPP: #8909ac;
  $colorWhite: #fff;
  $bgTip: #535353;
  $fontTip: px2vw(36);
  $colorTip: #666;
  $fontBtn: px2vw(32);
  $fontInfo: px2vw(28);
  $fontCont: px2vw(24);
  $colorCont: #a623cd;

  /* 转盘参数 */
  $wheelSize: px2vw(683);
  $wheelCon: px2vw(608); // 里盘
  $prizeSize: px2vw(230); // 各奖项宽
  $prizeLeft: px2vw(-115); // 各奖项左移

  div,
  p {
    background-color: transparent;
  }

  /* 音乐开关 */
  .ss_videoSwitch {
    position: absolute;
    z-index: 10;
    top: 6.93vw;
    right: 5.87vw;
    width: 9.6vw;
    height: 7.73vw;
    background-position: -98vw -115.47vw;
  }

  .ss_vsOff {
    background-position: -118vw -115.47vw;
  }

</style>
<style lang="scss">
  $fontBtn: px2vw(32);

  .toast {
    display: flex;
    width: px2vw(600);
    height: px2vw(400);
    font-size: $fontBtn;
    line-height: 1.5;
    color: #fff;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin: auto;
    z-index: 100;

    span {
      display: inline-table;
      width: 100%;
      padding: px2vw(27) px2vw(12);
      border-radius: px2vw(12);
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
</style>
