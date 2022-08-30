let start = document.getElementById('start');
var audio = new Audio("laughter.mp3");

function click2Play(){
    document.getElementById('skull').classList.add('animated')
     setTimeout( function(){
              audio.play()
            document.getElementById('teeths').classList.add('anime')
            document.getElementById('eyeLpupil').classList.add('eyeAnime')
            document.getElementById('eyeRpupil').classList.add('eyeAnime')
        }, 5000
        )
 
}