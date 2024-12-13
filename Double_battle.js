/*
    Function: Tank War
    Author  : 张家俊、陈亮亮
    Date    : 2020.12.26
    Version : 16.1
*/

function doublebattle(life, flag) {
    var angle = 0;
    var eangle = 0;
    var angle2 = 0;
    var animate;
    var time = 0,
        bloodtime = 0,
        speeuptime = 0,
        espeeduptime = 0,
        invincibletime = 0,
        einvincibletime = 0,
        echaostime = 0,
        chaostime = 0;
    var boomx, boomy, propx, propy;
    var tank = {
        speed: 3,
        tankAngle: 0,
        x: 250,
        y: 450
    };
    var enemy = {
        x: 250,
        y: 48,
        speed: 3,
        enemyAngle: 180
    };

    var bullet = {
        x: 0,
        y: 0,
        bulletspeed: 5,
        bulletAngle: 0,
        bulletflag: false
    };
    var enemybullet = {
        x: 0,
        y: 0,
        bulletspeed: 5,
        bulletAngle: 0,
        bulletflag: false
    };
    var bulletinterval = null;
    var enemybulletinterval = null;
    var interval;
    var einterval;
    var flagspace = false,
        flagenemyspace = false,
        flagboom = false,
        flagbloodbag = false,
        flagspeedup = false,
        eflagspeedup = false,
        flagInvincible = false,
        eflagInvincible = false,
        eflagchaos = false,
        flagchaos = false,
        flagP1 = false,
        flagP2 = false;
    var keysDown = {};
    var ekeysDown = {};
    var enemynumber = 4,
        life1 = life,
        life2 = life,
        score = 0,
        finishtime = 0,
        Invincible = false,
        eInvincible = false;
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);
    addEventListener("keydown", function (e) {
        ekeysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        delete ekeysDown[e.keyCode];
    }, false);
    var offcanvas = document.createElement('canvas'),
        offcontext = offcanvas.getContext('2d');
    offcanvas.width = 544;
    offcanvas.height = 512;

    //........................函数定义.......................
    //我方坦克
    function space() {
        if (97 in keysDown) {
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
        } else if (i == 33) return i;
        else if (i == 1) {
            flagbloodbag = false;
            return 0;
        } else if (i == 2) {
            flagbloodbag = false;
            return 0;
        } else if (i == 3) {
            flagbloodbag = false;
            return 0;
        } else if (i == 4) {
            flagbloodbag = false;
            return 0;
        }
        return 0;
    }
    //子弹碰墙

    function bulletupdate() {

        if (bullet.bulletAngle == 0) {
            bullet.y -= bullet.bulletspeed;
            var i = map2[Math.floor((bullet.y) / 32)][Math.floor((bullet.x + 16) / 32)];
            map2[Math.floor((bullet.y) / 32)][Math.floor((bullet.x + 16) / 32)] = destorywall(i);
            drawBullet();
        } else if (bullet.bulletAngle == 90) {
            bullet.x += bullet.bulletspeed;
            var i = map2[Math.floor((bullet.y + 16) / 32)][Math.floor((bullet.x + 20) / 32)];
            map2[Math.floor((bullet.y + 16) / 32)][Math.floor((bullet.x + 20) / 32)] = destorywall(i);
            drawBullet();
        } else if (bullet.bulletAngle == 180) {
            bullet.y += bullet.bulletspeed;
            var i = map2[Math.floor((bullet.y + 20) / 32)][Math.floor((bullet.x + 16) / 32)];
            map2[Math.floor((bullet.y + 20) / 32)][Math.floor((bullet.x + 16) / 32)] = destorywall(i);
            drawBullet();
        } else if (bullet.bulletAngle == 270) {
            bullet.x -= bullet.bulletspeed;
            var i = map2[Math.floor((bullet.y + 16) / 32)][Math.floor((bullet.x) / 32)];
            map2[Math.floor((bullet.y + 16) / 32)][Math.floor((bullet.x) / 32)] = destorywall(i);
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
        bloodtime++;
        if (flagbloodbag == false && bloodtime <= 20) {
            propx = Math.floor(Math.random() * 16);
            propy = Math.floor(Math.random() * 15);
            while (map2[propx][propy] != 0) {
                propx = Math.floor(Math.random() * 16);
                propy = Math.floor(Math.random() * 15);
            }
            var t = Math.floor(Math.random() * 4 + 1);
            map2[propx][propy] = t;
            flagbloodbag = true;
            propSound.play();
        }
        if (bloodtime > 500)
            bloodtime = 0;
        for (var i = 0; i < canvas.height / 32; i++) {
            for (var j = 0; j < canvas.width / 32; j++) {
                context.save();
                if (map2[i][j] == 32) {
                    if (flag == 0)
                        context.drawImage(outwall, j * 32, i * 32, 32, 32);
                    else if (flag == 1)
                        context.drawImage(iceoutwall, j * 32, i * 32, 32, 32);
                    else if (flag == 2)
                        context.drawImage(volcanowall, j * 32, i * 32, 32, 32);
                }
                if (map2[i][j] == 31) {
                    if (flag == 0)
                        context.drawImage(inwall, j * 32, i * 32, 32, 32);
                    else if (flag == 1)
                        context.drawImage(iceinwall, j * 32, i * 32, 32, 32);
                    else if (flag == 2)
                        context.drawImage(volcanotree, j * 32, i * 32, 32, 32);
                }
                if (map2[i][j] == 0) {
                    if (flag == 0)
                        context.drawImage(bg, j * 32, i * 32, 32, 32);
                    else if (flag == 1)
                        context.drawImage(icebg, j * 32, i * 32, 32, 32);
                    else if (flag == 2)
                        context.drawImage(volcanobg, j * 32, i * 32, 32, 32);
                }
                if (map2[i][j] == 33) {
                    if (flag == 0)
                        context.drawImage(grasspic, j * 32, i * 32, 32, 32);
                    else if (flag == 1)
                        context.drawImage(icetree, j * 32, i * 32, 32, 32);
                    else if (flag == 2)
                        context.drawImage(volcanograss, j * 32, i * 32, 32, 32);
                }
                if (map2[i][j] == 1) {
                    if (flag == 0)
                        context.drawImage(bg, j * 32, i * 32, 32, 32);
                    else if (flag == 1)
                        context.drawImage(icebg, j * 32, i * 32, 32, 32);
                    else if (flag == 2)
                        context.drawImage(volcanobg, j * 32, i * 32, 32, 32);
                    context.drawImage(bloodpic, j * 32, i * 32, 32, 32); //随机生成血包
                }
                if (map2[i][j] == 2) {
                    if (flag == 0)
                        context.drawImage(bg, j * 32, i * 32, 32, 32);
                    else if (flag == 1)
                        context.drawImage(icebg, j * 32, i * 32, 32, 32);
                    else if (flag == 2)
                        context.drawImage(volcanobg, j * 32, i * 32, 32, 32);
                    context.drawImage(speedpic, j * 32, i * 32, 32, 32); //随机生成加速包
                }
                if (map2[i][j] == 3) {
                    if (flag == 0)
                        context.drawImage(bg, j * 32, i * 32, 32, 32);
                    else if (flag == 1)
                        context.drawImage(icebg, j * 32, i * 32, 32, 32);
                    else if (flag == 2)
                        context.drawImage(volcanobg, j * 32, i * 32, 32, 32);
                    context.drawImage(invinciblepic, j * 32, i * 32, 32, 32); //随机生成无敌包
                }
                if (map2[i][j] == 4) {
                    if (flag == 0)
                        context.drawImage(bg, j * 32, i * 32, 32, 32);
                    else if (flag == 1)
                        context.drawImage(icebg, j * 32, i * 32, 32, 32);
                    else if (flag == 2)
                        context.drawImage(volcanobg, j * 32, i * 32, 32, 32);
                    context.drawImage(chaospic, j * 32, i * 32, 32, 32); //随机生成混乱包
                }
                context.restore();
            }
        }

        context.drawImage(snowbgpic, 544, 0, 224, 512);
        context.save();
        context.fillStyle = "#b91a1a";
        context.font = "23px Arial";
        context.fillText("生命:" + life1 + "", 670, 50);
        context.fillText("生命:" + life2 + "", 670, 270);
        context.restore();
        context.save();
        context.strokeStyle = 'rgba(0, 0, 0, 0.46)';
        context.shadowColor = 'pink';
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 10;
        context.shadowBlur = 5;
        context.strokeRect(570, 25, 185, 185);
        context.strokeRect(570, 245, 185, 185);
        context.restore();
        context.save();
        context.fillStyle = "#000000";
        context.font = "30px STLiti";
        context.fillText("Player1", 580, 50);
        context.fillText("Player2", 580, 270);
        context.font = "20px STLiti";
        context.fillText("W      向上移动", 600, 80);
        context.fillText("S        向下移动", 600, 110);
        context.fillText("A       向左移动", 600, 140);
        context.fillText("D       向右移动", 600, 170);
        context.fillText("J        发射子弹", 600, 200);
        context.fillText("↑       向上移动", 600, 300);
        context.fillText("↓       向下移动", 600, 330);
        context.fillText("←       向左移动", 600, 360);
        context.fillText("→       向右移动", 600, 390);
        context.fillText("1          发射子弹", 600, 420);
        context.restore();
        if (!life1) flagP1 = true;
        if (!life2) flagP2 = true;
    } //画地图

    function update() {
        clearCanvas(canvas);
        context.setTransform();
        drawMap();
        drawSnow();
        if (flagInvincible) invincibletime++;
        if (invincibletime >= 300) {
            flagInvincible = false;
            invincibletime = 0;
            Invincible = false;
        } //设定无敌时间
        if (flagspeedup) speeuptime++;
        if (speeuptime >= 300) {
            flagspeedup = false;
            speeuptime = 0;
            tank.speed = 3;
            bullet.bulletspeed = 5;
        } //设定加速时间
        if (eflagchaos) echaostime++;
        if (echaostime >= 300) {
            eflagchaos = false;
            echaostime = 0;
        } //设定敌方混乱时间
        if (38 in keysDown && flagchaos == false) { // Player holding up

            space();

            tank.tankAngle = 0;
            angle = tank.tankAngle * Math.PI / 180;
            tank.y -= tank.speed;
            var xx1 = map2[Math.floor((tank.y + 2) / 32)][Math.floor((tank.x + 2) / 32)];
            var yy1 = map2[Math.floor((tank.y + 2) / 32)][Math.ceil((tank.x - 2) / 32)];
            if (xx1 == 1 || yy1 == 1) {
                bloodSound.play();
                life1++;
                map2[propx][propy] = 0;
                flagbloodbag = false;
            }
            if (xx1 == 2 || yy1 == 2) {
                speedSound.play();
                tank.speed = 5;
                bullet.bulletspeed = 7;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagspeedup = true;
            }
            if (xx1 == 3 || yy1 == 3) {
                invincibleSound.play();
                Invincible = true;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagInvincible = true;
            }
            if (xx1 == 4 || yy1 == 4) {
                chaosSound.play();
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagchaos = true;
            }
            if ((xx1 != 0 || yy1 != 0)) {
                if (!(map2[Math.floor((tank.y + 2) / 32)][Math.floor((tank.x - 2) / 32)] == 33 || map2[Math.floor((tank.y + 2) / 32)][Math.ceil((tank.x + 2) / 32)] == 33)) {
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
        } else if (38 in keysDown && flagchaos == true) {
            space();
            tank.tankAngle = 180;
            angle = tank.tankAngle * Math.PI / 180;
            tank.y += tank.speed;
            var xx2 = map2[Math.ceil((tank.y) / 32)][Math.ceil((tank.x - 2) / 32)];
            var yy2 = map2[Math.ceil((tank.y) / 32)][Math.floor((tank.x + 2) / 32)]
            if (xx2 == 1 || yy2 == 1) {
                bloodSound.play();
                life1++;
                map2[propx][propy] = 0;
                flagbloodbag = false;
            }
            if (xx2 == 2 || yy2 == 2) {
                speedSound.play();
                tank.speed = 5;
                bullet.bulletspeed = 7;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagspeedup = true;
            }
            if (xx2 == 3 || yy2 == 3) {
                invincibleSound.play();
                Invincible = true;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagInvincible = true;
            }
            if (xx2 == 4 || yy2 == 4) {
                chaosSound.play();
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagchaos = true;
            }
            if ((xx2 != 0 || yy2 != 0)) {
                if (!(map2[Math.ceil((tank.y) / 32)][Math.ceil((tank.x + 2) / 32)] == 33 || map2[Math.ceil((tank.y) / 32)][Math.floor((tank.x - 2) / 32)] == 33)) {
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
        } else if (40 in keysDown && flagchaos == false) { // Player holding down
            space();
            tank.tankAngle = 180;
            angle = tank.tankAngle * Math.PI / 180;
            tank.y += tank.speed;
            var xx2 = map2[Math.ceil((tank.y) / 32)][Math.ceil((tank.x - 2) / 32)];
            var yy2 = map2[Math.ceil((tank.y) / 32)][Math.floor((tank.x + 2) / 32)]
            if (xx2 == 1 || yy2 == 1) {
                bloodSound.play();
                life1++;
                map2[propx][propy] = 0;
                flagbloodbag = false;
            }
            if (xx2 == 2 || yy2 == 2) {
                speedSound.play();
                tank.speed = 5;
                bullet.bulletspeed = 7;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagspeedup = true;
            }
            if (xx2 == 3 || yy2 == 3) {
                invincibleSound.play();
                Invincible = true;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagInvincible = true;
            }
            if (xx2 == 4 || yy2 == 4) {
                chaosSound.play();
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagchaos = true;
            }
            if ((xx2 != 0 || yy2 != 0)) {
                if (!(map2[Math.ceil((tank.y) / 32)][Math.ceil((tank.x + 2) / 32)] == 33 || map2[Math.ceil((tank.y) / 32)][Math.floor((tank.x - 2) / 32)] == 33)) {
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
        } else if (40 in keysDown && flagchaos == true) {
            space();
            tank.tankAngle = 0;
            angle = tank.tankAngle * Math.PI / 180;
            tank.y -= tank.speed;
            var xx1 = map2[Math.floor((tank.y + 2) / 32)][Math.floor((tank.x + 2) / 32)];
            var yy1 = map2[Math.floor((tank.y + 2) / 32)][Math.ceil((tank.x - 2) / 32)];
            if (xx1 == 1 || yy1 == 1) {
                bloodSound.play();
                life1++;
                map2[propx][propy] = 0;
                flagbloodbag = false;
            }
            if (xx1 == 2 || yy1 == 2) {
                speedSound.play();
                tank.speed = 5;
                bullet.bulletspeed = 7;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagspeedup = true;
            }
            if (xx1 == 3 || yy1 == 3) {
                invincibleSound.play();
                Invincible = true;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagInvincible = true;
            }
            if (xx1 == 4 || yy1 == 4) {
                chaosSound.play();
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagchaos = true;
            }
            if ((xx1 != 0 || yy1 != 0)) {
                if (!(map2[Math.floor((tank.y + 2) / 32)][Math.floor((tank.x - 2) / 32)] == 33 || map2[Math.floor((tank.y + 2) / 32)][Math.ceil((tank.x + 2) / 32)] == 33)) {
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
        } else if (37 in keysDown && flagchaos == false) { // Player holding left
            space();
            tank.tankAngle = 270;
            angle = tank.tankAngle * Math.PI / 180;
            tank.x -= tank.speed;
            var xx3 = map2[Math.floor((tank.y + 2) / 32)][Math.floor((tank.x) / 32)]
            var yy3 = map2[Math.ceil((tank.y - 2) / 32)][Math.floor((tank.x) / 32)]
            if (xx3 == 1 || yy3 == 1) {
                bloodSound.play();
                life1++;
                map2[propx][propy] = 0;
                flagbloodbag = false;
            }
            if (xx3 == 2 || yy3 == 2) {
                speedSound.play();
                tank.speed = 5;
                bullet.bulletspeed = 7;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagspeedup = true;
            }
            if (xx3 == 3 || yy3 == 3) {
                invincibleSound.play();
                Invincible = true;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagInvincible = true;
            }
            if (xx3 == 4 || yy3 == 4) {
                chaosSound.play();
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagchaos = true;
            }
            if ((xx3 != 0 || yy3 != 0)) {
                if (!(map2[Math.floor((tank.y - 2) / 32)][Math.floor((tank.x) / 32)] == 33 || map2[Math.ceil((tank.y + 2) / 32)][Math.floor((tank.x) / 32)] == 33)) {
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
        } else if (37 in keysDown && flagchaos == true) {
            space();
            angle = tank.tankAngle = 90;
            angle = tank.tankAngle * Math.PI / 180;
            tank.x += tank.speed;
            var xx4 = map2[Math.ceil((tank.y - 2) / 32)][Math.ceil((tank.x - 2) / 32)];
            var yy4 = map2[Math.floor((tank.y + 2) / 32)][Math.ceil((tank.x - 2) / 32)];
            if (xx4 == 1 || yy4 == 1) {
                bloodSound.play();
                life1++;
                map2[propx][propy] = 0;
                flagbloodbag = false;
            }
            if (xx4 == 2 || yy4 == 2) {
                speedSound.play();
                tank.speed = 5;
                bullet.bulletspeed = 7;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagspeedup = true;
            }
            if (xx4 == 3 || yy4 == 3) {
                invincibleSound.play();
                Invincible = true;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagInvincible = true;
            }
            if (xx4 == 4 || yy4 == 4) {
                chaosSound.play();
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagchaos = true;
            }
            if (xx4 != 0 || yy4 != 0) {
                if (!(map2[Math.ceil((tank.y + 2) / 32)][Math.ceil((tank.x - 2) / 32)] == 33 || map2[Math.floor((tank.y - 2) / 32)][Math.ceil((tank.x - 2) / 32)] == 33)) {
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

        } else if (39 in keysDown && flagchaos == false) { // Player holding right
            space();
            angle = tank.tankAngle = 90;
            angle = tank.tankAngle * Math.PI / 180;
            tank.x += tank.speed;
            var xx4 = map2[Math.ceil((tank.y - 2) / 32)][Math.ceil((tank.x - 2) / 32)];
            var yy4 = map2[Math.floor((tank.y + 2) / 32)][Math.ceil((tank.x - 2) / 32)];
            if (xx4 == 1 || yy4 == 1) {
                bloodSound.play();
                life1++;
                map2[propx][propy] = 0;
                flagbloodbag = false;
            }
            if (xx4 == 2 || yy4 == 2) {
                speedSound.play();
                tank.speed = 5;
                bullet.bulletspeed = 7;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagspeedup = true;
            }
            if (xx4 == 3 || yy4 == 3) {
                invincibleSound.play();
                Invincible = true;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagInvincible = true;
            }
            if (xx4 == 4 || yy4 == 4) {
                chaosSound.play();
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagchaos = true;
            }
            if (xx4 != 0 || yy4 != 0) {
                if (!(map2[Math.ceil((tank.y + 2) / 32)][Math.ceil((tank.x - 2) / 32)] == 33 || map2[Math.floor((tank.y - 2) / 32)][Math.ceil((tank.x - 2) / 32)] == 33)) {
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
        } else if (39 in keysDown && flagchaos == true) {
            space();
            tank.tankAngle = 270;
            angle = tank.tankAngle * Math.PI / 180;
            tank.x -= tank.speed;
            var xx3 = map2[Math.floor((tank.y + 2) / 32)][Math.floor((tank.x) / 32)]
            var yy3 = map2[Math.ceil((tank.y - 2) / 32)][Math.floor((tank.x) / 32)]
            if (xx3 == 1 || yy3 == 1) {
                bloodSound.play();
                life1++;
                map2[propx][propy] = 0;
                flagbloodbag = false;
            }
            if (xx3 == 2 || yy3 == 2) {
                speedSound.play();
                tank.speed = 5;
                bullet.bulletspeed = 7;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagspeedup = true;
            }
            if (xx3 == 3 || yy3 == 3) {
                invincibleSound.play();
                Invincible = true;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagInvincible = true;
            }
            if (xx3 == 4 || yy3 == 4) {
                chaosSound.play();
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagchaos = true;
            }
            if ((xx3 != 0 || yy3 != 0)) {
                if (!(map2[Math.floor((tank.y - 2) / 32)][Math.floor((tank.x) / 32)] == 33 || map2[Math.ceil((tank.y + 2) / 32)][Math.floor((tank.x) / 32)] == 33)) {
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
        } else {
            space();
            if (!(map2[Math.floor((tank.y + 2) / 32)][Math.floor((tank.x + 2) / 32)] == 33 || map2[Math.floor((tank.y + 2) / 32)][Math.ceil((tank.x + 2) / 32)] == 33)) {
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
        if (flagspeedup) context.drawImage(acctankpic, -16, -16, 30, 30);
        else if (flagchaos) context.drawImage(chaostankpic, -16, -16, 30, 30);
        else if (Invincible) context.drawImage(invintankpic, -16, -16, 30, 30);
        else context.drawImage(tankpic, -16, -16, 30, 30);
    } //画我方坦克

    //敌军坦克
    function enemyupdate() {
        if (eflagInvincible) einvincibletime++;
        if (einvincibletime >= 300) {
            eflagInvincible = false;
            einvincibletime = 0;
            eInvincible = false;
        } //设定无敌时间
        if (eflagspeedup) espeeduptime++;
        if (espeeduptime >= 300) {
            eflagspeedup = false;
            espeeduptime = 0;
            enemy.speed = 3;
            enemybullet.bulletspeed = 5;
        }
        if (flagchaos) chaostime++;
        if (chaostime >= 300) {
            flagchaos = false;
            chaostime = 0;
        } //设定敌方混乱时间
        if (87 in ekeysDown && eflagchaos == false) { // Player holding up
            enemyspace();
            enemy.enemyAngle = 0;
            eangle = enemy.enemyAngle * Math.PI / 180;
            enemy.y -= enemy.speed;
            var xx5 = map2[Math.floor((enemy.y + 2) / 32)][Math.floor((enemy.x + 2) / 32)];
            var yy5 = map2[Math.floor((enemy.y + 2) / 32)][Math.ceil((enemy.x - 2) / 32)];
            if (xx5 == 1 || yy5 == 1) {
                bloodSound.play();
                life2++;
                map2[propx][propy] = 0;
                flagbloodbag = false;
            }
            if (xx5 == 2 || yy5 == 2) {
                speedSound.play();
                enemy.speed = 5;
                enemybullet.bulletspeed = 7;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagspeedup = true;
            }
            if (xx5 == 3 || yy5 == 3) {
                invincibleSound.play();
                eInvincible = true;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagInvincible = true;
            }
            if (xx5 == 4 || yy5 == 4) {
                chaosSound.play();
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagchaos = true;
            }
            if ((xx5 != 0 || yy5 != 0)) {
                if (!(map2[Math.floor((enemy.y + 2) / 32)][Math.floor((enemy.x - 2) / 32)] == 33 || map2[Math.floor((enemy.y + 2) / 32)][Math.ceil((enemy.x + 2) / 32)] == 33)) {
                    enemy.y += enemy.speed;
                    drawEnemy();
                } else {
                    context.globalAlpha = 0.5;
                    drawEnemy();
                    context.globalAlpha = 1;
                }
            } else
                drawEnemy();
            if (flagenemyspace) enemybulletupdate();
        } else if (87 in ekeysDown && eflagchaos == true) { // Player holding up
            enemyspace();
            enemy.enemyAngle = 180;
            eangle = enemy.enemyAngle * Math.PI / 180;
            enemy.y += enemy.speed;
            var xx6 = map2[Math.ceil((enemy.y) / 32)][Math.ceil((enemy.x - 2) / 32)];
            var yy6 = map2[Math.ceil((enemy.y) / 32)][Math.floor((enemy.x + 2) / 32)];
            if (xx6 == 1 || yy6 == 1) {
                bloodSound.play();
                life2++;
                map2[propx][propy] = 0;
                flagbloodbag = false;
            }
            if (xx6 == 2 || yy6 == 2) {
                speedSound.play();
                enemy.speed = 5;
                enemybullet.bulletspeed = 7;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagspeedup = true;
            }
            if (xx6 == 3 || yy6 == 3) {
                invincibleSound.play();
                eInvincible = true;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagInvincible = true;
            }
            if (xx6 == 4 || yy6 == 4) {
                chaosSound.play();
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagchaos = true;
            }
            if ((xx6 != 0 || yy6 != 0)) {
                if (!(map2[Math.ceil((enemy.y) / 32)][Math.ceil((enemy.x + 2) / 32)] == 33 || map2[Math.ceil((enemy.y) / 32)][Math.floor((enemy.x - 2) / 32)] == 33)) {
                    enemy.y -= enemy.speed;
                    drawEnemy();
                } else {
                    context.globalAlpha = 0.5;
                    drawEnemy();
                    context.globalAlpha = 1;
                }
            } else
                drawEnemy();
            if (flagenemyspace) enemybulletupdate();
        } else if (83 in ekeysDown && eflagchaos == false) { // Player holding down
            enemyspace();
            enemy.enemyAngle = 180;
            eangle = enemy.enemyAngle * Math.PI / 180;
            enemy.y += enemy.speed;
            var xx6 = map2[Math.ceil((enemy.y) / 32)][Math.ceil((enemy.x - 2) / 32)];
            var yy6 = map2[Math.ceil((enemy.y) / 32)][Math.floor((enemy.x + 2) / 32)];
            if (xx6 == 1 || yy6 == 1) {
                bloodSound.play();
                life2++;
                map2[propx][propy] = 0;
                flagbloodbag = false;
            }
            if (xx6 == 2 || yy6 == 2) {
                speedSound.play();
                enemy.speed = 5;
                enemybullet.bulletspeed = 7;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagspeedup = true;
            }
            if (xx6 == 3 || yy6 == 3) {
                invincibleSound.play();
                eInvincible = true;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagInvincible = true;
            }
            if (xx6 == 4 || yy6 == 4) {
                chaosSound.play();
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagchaos = true;
            }
            if ((xx6 != 0 || yy6 != 0)) {
                if (!(map2[Math.ceil((enemy.y) / 32)][Math.ceil((enemy.x + 2) / 32)] == 33 || map2[Math.ceil((enemy.y) / 32)][Math.floor((enemy.x - 2) / 32)] == 33)) {
                    enemy.y -= enemy.speed;
                    drawEnemy();
                } else {
                    context.globalAlpha = 0.5;
                    drawEnemy();
                    context.globalAlpha = 1;
                }
            } else
                drawEnemy();
            if (flagenemyspace) enemybulletupdate();
        } else if (83 in ekeysDown && eflagchaos == true) {
            enemyspace();
            enemy.enemyAngle = 0;
            eangle = enemy.enemyAngle * Math.PI / 180;
            enemy.y -= enemy.speed;
            var xx5 = map2[Math.floor((enemy.y + 2) / 32)][Math.floor((enemy.x + 2) / 32)];
            var yy5 = map2[Math.floor((enemy.y + 2) / 32)][Math.ceil((enemy.x - 2) / 32)];
            if (xx5 == 1 || yy5 == 1) {
                bloodSound.play();
                life2++;
                map2[propx][propy] = 0;
                flagbloodbag = false;
            }
            if (xx5 == 2 || yy5 == 2) {
                speedSound.play();
                enemy.speed = 5;
                enemybullet.bulletspeed = 7;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagspeedup = true;
            }
            if (xx5 == 3 || yy5 == 3) {
                invincibleSound.play();
                eInvincible = true;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagInvincible = true;
            }
            if (xx5 == 4 || yy5 == 4) {
                chaosSound.play();
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagchaos = true;
            }
            if ((xx5 != 0 || yy5 != 0)) {
                if (!(map2[Math.floor((enemy.y + 2) / 32)][Math.floor((enemy.x - 2) / 32)] == 33 || map2[Math.floor((enemy.y + 2) / 32)][Math.ceil((enemy.x + 2) / 32)] == 33)) {
                    enemy.y += enemy.speed;
                    drawEnemy();
                } else {
                    context.globalAlpha = 0.5;
                    drawEnemy();
                    context.globalAlpha = 1;
                }
            } else
                drawEnemy();
            if (flagenemyspace) enemybulletupdate();
        } else if (65 in ekeysDown && eflagchaos == false) { // Player holding left
            enemyspace();
            enemy.enemyAngle = 270;
            eangle = enemy.enemyAngle * Math.PI / 180;
            enemy.x -= enemy.speed;
            var xx7 = map2[Math.floor((enemy.y + 2) / 32)][Math.floor((enemy.x) / 32)];
            var yy7 = map2[Math.ceil((enemy.y - 2) / 32)][Math.floor((enemy.x) / 32)];
            if (xx7 == 1 || yy7 == 1) {
                bloodSound.play();
                life2++;
                map2[propx][propy] = 0;
                flagbloodbag = false;
            }
            if (xx7 == 2 || yy7 == 2) {
                speedSound.play();
                enemy.speed = 5;
                enemybullet.bulletspeed = 7;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagspeedup = true;
            }
            if (xx7 == 3 || yy7 == 3) {
                invincibleSound.play();
                eInvincible = true;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagInvincible = true;
            }
            if (xx7 == 4 || yy7 == 4) {
                chaosSound.play();
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagchaos = true;
            }
            if ((xx7 != 0 || yy7 != 0)) {
                if (!(map2[Math.floor((enemy.y - 2) / 32)][Math.floor((enemy.x) / 32)] == 33 || map2[Math.ceil((enemy.y + 2) / 32)][Math.floor((enemy.x) / 32)] == 33)) {
                    enemy.x += enemy.speed;
                    drawEnemy();
                } else {
                    context.globalAlpha = 0.5;
                    drawEnemy();
                    context.globalAlpha = 1;
                }
            } else
                drawEnemy();
            if (flagenemyspace) enemybulletupdate();
        } else if (65 in ekeysDown && eflagchaos == true) {
            enemyspace();
            enemy.enemyAngle = 90;
            eangle = enemy.enemyAngle * Math.PI / 180;
            enemy.x += enemy.speed;
            var xx8 = map2[Math.ceil((enemy.y - 2) / 32)][Math.ceil((enemy.x - 2) / 32)];
            var yy8 = map2[Math.floor((enemy.y + 2) / 32)][Math.ceil((enemy.x - 2) / 32)];
            if (xx8 == 1 || yy8 == 1) {
                bloodSound.play();
                life2++;
                map2[propx][propy] = 0;
                flagbloodbag = false;
            }
            if (xx8 == 2 || yy8 == 2) {
                speedSound.play();
                enemy.speed = 5;
                enemybullet.bulletspeed = 7;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagspeedup = true;
            }
            if (xx8 == 3 || yy8 == 3) {
                invincibleSound.play();
                eInvincible = true;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagInvincible = true;
            }
            if (xx8 == 4 || yy8 == 4) {
                chaosSound.play();
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagchaos = true;
            }
            if (xx8 != 0 || yy8 != 0) {
                if (!(map2[Math.ceil((enemy.y + 2) / 32)][Math.ceil((enemy.x - 2) / 32)] == 33 || map2[Math.floor((enemy.y - 2) / 32)][Math.ceil((enemy.x - 2) / 32)] == 33)) {
                    enemy.x -= enemy.speed;
                    drawEnemy();
                } else {
                    context.globalAlpha = 0.5;
                    drawEnemy();
                    context.globalAlpha = 1;
                }
            } else
                drawEnemy();
            if (flagenemyspace) enemybulletupdate();
        } else if (68 in ekeysDown && eflagchaos == false) { // Player holding right
            enemyspace();
            enemy.enemyAngle = 90;
            eangle = enemy.enemyAngle * Math.PI / 180;
            enemy.x += enemy.speed;
            var xx8 = map2[Math.ceil((enemy.y - 2) / 32)][Math.ceil((enemy.x - 2) / 32)];
            var yy8 = map2[Math.floor((enemy.y + 2) / 32)][Math.ceil((enemy.x - 2) / 32)];
            if (xx8 == 1 || yy8 == 1) {
                bloodSound.play();
                life2++;
                map2[propx][propy] = 0;
                flagbloodbag = false;
            }
            if (xx8 == 2 || yy8 == 2) {
                speedSound.play();
                enemy.speed = 5;
                enemybullet.bulletspeed = 7;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagspeedup = true;
            }
            if (xx8 == 3 || yy8 == 3) {
                invincibleSound.play();
                eInvincible = true;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagInvincible = true;
            }
            if (xx8 == 4 || yy8 == 4) {
                chaosSound.play();
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagchaos = true;
            }
            if (xx8 != 0 || yy8 != 0) {
                if (!(map2[Math.ceil((enemy.y + 2) / 32)][Math.ceil((enemy.x - 2) / 32)] == 33 || map2[Math.floor((enemy.y - 2) / 32)][Math.ceil((enemy.x - 2) / 32)] == 33)) {
                    enemy.x -= enemy.speed;
                    drawEnemy();
                } else {
                    context.globalAlpha = 0.5;
                    drawEnemy();
                    context.globalAlpha = 1;
                }
            } else
                drawEnemy();
            if (flagenemyspace) enemybulletupdate();
        } else if (68 in ekeysDown && eflagchaos == true) {
            enemyspace();
            enemy.enemyAngle = 270;
            eangle = enemy.enemyAngle * Math.PI / 180;
            enemy.x -= enemy.speed;
            var xx7 = map2[Math.floor((enemy.y + 2) / 32)][Math.floor((enemy.x) / 32)];
            var yy7 = map2[Math.ceil((enemy.y - 2) / 32)][Math.floor((enemy.x) / 32)];
            if (xx7 == 1 || yy7 == 1) {
                bloodSound.play();
                life2++;
                map2[propx][propy] = 0;
                flagbloodbag = false;
            }
            if (xx7 == 2 || yy7 == 2) {
                speedSound.play();
                enemy.speed = 5;
                enemybullet.bulletspeed = 7;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagspeedup = true;
            }
            if (xx7 == 3 || yy7 == 3) {
                invincibleSound.play();
                eInvincible = true;
                map2[propx][propy] = 0;
                flagbloodbag = false;
                eflagInvincible = true;
            }
            if (xx7 == 4 || yy7 == 4) {
                chaosSound.play();
                map2[propx][propy] = 0;
                flagbloodbag = false;
                flagchaos = true;
            }
            if ((xx7 != 0 || yy7 != 0)) {
                if (!(map2[Math.floor((enemy.y - 2) / 32)][Math.floor((enemy.x) / 32)] == 33 || map2[Math.ceil((enemy.y + 2) / 32)][Math.floor((enemy.x) / 32)] == 33)) {
                    enemy.x += enemy.speed;
                    drawEnemy();
                } else {
                    context.globalAlpha = 0.5;
                    drawEnemy();
                    context.globalAlpha = 1;
                }
            } else
                drawEnemy();
            if (flagenemyspace) enemybulletupdate();
        } else {
            enemyspace();
            if (!(map2[Math.floor((enemy.y + 2) / 32)][Math.floor((enemy.x + 2) / 32)] == 33 || map2[Math.floor((enemy.y + 2) / 32)][Math.ceil((enemy.x + 2) / 32)] == 33)) {
                drawEnemy();
            } else {
                context.globalAlpha = 0.5;
                drawEnemy();
                context.globalAlpha = 1;
            }
            if (flagenemyspace) enemybulletupdate();
        }
        time++;
        if (time >= 50) {
            flagboom = false;
            time = 0;
        }
        if (flagboom) boom(boomx, boomy);
        if (hit(bullet, enemy)) { //检测打击到敌方坦克
            if (eInvincible) return;
            eInvincible = true;
            setTimeout(function () {
                eInvincible = false
            }, 2000);
            boomSound.play();
            flagspace = false;
            flagboom = true;
            if (life2 >= 1) life2--;
            setTimeout(function () {
                bullet.bulletflag = false
            }, 300);
            boomx = enemy.x;
            boomy = enemy.y;
            boom(boomx, boomy);
            enemy.x = 250;
            enemy.y = 48;
            enemy.enemyAngle = 180;
            bullet.x = -200;
            bullet.y = -200;
        }
        if (hit(enemybullet, tank)) { //检测打击到我方坦克
            if (Invincible) return;
            Invincible = true;
            setTimeout(function () {
                Invincible = false
            }, 2000);
            boomSound.play();
            flagenemyspace = false;
            flagboom = true;
            boomx = tank.x;
            boomy = tank.y;
            boom(boomx, boomy);
            if (life1 >= 1) life1--;
            setTimeout(function () {
                enemybullet.bulletflag = false
            }, 300);
            tank.x = -200;
            enemybullet.x = -200;
            enemybullet.y = -200;
            tank = {
                speed: 3,
                tankAngle: 0,
                x: 250,
                y: 450
            };
        }
        if (hit(enemy, tank)) { //检测两坦克相撞
            if (Invincible || eInvincible) return;
            Invincible = true;
            setTimeout(function () {
                Invincible = false
            }, 2000);
            eInvincible = true;
            flagboom = true;
            setTimeout(function () {
                eInvincible = false
            }, 2000);
            boomSound.play();
            flagenemyspace = false;
            setTimeout(function () {
                enemybullet.bulletflag = false
            }, 300);
            boomx = (tank.x + enemy.x) / 2;
            boomy = (tank.y + enemy.y) / 2;
            boom(boomx, boomy);
            enemy.x = 250;
            enemy.y = 48;
            enemy.enemyAngle = 180;
            if (life1 >= 1) life1--;
            if (life2 >= 1) life2--;
            tank.x = -500;
            tank = {
                speed: 3,
                tankAngle: 0,
                x: 250,
                y: 450
            };
        }

    }

    function hit(a, b) {
        var distance = Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
        if (distance <= 28) {
            //            flagInvincible = true;
            //            eflagInvincible = true;
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
        if (74 in ekeysDown) {
            shootSound.play();
            if (enemybullet.bulletflag == true) return;
            else {
                flagenemyspace = true;
                enemybullet.x = enemy.x;
                enemybullet.y = enemy.y;
                enemybullet.bulletflag = true;
                enemybullet.bulletAngle = enemy.enemyAngle;
                angle2 = enemybullet.bulletAngle * Math.PI / 180;
                enemybulletupdate();
            }
        }
    }

    function enemybulletupdate() {

        if (enemybullet.bulletAngle == 0) {
            enemybullet.y -= enemybullet.bulletspeed;
            var i = map2[Math.floor((enemybullet.y) / 32)][Math.floor((enemybullet.x + 16) / 32)];
            map2[Math.floor((enemybullet.y) / 32)][Math.floor((enemybullet.x + 16) / 32)] = enemydestorywall(i);
            drawEnemyBullet();
        } else if (enemybullet.bulletAngle == 90) {
            enemybullet.x += enemybullet.bulletspeed;
            var i = map2[Math.floor((enemybullet.y + 16) / 32)][Math.floor((enemybullet.x + 20) / 32)];
            map2[Math.floor((enemybullet.y + 16) / 32)][Math.floor((enemybullet.x + 20) / 32)] = enemydestorywall(i);
            drawEnemyBullet();
        } else if (enemybullet.bulletAngle == 180) {
            enemybullet.y += enemybullet.bulletspeed;
            var i = map2[Math.floor((enemybullet.y + 20) / 32)][Math.floor((enemybullet.x + 16) / 32)];
            map2[Math.floor((enemybullet.y + 20) / 32)][Math.floor((enemybullet.x + 16) / 32)] = enemydestorywall(i);
            drawEnemyBullet();
        } else if (enemybullet.bulletAngle == 270) {
            enemybullet.x -= enemybullet.bulletspeed;
            var i = map2[Math.floor((enemybullet.y + 16) / 32)][Math.floor((enemybullet.x) / 32)];
            map2[Math.floor((enemybullet.y + 16) / 32)][Math.floor((enemybullet.x) / 32)] = enemydestorywall(i);
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
        else if (i == 1) {
            flagbloodbag = false;
            return 0;
        } else if (i == 2) {
            flagbloodbag = false;
            return 0;
        } else if (i == 3) {
            flagbloodbag = false;
            return 0;
        } else if (i == 4) {
            flagbloodbag = false;
            return 0;
        }
        return 0;
    }

    function drawEnemyBullet() {
        context.setTransform();
        context.translate(enemybullet.x + 16, enemybullet.y + 16);
        context.rotate(angle2);
        context.drawImage(enemybulletpic, -16, -16, 32, 32);
    } //画子弹

    function drawEnemy() {
        context.setTransform();
        context.translate(enemy.x + 16, enemy.y + 16);
        context.rotate(enemy.enemyAngle * Math.PI / 180);
        if (eflagspeedup) context.drawImage(accenemytankpic, -16, -16, 30, 30);
        else if (eflagchaos) context.drawImage(chaosenemytankpic, -16, -16, 30, 30);
        else if (eInvincible) context.drawImage(invinenemytankpic, -16, -16, 30, 30);
        else context.drawImage(enemypic, -16, -16, 30, 30);
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
        winSound.play();
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
                                if (flagP1) context.drawImage(p2winpic, 0, 0, 544, 512);
                                else if (flagP2) context.drawImage(p1winpic, 0, 0, 544, 512);
                                context.restore();
                                cliptime += 0.05;
                            } else {
                                if (flagP1) context.drawImage(p2winpic, 0, 0, 544, 512);
                                else if (flagP2) context.drawImage(p1winpic, 0, 0, 544, 512);
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
        if (!flagP1 && !flagP2) {
            update();
            enemyupdate();
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
        map2 = [
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
    }
}
