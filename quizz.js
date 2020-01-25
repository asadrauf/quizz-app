// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const heading = document.getElementById("heading");
const para = document.getElementById("para");
const question = document.getElementById("question");
const span = document.getElementById("span");
const submitButton = document.getElementById("btn");
const textBox = document.getElementById("textArea");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const todDiv = document.getElementById("todo-form");
var todoCountSpan = document.querySelector("#todo-count");
var scoreList = document.querySelector("#todo-list");

// create our questions
let questions = [
    {
        question : "What does HTML stand for?",
        choiceA : "Hyper Text Markup Language",
        choiceB : "Sql Server",
        choiceC : "MySQL",
        correct : "A"
    },{
        question : "What does CSS stand for?",
        choiceA : "Common Script Source",
        choiceB : "Cascading Style Sheets",
        choiceC : "JQuery",
        correct : "B"
    },{
        question : "What does JS stand for?",
        choiceA : "JQuery",
        choiceB : "Java Enterprise Application",
        choiceC : "Java Script",
        correct : "C"
    },{
        question : "What is the type of Div element?",
        choiceA : "Block Element",
        choiceB : "Inline Element",
        choiceC : "Java Script",
        correct : "A"
    },{
        question : "What does JS stand for?",
        choiceA : "JQuery",
        choiceB : "Java Enterprise Application",
        choiceC : "Java Script",
        correct : "C"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 75;
//var quizTime ; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / count;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){

    let q = questions[runningQuestion];
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    heading.style.display = "none";
    para.style.display = "none";
    quiz.style.display = "block";
    //renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// counter render

function renderCounter(){
    if(count >= 0){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count--;
    }else{
        // change progress color to red
        answerIsWrong();
        count = count -10;
        if(runningQuestion < lastQuestion){
            answerIsCorrect()
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        
        score++;
        console.log(score);
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        count = count - 10;
        answerIsWrong();
    }
    //count = 0;
    if(runningQuestion < lastQuestion){
        setTimeout(function(){
            runningQuestion++;  
            renderQuestion();
        },1000);
        //runningQuestion++;
       // renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    //document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
    var element = document.getElementById("correct");
    element.style.display = "block";
    setTimeout(function(){
        element.style.display = "none";
    }, 1000);
       

}

// answer is Wrong
function answerIsWrong(){
    //document.getElementById(runningQuestion).style.backgroundColor = "#f00";
    var element = document.getElementById("incorrect");
    element.style.display = "block";
    setTimeout(function(){
        element.style.display = "none";
    }, 1000);
}

//score render
function scoreRender(){
    quiz.style.display = "none";
    scoreDiv.style.display = "block";
    scoreDiv.innerHTML = "Your Final Score is " + score;
    textBox.style.display = "block";
    span.style.display = "block";
    submitButton.style.display = "block";
    localStorage.setItem("finalScore", score);
  
}

function passValue(){
    var name = textBox.value.trim();
    if(name === ""){
        return;
    }
   // var score = scoreDiv.value;
    //localStorage.setItem("finalScore", score);
    localStorage.setItem("textValue", name);
    return false;
   
}

