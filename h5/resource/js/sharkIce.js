
//关闭按钮功能
var u = navigator.userAgent.toLowerCase();
var isApple = /(iphone|ipad|ipod|ios)/i.test(u);
var isAndroid = /android/i.test(u);
function closeBtn() {
    var u = navigator.userAgent.toLowerCase();
    if(isApple){
        //apple终端
        window.location = 'close://';
    }else if(isAndroid){
        //安卓终端
        if(window.AndroidBridge){
            window.AndroidBridge.close();
        }
    }
}
/*-------------------------*/
var mark = 1;
$(function () {
    var score = 0;
    var tolTime = 10;
    $('.pinkFish').css('animation',' MoveLtoR 17s linear infinite');

    $('.coinData').on('touchend',function () {
        $('.coinData').unbind().addClass('coinDataClk');
        $('#coinGuide').hide();
        $('.coinDataClk').on('touchend',function () {
            $('.coinDataClk').unbind().hide().removeClass('coinDataClk');
            /*-----------锤子--------*/
            var timer;
            $('body').on('touchend', function() {
                $('#hammer').addClass('hammerRotate');
                clearTimeout(timer);
                timer = setTimeout(function () {
                    $('#hammer').removeClass('hammerRotate');
                }, 400);
            });
            /*倒计时*/
            var coinCD = setInterval(function() {
                tolTime--;
                if(tolTime<=0){
                    $('#dataCD').html(0);
                    $('#hammer').unbind();
                    clearInterval(coinCD);
                    $('#coinData').unbind();
                    if(mark){
                        gameOver(score);
                    }
                }else {
                    $('#dataCD').html(tolTime+'s');
                }
            }, 1000);
            $('#coinData').on('touchend',function () {
                score++;
                if(score>=199){
                    score = 200;
                }
                $('.maskBgLeft').css('opacity','.46');
                $('.maskBgRight').css('opacity','.56');
                setTimeout(function () {
                    $('.maskBgLeft').css('opacity','.56');
                    $('.maskBgRight').css('opacity','.66');
                    },100);
                var scr = (2*score)/80;
                var leftHammer =scr+'rem';
                //$('.dataCD').html(score);
                $('.smallHammer').css('left',leftHammer);
                $('.progress2').css('width',leftHammer);
                $('.cracks').eq(Math.floor(score)).show();
                if(score>=5){
                    //newCrack();
                }

            })
        });

    });

    /*生成小裂痕*/
    function newCrack() {
        var randomLeft =Math.random()*10;
        var randomTop =Math.random()*18;
        var crClass ='smallCrack'+Math.floor(Math.random()*4+1);
        var $coin = $('<div class="pngImgB crack">').appendTo('.crackArea');
        $coin.css({'left':randomLeft+'rem','top':randomTop+'rem'}).addClass(crClass);
    }
});