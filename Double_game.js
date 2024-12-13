/*
    Function: Tank War
    Author  : 张家俊、陈亮亮
    Date    : 2020.1.1
    Version : 20.1
*/

function doublelevel(enemylife, mylife, myflag) {
    var angle = 0;
    var angle2 = 0;
    var angle3 = 0;
    var angle4 = 0;
    var angle5 = 0;
    var animate;
    var flag = false;
    var guardflag = false;
    var boomx, boomy, boomx1, boomy1, bossx, bossy;
    var tank = {
        speed: 3,
        tankAngle: 0,
        x: 32,
        y: 450
    };
    var shell = {};
    var enemy = {
        x: 480,
        y: 450,
        speed: 3,
        enemyAngle: 0
    };
    var boss = {
        x: 250,
        y: 48,
        speed: 2,
        bossAngle: 180
    }
    var bullet = {
        x: 0,
        y: 0,
        bulletspeed: 7,
        bulletAngle: 0,
        bulletflag: false
    };
    var enemybullet = {
        x: 0,
        y: 0,
        bulletspeed: 7,
        bulletAngle: 0,
        bulletflag: false
    };
    var bossbullet = {
        x: 0,
        y: 0,
        bulletspeed: 6,
        bulletAngle: 0,
        bulletflag: false
    };
    var guardbullet = {
        x: 0,
        y: 0,
        bulletspeed: 5,
        bulletAngle: 0,
        bulletflag: false
    };
    var guard = {
        x: 250,
        y: 48,
        speed: 2.5,
        guardAngle: 180
    };
    var shellarray = new Array();
    var keysDown = {};
    var ekeysDown = {};
    var enemynumber = 4,
        life1 = mylife,
        life2 = mylife,
        score = 0,
        Bosslife = enemylife,
        finishtime = 0,
        Invincible = false,
        eInvincible = false,
        bossInvincible = false,
        flagover = false,
        flagwin = false;
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
    var flagspace = false,
        eflagspace = false,
        bossflagspace = false,
        flagboom = false,
        flagguardspace = false,
        flagboom1 = false,
        shellflag = false,
        skill1flag = false,
        skill2flag = false;
    var time = 0,
        time1 = 0,
        skill2time = 0;
    var offcanvas = document.createElement('canvas'),
        offcontext = offcanvas.getContext('2d');
    offcanvas.width = 544;
    offcanvas.height = 512;
    //........................函数定义.......................
    //我方坦克1
    function space() {
        if (97 in keysDown && life1) {
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
            var i = map3[Math.floor((bullet.y) / 32)][Math.floor((bullet.x + 16) / 32)];
            map3[Math.floor((bullet.y) / 32)][Math.floor((bullet.x + 16) / 32)] = destorywall(i);
            drawBullet();
        } else if (bullet.bulletAngle == 90) {
            bullet.x += bullet.bulletspeed;
            var i = map3[Math.floor((bullet.y + 16) / 32)][Math.floor((bullet.x + 20) / 32)];
            map3[Math.floor((bullet.y + 16) / 32)][Math.floor((bullet.x + 20) / 32)] = destorywall(i);
            drawBullet();
        } else if (bullet.bulletAngle == 180) {
            bullet.y += bullet.bulletspeed;
            var i = map3[Math.floor((bullet.y + 20) / 32)][Math.floor((bullet.x + 16) / 32)];
            map3[Math.floor((bullet.y + 20) / 32)][Math.floor((bullet.x + 16) / 32)] = destorywall(i);
            drawBullet();
        } else if (bullet.bulletAngle == 270) {
            bullet.x -= bullet.bulletspeed;
            var i = map3[Math.floor((bullet.y + 16) / 32)][Math.floor((bullet.x) / 32)];
            map3[Math.floor((bullet.y + 16) / 32)][Math.floor((bullet.x) / 32)] = destorywall(i);
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
        for (var i = 0; i < canvas.height / 32; i++) {
            for (var j = 0; j < canvas.width / 32; j++) {
                context.save();
                if (map3[i][j] == 32) {
                    if (myflag == 0)
                        context.drawImage(outwall, j * 32, i * 32, 32, 32);
                    else if (myflag == 1)
                        context.drawImage(iceoutwall, j * 32, i * 32, 32, 32);
                    else if (myflag == 2)
                        context.drawImage(volcanowall, j * 32, i * 32, 32, 32);
                }
                if (map3[i][j] == 31) {
                    if (myflag == 0)
                        context.drawImage(inwall, j * 32, i * 32, 32, 32);
                    else if (myflag == 1)
                        context.drawImage(iceinwall, j * 32, i * 32, 32, 32);
                    else if (myflag == 2)
                        context.drawImage(volcanotree, j * 32, i * 32, 32, 32);
                }
                if (map3[i][j] == 0) {
                    if (myflag == 0)
                        context.drawImage(bg, j * 32, i * 32, 32, 32);
                    else if (myflag == 1)
                        context.drawImage(icebg, j * 32, i * 32, 32, 32);
                    else if (myflag == 2)
                        context.drawImage(volcanobg, j * 32, i * 32, 32, 32);
                }
                if (map3[i][j] == 33) {
                    if (myflag == 0)
                        context.drawImage(grasspic, j * 32, i * 32, 32, 32);
                    else if (myflag == 1)
                        context.drawImage(icetree, j * 32, i * 32, 32, 32);
                    else if (myflag == 2)
                        context.drawImage(volcanograss, j * 32, i * 32, 32, 32);
                }
                context.restore();
            }
        }
        context.drawImage(snowbgpic, 544, 0, 224, 512);
        context.save();
        context.fillStyle = "#b91a1a";
        context.font = "23px Arial";
        context.fillText("生命:" + life1 + "", 670, 50);
        context.fillText("生命:" + life2 + "", 670, 290);
        context.fillText("Boss   生命:" + Bosslife + "", 595, 245);
        context.restore();
        context.save();
        context.strokeStyle = 'rgba(0, 0, 0, 0.46)';
        context.shadowColor = 'pink';
        context.shadowOffsetX = 5;
        context.shadowOffsetY = 10;
        context.shadowBlur = 5;
        context.strokeRect(570, 25, 185, 185);
        context.strokeRect(570, 265, 185, 185);
        context.restore();
        context.save();
        context.fillStyle = "#000000";
        context.font = "30px STLiti";
        context.fillText("Player1", 580, 50);
        context.fillText("Player2", 580, 290);
        context.font = "20px STLiti";
        context.fillText("W        向上移动", 600, 80);
        context.fillText("S          向下移动", 600, 110);
        context.fillText("A         向左移动", 600, 140);
        context.fillText("D         向右移动", 600, 170);
        context.fillText("J          发射子弹", 600, 200);
        context.fillText("↑        向上移动", 600, 320);
        context.fillText("↓        向下移动", 600, 350);
        context.fillText("←        向左移动", 600, 380);
        context.fillText("→        向右移动", 600, 410);
        context.fillText("1          发射子弹", 600, 440);
        context.restore();
        if (life1 <= 0) {
            tank.x = 5;
            tank.y = 5;
        }
        if (life2 <= 0) {
            enemy.x = 5;
            enemy.y = 5;
        }
        if (!Bosslife) flagwin = true;

        if (!life1 && !life2) flagover = true;
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
            if ((map3[Math.floor((tank.y + 2) / 32)][Math.floor((tank.x + 2) / 32)] != 0 || map3[Math.floor((tank.y + 2) / 32)][Math.ceil((tank.x - 2) / 32)] != 0)) {
                if (!(map3[Math.floor((tank.y + 2) / 32)][Math.floor((tank.x - 2) / 32)] == 33 || map3[Math.floor((tank.y + 2) / 32)][Math.ceil((tank.x + 2) / 32)] == 33)) {
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
            if ((map3[Math.ceil((tank.y) / 32)][Math.ceil((tank.x - 2) / 32)] != 0 || map3[Math.ceil((tank.y) / 32)][Math.floor((tank.x + 2) / 32)] != 0)) {
                if (!(map3[Math.ceil((tank.y) / 32)][Math.ceil((tank.x + 2) / 32)] == 33 || map3[Math.ceil((tank.y) / 32)][Math.floor((tank.x - 2) / 32)] == 33)) {
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
            if ((map3[Math.floor((tank.y + 2) / 32)][Math.floor((tank.x) / 32)] != 0 || map3[Math.ceil((tank.y - 2) / 32)][Math.floor((tank.x) / 32)] != 0)) {
                if (!(map3[Math.floor((tank.y - 2) / 32)][Math.floor((tank.x) / 32)] == 33 || map3[Math.ceil((tank.y + 2) / 32)][Math.floor((tank.x) / 32)] == 33)) {
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
            if (map3[Math.ceil((tank.y - 2) / 32)][Math.ceil((tank.x - 2) / 32)] || map3[Math.floor((tank.y + 2) / 32)][Math.ceil((tank.x - 2) / 32)]) {
                if (!(map3[Math.ceil((tank.y + 2) / 32)][Math.ceil((tank.x - 2) / 32)] == 33 || map3[Math.floor((tank.y - 2) / 32)][Math.ceil((tank.x - 2) / 32)] == 33)) {
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
            if (!(map3[Math.floor((tank.y + 2) / 32)][Math.floor((tank.x + 2) / 32)] == 33 || map3[Math.floor((tank.y + 2) / 32)][Math.ceil((tank.x + 2) / 32)] == 33)) {
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
        if (life1) {
            context.translate(tank.x + 16, tank.y + 16);
            context.rotate(angle);
            if (Invincible) context.drawImage(invintankpic, -16, -16, 30, 30);
            else context.drawImage(tankpic, -16, -16, 30, 30);
        }
    } //画我方坦克

    //我方坦克2
    function enemyupdate() {
        if (87 in ekeysDown) { // Player holding up
            enemyspace();
            enemy.enemyAngle = 0;
            eangle = enemy.enemyAngle * Math.PI / 180;
            enemy.y -= enemy.speed;
            if ((map3[Math.floor((enemy.y + 2) / 32)][Math.floor((enemy.x + 2) / 32)] != 0 || map3[Math.floor((enemy.y + 2) / 32)][Math.ceil((enemy.x - 2) / 32)] != 0)) {
                if (!(map3[Math.floor((enemy.y + 2) / 32)][Math.floor((enemy.x - 2) / 32)] == 33 || map3[Math.floor((enemy.y + 2) / 32)][Math.ceil((enemy.x + 2) / 32)] == 33)) {
                    enemy.y += enemy.speed;
                    drawEnemy();
                } else {
                    context.globalAlpha = 0.5;
                    drawEnemy();
                    context.globalAlpha = 1;
                }
            } else
                drawEnemy();
            if (eflagspace) enemybulletupdate();
        } else if (83 in ekeysDown) { // Player holding down
            enemyspace();
            enemy.enemyAngle = 180;
            eangle = enemy.enemyAngle * Math.PI / 180;
            enemy.y += enemy.speed;
            if ((map3[Math.ceil((enemy.y) / 32)][Math.ceil((enemy.x - 2) / 32)] != 0 || map3[Math.ceil((enemy.y) / 32)][Math.floor((enemy.x + 2) / 32)] != 0)) {
                if (!(map3[Math.ceil((enemy.y) / 32)][Math.ceil((enemy.x + 2) / 32)] == 33 || map3[Math.ceil((enemy.y) / 32)][Math.floor((enemy.x - 2) / 32)] == 33)) {
                    enemy.y -= enemy.speed;
                    drawEnemy();
                } else {
                    context.globalAlpha = 0.5;
                    drawEnemy();
                    context.globalAlpha = 1;
                }
            } else
                drawEnemy();
            if (eflagspace) enemybulletupdate();
        } else if (65 in ekeysDown) { // Player holding left
            enemyspace();
            enemy.enemyAngle = 270;
            eangle = enemy.enemyAngle * Math.PI / 180;
            enemy.x -= enemy.speed;
            if ((map3[Math.floor((enemy.y + 2) / 32)][Math.floor((enemy.x) / 32)] != 0 || map3[Math.ceil((enemy.y - 2) / 32)][Math.floor((enemy.x) / 32)] != 0)) {
                if (!(map3[Math.floor((enemy.y - 2) / 32)][Math.floor((enemy.x) / 32)] == 33 || map3[Math.ceil((enemy.y + 2) / 32)][Math.floor((enemy.x) / 32)] == 33)) {
                    enemy.x += enemy.speed;
                    drawEnemy();
                } else {
                    context.globalAlpha = 0.5;
                    drawEnemy();
                    context.globalAlpha = 1;
                }
            } else
                drawEnemy();
            if (eflagspace) enemybulletupdate();
        } else if (68 in ekeysDown) { // Player holding right
            enemyspace();
            enemy.enemyAngle = 90;
            eangle = enemy.enemyAngle * Math.PI / 180;
            enemy.x += enemy.speed;
            if (map3[Math.ceil((enemy.y - 2) / 32)][Math.ceil((enemy.x - 2) / 32)] || map3[Math.floor((enemy.y + 2) / 32)][Math.ceil((enemy.x - 2) / 32)]) {
                if (!(map3[Math.ceil((enemy.y + 2) / 32)][Math.ceil((enemy.x - 2) / 32)] == 33 || map3[Math.floor((enemy.y - 2) / 32)][Math.ceil((enemy.x - 2) / 32)] == 33)) {
                    enemy.x -= enemy.speed;
                    drawEnemy();
                } else {
                    context.globalAlpha = 0.5;
                    drawEnemy();
                    context.globalAlpha = 1;
                }
            } else
                drawEnemy();
            if (eflagspace) enemybulletupdate();

        } else {
            enemyspace();
            if (!(map3[Math.floor((enemy.y + 2) / 32)][Math.floor((enemy.x + 2) / 32)] == 33 || map3[Math.floor((enemy.y + 2) / 32)][Math.ceil((enemy.x + 2) / 32)] == 33)) {
                drawEnemy();
            } else {
                context.globalAlpha = 0.5;
                drawEnemy();
                context.globalAlpha = 1;
            }
            if (eflagspace) enemybulletupdate();
        }

    }

    function enemyspace() {
        if (74 in ekeysDown && life2) {
            shootSound.play();
            if (enemybullet.bulletflag == true) return;
            else {
                enemybullet.x = enemy.x;
                enemybullet.y = enemy.y;
                enemybullet.bulletflag = true;
                enemybullet.bulletAngle = enemy.enemyAngle;
                angle2 = enemybullet.bulletAngle * Math.PI / 180;
                eflagspace = true;
                enemybulletupdate();
            }
        }
    }

    function enemybulletupdate() {

        if (enemybullet.bulletAngle == 0) {
            enemybullet.y -= enemybullet.bulletspeed;
            var i = map3[Math.floor((enemybullet.y) / 32)][Math.floor((enemybullet.x + 16) / 32)];
            map3[Math.floor((enemybullet.y) / 32)][Math.floor((enemybullet.x + 16) / 32)] = enemydestorywall(i);
            drawEnemyBullet();
        } else if (enemybullet.bulletAngle == 90) {
            enemybullet.x += enemybullet.bulletspeed;
            var i = map3[Math.floor((enemybullet.y + 16) / 32)][Math.floor((enemybullet.x + 20) / 32)];
            map3[Math.floor((enemybullet.y + 16) / 32)][Math.floor((enemybullet.x + 20) / 32)] = enemydestorywall(i);
            drawEnemyBullet();
        } else if (enemybullet.bulletAngle == 180) {
            enemybullet.y += enemybullet.bulletspeed;
            var i = map3[Math.floor((enemybullet.y + 20) / 32)][Math.floor((enemybullet.x + 16) / 32)];
            map3[Math.floor((enemybullet.y + 20) / 32)][Math.floor((enemybullet.x + 16) / 32)] = enemydestorywall(i);
            drawEnemyBullet();
        } else if (enemybullet.bulletAngle == 270) {
            enemybullet.x -= enemybullet.bulletspeed;
            var i = map3[Math.floor((enemybullet.y + 16) / 32)][Math.floor((enemybullet.x) / 32)];
            map3[Math.floor((enemybullet.y + 16) / 32)][Math.floor((enemybullet.x) / 32)] = enemydestorywall(i);
            drawEnemyBullet();
        }
    }

    function enemydestorywall(i) {
        if (i == 31) {
            eflagspace = false;
            setTimeout(function () {
                enemybullet.bulletflag = false
            }, 400);
            enemybullet.x = -200;
            enemybullet.y = -200;
            return 0;
        } else if (i == 32) {
            eflagspace = false;
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

    function drawEnemy() {
        if (life2) {
            context.setTransform();
            context.translate(enemy.x + 16, enemy.y + 16);
            context.rotate(enemy.enemyAngle * Math.PI / 180);
            if (eInvincible) context.drawImage(invinenemytankpic, -16, -16, 30, 30);
            else context.drawImage(enemypic, -16, -16, 30, 30);
        }
    }


    //BOSS
    function bossupdate() {
        if (boss.bossAngle == 0) { //上
            boss.y -= boss.speed;
            if (map3[Math.floor((boss.y + 2) / 32)][Math.floor((boss.x + 2) / 32)] != 0 || map3[Math.floor((boss.y + 2) / 32)][Math.ceil((boss.x - 2) / 32)] != 0) {
                boss.y += boss.speed;
                directionWall();
            } else
                autodireciton();
            drawBoss();
            if (bossflagspace) bossbulletupdate();
        } else if (boss.bossAngle == 180) { //下

            boss.y += boss.speed;
            if (map3[Math.ceil((boss.y) / 32)][Math.ceil((boss.x - 2) / 32)] != 0 || map3[Math.ceil((boss.y) / 32)][Math.floor((boss.x + 2) / 32)] != 0) {
                boss.y -= boss.speed;
                directionWall();
            } else
                autodireciton();
            drawBoss();
            if (bossflagspace) bossbulletupdate();
        } else if (boss.bossAngle == 270) { //左

            boss.x -= boss.speed;
            if (map3[Math.floor((boss.y + 2) / 32)][Math.floor((boss.x) / 32)] != 0 || map3[Math.ceil((boss.y - 2) / 32)][Math.floor((boss.x) / 32)] != 0) {
                boss.x += boss.speed;
                directionWall();
            } else
                autodireciton();
            drawBoss();
            if (bossflagspace) bossbulletupdate();
        } else if (boss.bossAngle == 90) { //右

            boss.x += boss.speed;
            if (map3[Math.ceil((boss.y - 2) / 32)][Math.ceil((boss.x - 2) / 32)] != 0 || map3[Math.floor((boss.y + 2) / 32)][Math.ceil((boss.x - 2) / 32)] != 0) {
                boss.x -= boss.speed;
                directionWall();
            } else
                autodireciton();
            drawBoss();
            if (bossflagspace) bossbulletupdate();
        }
        bossspace();
        if (flag == false) {
            var Jnpoint = Math.floor(Math.random() * 100);
            if (Jnpoint == 0) {
                skill1();
                skill1flag = true;
                flag = true;
                bossspeedSound.play();
            } else if (Jnpoint == 1) {
                skill2();
                flag = true;
                skill2flag = true;
                callSound.play();
            } else if (Jnpoint == 2) {
                skill3();
                freezeSound.play();
                flag = true;
            }

        }
        if (guardflag) guardupdate();
        if (shellflag) shellupdate();
        if (skill2flag) {
            skill2time++;
        }
        if (skill2time >= 50) {
            skill2flag = false;
            skill2time = 0;
        }
        if (flagboom)
            time++;
        if (time >= 30) {
            flagboom = false;
            time = 0;
        }
        if (flagboom1) time1++;
        if (time1 >= 30) {
            flagboom1 = false;
            time1 = 0;
        }
        if (skill2flag) {
            context.setTransform();
            context.drawImage(skill2pic, 245, 40, 64, 64);
        }
        if (flagboom1) boom(boomx1, boomy1);
        if (flagboom) boom(boomx, boomy);
        if (hit(bullet, boss)) { //检测坦克1打击到Boss
            if (bossInvincible) return;
            bossInvincible = true;
            setTimeout(function () {
                bossInvincible = false
            }, 2000);
            boomSound.play();
            flagspace = false;
            flagboom = true;
            Bosslife--;
            boomx = boss.x;
            boomy = boss.y;
            boom(boomx, boomy);
            setTimeout(function () {
                bullet.bulletflag = false
            }, 300);
            bullet.x = -200;
            bullet.y = -200;
        }
        if (hit(enemybullet, boss)) { //检测坦克2打击到Boss
            if (bossInvincible) return;
            bossInvincible = true;
            setTimeout(function () {
                bossInvincible = false
            }, 2000);
            boomSound.play();
            eflagspace = false;
            flagboom = true;
            Bosslife--;
            boomx = boss.x;
            boomy = boss.y;
            boom(boomx, boomy);
            setTimeout(function () {
                enemybullet.bulletflag = false
            }, 300);
            enemybullet.x = -200;
            enemybullet.y = -200;
        }

        if (hit(bossbullet, tank)) { //检测BOSS打击到我方坦克1
            if (Invincible) return;
            Invincible = true;
            setTimeout(function () {
                Invincible = false
            }, 2000);
            boomSound.play();
            bossflagspace = false;
            flagboom = true;
            boomx = tank.x;
            boomy = tank.y;
            boom(boomx, boomy);
            if (life1 >= 1) life1--;
            setTimeout(function () {
                bossbullet.bulletflag = false
            }, 300);

            bossbullet.x = -200;
            bossbullet.y = -200;
            bossbullet.bulletspeed = 6;
            tank = {
                speed: 3,
                tankAngle: 0,
                x: 32,
                y: 450
            };
        }


        if (hit(bossbullet, enemy)) { //检测BOSS打击到我方坦克2
            if (eInvincible) return;
            eInvincible = true;
            setTimeout(function () {
                eInvincible = false
            }, 2000);
            boomSound.play();
            bossflagspace = false;
            flagboom = true;
            boomx = enemy.x;
            boomy = enemy.y;
            boom(boomx, boomy);
            if (life2 >= 1) life2--;
            setTimeout(function () {
                bossbullet.bulletflag = false
            }, 300);

            bossbullet.x = -200;
            bossbullet.y = -200;
            bossbullet.bulletspeed = 6;
            enemy = {
                x: 480,
                y: 450,
                speed: 3,
                enemyAngle: 0
            };
        }
        if (hit(boss, tank)) { //检测BOSS和坦克1相撞
            if (Invincible) return;
            Invincible = true;
            setTimeout(function () {
                Invincible = false
            }, 2000);
            boomSound.play();
            flagspace = false;
            //            bossflagspace = false;
            flagboom = true;
            boomx = (tank.x + boss.x) / 2;
            boomy = (tank.y + boss.y) / 2;
            boom(boomx, boomy);
            if (life1 >= 1) life1--;
            tank = {
                speed: 3,
                tankAngle: 0,
                x: 32,
                y: 450
            };
        }
        if (hit(boss, enemy)) { //检测BOSS和坦克2相撞
            if (eInvincible) return;
            eInvincible = true;
            setTimeout(function () {
                eInvincible = false
            }, 2000);
            boomSound.play();
            eflagspace = false;
            //            bossflagspace = false;
            flagboom = true;
            boomx = (enemy.x + boss.x) / 2;
            boomy = (enemy.y + boss.y) / 2;
            boom(boomx, boomy);
            if (life2 >= 1) life2--;
            enemy = {
                x: 480,
                y: 450,
                speed: 3,
                enemyAngle: 0
            };
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

    function bossspace() {
        var bossspace = Math.floor(Math.random() * 2);
        if (bossspace == 0) {
            if (bossbullet.bulletflag == true) return;
            else {
                bossbullet.x = boss.x;
                bossbullet.y = boss.y;
                bossbullet.bulletflag = true;
                bossbullet.bulletAngle = boss.bossAngle;
                angle3 = bossbullet.bulletAngle * Math.PI / 180;
                bossflagspace = true;
                bossbulletupdate();
            }
        }
    }

    function bossbulletupdate() {

        if (bossbullet.bulletAngle == 0) {
            bossbullet.y -= bossbullet.bulletspeed;
            var i = map3[Math.floor((bossbullet.y) / 32)][Math.floor((bossbullet.x + 16) / 32)];
            map3[Math.floor((bossbullet.y) / 32)][Math.floor((bossbullet.x + 16) / 32)] = bossdestorywall(i);
            drawBossBullet();
        } else if (bossbullet.bulletAngle == 90) {
            bossbullet.x += bossbullet.bulletspeed;
            var i = map3[Math.floor((bossbullet.y + 16) / 32)][Math.floor((bossbullet.x + 20) / 32)];
            map3[Math.floor((bossbullet.y + 16) / 32)][Math.floor((bossbullet.x + 20) / 32)] = bossdestorywall(i);
            drawBossBullet();
        } else if (bossbullet.bulletAngle == 180) {
            bossbullet.y += bossbullet.bulletspeed;
            var i = map3[Math.floor((bossbullet.y + 20) / 32)][Math.floor((bossbullet.x + 16) / 32)];
            map3[Math.floor((bossbullet.y + 20) / 32)][Math.floor((bossbullet.x + 16) / 32)] = bossdestorywall(i);
            drawBossBullet();
        } else if (bossbullet.bulletAngle == 270) {
            bossbullet.x -= bossbullet.bulletspeed;
            var i = map3[Math.floor((bossbullet.y + 16) / 32)][Math.floor((bossbullet.x) / 32)];
            map3[Math.floor((bossbullet.y + 16) / 32)][Math.floor((bossbullet.x) / 32)] = bossdestorywall(i);
            drawBossBullet();
        }
    }

    function bossdestorywall(i) {
        if (i == 31) {
            bossflagspace = false;
            setTimeout(function () {
                bossbullet.bulletflag = false
            }, 400);
            bossbullet.x = -200;
            bossbullet.y = -200;
            return 0;
        } else if (i == 32) {
            bossflagspace = false;
            setTimeout(function () {
                bossbullet.bulletflag = false
            }, 400);
            bossbullet.x = -200;
            bossbullet.y = -200;
            return i;
        } else if (i == 33) return i;
        return 0;
    }

    function drawBossBullet() {
        context.setTransform();
        context.translate(bossbullet.x + 16, bossbullet.y + 16);
        context.rotate(angle3);
        if (skill1flag) {
            context.drawImage(strbullet, -16, -16, 32, 32);
        } else
            context.drawImage(bossbulletpic, -16, -16, 32, 32);
    } //画子弹

    function autodireciton() {
        var j = Math.floor(Math.random() * 100);
        if (j == 0) {
            boss.bossAngle += 90;
        }
        if (j == 1) {
            boss.bossAngle -= 90;
        }
        boss.bossAngle = (boss.bossAngle + 360) % 360;
    }

    function directionWall() {
        var j = Math.floor(Math.random() * 2);
        if (j == 0) {
            boss.bossAngle += 90;
        } else {
            boss.bossAngle -= 90;
        }
        boss.bossAngle = (boss.bossAngle + 360) % 360;
    }

    function drawBoss() {
        if (Bosslife) {
            context.setTransform();
            context.translate(boss.x + 16, boss.y + 16);
            context.rotate(boss.bossAngle * Math.PI / 180);
            context.drawImage(bosspic, -16, -16, 30, 30);
        }
    }


    //Boss技能
    function skill1() {

        bossbullet.bulletspeed = 10;
        setTimeout(function () {
            bossbullet.bulletspeed = 7;
            skill1flag = false;
            flag = false;
        }, 5000);
    } //BOSS加速
    function skill2() {
        guardflag = true;

        guard = {
            x: 250,
            y: 48,
            speed: 2.5,
            guardAngle: 180
        };
        guardupdate();
    }

    function guardupdate() {
        if (guard.guardAngle == 0) { //上
            guard.y -= guard.speed;
            if (map3[Math.floor((guard.y + 2) / 32)][Math.floor((guard.x + 2) / 32)] != 0 || map3[Math.floor((guard.y + 2) / 32)][Math.ceil((guard.x - 2) / 32)] != 0) {
                guard.y += guard.speed;
                guarddirectionWall();
            } else
                guardautodireciton();
            drawGuard();
            if (flagguardspace) guardbulletupdate();
        } else if (guard.guardAngle == 180) { //下

            guard.y += guard.speed;
            if (map3[Math.ceil((guard.y) / 32)][Math.ceil((guard.x - 2) / 32)] != 0 || map3[Math.ceil((guard.y) / 32)][Math.floor((guard.x + 2) / 32)] != 0) {
                guard.y -= guard.speed;
                guarddirectionWall();
            } else
                guardautodireciton();
            drawGuard();
            if (flagguardspace) guardbulletupdate();
        } else if (guard.guardAngle == 270) { //左

            guard.x -= guard.speed;
            if (map3[Math.floor((guard.y + 2) / 32)][Math.floor((guard.x) / 32)] != 0 || map3[Math.ceil((guard.y - 2) / 32)][Math.floor((guard.x) / 32)] != 0) {
                guard.x += guard.speed;
                guarddirectionWall();
            } else
                guardautodireciton();
            drawGuard();
            if (flagguardspace) guardbulletupdate();
        } else if (guard.guardAngle == 90) { //右

            guard.x += guard.speed;
            if (map3[Math.ceil((guard.y - 2) / 32)][Math.ceil((guard.x - 2) / 32)] != 0 || map3[Math.floor((guard.y + 2) / 32)][Math.ceil((guard.x - 2) / 32)] != 0) {
                guard.x -= guard.speed;
                guarddirectionWall();
            } else
                guardautodireciton();
            drawGuard();
            if (flagguardspace) guardbulletupdate();
        }
        guardspace();

        if (hit(bullet, guard)) { //检测坦克1打击到守卫

            flagspace = false;
            flagboom1 = true;
            flag = false;
            setTimeout(function () {
                bullet.bulletflag = false
            }, 300);
            boomx1 = guard.x;
            boomy1 = guard.y;
            boom(boomx1, boomy1);
            guard.x = -200;
            guard.y = -200;
            bullet.x = -200;
            bullet.y = -200;
            guardflag = false;
        }
        if (hit(enemybullet, guard)) { //检测坦克2打击到守卫
            guardflag = false;
            eflagspace = false;
            flagboom1 = true;
            flag = false;
            setTimeout(function () {
                enemybullet.bulletflag = false
            }, 300);
            boomx1 = guard.x;
            boomy1 = guard.y;
            boom(boomx1, boomy1);
            guard.x = -200;
            guard.y = -200;
            enemybullet.x = -200;
            enemybullet.y = -200;
        }
        if (hit(guardbullet, tank)) { //检测打击到我方坦克1
            if (Invincible) return;
            Invincible = true;
            setTimeout(function () {
                Invincible = false
            }, 2000);
            flagguardspace = false;
            flagboom1 = true;
            boomx1 = tank.x;
            boomy1 = tank.y;
            boom(boomx1, boomy1);
            if (life1 >= 1) life1--;
            setTimeout(function () {
                guardbullet.bulletflag = false
            }, 300);
            guardbullet.x = -200;
            guardbullet.y = -200;
            guardbullet.bulletspeed = 6;
            tank = {
                speed: 3,
                tankAngle: 0,
                x: 32,
                y: 450
            };


        }
        if (hit(guardbullet, enemy)) { //检测打击到我方坦克2
            if (eInvincible) return;
            eInvincible = true;
            setTimeout(function () {
                eInvincible = false
            }, 2000);
            flagguardspace = false;
            flagboom1 = true;
            boomx1 = enemy.x;
            boomy1 = enemy.y;
            boom(boomx1, boomy1);
            if (life2 >= 1) life2--;
            setTimeout(function () {
                guardbullet.bulletflag = false
            }, 300);
            guardbullet.x = -200;
            guardbullet.y = -200;
            guardbullet.bulletspeed = 6;
            enemy = {
                x: 480,
                y: 450,
                speed: 3,
                enemyAngle: 0
            };

        }
        if (hit(guard, tank)) { //检测守卫和坦克1相撞
            if (Invincible) return;
            Invincible = true;
            setTimeout(function () {
                Invincible = false
            }, 2000);
            flagspace = false;
            flagguardspace = false;
            flagboom1 = true;
            guardflag = false;
            flag = false;
            boomx1 = (tank.x + guard.x) / 2;
            boomy1 = (tank.y + guard.y) / 2;
            boom(boomx1, boomy1);
            if (life1 >= 1) life1--;
            guard.x = -200;
            guard.y = -200;
            tank = {
                speed: 3,
                tankAngle: 0,
                x: 32,
                y: 450
            };
        }
        if (hit(guard, enemy)) { //检测守卫和坦克2相撞
            if (eInvincible) return;
            eInvincible = true;
            setTimeout(function () {
                eInvincible = false
            }, 2000);
            guardflag = false;
            eflagspace = false;
            flagguardspace = false;
            flagboom1 = true;
            flag = false;
            boomx1 = (enemy.x + guard.x) / 2;
            boomy1 = (enemy.y + guard.y) / 2;
            boom(boomx1, boomy1);
            if (life2 >= 1) life2--;
            guard.x = -200;
            guard.y = -200;
            enemy = {
                x: 480,
                y: 450,
                speed: 3,
                enemyAngle: 0
            };
        }
    }

    function guardspace() {
        var guardspace = Math.floor(Math.random() * 100);
        if (guardspace == 0) {
            if (guardbullet.bulletflag == true) return;
            else {
                guardbullet.x = guard.x;
                guardbullet.y = guard.y;
                guardbullet.bulletflag = true;
                guardbullet.bulletAngle = guard.guardAngle;
                angle4 = guardbullet.bulletAngle * Math.PI / 180;
                flagguardspace = true;
                guardbulletupdate();
            }
        }
    }

    function guardbulletupdate() {

        if (guardbullet.bulletAngle == 0) {
            guardbullet.y -= guardbullet.bulletspeed;
            var i = map3[Math.floor((guardbullet.y) / 32)][Math.floor((guardbullet.x + 16) / 32)];
            map3[Math.floor((guardbullet.y) / 32)][Math.floor((guardbullet.x + 16) / 32)] = guarddestorywall(i);
            drawGuardBullet();

        } else if (guardbullet.bulletAngle == 90) {
            guardbullet.x += guardbullet.bulletspeed;
            var i = map3[Math.floor((guardbullet.y + 16) / 32)][Math.floor((guardbullet.x + 20) / 32)];
            map3[Math.floor((guardbullet.y + 16) / 32)][Math.floor((guardbullet.x + 20) / 32)] = guarddestorywall(i);
            drawGuardBullet();
        } else if (guardbullet.bulletAngle == 180) {
            guardbullet.y += guardbullet.bulletspeed;
            var i = map3[Math.floor((guardbullet.y + 20) / 32)][Math.floor((guardbullet.x + 16) / 32)];
            map3[Math.floor((guardbullet.y + 20) / 32)][Math.floor((guardbullet.x + 16) / 32)] = guarddestorywall(i);
            drawGuardBullet();
        } else if (guardbullet.bulletAngle == 270) {
            guardbullet.x -= guardbullet.bulletspeed;
            var i = map3[Math.floor((guardbullet.y + 16) / 32)][Math.floor((guardbullet.x) / 32)];
            map3[Math.floor((guardbullet.y + 16) / 32)][Math.floor((guardbullet.x) / 32)] = guarddestorywall(i);
            drawGuardBullet();
        }
    }

    function guarddestorywall(i) {
        if (i == 31) {
            flagguardspace = false;
            setTimeout(function () {
                guardbullet.bulletflag = false
            }, 400);
            guardbullet.x = -200;
            guardbullet.y = -200;
            return 0;
        } else if (i == 32) {
            flagguardspace = false;
            setTimeout(function () {
                guardbullet.bulletflag = false
            }, 400);
            guardbullet.x = -200;
            guardbullet.y = -200;
            return i;
        } else if (i == 33) return i;
        return 0;
    }

    function drawGuardBullet() {
        context.setTransform();
        context.translate(guardbullet.x + 16, guardbullet.y + 16);
        context.rotate(angle4);
        context.drawImage(enemybulletpic, -16, -16, 32, 32);
    }

    function guardautodireciton() {
        var j = Math.floor(Math.random() * 100);
        if (j == 0) {
            guard.guardAngle += 90;
        }
        if (j == 1) {
            guard.guardAngle -= 90;
        }
        guard.guardAngle = (guard.guardAngle + 360) % 360;
    }

    function guarddirectionWall() {
        var j = Math.floor(Math.random() * 2);
        if (j == 0) {
            guard.guardAngle += 90;
        } else {
            guard.guardAngle -= 90;
        }
        guard.guardAngle = (guard.guardAngle + 360) % 360;
    }

    function drawGuard() {
        context.setTransform();
        context.translate(guard.x + 16, guard.y + 16);
        context.rotate(guard.guardAngle * Math.PI / 180);
        context.drawImage(smalltankpic, -16, -16, 30, 30);
    } //BOSS召唤小坦克

    function skill3() {
        tank.speed = 2;
        enemy.speed = 2;
        setTimeout(function () {
            tank.speed = 3;
            enemy.speed = 3;
            flag = false;
        }, 2000);
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
        if (flagwin) winSound.play();
        else if (flagover) gameoverSound.play();
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
                                if (flagwin) context.drawImage(winpic, 0, 0, 544, 512);
                                else if (flagover) context.drawImage(gameoverpic, 0, 0, 544, 512);
                                context.restore();
                                cliptime += 0.05;
                            } else {
                                if (flagwin) context.drawImage(winpic, 0, 0, 544, 512);
                                else if (flagover) context.drawImage(gameoverpic, 0, 0, 544, 512);
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
        if (!flagwin && !flagover) {
            update();
            enemyupdate();
            bossupdate();
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
        map3 = [
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
    }
}
