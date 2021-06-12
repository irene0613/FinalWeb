let thisH1 = document.getElementsByTagName("h1")[0];
let thisP = document.getElementsByTagName("p")[0];
let thisDiv = document.getElementsByTagName("div")[0];
// 方法可返回帶有指定標籤名的物件的集合

function mouseIn() {
    thisH1.innerHTML = "你進來了";
}

function mouseOut() {
    thisH1.innerHTML = "你出去了";
    thisP.innerHTML = "";
}

function mouseMove(e) {
    thisP.innerHTML = "你在裡面走來走去。 位置: " + e.clientX + ", " + e.clientY;
    // clientX 事件屬性返回當事件被觸發時滑鼠指標向對於瀏覽器頁面的水準座標。
}
thisDiv.addEventListener("mouseover", mouseIn);
thisDiv.addEventListener("mouseout", mouseOut);
thisDiv.addEventListener("mousemove", mouseMove);
// 常見滑鼠事件,function(向指定元素添加事件句柄)