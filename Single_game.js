/*
    Function: Tank War
    Author  : 张家俊、陈亮亮
    Date    : 2020.1.1
    Version : 28.1
*/

function singlebattle(number, mylife, flag) {
    var animate;
    var angle = 0,
        eangle = 0,
        angle2 = 0;
    var enemyspeed = 3,
        enemybulletspeed = 5;
    var time = 0,
        finishtime = 0;
    var boomx, boomy;
    var tank = {
        speed: 2.5,
        tankAngle: 0,
        x: 250,
        y: 300
    };
    var enemyarray = new Array();
    for (var enemynum = 0; enemynum < number; enemynum++) {
        var tempx = (50 + enemynum * 200) % 544;
        //敌军坦克
        enemy = {
            x: tempx,
            y: 48,
            speed: 2,
            enemyAngle: 180
        };
        enemyarray[enemynum] = enemy;
    }
    var bullet = {
        x: 0,
        y: 0,
        bulletspeed: 3,
        bulletAngle: 0,
        bulletflag: false
    };
    if (number == 1) {
        var enemybullet = {
            x: 0,
            y: 0,
            bulletspeed: 4,
            bulletAngle: 0,
            bulletflag: false
        };
    } else if (number == 2) {
        var enemybullet = {
            x: 0,
            y: 0,
            bulletspeed: 3,
            bulletAngle: 0,
            bulletflag: false
        };
    } else {
        var enemybullet = {
            x: 0,
            y: 0,
            bulletspeed: 1,
            bulletAngle: 0,
            bulletflag: false
        };
    }
    var bulletinterval = null;
    var enemybulletinterval = null;
    var interval;
    var einterval;
    var flagspace = false,
        flagenemyspace = false,
        flagboom = false,
        flagfinish = false;
    var keysDown = {};
    var enemynumber = number,
        life = mylife,
        score = 0,
        Invincible = false;
    var offcanvas = document.createElement('canvas'),
        offcontext = offcanvas.getContext('2d');
    offcanvas.width = 544;
    offcanvas.height = 512;
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);
    //........................函数定义.......................
    //我方坦克
    function space() {
        if (32 in keysDown) {
            shootSound.play();
            if (bullet.bulletflag == true) {
                return;
            } else {
                flagspace = true;
                bullet.x = tank.x;
                bullet.y = tank.y;
                bullet.bulletflag = true;
                bullet.bulletAngle = tank.tankAngle;
                angle1 = bullet.bulletAngle * Math.PI / 180;
                bulletupdate();
            }
        }
    } //发射子弹

    function destorywall(i) {
        if (i == 31) {
            flagspace = false;
            setTimeout(function () {
                bullet.bulletflag = false
            }, 400);
            bullet.x = -200;
            bullet.y = -200;
            return 0;
        } else if (i == 32) {
            flagspace = false;
            setTimeout(function () {
                bullet.bulletflag = false
            }, 400);
            bullet.x = -200;
            bullet.y = -200;
            return i;
        } else if (i == 33) {
            return i;
        }

        return 0;
    }
    //子弹碰墙

    function bulletupdate() {
        if (bullet.bulletAngle == 0) {
            bullet.y -= bullet.bulletspeed;
            var i = map1[Math.floor((bullet.y) / 32)][Math.floor((bullet.x + 16) / 32)];
            map1[Math.floor((bullet.y) / 32)][Math.floor((bullet.x + 16) / 32)] = destorywall(i);
            drawBullet();
        } else if (bullet.bulletAngle == 90) {
            bullet.x += bullet.bulletspeed;
            var i = map1[Math.floor((bullet.y + 16) / 32)][Math.floor((bullet.x + 20) / 32)];
            map1[Math.floor((bullet.y + 16) / 32)][Math.floor((bullet.x + 20) / 32)] = destorywall(i);
            drawBullet();
        } else if (bullet.bulletAngle == 180) {
            bullet.y += bullet.bulletspeed;
            var i = map1[Math.floor((bullet.y + 20) / 32)][Math.floor((bullet.x + 16) / 32)];
            map1[Math.floor((bullet.y + 20) / 32)][Math.floor((bullet.x + 16) / 32)] = destorywall(i);
            drawBullet();
        } else if (bullet.bulletAngle == 270) {
            bullet.x -= bullet.bulletspeed;
            var i = map1[Math.floor((bullet.y + 16) / 32)][Math.floor((bullet.x) / 32)];
            map1[Math.floor((bullet.y + 16) / 32)][Math.floor((bullet.x) / 32)] = destorywall(i);
            drawBullet();
        }
    }
    //更新子弹

    function drawBullet() {
        context.setTransform();
        context.translate(bullet.x + 16, bullet.y + 16);
        context.rotate(angle1);
        context.drawImage(bulletpic, -16, -16, 32, 32);
    } //画子弹

    function drawMap() {
        clearCanvas(canvas);
        for (var i = 0; i < 16; i++) {
            for (var j = 0; j < 17; j++) {
                context.save();
                if (map1[i][j] == 32) {
                    if (flag == 0)
                        context.drawImage(outwall, j * 32, i * 32, 32, 32);
                    else if (flag == 1)
                        context.drawImage(iceoutwall, j * 32, i * 32, 32, 32);
                    else if (flag == 2)
                        context.drawImage(volcanowall, j * 32, i * 32, 32, 32);
                }
                if (map1[i][j] == 31) {
                    if (flag == 0)
                        context.drawImage(inwall, j * 32, i * 32, 32, 32);
                    else if (flag == 1)
                        context.drawImage(iceinwall, j * 32, i * 32, 32, 32);
                    else if (flag == 2)
                        context.drawImage(volcanotree, j * 32, i * 32, 32, 32);
                }
                if (map1[i][j] == 0) {
                    if (flag == 0)
                        context.drawImage(bg, j * 32, i * 32, 32, 32);
                    else if (flag == 1)
                        context.drawImage(icebg, j * 32, i * 32, 32, 32);
                    else if (flag == 2)
                        context.drawImage(volcanobg, j * 32, i * 32, 32, 32);
                }
                if (map1[i][j] == 33) {
                    if (flag == 0)
                        context.drawImage(grasspic, j * 32, i * 32, 32, 32);
                    else if (flag == 1)
                        context.drawImage(icetree, j * 32, i * 32, 32, 32);
                    else if (flag == 2)
                        context.drawImage(volcanograss, j * 32, i * 32, 32, 32);
                }
                context.restore();
            }
        }
        context.clearRect(544, 0, 224, 512);
        context.drawImage(snowbgpic, 544, 0, 224, 512);
        context.save();
        context.strokeStyle = 'rgba(0, 0, 0, 0.46)';
        context.shadowColor = 'pink';
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 10;
        context.shadowBlur = 5;
        context.strokeRect(590, 80, 160, 125);
        context.strokeRect(590, 245, 165, 165);
        context.restore();
        context.save();
        context.fillStyle = "#000000";
        context.font = "23px Arial";
        context.fillText("敌 人 数 量:" + enemynumber + "", 605, 110);
        context.fillStyle = "#b91a1a";
        context.fillText("剩 余 生 命:" + life + "", 605, 150);
        context.fillText("得       分:" + score + "", 605, 190);
        context.restore();
        context.save();
        context.fillStyle = "#000000";
        context.font = "20px STLiti";
        context.fillText("↑       向上移动", 605, 270);
        context.fillText("↓       向下移动", 605, 300);
        context.fillText("←       向左移动", 605, 330);
        context.fillText("→       向右移动", 605, 360);
        context.fillText("空格   发射子弹", 605, 390);
        context.restore();
        if (!life) flagfinish = true;
    } //画地图

    function update() {
        clearCanvas(canvas);
        context.setTransform();
        drawMap();
        drawSnow();
        if (38 in keysDown) { // Player holding up
            space();
            tank.tankAngle = 0;
            angle = tank.tankAngle * Math.PI / 180;
            tank.y -= tank.speed;
            if ((map1[Math.floor((tank.y + 2) / 32)][Math.floor((tank.x + 2) / 32)] != 0 || map1[Math.floor((tank.y + 2) / 32)][Math.ceil((tank.x - 2) / 32)] != 0)) {
                if (!(map1[Math.floor((tank.y + 2) / 32)][Math.floor((tank.x - 2) / 32)] == 33 || map1[Math.floor((tank.y + 2) / 32)][Math.ceil((tank.x + 2) / 32)] == 33)) {
                    tank.y += tank.speed;
                    drawTank();
                } else {
                    context.globalAlpha = 0.5;
                    drawTank();
                    context.globalAlpha = 1;
                }
            } else
                drawTank();
            if (flagspace) bulletupdate();
        } else if (40 in keysDown) { // Player holding down
            space();
            tank.tankAngle = 180;
            angle = tank.tankAngle * Math.PI / 180;
            tank.y += tank.speed;
            if ((map1[Math.ceil((tank.y) / 32)][Math.ceil((tank.x - 2) / 32)] != 0 || map1[Math.ceil((tank.y) / 32)][Math.floor((tank.x + 2) / 32)] != 0)) {
                if (!(map1[Math.ceil((tank.y) / 32)][Math.ceil((tank.x + 2) / 32)] == 33 || map1[Math.ceil((tank.y) / 32)][Math.floor((tank.x - 2) / 32)] == 33)) {
                    tank.y -= tank.speed;
                    drawTank();
                } else {
                    context.globalAlpha = 0.5;
                    drawTank();
                    context.globalAlpha = 1;
                }
            } else
                drawTank();
            if (flagspace) bulletupdate();
        } else if (37 in keysDown) { // Player holding left
            space();
            tank.tankAngle = 270;
            angle = tank.tankAngle * Math.PI / 180;
            tank.x -= tank.speed;
            if ((map1[Math.floor((tank.y + 2) / 32)][Math.floor((tank.x) / 32)] != 0 || map1[Math.ceil((tank.y - 2) / 32)][Math.floor((tank.x) / 32)] != 0)) {
                if (!(map1[Math.floor((tank.y - 2) / 32)][Math.floor((tank.x) / 32)] == 33 || map1[Math.ceil((tank.y + 2) / 32)][Math.floor((tank.x) / 32)] == 33)) {
                    tank.x += tank.speed;
                    drawTank();
                } else {
                    context.globalAlpha = 0.5;
                    drawTank();
                    context.globalAlpha = 1;
                }
            } else
                drawTank();
            if (flagspace) bulletupdate();
        } else if (39 in keysDown) { // Player holding right
            space();
            angle = tank.tankAngle = 90;
            angle = tank.tankAngle * Math.PI / 180;
            tank.x += tank.speed;
            if (map1[Math.ceil((tank.y - 2) / 32)][Math.ceil((tank.x - 2) / 32)] || map1[Math.floor((tank.y + 2) / 32)][Math.ceil((tank.x - 2) / 32)]) {
                if (!(map1[Math.ceil((tank.y + 2) / 32)][Math.ceil((tank.x - 2) / 32)] == 33 || map1[Math.floor((tank.y - 2) / 32)][Math.ceil((tank.x - 2) / 32)] == 33)) {
                    tank.x -= tank.speed;
                    drawTank();
                } else {
                    context.globalAlpha = 0.5;
                    drawTank();
                    context.globalAlpha = 1;
                }
            } else
                drawTank();
            if (flagspace) bulletupdate();
        } else {
            space();
            if (!(map1[Math.floor((tank.y + 2) / 32)][Math.floor((tank.x + 2) / 32)] == 33 || map1[Math.floor((tank.y + 2) / 32)][Math.ceil((tank.x + 2) / 32)] == 33)) {

                drawTank();
            } else {
                context.globalAlpha = 0.5;
                drawTank();
                context.globalAlpha = 1;
            }
            if (flagspace) bulletupdate();
        }

    } //更新坦克

    function drawTank() {
        context.resetTransform();
        context.translate(tank.x + 16, tank.y + 16);
        context.rotate(angle);
        if (Invincible) context.drawImage(invintankpic, -16, -16, 30, 30);
        else context.drawImage(tankpic, -16, -16, 30, 30);
    } //画我方坦克

    //敌军坦克
    function eupdate() {
        for (var enemytanknum = 0; enemytanknum < number; enemytanknum++) {
            enemy = enemyarray[enemytanknum];
            enemyupdate();
        }
    }

    function enemyupdate() {
        if (enemy.enemyAngle == 0) { //上
            enemy.y -= enemy.speed;
            if (map1[Math.floor((enemy.y + 2) / 32)][Math.floor((enemy.x + 2) / 32)] != 0 || map1[Math.floor((enemy.y + 2) / 32)][Math.ceil((enemy.x - 2) / 32)] != 0) {
                enemy.y += enemy.speed;
                directionWall();
            } else
                autodireciton();
            drawEnemy();
            if (flagenemyspace) enemybulletupdate();
        } else if (enemy.enemyAngle == 180) { //下
            enemy.y += enemy.speed;
            if (map1[Math.ceil((enemy.y) / 32)][Math.ceil((enemy.x - 2) / 32)] != 0 || map1[Math.ceil((enemy.y) / 32)][Math.floor((enemy.x + 2) / 32)] != 0) {
                enemy.y -= enemy.speed;
                directionWall();
            } else
                autodireciton();
            drawEnemy();
            if (flagenemyspace) enemybulletupdate();
        } else if (enemy.enemyAngle == 270) { //左
            enemy.x -= enemy.speed;
            if (map1[Math.floor((enemy.y + 2) / 32)][Math.floor((enemy.x) / 32)] != 0 || map1[Math.ceil((enemy.y - 2) / 32)][Math.floor((enemy.x) / 32)] != 0) {
                enemy.x += enemy.speed;
                directionWall();
            } else
                autodireciton();
            drawEnemy();
            if (flagenemyspace) enemybulletupdate();
        } else if (enemy.enemyAngle == 90) { //右
            enemy.x += enemy.speed;
            if (map1[Math.ceil((enemy.y - 2) / 32)][Math.ceil((enemy.x - 2) / 32)] != 0 || map1[Math.floor((enemy.y + 2) / 32)][Math.ceil((enemy.x - 2) / 32)] != 0) {
                enemy.x -= enemy.speed;
                directionWall();
            } else
                autodireciton();
            drawEnemy();
            if (flagenemyspace) enemybulletupdate();
        }
        enemyspace();
        time++;
        if (time >= 100) {
            flagboom = false;
            time = 0;
        }

        if (flagboom) boom(boomx, boomy);

        if (hit(bullet, enemy)) { //检测打击到敌方坦克
            boomSound.play();
            flagspace = false;
            flagboom = true;
            score += 10;
            scoreSound.play();
            boomx = enemy.x;
            boomy = enemy.y;
            boom(boomx, boomy);
            setTimeout(function () {
                bullet.bulletflag = false
            }, 300);
            enemy.x = 250;
            enemy.y = 48;
            if (enemyspeed <= 2.5)
                enemyspeed = enemyspeed + 0.05;
            enemy.speed = enemyspeed;
            enemy.enemyAngle = 180;
            if (enemybullet.bulletspeed <= 2)
                enemybullet.bulletspeed += 0.05;
            bullet.x = -200;
            bullet.y = -200;
            if (tank.speed <= 3.5) {
                tank.speed += 0.1;
                bullet.bulletspeed += 0.1;
            }
        }
        if (hit(enemybullet, tank)) { //检测打击到我方坦克
            if (Invincible) return;
            Invincible = true;
            flagspace = false;
            flagboom = true;
            setTimeout(function () {
                Invincible = false
            }, 2000);
            boomSound.play();
            flagenemyspace = false;
            boomx = tank.x;
            boomy = tank.y;
            boom(boomx, boomy);
            if (life >= 1) life--;
            setTimeout(function () {
                enemybullet.bulletflag = false
            }, 300);
            setTimeout(function () {
                tank.x = -200;
                enemybullet.x = -200;
                enemybullet.y = -200;
                bullet.bulletspeed = 3;
                tank = {
                    speed: 2.5,
                    tankAngle: 0,
                    x: 250,
                    y: 300
                };
            }, 100);
        }
        if (hit(enemy, tank)) { //检测两坦克相撞
            if (Invincible) return;
            Invincible = true;
            flagspace = false;
            flagboom = true;
            setTimeout(function () {
                Invincible = false
            }, 2000);
            setTimeout(function () {
                enemybullet.bulletflag = false
            }, 300);
            boomSound.play();
            flagenemyspace = false;
            boomx = (tank.x + enemy.x) / 2;
            boomy = (tank.y + enemy.y) / 2;
            boom(boomx, boomy);
            enemy.x = 250;
            enemy.y = 48;
            if (enemyspeed <= 2.5)
                enemyspeed = enemyspeed + 0.05;
            enemy.speed = enemyspeed;
            enemy.enemyAngle = 180;
            if (enemybullet.bulletspeed <= 3)
                enemybullet.bulletspeed += 0.05;
            if (life >= 1) life--;
            setTimeout(function () {
                tank.x = -500;
                bullet.bulletspeed = 3;
                tank = {
                    speed: 2.5,
                    tankAngle: 0,
                    x: 250,
                    y: 300
                };
            }, 100);
        }

    }

    function hit(a, b) {
        var distance = Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
        if (distance <= 28) {
            return true;
        } else {
            return false;
        }
    }

    function boom(x, y) {
        setTimeout(function () {
            bullet.bulletflage = false
        }, 300);
        context.setTransform();
        context.translate(x + 16, y + 16)
        context.drawImage(boompic, -16, -16, 32, 32);

    }

    function enemyspace() {
        var enemyspace = Math.floor(Math.random() * 2);
        if (enemyspace == 0) {
            if (enemybullet.bulletflag == true) return;
            else {
                enemybullet.x = enemy.x;
                enemybullet.y = enemy.y;
                enemybullet.bulletflag = true;
                enemybullet.bulletAngle = enemy.enemyAngle;
                angle2 = enemybullet.bulletAngle * Math.PI / 180;
                flagenemyspace = true;
                enemybulletupdate();
            }
        }
    }

    function enemybulletupdate() {

        if (enemybullet.bulletAngle == 0) {
            enemybullet.y -= enemybullet.bulletspeed;
            var i = map1[Math.floor((enemybullet.y) / 32)][Math.floor((enemybullet.x + 16) / 32)];
            map1[Math.floor((enemybullet.y) / 32)][Math.floor((enemybullet.x + 16) / 32)] = enemydestorywall(i);
            drawEnemyBullet();
        } else if (enemybullet.bulletAngle == 90) {
            enemybullet.x += enemybullet.bulletspeed;
            var i = map1[Math.floor((enemybullet.y + 16) / 32)][Math.floor((enemybullet.x + 20) / 32)];
            map1[Math.floor((enemybullet.y + 16) / 32)][Math.floor((enemybullet.x + 20) / 32)] = enemydestorywall(i);
            drawEnemyBullet();
        } else if (enemybullet.bulletAngle == 180) {
            enemybullet.y += enemybullet.bulletspeed;
            var i = map1[Math.floor((enemybullet.y + 20) / 32)][Math.floor((enemybullet.x + 16) / 32)];
            map1[Math.floor((enemybullet.y + 20) / 32)][Math.floor((enemybullet.x + 16) / 32)] = enemydestorywall(i);
            drawEnemyBullet();
        } else if (enemybullet.bulletAngle == 270) {
            enemybullet.x -= enemybullet.bulletspeed;
            var i = map1[Math.floor((enemybullet.y + 16) / 32)][Math.floor((enemybullet.x) / 32)];
            map1[Math.floor((enemybullet.y + 16) / 32)][Math.floor((enemybullet.x) / 32)] = enemydestorywall(i);
            drawEnemyBullet();
        }
    }

    function enemydestorywall(i) {
        if (i == 31) {
            flagenemyspace = false;
            setTimeout(function () {
                enemybullet.bulletflag = false
            }, 400);
            enemybullet.x = -200;
            enemybullet.y = -200;
            return 0;
        } else if (i == 32) {
            flagenemyspace = false;
            setTimeout(function () {
                enemybullet.bulletflag = false
            }, 400);
            enemybullet.x = -200;
            enemybullet.y = -200;
            return i;
        } else if (i == 33) return i;
        return 0;
    }

    function drawEnemyBullet() {
        context.setTransform();
        context.translate(enemybullet.x + 16, enemybullet.y + 16);
        context.rotate(angle2);
        context.drawImage(enemybulletpic, -16, -16, 32, 32);
    } //画子弹

    function autodireciton() {
        var j = Math.floor(Math.random() * 500);
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
        context.drawImage(enemypic, -16, -16, 30, 30);
    }

    var imagearr = new Array();
    for (var i = 0; i < 272; i++) {
        var imagestr = {
            setx: Math.random() * 500 + 1,
            sety: Math.random() * 500 + 1
        };
        imagearr[i] = imagestr;
    }

    var insetx = 0.1,
        cliptime = 0,
        index;

    function finish() {
        gameoverSound.play();
        index = -1;
        context.resetTransform();
        offcontext.drawImage(canvas, 0, 0, canvas.width, canvas.height);
        context.clearRect(0, 0, 544, 512);
        context.fillStyle = "black";
        context.fillRect(0, 0, offcanvas.width, offcanvas.height);
        for (var i = 0; i < 1700000; ++i) {
            if (i % 100000 == 0) {
                for (var j = 0; j < 1600000; ++j) {
                    if (j % 100000 == 0) {
                        index++;
                        if (finishtime < 52) {
                            insetx -= 0.00001;
                            context.drawImage(offcanvas, i / 100000 * 32, j / 100000 * 32, 32, 32, imagearr[index].sety, imagearr[index].setx + insetx, 32, 32);
                        } else {
                            if (cliptime < 272) {
                                context.save();
                                context.beginPath();
                                context.rect(0, canvas.height / 2 - cliptime, 544, cliptime * 2);
                                context.clip();
                                context.stroke();
                                context.drawImage(gameoverpic, 0, 0, 544, 512);
                                context.restore();
                                cliptime += 0.05;
                            } else {
                                context.drawImage(gameoverpic, 0, 0, 544, 512);
                                cancelAnimationFrame(animate);
                            }
                        }
                    }
                }
            }
        }
    }


    //........................初始化........................
    function load() {
        if (!flagfinish) {
            update();
            eupdate();
        } else {
            finishtime++;
            setTimeout(function () {
                finish();
            }, 300);
        }
        animate = requestAnimationFrame(load);
    }

    load();

    back2initButton.style.display = "block";
    back2initButton.onclick = function (e) {
        cancelAnimationFrame(animate);
        clearCanvas(canvas);
        startSound.pause();
        startSound.currentTime = 0;
        back2initButton.style.display = "none";
        singlestartBtn.style.display = "block";
        battlestartBtn.style.display = "block";
        doublestartBtn.style.display = "block";
        introButton.style.display = "block";
        volumeButton.style.display = "block";
        init();
        map1 = [
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
    }
}
