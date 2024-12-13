/*
    Function: Tank War
    Author  : 张家俊、陈亮亮
    Date    : 2020.1.1
    Version : 8.2
*/

var persent = 0,
    counter = 0;
var loc_x = 0,
    loc_x1 = 0;
var flagfinish = false;
var mypattern;
var keysDown = {};
var animate;
addEventListener("keydown", key, false);
addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

function key(e) {
    keysDown[e.keyCode] = true;
    if (32 in keysDown) {
        flagfinish = true;
        clearCanvas(canvas);
        init();
        singlestartBtn.style.display = "block";
        battlestartBtn.style.display = "block";
        doublestartBtn.style.display = "block";
        introButton.style.display = "block";
        volumeButton.style.display = "block";
        removeEventListener("keydown", key, false);
    }
}

var loadmap = [ //1是隐形墙
         [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
	    [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 32],
	    [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
	    [32, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 32],
	    [32, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 32],
	    [32, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 32],
	    [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 32],
	    [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 32],
	    [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 32],
	    [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 32],
	    [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 32],
	    [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 32],
        [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 32],
	    [32, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 32],
	    [32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32],
	    [32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32]
        ];

function drawFrame() {
    for (var i = 0; i < canvas.height / 32; i++) {
        for (var j = 0; j < canvas.width / 32; j++) {
            context.save();
            if (loadmap[i][j] == 32) {
                context.drawImage(iceoutwall, j * 32, i * 32, 32, 32);
            }
            if (loadmap[i][j] == 31) {
                context.drawImage(iceinwall, j * 32, i * 32, 32, 32);
            }
            if (loadmap[i][j] == 0 || loadmap[i][j] == 1) {
                context.drawImage(icebg, j * 32, i * 32, 32, 32);
            }
            context.restore();
        }
    }
    context.save();
    context.beginPath();
    context.rect(80, 90, loc_x, 130);
    context.clip();
    mypattern = context.createPattern(iceinwall, 'repeat');
    context.font = 'bolder 130px Arial';
    context.fillStyle = mypattern;
    context.fillText("Tank  War", 80, 190);
    context.restore();
    context.save();
    context.fillStyle = mypattern;
    context.fillRect(40, canvas.height / 2, loc_x, 25);
    context.resetTransform();
    context.translate(loc_x + 40, 280);
    context.rotate(90 * Math.PI / 180);
    context.drawImage(smalltankpic, 0, 0, 32, 32);
    context.restore();
    context.save();
    context.font = '25px STXingkai';
    context.fillStyle = 'black';
    context.shadowColor = 'pink';
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 10;
    context.shadowBlur = 5;
    context.fillText("Author: 张家俊 陈亮亮", 66, 440);
    context.restore();
    if (loc_x < canvas.width - 96)
        loc_x += (canvas.width - 64) / 100; //每帧变化
    if (counter < 100) {
        counter++;
        context.save();
        context.font = 'bolder 20px STXingkai';
        context.fillStyle = "#de3030";
        context.fillText(counter + "%", loc_x, canvas.height / 2);
        context.restore();
    } else {
        counter++;
        context.save();
        context.font = 'bolder 20px STXingkai';
        context.fillStyle = "#de3030";
        context.fillText("100%", loc_x, canvas.height / 2);
        context.font = '20px STXingkai';
        if (counter % 100 <= 50)
            context.fillText("按  空  格  键  继  续", 450, 440);
    }
}



function load() {
    clearCanvas(canvas);
    drawFrame();
    if (!flagfinish)
        animate = requestAnimationFrame(load);
}

window.onload = function () {
    load();
}
