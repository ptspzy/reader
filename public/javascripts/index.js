//获取s选择器中对应的所有元素是一个集合
function $(s) {
    return document.querySelectorAll(s);
}
var lis = $("#list li");
//给歌曲列表每首歌（li）添加点击事件及class
for (var i = 0; i < lis.length; i++) {
    lis[i].onclick = function() {
        for (var j = 0; j < lis.length; j++) {
            lis[j].className = "";
        }
        this.className = "selected";
        load('/book/'+this.title);
    }

}
var type = $("#type li");
//切换显示的canvas图像
for (var i = 0; i < type.length; i++) {
    type[i].onclick = function(){
        for (var i = 0; i < type.length; i++) {
            type[i].className="";
        }
        this.className = "selected";
        draw.type = this.getAttribute("data-type");
    }
}

//发送一个http请求1
var xhr = new XMLHttpRequest();
//通过AudioContext来解码歌曲并播放
var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
//创建一个改变音量的对象
var gainNode = audioCtx[audioCtx.createGain ? "createGain" : "createGainNode"]();
//判断是否已有歌曲播放，切换歌曲，防止多个歌曲同时播放
var judgeSource = null;
//若前一首歌曲还未解码，这时仍然会同时播放多首歌曲
var count = 0;
//创建一个接收频率的对象
var analyser = audioCtx.createAnalyser();
var size = 128;
analyser.fftSize = size * 2;
//绘制canvas的容器
var canvasBox = $("#canvasBox")[0];
var height, width;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvasBox.appendChild(canvas);
//创建一个放频率的点数组
var Dots = [];
//生成一个m到n之间的数
function random(m,n){
    return Math.round(Math.random()*(n-m)+m);
}
function getDots(){
     Dots=[];
     for (var i = 0; i < size; i++) {
         var x = random(0,width);
         var y = random(0,height); 
         var color = "rgb("+random(0,255)+","+random(0,255)+","+random(0,255)+")" ;   
    
         Dots.push(
         {
            x:x,
            y:y,
            color:color
         });
          }
     }
     var line;
function resize() {
    height = canvasBox.clientHeight;
    width = canvasBox.clientWidth;
    canvas.height = height;
    canvas.width = width;
    line = ctx.createLinearGradient(0, 0, 0, height);
    line.addColorStop(0, "red");
    line.addColorStop(0.5, "orange");
    line.addColorStop(1, "yellow");
    getDots();

}
resize();
window.onresize = resize;

function load(url) {
    console.log(url)
    xmlhttp = null;
    if (window.XMLHttpRequest) {// code for Firefox, Opera, IE7, etc.
        xmlhttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (xmlhttp != null) {
        xmlhttp.onreadystatechange = state_Change;
        xmlhttp.open("GET", url, true);
        xmlhttp.send(null);
    }
    else {
        alert("Your browser does not support XMLHTTP.");
    }
}

function state_Change()
{
    if (xmlhttp.readyState==4)
    {// 4 = "loaded"
        if (xmlhttp.status==200)
        {// 200 = "OK"
            document.getElementById('bookContent').innerHTML=xmlhttp.responseText;
        }
        else
        {
            alert("Problem retrieving data:" + xmlhttp.statusText);
        }
    }
}
