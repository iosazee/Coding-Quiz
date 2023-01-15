let timerSpan = document.querySelector("#time")
let timerEl = document.querySelector('.timer')
let startScreen = document.querySelector('#start-screen')
let startBtn = document.querySelector("#start")
let questionsEl = document.querySelector("#questions")
let questionsTitleEl = document.querySelector("#question-title")
let choicesEl = document.querySelector("#choices")
let feedbackEl = document.querySelector('#feedback')
let finalScoreSpan = document.querySelector('#final-score')
let endScreenEl = document.querySelector('#end-screen')
let correctSound = document.querySelector('#correct')
let incorrectSound = document.querySelector('#incorrect')
let playerInitials = document.querySelector('#initials')
let submitBtn = document.querySelector('#submit')


let questionIndex = 0
let timer = 90
let intervalId
let score = 0
console.log(questions)
const beginTimer = () => {

    intervalId = setInterval(() => {
        timerSpan.textContent = timer
        if (timer <= 0) {
            clearInterval(intervalId);
            end()
        }
        
        timer--
    }, 1000)
}

const start = () => {

    beginTimer()
    // let importedQuestions = exportQuestions()
    // let currentQuestion = currentQuestion
    let currentQuestion = questions[questionIndex]
    let choices = currentQuestion.answers
    console.log(currentQuestion, ':', choices)

    questionsTitleEl.textContent = currentQuestion.question
    console.log("Current Question: ", currentQuestion.question)

    choicesEl.innerHTML = ""
    // feedbackEl.setAttribute('class', 'hide')

    for (let i = 0; i < choices.length; i++) {
        let choice = choices[i]
        console.log("Choices: ", choice)
        let isRight = currentQuestion.correctAnswer === choice
        let isWrong = currentQuestion.correctAnswer !== choice
        console.log(isRight)
        

        choiceBtn = document.createElement('button')
        choiceBtn.textContent = choice
        choicesEl.appendChild(choiceBtn)
        choiceBtn.setAttribute('data-right', `${isRight}`)
        choiceBtn.setAttribute('data-wrong', `${isWrong}`)

    }

    startScreen.setAttribute('class', 'hide')
    questionsEl.setAttribute('class', 'start')
    timerSpan.textContent = timer

}


const end = () => {

    questionsEl.setAttribute('class', 'hide')
    feedbackEl.setAttribute('class', 'hide')

    if (score < 0) {
        score = 0
    }

    finalScoreSpan.textContent = score
    console.log(score)
    endScreenEl.setAttribute('class', 'start')
    
}


const checkAns = (e) => {
    // console.log(e)
    e.stopPropagation()
    questionIndex++
    let correctAns = e.target.dataset.right
    let wrongAns = e.target.dataset.wrong
    console.log('Answer: ', correctAns)
  
    if (correctAns == 'true') {
        score = timer
        feedbackEl.textContent = 'Right answer.'
        correctSound.play()
        

        if (questionIndex < questions.length) {

            start()

        } else {
            end()
        }

    } 
    if (wrongAns == 'true') {

        score = timer -10
        feedbackEl.textContent = 'Wrong Answer'
        incorrectSound.play()
        

        if (timer == 0) {
            end()
        }
        
    }
   
    feedbackEl.setAttribute('class', 'start')
}


choicesEl.addEventListener('click', checkAns);

const savePlayerDetails = () => {

    let playerDetails = {
        initials: playerInitials.value,
        finalscore: finalScoreSpan.textContent 
    }

    localStorage.setItem("player-details", JSON.stringify(playerDetails))

    location.href = "highscores.html"

}

submitBtn.addEventListener('click', savePlayerDetails)
startBtn.addEventListener('click', start)



