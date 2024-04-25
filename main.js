var startButton;  
var stopButton;
var resetButton;
var showTime;

var timer;            //setTimeout clearInterval用
var startTime;        //開始時間
var elapsedTime = 0;  //経過時間
var holdTime = 0;     //停止時間保持用


//onclickのイベント属性をhtmlに入れてるのに下記のDOM呼び出しが必要なのはなぜ→消してみたらボタン３種類とも押せなくなった
window.onload = function () {
    startButton = document.getElementById("start");
    stopButton = document.getElementById("stop");
    resetButton = document.getElementById("reset");
    showTime = document.getElementById("time");
}

function start(){
    startTime = Date.now(); 
    measureTime();

    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
}

function stop(){
    clearInterval(timer);
    holdTime += Date.now() - startTime;

    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
}

function reset(){
    clearInterval(timer);

    elapsedTime = 0;
    holdTime = 0;
    showTime.textContent = "00:00:00.00";

    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
}

//measureTimeは関数名　function 関数名(引数)　{実行したい処理}　
function measureTime() {
    //setInterval()を使用しないのはなぜ？　clearIntervalを使用しているのに→setIntervalに変更してみたら、ストップとリセットが押せなくなって止まらなくなった
    timer = setTimeout(function () {
        elapsedTime = Date.now() - startTime + holdTime;
        showTime.textContent = new Date(elapsedTime).toISOString().slice(11,22);
        measureTime();
    }, 10);
    //measureTimeの中でmeasureTimeを呼び出しているのはなぜ？→繰り返し実行させるため？→これを消すと0.01でカウントが止まる
    //10の意味の意味は？→1/100秒の速さでsetTimeoutを動かしている？
}
