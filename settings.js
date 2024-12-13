/*
    Function: Tank War
    Author  : 张家俊、陈亮亮
    Date    : 2020.1.1
    Version : 2.1
*/
function settings() {
    var enemynumber = 1,
        life = 1,
        map;
    var mousedown = {};
    var a = ["沙漠", "雪地", "火山"];
    var flag = 0;
    context.resetTransform();
    clearCanvas(canvas);
    drawText(0);
    canvas.onmousedown = function (e) {
        mousedown = windowToCanvas(e.clientX, e.clientY);
        if (mousedown.x >= 350 && mousedown.x <= 366 && mousedown.y >= 135 && mousedown.y <= 151) {
            if (enemynumber >= 2) {
                enemynumber--;
                drawText(flag);

            } else {
                enemynumber = 5;
                drawText(flag);
            }
        } else if (mousedown.x >= 450 && mousedown.x <= 466 && mousedown.y >= 135 && mousedown.y <= 151) {
            if (enemynumber <= 4) {
                enemynumber++;
                drawText(flag);
            } else {
                enemynumber = 1;
                drawText(flag);
            }
        } else if (mousedown.x >= 350 && mousedown.x <= 366 && mousedown.y >= 235 && mousedown.y <= 251) {
            if (life >= 2) {

                life--;
                drawText(flag);
            } else {

                life = 10;
                drawText(flag);
            }
        } else if (mousedown.x >= 450 && mousedown.x <= 466 && mousedown.y >= 235 && mousedown.y <= 251) {
            if (life <= 9) {
                life++;
                drawText(flag);

            } else {
                life = 1;
                drawText(flag);

            }
        } else if (mousedown.x >= 350 && mousedown.x <= 366 && mousedown.y >= 335 && mousedown.y <= 351) {
            if (flag >= 1) {
                flag--;
                drawText(flag);
            } else {
                flag = 2;
                drawText(flag);
            }
        } else if (mousedown.x >= 450 && mousedown.x <= 466 && mousedown.y >= 335 && mousedown.y <= 351) {
            if (flag <= 1) {
                flag++;
                drawText(flag);
            } else {
                flag = 0;
                drawText(flag);
            }
        }
    }

    function drawText(i) {
        clearCanvas(canvas);
        if (i == 0)
            context.drawImage(settingspic, 0, 0, canvas.width, canvas.height);
        else if (i == 1) {
            context.drawImage(settingspic1, 0, 0, canvas.width, canvas.height);
        } else
            context.drawImage(settingspic2, 0, 0, canvas.width, canvas.height);
        context.fillStyle = "#000000";
        context.font = "23px STLiti";
        context.fillText("敌 人 数 量  :", 200, 150);
        context.drawImage(arrow, 350, 135, 16, 16);
        context.fillText(enemynumber, 400, 150);
        context.translate(465, 150);
        context.rotate(Math.PI);
        context.drawImage(arrow, 0, 0, 16, 16);
        context.resetTransform();
        context.fillText("生 命 值  :", 200, 250);
        context.drawImage(arrow, 350, 235, 16, 16);
        context.fillText(life, 400, 250);
        context.translate(465, 250);
        context.rotate(Math.PI);
        context.drawImage(arrow, 0, 0, 16, 16);
        context.resetTransform();
        context.fillText("地 图 :", 200, 350);
        context.drawImage(arrow, 350, 335, 16, 16);
        context.fillText(a[i], 385, 350);
        context.translate(465, 350);
        context.rotate(Math.PI);
        context.drawImage(arrow, 0, 0, 16, 16);
        context.resetTransform();
    }
    confirmstartButton.style.display = "block";
    confirmstartButton.onclick = function (e) {
        backgroundSound.pause();
        startSound.play();
        cancelAnimationFrame(animate);
        context.resetTransform();
        clearCanvas(canvas);
        confirmstartButton.style.display = "none";
        back2initButton.style.left = 640;
        back2initButton.style.top = 540;
        singlebattle(enemynumber, life, flag);
    }

    back2initButton.style.display = "block";
    back2initButton.style.left = 550;
    back2initButton.style.top = 500;
    back2initButton.onclick = function (e) {
        clearCanvas(canvas);
        startSound.pause();
        startSound.currentTime = 0;
        confirmstartButton.style.display = "none";
        back2initButton.style.display = "none";
        singlestartBtn.style.display = "block";
        battlestartBtn.style.display = "block";
        doublestartBtn.style.display = "block";
        introButton.style.display = "block";
        volumeButton.style.display = "block";
        back2initButton.style.left = 640;
        back2initButton.style.top = 540;
        init();

    }
}
