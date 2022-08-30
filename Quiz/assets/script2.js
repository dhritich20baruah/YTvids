displayScore()

function displayScore(){
let html = "";
let quizScore = localStorage.getItem('quizScore')
  if (quizScore == null){
    scoreArr = []
  }
  else{
    scoreArr = JSON.parse(quizScore)
  }

scoreArr.forEach(function(element){
  html +=`
  <ol class="list">
  <li>${element.Player}-${element.Score}</li>
</ol>
  `
})
var scorelist = document.getElementById('scorelist')
scorelist.innerHTML = html
}

const clear = document.getElementById('clear')
clear.addEventListener('click', ()=>{
    localStorage.clear()
    displayScore()
})