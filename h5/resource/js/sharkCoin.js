
/*-------------------------*/
/*生成金币*/
function newCoin() {
        var randomLeft =Math.random()*8+1;
        var $coin = $('<div class="coinPackage">').appendTo(coin);
        $coin.css('left',randomLeft+'rem');
        var y = $(window).height() - $coin.height();
        $coin.css('transform', 'translateY(' + (y - 200) + 'px)').on('transitionend', function() {
            $coin.off('transitionend').css('transition-duration', '1s').css('transform', 'translateY(' + y + 'px)');
            $coins.shift();
        });
    return $coin;
}
$(function () {
    var score = 0;
    var tolTime = 15;
    var btnH = $('#coinBtn').height();
    $('.pinkFish').css('animation',' MoveLtoR 17s linear infinite');
    $('.pinkFish2').css('animation',' MoveLtoR 17s linear .8s infinite');
    $('.blueFish').css('animation',' MoveRtoL 17s linear infinite');
    $('.goldFish').css('animation',' MoveLtoR 17s linear 3s infinite');
    $('.jellyFish').css('animation',' MoveBtoT 17s linear 1.5s infinite');
    $('.moreFish').css('animation',' MoveRtoL 17s linear 1s infinite');
    $('.shark').css('transform', 'translateY(-7.92rem)').on('transitionend', function() {
        $('#audioSwitch').show();
        $('#coinGuide').show();
        $('#guideKnow').addClass('startColor');
        $('#hand').addClass('handMove');
    });
    $('.eyes').addClass('eyesRotate');

    $('#guideKnow').on('touchend',function () {
        var txt = $('#audioSwitch p').html();
        if(txt == '静音'){
            $('#audioSwitch').css('background-position','-1.133rem -2.667rem');
            document.getElementById("audio1").play();
        }
        $('#guideKnow').unbind();
        $('#coinGuide').hide();
        $('#coinBtn').removeClass('startColor');
        $('.tongue').addClass('tongueMove');
        $('#hand').hide();
        var $coin = newCoin();
        $coins.push($coin);
        var coinDom = setInterval(function() {
            if($coins.length<5){   /*金币生成最多数量*/
                $coins.push(newCoin());
            }
        }, 60);/*金币生成频率*/
        /*倒计时*/
        var coinCD = setInterval(function() {
            $('#coinGuide').hide();
            tolTime--;
            if(tolTime<=0){
                $('#dataCD').html(0);
            }else {
                $('#dataCD').html(tolTime);
            }
            if(tolTime<=0){
                clearInterval(coinDom);
                clearInterval(coinCD);
                $('#coinBtn').unbind();
                var finalScore =$('#dataScore').html();
                gameOver(finalScore);
            }
        }, 1000);
        $('#coinBtn').on('touchend',function () {
            score++;
            $('#dataScore').html(score);
            var $coin = $coins.shift();
            if (!$coin) {
                $coin = newCoin();
            }
            var left =$(window).width()/2-$coin.position().left-$coin.width()/2;
            var top = $(window).height()-btnH-30;
            $coin.addClass('coinClick').css('transform', 'translate('+ left+'px,'+top + 'px)').off('transitionend').on('transitionend', function() { $coin.remove();});
        });
    });

    /*-------------------------*/
    //关闭按钮
    $('#close').on('touchend',function(){
        closeBtn();
    });
    $('.close').on('touchend',function(){
        closeBtn();
    });
    /*音乐开关*/
    $('#audioSwitch').on('touchend',function(){
        audioSwitch();
    });
    function audioSwitch() {
        var txt = $('#audioSwitch p').html();
        if(txt == '静音'){
            $('#audioSwitch').css('background-position','-2.227rem -2.667rem');
            $('#audioSwitch p').html('音乐');
            document.getElementById("audio1").pause();
        }else if(txt == '音乐'){
            $('#audioSwitch').css('background-position','-1.133rem -2.667rem');
            $('#audioSwitch p').html('静音');
            document.getElementById("audio1").play();
        }
    }

});
