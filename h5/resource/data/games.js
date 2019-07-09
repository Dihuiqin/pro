
function sharkIce(data,param) {
  switch(data){
    case 'getResult' : {   //中奖结果
      var result = {};
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
      }
      return result
    }break;
    default:{   //未中奖
      result.prizetype = 5
    }break;
  }
}
function sharkCoin(data,param) {
  switch(data){
    case 'getResult' : {   //中奖结果
      var result = {};
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
      }
      return result
    }break;
    default:{   //未中奖
      result.prizetype = 5
    }break;
  }
}
