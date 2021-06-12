let player1; //YouTube Player
let currentPlay = 0; //記錄目前撥到第幾首歌
let choose;
//YouTube API Ready
function onYouTubeIframeAPIReady() {
    player1 = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: playList1[currentPlay],

        playerVars: {
            autoplay: 0, //是否自動撥放
            controls: 0, //是否顯示控制項
            start: playTime1[currentPlay][0], //開始秒數
            end: playTime1[currentPlay][1], //結束秒數
            iv_load_policy: 3
        },
        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}
//YouTube Player Ready
function onPlayerReady(event) {
    $("#playButton1").on("click", function() {
        $("h2").text(player1.getVideoData().title);
        player1.playVideo();
        choose = 1;
    });
    $("#playButton2").on("click", function() {
        $("h2").text(player1.getVideoData().title);
        player1.playVideo();
        choose = 2;
    });
    $("#playButton3").on("click", function() {
        $("h2").text(player1.getVideoData().title);
        player1.playVideo();
        choose = 3;
    });
}
//Player State Change
function onPlayerStateChange(event) {
    if (choose == 1) {
        if (Math.floor(player1.getCurrentTime()) == playTime1[currentPlay][1]) {
            if (currentPlay < 2) {
                currentPlay++;
                player1.loadVideoById({
                    videoId: playList1[currentPlay],
                    startSeconds: playTime1[currentPlay][0],
                    endSeconds: playTime1[currentPlay][1],
                    suggestedQuality: "large"
                });
            } else {
                currentPlay = 0;
                player1.cueVideoById({
                    videoId: playList1[currentPlay],
                    startSeconds: playTime1[currentPlay][0],
                    endSeconds: playTime1[currentPlay][1],
                    suggestedQuality: "large"
                });
            }
        }
        $("h2").text(player1.getVideoData().title);
    } else if (choose == 2) {
        if (Math.floor(player1.getCurrentTime()) == playTime1[currentPlay][1]) {
            if (currentPlay < 4) {
                currentPlay = 2;
                currentPlay++;
                player1.loadVideoById({
                    videoId: playList1[currentPlay],
                    startSeconds: playTime1[currentPlay][0],
                    endSeconds: playTime1[currentPlay][1],
                    suggestedQuality: "large"
                });
            } else {
                currentPlay = 0;
                player1.cueVideoById({
                    videoId: playList1[currentPlay],
                    startSeconds: playTime1[currentPlay][0],
                    endSeconds: playTime1[currentPlay][1],
                    suggestedQuality: "large"
                });
            }
        }
        $("h2").text(player1.getVideoData().title);
    } else if (choose == 3) {
        if (Math.floor(player1.getCurrentTime()) == playTime1[currentPlay][1]) {
            if (currentPlay < playList1.length - 1) {
                currentPlay = 4;
                currentPlay++;
                player1.loadVideoById({
                    videoId: playList1[currentPlay],
                    startSeconds: playTime1[currentPlay][0],
                    endSeconds: playTime1[currentPlay][1],
                    suggestedQuality: "large"
                });
            } else {
                currentPlay = 0;
                player1.cueVideoById({
                    videoId: playList1[currentPlay],
                    startSeconds: playTime1[currentPlay][0],
                    endSeconds: playTime1[currentPlay][1],
                    suggestedQuality: "large"
                });
            }
        }
        $("h2").text(player1.getVideoData().title);
    }
}