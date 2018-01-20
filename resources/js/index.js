//VOLUME BAR
//volume bar event
var volumeDrag = false;
$('.volume').on('mousedown', function (e) {
    volumeDrag = true;
    $('.sound').removeClass('muted');
    updateVolume(e.pageX);
});
$(document).on('mouseup', function (e) {
    if (volumeDrag) {
        volumeDrag = false;
        updateVolume(e.pageX);
    }
});
$(document).on('mousemove', function (e) {
    if (volumeDrag) {
        updateVolume(e.pageX);
    }
});
var updateVolume = function (x, vol) {
    var volume = $('.volume');
    var percentage;
    //if only volume have specificed
    //then direct update volume
    if (vol) {
        percentage = vol * 100;
    } else {
        var position = x - volume.offset().left;
        percentage = 100 * position / volume.width();
    }

    if (percentage > 100) {
        percentage = 100;
    }
    if (percentage < 0) {
        percentage = 0;
    }

    //update volume bar and video volume
    $('.volumeBar').css('width', percentage + '%');
    console.log(percentage / 100);
    $("video").volume = percentage / 100;
};

function setTitle(vid, api) {
    var video_title = document.getElementById("video-title");

    $.get("https://www.googleapis.com/youtube/v3/videos?id=" + vid + "&key=" + api + "&fields=items(snippet(title,liveBroadcastContent))&part=snippet", function (resp) {
        console.log(resp.items[0].snippet.title);
        video_title.innerHTML = resp.items[0].snippet.title;

        if (resp.items[0].snippet.liveBroadcastContent !== "live") {
            $(".youtube-chat").removeAttr("style").hide();
            $(".CustomChatting").removeAttr("style").show();
        }
    });
}


function checkLive() {
    var isVideo = document.getElementsByClassName("live-chat-unavailable");
    return !isVideo;
}