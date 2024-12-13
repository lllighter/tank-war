/*
    Function: Tank War
    Author  : 张家俊、陈亮亮
    Date    : 2020.12.26
    Version : 10.2
*/

function init() {
    var angle = 0,
        boardflag = -1,
        flagvolume = 1;
    var mypattern;
    var animate;
    var text = "Tank  War";
    var au_text = "Author: 张家俊 陈亮亮";
    var enemyarray = new Array();
    for (var enemynum = 0; enemynum <= 2; enemynum++) {
        var tempx = 48 + enemynum * 192;
        //敌军坦克
        enemy = {
            x: tempx,
            y: 48,
            speed: 2,
            enemyAngle: 180
        };
        enemyarray[enemynum] = enemy;
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

    function drawLoadmap() {
        clearCanvas(canvas);
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
        if (boardflag == 1) {
            context.setTransform();
            context.save()
            context.drawImage(boardpic, 65, 195, 435, 215);
            context.font = '25px STXingkai';
            context.fillStyle = '#9B30FF';
            context.shadowColor = 'pink';
            context.shadowOffsetX = 5;
            context.shadowOffsetY = 10;
            context.shadowBlur = 5;
            context.fillText("本游戏名为Tank War，", 160, 237);
            context.fillText("共设三个模式，", 160, 266);
            context.fillText("三个模式三种玩法，", 160, 295);
            context.fillText("其中精彩请玩家们", 160, 324);
            context.fillText("亲身体验、慢慢探索", 160, 353);
            context.restore();
        }
        mypattern = context.createPattern(iceinwall, 'repeat');
        context.font = 'bolder 130px Arial';
        context.fillStyle = mypattern;
        context.fillText(text, 80, 190);
        context.save();
        context.font = '25px STXingkai';
        context.fillStyle = 'black';
        context.shadowColor = 'pink';
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 10;
        context.shadowBlur = 5;
        context.fillText(au_text, 66, 440);
        context.restore();
    } //画地图

    function update() {
        clearCanvas(canvas);
        context.setTransform();
        drawLoadmap();
        drawSnow();
    }

    function eupdate() {
        for (var enemytanknum = 0; enemytanknum <= 2; enemytanknum++) {
            enemy = enemyarray[enemytanknum];
            enemyupdate();
        }
    }

    function enemyupdate() {
        if (enemy.enemyAngle == 0) { //上
            enemy.y -= enemy.speed;
            if (loadmap[Math.floor((enemy.y + 2) / 32)][Math.floor((enemy.x + 2) / 32)] != 0 || loadmap[Math.floor((enemy.y + 2) / 32)][Math.ceil((enemy.x - 2) / 32)] != 0) {
                enemy.y += enemy.speed;
                directionWall();
            } else
                autodireciton();
            drawEnemy();
        } else if (enemy.enemyAngle == 180) { //下

            enemy.y += enemy.speed;
            if (loadmap[Math.ceil((enemy.y) / 32)][Math.ceil((enemy.x - 2) / 32)] != 0 || loadmap[Math.ceil((enemy.y) / 32)][Math.floor((enemy.x + 2) / 32)] != 0) {
                enemy.y -= enemy.speed;
                directionWall();
            } else
                autodireciton();
            drawEnemy();
        } else if (enemy.enemyAngle == 270) { //左

            enemy.x -= enemy.speed;
            if (loadmap[Math.floor((enemy.y + 2) / 32)][Math.floor((enemy.x) / 32)] != 0 || loadmap[Math.ceil((enemy.y - 2) / 32)][Math.floor((enemy.x) / 32)] != 0) {
                enemy.x += enemy.speed;
                directionWall();
            } else
                autodireciton();
            drawEnemy();
        } else if (enemy.enemyAngle == 90) { //右

            enemy.x += enemy.speed;
            if (loadmap[Math.ceil((enemy.y - 2) / 32)][Math.ceil((enemy.x - 2) / 32)] != 0 || loadmap[Math.floor((enemy.y + 2) / 32)][Math.ceil((enemy.x - 2) / 32)] != 0) {
                enemy.x -= enemy.speed;
                directionWall();
            } else
                autodireciton();
            drawEnemy();
        }
    }

    function autodireciton() {
        var j = Math.floor(Math.random() * 100);
        if (j == 0) {
            enemy.enemyAngle += 90;
        }
        if (j == 1) {
            enemy.enemyAngle -= 90;
        }
        enemy.enemyAngle = (enemy.enemyAngle + 360) % 360;
    }

    function directionWall() {
        var j = Math.floor(Math.random() * 2);
        if (j == 0) {
            enemy.enemyAngle += 90;
        } else {
            enemy.enemyAngle -= 90;
        }
        enemy.enemyAngle = (enemy.enemyAngle + 360) % 360;
    }

    function drawEnemy() {
        context.setTransform();
        context.translate(enemy.x + 16, enemy.y + 16);
        context.rotate(enemy.enemyAngle * Math.PI / 180);
        context.drawImage(smalltankpic, -16, -16, 32, 32);
    }


    introButton.onclick = function (e) {
        boardflag = -boardflag;
    }

    singlestartBtn.onclick = function (e) {
        cancelAnimationFrame(animate);
        context.resetTransform();
        clearCanvas(canvas);
        singlestartBtn.style.display = "none";
        battlestartBtn.style.display = "none";
        doublestartBtn.style.display = "none";
        introButton.style.display = "none";
        volumeButton.style.display = "none";
        settings();
    }

    battlestartBtn.onclick = function (e) {
        cancelAnimationFrame(animate);
        context.resetTransform();
        clearCanvas(canvas);
        singlestartBtn.style.display = "none";
        battlestartBtn.style.display = "none";
        doublestartBtn.style.display = "none";
        introButton.style.display = "none";
        volumeButton.style.display = "none";
        settings1();
    }

    doublestartBtn.onclick = function (e) {
        cancelAnimationFrame(animate);
        context.resetTransform();
        clearCanvas(canvas);
        singlestartBtn.style.display = "none";
        battlestartBtn.style.display = "none";
        doublestartBtn.style.display = "none";
        introButton.style.display = "none";
        volumeButton.style.display = "none";
        settings2();
    }

    volumeButton.onclick = function () {
        if (flagvolume == 1) {
            document.getElementById('volumeButton').style.background = "url('sheet//volume.png')";
            backgroundSound.play();
        } else {
            document.getElementById('volumeButton').style.background = "url('sheet//banvolume.png')";
            backgroundSound.pause();
        }
        flagvolume = -flagvolume;
    }

    function load() {
        update();
        eupdate();
        animate = requestAnimationFrame(load);
    }

    load();
}
