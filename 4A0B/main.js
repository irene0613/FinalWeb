let timer = document.getElementById("timer");
let userInput = document.getElementById("userInput");
let hint = document.getElementById("hint");
let button = document.getElementsByTagName("button")[0];
var audio = document.getElementById("bgMusic");
let count = 110;
let A = 0,
    B = 0;
let a = Math.floor(Math.random() * 9 + 1);
let b = Math.floor(Math.random() * 9 + 1);
while (a == b) { b = Math.floor(Math.random() * 9 + 1); }
let c = Math.floor(Math.random() * 9 + 1);
while (b == c || a == c) { c = Math.floor(Math.random() * 9 + 1); }
let d = Math.floor(Math.random() * 9 + 1);
while (a == d || b == d || c == d) { d = Math.floor(Math.random() * 9 + 1); }
timer.innerHTML = count;
let myVar = setInterval(myTimer, 1000);

function myTimer() {
    count--;
    timer.innerHTML = count;

    if (count == 0) {
        audio.src = "fire.mp3";
        audio.play();
        document.getElementById("myImage").src = "4A0B/04.gif";
        hint.innerHTML = "Game Over!The number is " + a + b + c + d;
        clearInterval(myVar); //停止時間
    }
}

$("#Button").on("click", function() {
    A = 0;
    B = 0;
    var table = document.getElementById("myTable");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(-1);
    if (userInput.value.substring(0, 1) == a)
        A++;
    if (userInput.value.substring(1, 2) == b)
        A++;
    if (userInput.value.substring(2, 3) == c)
        A++;
    if (userInput.value.substring(3, 4) == d)
        A++;
    for (var i = 0; i < 4; i++) {
        if (userInput.value.substring(i, i + 1) == a)
            B++;
        if (userInput.value.substring(i, i + 1) == b)
            B++;
        if (userInput.value.substring(i, i + 1) == c)
            B++;
        if (userInput.value.substring(i, i + 1) == d)
            B++;
    }
    if (userInput.value.substring(0, 1) == a)
        B--;
    if (userInput.value.substring(1, 2) == b)
        B--;
    if (userInput.value.substring(2, 3) == c)
        B--;
    if (userInput.value.substring(3, 4) == d)
        B--;
    if (A == 4) {
        audio.src = "4A0B/answer.mp3";
        audio.play();
        hint.innerHTML = "You got it!";
        document.getElementById("myImage").src = "4A0B/05.gif";
        //alert("You got it!");
        clearInterval(myVar);
        cell1.innerHTML = userInput.value + " is " + A + "A" + B + "B";
        userInput.value = null;
    } else {
        audio.src = "4A0B/blip.mp3";
        audio.play();
        cell1.innerHTML = userInput.value + " is " + A + "A" + B + "B";
        userInput.value = null;
    }
});