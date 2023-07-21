const questionContainer = document.getElementById("question-answer-container");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const questionText = document.getElementById("question-text");
const resultArea = document.getElementById("result");
const answerAreaElements = document.getElementById("answer-area");
let suffledQuestion, currentQuestionIndex, count=0;
startButton.addEventListener("click",startGame)
submitButton.addEventListener("click",()=>{
    resetQuestions()
    const finalScore = (count/questions.length) * 100;
    const resultMessage = document.createElement("h4");
    if(finalScore > 60) {
        resultMessage.style.color = "green";
        resultMessage.innerText = "You are Passed!";
        setStatusClass(document.body,true);
    }else{
        resultMessage.style.color = "red";
        resultMessage.innerText = "You are Failed!";
        setStatusClass(document.body,false);
    }
    console.log(finalScore,count,questions.length,count/questions.length)
    // resultArea.innerText = `${finalScore}%`;
    resultArea.append(resultMessage)
    resultArea.classList.remove("hide")
    startButton.firstChild.innerText = "Restart";
    startButton.classList.remove("hide");
    submitButton.classList.add("hide")
})
nextButton.addEventListener("click",()=>{
    currentQuestionIndex++;
    setNextQuestion()
})
function startGame() {
    console.log("start")
    startButton.classList.add("hide")
    questionContainer.classList.remove("hide")
    currentQuestionIndex =0;
    suffledQuestion = questions.sort(()=>Math.random()-0.5)
    setNextQuestion()
}

function setNextQuestion() {
    resetQuestions();
    showQuestions(suffledQuestion[currentQuestionIndex])
    // startButton.classList.add("hide")
}

function resetQuestions(){
    clearStatusClass(document.body)
    questionText.innerText=""
    resultArea.classList.add("hide")
    nextButton.classList.add("hide")
    while(answerAreaElements.firstChild){
        answerAreaElements.removeChild(answerAreaElements.firstChild)
    }
}

function clearStatusClass(element){
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

function showQuestions(quesion){
    questionText.innerText = quesion.question;
    quesion.answers.forEach(qs => {
        const queElement = document.createElement('button');
        queElement.innerText = qs.text;
        queElement.classList.add("btn");
        if(qs.correct){
            queElement.dataset.correct = qs.correct;
        }
        queElement.addEventListener("click",selectAnswer);
        answerAreaElements.append(queElement);
    });
}

function selectAnswer(e){
    console.log("sele")
    const selectedAnswer = e.target;
    if(selectedAnswer.dataset.correct)count++;
    setStatusClass(document.body,selectedAnswer.dataset.correct);
    Array.from(answerAreaElements.children).forEach(child=>{
        console.log(child)
        setStatusClass(child,child.dataset.correct)
    })
    if(suffledQuestion.length > currentQuestionIndex + 1){
        nextButton.classList.remove("hide")
    }else if(suffledQuestion.length == currentQuestionIndex + 1){
        submitButton.classList.remove("hide")
      // startButton.firstChild.innerText = "Submit";
        nextButton.classList.add("hide")
    }
}

function setStatusClass(element,isCorrect){
    if(isCorrect){
        element.classList.add("correct")
    }else{
        element.classList.add("wrong")
    }
}
const questions = [
  {
    question: "what is 5 * 5 ?",
    answers: [
      { text: "10", correct: false },
      { text: "50", correct: false },
      { text: "25", correct: true },
      { text: "None Of these", correct: false },
    ],
  },
  {
    question: "Capital of India ?",
    answers: [
      { text: "Kolkatta", correct: false },
      { text: "new Delhi", correct: true },
      { text: "Jaipur", correct: false },
      { text: "None Of these", correct: false },
    ],
  },
  {
    question: "Who's the India PM ?",
    answers: [
      { text: "Rahul Gandhi", correct: false },
      { text: "Narendra Modi", correct: true },
      { text: "Amit shah", correct: false },
      { text: "Yogi Adityanath", correct: false },
    ],
  },
  {
    question: "Capital Of M.P. ?",
    answers: [
      { text: "Gwalior", correct: false },
      { text: "Indore", correct: false },
      { text: "Bhopal", correct: true },
      { text: "Nagpur", correct: false },
    ],
  }
];
