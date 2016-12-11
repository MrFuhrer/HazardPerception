var options = {
    times: [
        5, 10
    ],
    stepSize: 1,
    steps: 5,
    video: 'GXVZZXL5gts',
    clicks: 3,
    score: 5
};

var player;
(function(){
    "use strict";

    initScripts();

    function testCheckHazards(times) {
        var score = 0;

        var correctTimes = options.times;

        for(var i = 0; i < times.length; i++) {
            score+=getScore(times[i]);
        }

        function getScore(time) {
            for(var i = 0; i < correctTimes.length; i++) {
                var start = correctTimes[i],
                    end = start+(options.stepSize * options.steps);

                if(time >= start && time <= end) {
                    correctTimes.splice(i,1);
                    return options.steps - parseInt( (time - start) / options.stepSize);
                }
            }
            return 0;
        }

        alert("Your score is: "+score);

    }


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
                'onReady': onReady
            }
        });
    }


    function getHazardClickCount() {
        return options.clicks;
    }

    function onReady(event) {
        $(event.target.a).removeAttr("allowfullscreen");

        var hazardTimes = [];

        player.addEventListener('onStateChange', function(event) {
            if(event.data == YT.PlayerState.ENDED) {
                testCheckHazards(hazardTimes);
            }
        });

        var availableClicks = getHazardClickCount();

        function isAbleToClick() {
            return availableClicks-->0;
        }


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

        function hazardExpected(data) {
            if(isAbleToClick()) {
                $(".hazardPoints").append($("<div class='hazardPoint' style='left: " + (data.share * 100) + "%'>"));
                hazardTimes.push(data.time);
            } else {
                alert("You have no more tries, please wait while video ends for result");
            }
        }

    }


    function initScripts() {
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";

        var firstScriptTag = document.getElementsByTagName('script')[0];

        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

})();