// select all elements
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var heading = document.getElementById("heading");
var para = document.getElementById("para");
var question = document.getElementById("question");
var span = document.getElementById("span");
var submitButton = document.getElementById("btn");
var textBox = document.getElementById("textArea");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");
var todDiv = document.getElementById("todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

// create our questions
var questions = [
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

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 75;
//var quizTime ; // 10s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / count;
var TIMER;
var score = 0;

// render a question
function renderQuestion(){

    var q = questions[runningQuestion];
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
var todos=[];
var todo = [];
function scoreRender(){
    quiz.style.display = "none";
    scoreDiv.style.display = "block";
    scoreDiv.innerHTML = "Your Final Score is " + score;
    textBox.style.display = "block";
    span.style.display = "block";
    submitButton.style.display = "block";
    //localStorage.setItem("finalScore", JSON.stringify(score));
   
}

// function passValue(){
//     var name = textBox.value.trim();
    
//     //var score = scoreDiv.value;
//     //localStorage.setItem("finalScore", score);
//     localStorage.setItem("textValue", JSON.stringify (name));
//     return false;
   
// }
function renderTodos(){

var length = todos.length;
todoCountSpan.textContent = length;

todoList.innerHTML = "";

for (var i =0; i<length; i++){
  var li = document.createElement("li");
  li.textContent = todos[i];
  li.setAttribute("data-index", i);
  var button = document.createElement("button");
  button.textContent = "Complete";
  li.appendChild(button);
  todoList.appendChild(li);
}}

function passValue(){
var todotext = textBox.value;
if(todotext === ""){
  return;
}
todos.push(todotext);
localStorage.setItem("todos", JSON.stringify(todos));
todoInput.value = "";

var scoretext = scoreDiv.value;
if(scoretext === ""){
  return;
}
todo.push(scoretext);
localStorage.setItem("todo", JSON.stringify("todo"));
todoInput.value = "";
renderTodos();
}
