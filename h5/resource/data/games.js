

var result = {};
/*鲨鱼砸冰块--2017718*/
function sharkIce(data,param) {
  switch(data){
    case 'getResult' : {   //中奖结果
      if(param>100){
        result.prizetype = 1
      }else if(param>80){
        result.prizetype = 2
      }else if(param>60){
        result.prizetype = 3
      }else if(param>40){
        result.prizetype = 4
      }else if(param>20){
        result.prizetype = 5
      }else{
        result.prizetype = 0
      }
      return result
    }break;
  }
}
/*鲨鱼吸金--2017520*/
function sharkCoin(data,param) {
  switch(data){
    case 'getResult' : {   //中奖结果
      if(param>200){
        result.prizetype = 1
      }else if(param>150){
        result.prizetype = 2
      }else if(param>120){
        result.prizetype = 3
      }else if(param>100){
        result.prizetype = 4
      }else if(param>50){
        result.prizetype = 5
      }else{
        result.prizetype = 0
      }
      return result
    }break;
  }
}
/* 红包雨-17year */
function rainYear(data) {
  switch(data){
    case 'getResult' : {   //中奖结果
      result.prizetype = Math.round(Math.random()*7);
      return result
    }break;
  }
}
/* 红包雨-16双十二从下至上 */
function rainDec(data) {
  switch(data){
    case 'getResult' : {   //中奖结果
      result.prizetype = Math.round(Math.random()*7);
      return result
    }break;
  }
}
/* 红包雨-16双十一从上至下 */
function rainNov(data) {
  switch(data){
    case 'getResult' : {   //中奖结果
      result.prizetype = Math.round(Math.random()*9);
      return result
    }break;
  }
}
/* 红包雨--17双十一 大小红包  */
function redRain(data,param) {
  switch(data){
    case 'getResult' : {   //中奖结果
      if(param.firstScore > 10 &&  param.secScore > 4 ){
        result.prizetype = 1
      }else if(param.firstScore > 12 &&  param.secScore > 3 ){
        result.prizetype = 2
      }else if(param.firstScore > 10 &&  param.secScore > 2 ){
        result.prizetype = 3
      }else if(param.firstScore > 8 &&  param.secScore > 1 ){
        result.prizetype = 4
      }else if(param.firstScore > 6 ){
        result.prizetype = 5
      }else {
        result.prizetype = 0
      }
      return result
    }break;
    case 'awardResult' : {   //发奖
      result.prizetype = param
      return result
    }break;
  }
}
/* 抢钱大作战--17双十一预热 */
function robMoney(data,param) {
  switch(data){
    case 'getResult' : {   //中奖结果
      if(param.userNum > param.sharkNum &&  param.rightPrize == 1){
        result.prizetype = 1
      }else if(param.userNum > param.sharkNum ){
        result.prizetype = 2
      }else{
        result.prizetype = Math.round(Math.random()*2)+3;
      }
      return result
    }break;
    case 'awardResult' : {   //发奖
      result.prizetype = param
      return result
    }break;
  }
}
