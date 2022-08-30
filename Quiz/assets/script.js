
const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

const start = document.getElementById('start-btn')
const startCard = document.getElementById('start-card')
const quizCard = document.getElementById('quiz-card')
const scoreCard = document.getElementById('score-card')
const query = document.querySelector('#questions')
const remark = document.getElementById('remark')
const finalscore = document.getElementById('finalscore')
var initials = document.getElementById('initials')
var store = document.getElementById("store")
let index = 0
let score = 0

start.addEventListener('click', startQuiz)

function counter() {
  remark.innerText = ""
  if (index < questions.length - 1) {
    index++
    displayQuestion(index)
  } else {
    quizCard.classList.add('hide')
    scoreCard.classList.remove('hide')
    finalscore.innerText = score
    clearInterval(timer)
  }
}

function startQuiz() {
  startCard.classList.add('hide')
  quizCard.classList.remove('hide')
  displayQuestion(index)
  countdown(demo.innerText)
}

//Argument passed to display question is taken from index
function displayQuestion(arg) {
  query.innerHTML = `<h2>${questions[arg].questionText}</h2>`
  for (var i = 0; i < 4; i++) {
    document.getElementById(`btn${i}`).innerText = questions[arg].options[`${i}`]
  }
}

//Evaluation of answer
//Text in the button is compared with answer in questions array
//If ans is wrong setInterval is cleared argument passed to countdown is substracted by 10
function checkAns(num) {
  if (document.getElementById(`btn${num}`).innerText == questions[index].answer) {
    remark.innerText = 'Correct!'
    score += 10
  } else {
    clearInterval(timer)
    remark.innerText = 'Incorrect!'
    countdown(demo.innerHTML - 10)
  }
}

//Countdown Timer
let timer//timer is declared globally

function countdown(y){timer = 
  setInterval(()=>{
    if (y > 0) {
      y -= 1;
      console.log(y)
      demo.innerHTML = y
    }    
    else {
      quizCard.classList.add('hide')
      scoreCard.classList.remove('hide')
      finalscore.innerText = score
    }
  }, 1000)
  }

  //Storage
  store.addEventListener('click', function(e) {
  let quizScore = localStorage.getItem('quizScore')
  if (quizScore == null){
    scoreArr = []
  }
  else{
    scoreArr = JSON.parse(quizScore)
  }
  let scoreobj = {
    Player: initials.value,
    Score: score
  }
  scoreArr.push(scoreobj)
  localStorage.setItem("quizScore", JSON.stringify(scoreArr))
  console.log(scoreArr)
})





