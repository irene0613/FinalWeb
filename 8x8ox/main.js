var size = 8;
var value = new Array(size);
for (var i = 0; i < size; i++)
    value[i] = new Array(size);
var table = document.createElement("TABLE");
var who = 0; //0=0,1=x,

function initial() {
    for (var i = 0; i < size; i++)
        for (var j = 0; j < size; j++)
            value[i][j] = 3;
    document.body.appendChild(table);
    table.border = "8";
    table.cellSpacing = "5";
    table.bgColor = "#888888";
    table.style.borderColor = "#008080";
    table.align = "left";
    for (var i = 0; i < size; i++) {
        table_row = table.insertRow(i);
        for (var j = 0; j < size; j++) {
            c = table_row.insertCell(j);
            c.name = "" + i + j;
            c.id = c.name;
            c.vAlign = "center";
            c.align = "center";
            c.width = "50";
            c.height = "50";
            c.onclick = put;
            c.appendChild(document.createTextNode(" "));
        }
    }

}

function put(event) {
    if ((typeof event == "undefined") || (!event))
        event = window.event;
    var e1 = event.target || event.srcElement;
    var loc_x = e1.id.substring(0, 1);
    var loc_y = e1.id.substring(1, 2);
    //document.write(e1.id);
    if (value[loc_x][loc_y] == 3) {
        value[loc_x][loc_y] = who;
        if (who == 0) {
            e1.innerHTML = "O";
            who = 1;
        } else {
            e1.innerHTML = "X";
            who = 0;
        }
    }
    check();
}

function check() {
    //判斷衡的
    var good = 3; //0=O win,1=X win
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var count = 0;
            for (var k = 0; k < size - 2; k++) {
                if (value[i][k + j] == 0)
                    count++;
            }
            if (count == 3)
                good = 0;
        }
    }
    //判斷直的
    for (var j = 0; j < size; j++) {
        for (var i = 0; i < size - 5; i++) { //size-2 = size- (5 - 3)
            var count = 0;
            for (var k = 0; k < size - 2; k++) {
                if (value[k + i][j] == 0)
                    count++;
            }
            if (count == 3)
                good = 0;
        }
    }
    //判斷斜的
    for (var i = 0; i < 3; i++) { // 斜率為負斜線,列
        for (var j = 0; j < 3; j++) { // 橫
            if (value[i + 0][j] == 0 && value[i + 1][j + 1] == 0 && value[i + 2][j + 2] == 0)
                good = 0;
        }
    }
    for (var i = 4; i > 1; i--) { // 斜率為正斜線
        for (var j = 0; j < 3; j++) { // 橫
            if (value[i - 0][j] == 0 && value[i - 1][j + 1] == 0 && value[i - 2][j + 2] == 0)
                good = 0;
        }
    }

    //判斷衡的
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var count = 0;
            for (var k = 0; k < size - 2; k++) {
                if (value[i][k + j] == 1)
                    count++;
            }
            if (count == 3)
                good = 1;
        }
    }
    //判斷直的
    for (var j = 0; j < size; j++) {
        for (var i = 0; i < size - 5; i++) { //size-2 = size- (5 - 3)
            var count = 0;
            for (var k = 0; k < size - 2; k++) {
                if (value[k + i][j] == 1)
                    count++;
            }
            if (count == 3)
                good = 1;
        }
    }
    //判斷斜的
    for (var i = 0; i < 3; i++) { // 斜率為負斜線,列
        for (var j = 0; j < 3; j++) { // 橫
            if (value[i + 0][j] == 1 && value[i + 1][j + 1] == 1 && value[i + 2][j + 2] == 1)
                good = 1;
        }
    }
    for (var i = 4; i > 1; i--) { // 斜率為正斜線
        for (var j = 0; j < 3; j++) { // 橫
            if (value[i - 0][j] == 1 && value[i - 1][j + 1] == 1 && value[i - 2][j + 2] == 1)
                good = 1;
        }
    }

    if (good == 0)
        document.write("O WIN");
    if (good == 1)
        document.write("X WIN");
}