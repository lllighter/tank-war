/*
    Function: Tank War
    Author  : 张家俊、陈亮亮
    Date    : 2020.1.1
    Version : 32.1
*/
/* eslint-disable */
var canvas = document.getElementById('mycanvas'),
    context = canvas.getContext('2d');
var offcanvas = document.createElement('canvas');
var outwall = new Image();
outwall.src = "sheet\\outwall.png";
var inwall = new Image();
inwall.src = "sheet\\inwall.png";
var bg = new Image();
bg.src = "sheet\\bg.png";
var tankpic = new Image();
tankpic.src = "sheet\\30黄tank.png";
var bulletpic = new Image();
bulletpic.src = "sheet\\enemy子弹.png";
var enemypic = new Image();
enemypic.src = "sheet\\30绿tank.png";
var enemybulletpic = new Image();
enemybulletpic.src = "sheet\\32炮弹中.png";
var boompic = new Image();
boompic.src = "sheet\\boom.png";
var grasspic = new Image();
grasspic.src = "sheet\\草.png";
var boardpic = new Image();
boardpic.src = "sheet\\公告.png";
var bosspic = new Image();
bosspic.src = "sheet\\bosstank.png";
var bossbulletpic = new Image();
bossbulletpic.src = "sheet\\boss子弹.png";
var smalltankpic = new Image();
smalltankpic.src = "sheet\\小tank.png";
var bloodpic = new Image();
bloodpic.src = "sheet\\fillblood.png";
var speedpic = new Image();
speedpic.src = "sheet\\2.png";
var invinciblepic = new Image();
invinciblepic.src = "sheet\\1.png";
var chaospic = new Image();
chaospic.src = "sheet\\5.png";
var snowpic = new Image();
snowpic.src = 'sheet\\圆snow.png';
var snowbgpic = new Image();
snowbgpic.src = 'sheet\\雪地.png';
var invintankpic = new Image();
invintankpic.src = 'sheet\\无敌黄tank.png';
var invinenemytankpic = new Image();
invinenemytankpic.src = 'sheet\\无敌绿tank.png';
var chaostankpic = new Image();
chaostankpic.src = 'sheet\\混乱黄tank.png';
var chaosenemytankpic = new Image();
chaosenemytankpic.src = 'sheet\\混乱绿tank.png';
var acctankpic = new Image();
acctankpic.src = 'sheet\\加速黄tank.png';
var accenemytankpic = new Image();
accenemytankpic.src = 'sheet\\加速绿tank.png';
var gameoverpic = new Image();
gameoverpic.src = 'sheet\\Gameover.png';
var winpic = new Image();
winpic.src = 'sheet\\win.png';
var p1winpic = new Image();
p1winpic.src = 'sheet\\Player1win.png';
var p2winpic = new Image();
p2winpic.src = 'sheet\\Player2win.png';
var icebg = new Image();
icebg.src = 'sheet\\icebg.png';
var icetree = new Image();
icetree.src = 'sheet\\icetree.png';
var iceinwall = new Image();
iceinwall.src = 'sheet\\iceinwall.png';
var iceoutwall = new Image();
iceoutwall.src = 'sheet\\iceoutwall.png';
var volcanobg = new Image();
volcanobg.src = 'sheet\\volcanobg.png';
var volcanotree = new Image();
volcanotree.src = 'sheet\\volcanotree.png';
var volcanowall = new Image();
volcanowall.src = 'sheet\\volcanowall.png';
var volcanograss = new Image();
volcanograss.src = 'sheet\\volcanograss.png';
var arrow = new Image();
arrow.src = 'sheet\\箭头.png';
var settingspic1 = new Image();
settingspic1.src = 'sheet\\冰山1.png';
var settingspic = new Image();
settingspic.src = 'sheet\\沙漠.png';
var settingspic2 = new Image();
settingspic2.src = 'sheet\\火山.jpg';
var strbullet = new Image();
strbullet.src = 'sheet\\强化子弹.png';
var skill2pic = new Image();
skill2pic.src = 'sheet\\召唤技能.png';
var map = [
         [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
	    [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
	    [32, 0, 0, 0, 0, 31, 32, 0, 0, 0, 32, 31, 0, 0, 0, 0, 32],
	    [32, 0, 0, 0, 31, 0, 0, 31, 0, 31, 0, 0, 31, 0, 0, 0, 32],
	    [32, 0, 0, 0, 31, 0, 0, 0, 31, 0, 0, 0, 31, 0, 0, 0, 32],
	    [32, 31, 0, 0, 0, 31, 0, 0, 0, 0, 0, 31, 0, 0, 0, 31, 32],
	    [32, 31, 0, 0, 0, 0, 31, 0, 0, 0, 31, 0, 0, 0, 0, 31, 32],
	    [32, 31, 0, 0, 0, 0, 0, 31, 0, 31, 0, 0, 0, 0, 0, 31, 32],
	    [32, 31, 31, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 31, 31, 32],
	    [32, 0, 0, 0, 33, 33, 0, 0, 0, 0, 0, 33, 33, 0, 0, 0, 32],
        [32, 0, 0, 0, 33, 33, 0, 0, 0, 0, 0, 33, 33, 0, 0, 0, 32],
        [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
        [32, 0, 31, 31, 31, 32, 31, 31, 31, 31, 31, 32, 31, 31, 31, 0, 32],
        [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
        [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
	    [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32]
        ];

var map1 = [
         [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
	    [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
	    [32, 0, 0, 0, 0, 31, 32, 0, 0, 0, 32, 31, 0, 0, 0, 0, 32],
	    [32, 0, 0, 0, 31, 0, 0, 31, 0, 31, 0, 0, 31, 0, 0, 0, 32],
	    [32, 0, 0, 0, 31, 0, 0, 0, 31, 0, 0, 0, 31, 0, 0, 0, 32],
	    [32, 31, 0, 0, 0, 31, 0, 0, 0, 0, 0, 31, 0, 0, 0, 31, 32],
	    [32, 31, 0, 0, 0, 0, 31, 0, 0, 0, 31, 0, 0, 0, 0, 31, 32],
	    [32, 31, 0, 0, 0, 0, 0, 31, 0, 31, 0, 0, 0, 0, 0, 31, 32],
	    [32, 31, 31, 0, 0, 0, 0, 0, 32, 0, 0, 0, 0, 0, 31, 31, 32],
	    [32, 0, 0, 0, 33, 33, 0, 0, 0, 0, 0, 33, 33, 0, 0, 0, 32],
        [32, 0, 0, 0, 33, 33, 0, 0, 0, 0, 0, 33, 33, 0, 0, 0, 32],
        [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
        [32, 0, 31, 31, 31, 32, 31, 31, 31, 31, 31, 32, 31, 31, 31, 0, 32],
        [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
        [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
	    [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32]
        ];

var map2 = [
         [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
	    [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
	    [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
	    [32, 0, 0, 31, 0, 0, 31, 31, 31, 0, 0, 32, 32, 32, 0, 0, 32],
	    [32, 0, 0, 31, 0, 0, 31, 0, 0, 0, 0, 31, 0, 0, 0, 0, 32],
	    [32, 0, 0, 32, 0, 0, 32, 0, 0, 0, 0, 31, 31, 31, 0, 0, 32],
	    [32, 0, 0, 31, 0, 0, 31, 0, 0, 0, 0, 31, 0, 0, 0, 0, 32],
	    [32, 0, 0, 31, 0, 0, 31, 31, 31, 0, 0, 32, 32, 32, 0, 0, 32],
	    [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
	    [32, 0, 0, 0, 33, 33, 0, 0, 0, 0, 0, 33, 33, 0, 0, 0, 32],
        [32, 0, 0, 0, 33, 33, 0, 0, 0, 0, 0, 33, 33, 0, 0, 0, 32],
        [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
        [32, 0, 31, 31, 31, 32, 31, 31, 31, 31, 31, 32, 31, 31, 31, 0, 32],
        [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
        [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
	    [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32]
        ];

var map3 = [
         [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
	    [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
	    [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
	    [32, 0, 31, 31, 31, 0, 31, 32, 32, 0, 31, 31, 32, 0, 31, 0, 32],
	    [32, 0, 0, 0, 31, 0, 31, 0, 31, 0, 0, 0, 31, 0, 31, 0, 32],
	    [32, 0, 0, 0, 31, 0, 31, 0, 31, 0, 0, 0, 31, 0, 32, 0, 32],
	    [32, 0, 32, 31, 31, 0, 31, 0, 31, 0, 31, 31, 31, 0, 31, 0, 32],
	    [32, 0, 31, 0, 0, 0, 31, 0, 31, 0, 31, 0, 0, 0, 31, 0, 32],
	    [32, 0, 31, 0, 0, 0, 31, 0, 31, 0, 31, 0, 0, 0, 31, 0, 32],
        [32, 0, 31, 31, 31, 0, 31, 31, 31, 0, 32, 31, 31, 0, 31, 0, 32],
        [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
        [32, 0, 0, 0, 0, 0, 0, 33, 33, 33, 0, 0, 0, 0, 0, 0, 32],
        [32, 0, 31, 31, 31, 32, 0, 33, 33, 33, 0, 32, 31, 31, 31, 0, 32],
        [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
        [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
	    [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32]
        ];

outwall.onload = function () {}
inwall.onload = function () {}
bg.onload = function () {}
tankpic.onload = function () {}
enemypic.onload = function () {}
enemybulletpic.onload = function () {}
boompic.onload = function () {}
grasspic.onload = function () {}
boardpic.onload = function () {}
bosspic.onload = function () {}
smalltankpic.onload = function () {}
bossbulletpic.onload = function () {}
bloodpic.onload = function () {}
speedpic.onload = function () {}
invinciblepic.onload = function () {}
chaospic.onload = function () {}
snowpic.onload = function () {}
snowbgpic.onload = function () {}
invintankpic.onload = function () {}
invinenemytankpic.onload = function () {}
chaostankpic.onload = function () {}
chaosenemytankpic.onload = function () {}
acctankpic.onload = function () {}
accenemytankpic.onload = function () {}
gameoverpic.onload = function () {}
winpic.onload = function () {}
p1winpic.onload = function () {}
p2winpic.onload = function () {}
icebg.onload = function () {}
icetree.onload = function () {}
iceinwall.onload = function () {}
iceoutwall.onload = function () {}
volcanobg.onload = function () {}
volcanotree.onload = function () {}
volcanowall.onload = function () {}
volcanograss.onload = function () {}
arrow.onload = function () {}
settingspic.onload = function () {}
settingspic1.onload = function () {}
settingspic2.onload = function () {}
strbullet.onload = function () {}
skill2pic.onload = function () {}

function clearCanvas(canvas) {
    context.clearRect(0, 0, canvas.width, canvas.height); //清屏
}

var snownumber = 10;
var snow = [];
for (var i = 0; i < snownumber; ++i) {
    snow.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 35 + 1,
        drow: function () {
            context.save();
            context.drawImage(snowpic, this.x, this.y, this.r, this.r);
            context.restore();
        }
    });
}

function drawSnow() {
    for (var i = 0; i < snow.length; ++i) {
        snow[i].drow();
    }
    for (i = 0; i < snow.length; ++i) {
        if (snow[i].x > canvas.width) {
            snow[i].x = 0;
        } else {
            snow[i].x += 1;
        }
        if (snow[i].y > canvas.height) {
            snow[i].y = 0;
        } else {
            snow[i].y += 1;
        }
    }
}

function windowToCanvas(x, y) {
    var mystyle = window.getComputedStyle(mycanvas);
    var bbox = mycanvas.getBoundingClientRect();
    // 平移到canvas(含padding, border)
    x -= bbox.left;
    y -= bbox.top;
    //再平移到canvas(不含padding, border):两种写法均可
    // x -= parseFloat(mystyle['border-left-width']);
    // y -= parseFloat(mystyle['border-top-width']);
    // x -= parseFloat(mystyle['padding-left']);
    // y -= parseFloat(mystyle['padding-top']);
    // 写法2
    x -= parseFloat(mystyle.borderLeftWidth);
    y -= parseFloat(mystyle.borderTopWidth);
    x -= parseFloat(mystyle.paddingLeft);
    y -= parseFloat(mystyle.paddingTop);
    // 当canvas元素和drawing surface尺寸不一致，缩放drawing surface
    x *= (parseFloat(mystyle['width']) / mycanvas.width);
    y *= (parseFloat(mystyle['height']) / mycanvas.height);
    return {
        x: x,
        y: y
    };
}

var startSound = document.createElement("audio");
document.body.appendChild(startSound);
startSound.setAttribute("src", "music\\开始.mp3");
startSound.volume = .5;


var shootSound = document.createElement("audio");
document.body.appendChild(shootSound);
shootSound.setAttribute("src", "music\\射击.mp3");
shootSound.volume = .5;

var boomSound = document.createElement("audio");
document.body.appendChild(boomSound);
boomSound.setAttribute("src", "music\\爆炸.mp3");
boomSound.volume = .5;


var propSound = document.createElement("audio");
document.body.appendChild(propSound);
propSound.setAttribute("src", "music\\道具.mp3");
propSound.volume = .5;

var bloodSound = document.createElement("audio");
document.body.appendChild(bloodSound);
bloodSound.setAttribute("src", "music\\回血.mp3");
bloodSound.volume = .5;

var chaosSound = document.createElement("audio");
document.body.appendChild(chaosSound);
chaosSound.setAttribute("src", "music\\混乱.mp3");
chaosSound.volume = .5;

var speedSound = document.createElement("audio");
document.body.appendChild(speedSound);
speedSound.setAttribute("src", "music\\加速.mp3");
speedSound.volume = .5;

var invincibleSound = document.createElement("audio");
document.body.appendChild(invincibleSound);
invincibleSound.setAttribute("src", "music\\无敌.mp3");
invincibleSound.volume = .5;

var backgroundSound = document.createElement("audio");
document.body.appendChild(backgroundSound);
backgroundSound.setAttribute("src", "music\\主界面.mp3");
backgroundSound.volume = .5;

var scoreSound = document.createElement("audio");
document.body.appendChild(scoreSound);
scoreSound.setAttribute("src", "music\\得分.mp3");
scoreSound.volume = .5;

var freezeSound = document.createElement("audio");
document.body.appendChild(freezeSound);
freezeSound.setAttribute("src", "music\\冻结.mp3");
freezeSound.volume = .5;

var gameoverSound = document.createElement("audio");
document.body.appendChild(gameoverSound);
gameoverSound.setAttribute("src", "music\\游戏结束.mp3");
gameoverSound.volume = .5;

var winSound = document.createElement("audio");
document.body.appendChild(winSound);
winSound.setAttribute("src", "music\\游戏获胜.mp3");
winSound.volume = .5;

var callSound = document.createElement("audio");
document.body.appendChild(callSound);
callSound.setAttribute("src", "music\\召唤.mp3");
callSound.volume = .5;

var bossspeedSound = document.createElement("audio");
document.body.appendChild(bossspeedSound);
bossspeedSound.setAttribute("src", "music\\BOSS加速.mp3");
bossspeedSound.volume = .5;
