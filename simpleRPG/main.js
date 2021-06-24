let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
var money = 0;
var step = 50;
var time = 1;
var win = 0;
var audio = document.getElementById("bgMusic");
audio.src = "simpleRPG/walk.mp3";
//mapArray - 決定地圖中每個格子的元素
//ctx - HTML5 Canvas用
//currentImgMainX, currentImgMainY - 決定主角所在座標
//imgMountain, imgMain, imgEnemy - 障礙物, 主角, 敵人的圖片物件
const gridLength = 66; //200
//網頁載入完成後初始化動作
$(function() {
    mapArray = [ //0-可走,1-障礙,2-終點,3-敵人
        [0, 3, 0, 0, 0, 1, 3, 4, 3],
        [0, 0, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 9, 1, 1, 1],
        [9, 0, 0, 1, 5, 1, 6, 3, 3],
        [1, 9, 0, 0, 0, 6, 0, 4, 3],
        [3, 1, 0, 1, 0, 6, 0, 0, 3],
        [3, 0, 0, 1, 0, 0, 0, 3, 3],
        [4, 0, 0, 0, 7, 6, 0, 6, 1],
        [3, 0, 9, 1, 0, 0, 0, 8, 1]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");
    imgMain = new Image();
    imgMain.src = "simpleRPG/images/spriteSheet.png";
    currentImgMain = {
        "x": 0,
        "y": 0
    };
    imgMain.onload = function() {
        ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    }
    imgMountain = new Image();
    imgMountain.src = "simpleRPG/images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "simpleRPG/images/Enemy.png";
    imgMountain.onload = function() {
        imgEnemy.onload = function() {
            for (var x in mapArray) {
                for (var y in mapArray[x]) {
                    if (mapArray[x][y] == 1) {
                        ctx.drawImage(imgMountain, 32, 65, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                    } else if (mapArray[x][y] == 3) {
                        ctx.drawImage(imgEnemy, 7, 40, 104, 135, y * gridLength, x * gridLength, gridLength, gridLength);
                    } else if (mapArray[x][y] == 4) {
                        ctx.drawImage(imgMountain, 288, 160, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                    } else if (mapArray[x][y] == 5) {
                        ctx.drawImage(imgMountain, 256, 0, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                    } else if (mapArray[x][y] == 6) {
                        ctx.drawImage(imgMountain, 32, 192, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                    } else if (mapArray[x][y] == 7) {
                        ctx.drawImage(imgMountain, 32, 32, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                    } else if (mapArray[x][y] == 8) {
                        ctx.drawImage(imgMountain, 224, 160, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                    } else if (mapArray[x][y] == 9) {
                        ctx.drawImage(imgMountain, 192, 192, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength);
                    }
                }
            }
        }
    }
});
//處理使用者按下按鍵
$(document).on("keydown", function(event) {

    let targetImg, targetBlock, cutImagePositionX;
    //cutImagePositionX - 決定主角臉朝向哪個方向
    targetImg = { //主角的目標座標
        "x": -1,
        "y": -1
    };
    targetBlock = { //主角的目標(對應2維陣列)
        "x": -1,
        "y": -1
    }
    event.preventDefault();
    //避免鍵盤預設行為發生，如捲動/放大/換頁...
    //判斷使用者按下什麼並推算目標座標
    switch (event.key) {
        case "ArrowLeft":
            targetImg.x = currentImgMain.x -
                gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX
                = 175; //臉朝左
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y -
                gridLength;
            cutImagePositionX = 355; //臉朝上
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x +
                gridLength;
            targetImg.y = currentImgMain.y;
            cutImagePositionX = 540; //臉朝右
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x;
            targetImg.y = currentImgMain.y +
                gridLength;
            cutImagePositionX = 0; //臉朝下
            break;
        default: //其他按鍵不處理
            return;
    }
    //確認目標位置不會超過地圖
    if (targetImg.x <= 550 && targetImg.x >= 0 && targetImg.y <= 550 && targetImg.y >= 0) {
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    } else {
        targetBlock.x = -1;
        targetBlock.y = -1;
    }
    //清空主角原本所在的位置
    ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    if (targetBlock.x != -1 && targetBlock.y != -1) {
        switch (mapArray[targetBlock.x][targetBlock.y]) {
            case 0: // 一般道路(可移動)
                if (step > -1) {
                    audio.src = "simpleRPG/walk.mp3";
                    audio.play();
                    $("#talkBox").text("step:" + step + "    money:" + money);
                    step--;
                    currentImgMain.x = targetImg.x;
                    currentImgMain.y = targetImg.y;
                } else if (win > 0) { $("#talkBox").text("You got it!!!"); } else { $("#talkBox").text("Game over"); }
                break;
            case 1: // 山(不可移動)
                $("#talkBox").text("step:" + step + "    money:" + money);
                break;
            case 3: // 敵人(不可移動)
                step--;
                audio.src = "simpleRPG/damage.mp3";
                audio.play();
                $("#talkBox").text("step:" + step + "    money:" + money);
                break;
            case 4: // 音樂箱(不可移動)
                if (money == 1) {
                    audio.src = "simpleRPG/bag.mp3";
                    audio.play();
                    money--;
                    $("#talkBox").text("step:" + step + "    money:" + money + "專輯不在這歐");
                } else {
                    audio.src = "simpleRPG/blip.mp3";
                    audio.play();
                    $("#talkBox").text("step:" + step + "    money:" + money + "沒錢買專輯ㄋㄟ");
                }
                break;
            case 5: // 錢(不可移動)

                if (money == 0) {
                    audio.src = "simpleRPG/coin.mp3";
                    audio.play();
                    money++;
                    $("#talkBox").text("step:" + step + "    money:" + money);
                } else {
                    audio.src = "simpleRPG/blip.mp3";
                    audio.play();
                    step--;
                    $("#talkBox").text("step:" + step + "money:" + money + "請勿貪心");
                }
                break;
            case 6: // 岩石(不可移動)
                $("#talkBox").text("step:" + step + "    money:" + money);
                break;
            case 7: // 星(不可移動)
                if (time == 1) {
                    audio.src = "simpleRPG/power.mp3";
                    audio.play();
                    step += 10;
                    time--;
                    $("#talkBox").text("step:" + step + "    money:" + money);
                } else {
                    audio.src = "simpleRPG/blip.mp3";
                    audio.play();
                    $("#talkBox").text("step:" + step + "    money:" + money + "已領ㄌㄡ");
                }
                break;
            case 8: // 水晶(不可移動)
                if (money == 1) {
                    audio.src = "simpleRPG/answer.mp3";
                    audio.play();
                    money--;
                    step = -1;
                    for (var x in mapArray) {
                        for (var y in mapArray[x]) { if (mapArray[x][y] == 8) ctx.drawImage(imgMountain, 256, 160, 32, 32, y * gridLength, x * gridLength, gridLength, gridLength); }
                    }
                    win++;
                    $("#talkBox").text("You got it!!!別急著走~再按一次吧!");

                } else if (win > 0) {
                    audio.src = "simpleRPG/boy_with_luv.mp3";
                    audio.play();
                    $("#talkBox").text("專輯好聽吧~");
                } else {
                    $("#talkBox").text("step:" + step + "    money:" + money);
                }
                break;
            case 9: // 紫岩石(不可移動)
                $("#talkBox").text("step:" + step + "    money:" + money);
                break;
        }
    } else {
        $("#talkBox").text("step:" + step + "    money:" + money);
    }
    //重新繪製主角
    ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
});