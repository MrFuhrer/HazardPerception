var options = {
    hazards: 2,
    times: [
        1,1.5
    ],
    step: 1,
    video: 'M7lc1UVf-VE'
};
var player;
(function(){
    "use strict";

    initScripts();

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: options.video,
            allowfullscreen: 0,
            playerVars: {
                controls: 0,
                origin: "localhost:63343",
                disablekb: true,
                fs: false,
                rel: 0,
                showinfo: false
            },
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    function onPlayerReady(event) {
        $(event.target.a).removeAttr("allowfullscreen");

        $(".hazardButton").click(function() {
            var duration = player.getDuration();
            var time = player.getCurrentTime();

            var hazardData = {
                duration: duration,
                time: time,
                share: time/duration
            };
            hazardExpected(hazardData);
        });
    }

    function hazardExpected(data) {
        console.log(data);
    }

    function initScripts() {
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";

        var firstScriptTag = document.getElementsByTagName('script')[0];

        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

})();