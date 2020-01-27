

/*-----------------selecting all DOM Elements-----------------------*/
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var heading = document.getElementById("heading");
var para = document.getElementById("para");
var question = document.getElementById("question");
var submitButton = document.getElementById("btn");
var textBox = document.getElementById("textArea");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var scoreDiv = document.getElementById("scoreContainer");





/*-----------------Creating our Questions Array object-----------------------*/
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
        choiceC : "JQuery Styling sheet",
        correct : "B"
    },{
        question : "What does JS stand for?",
        choiceA : "JQuery Script",
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
        question : "What does CDN stand for?",
        choiceA : "JQuery Delivery Newtwork",
        choiceB : "Java Enterprise Application",
        choiceC : "Content Delivery Network",
        correct : "C"
    }
];

/*-----------------Creating variables-----------------------*/

var lastQuestion = questions.length - 1;
var runningQuestion = 0;
var count = 75;
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

/*-----------------Fuction that will start the quizz and will display the desireable section to the user-----------------------*/
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    heading.style.display = "none";
    para.style.display = "none";
    quiz.style.display = "block";
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

/*-----------------Fuction that will update the count and guage unit based on answers-----------------------*/

function renderCounter(){
        if(count >= 0){
            counter.innerHTML = count;
            timeGauge.style.width = count * gaugeUnit + "px";
            count--;
       }
       else{
        quiz.style.display = "none";
        scoreDiv.style.display = "block";
        scoreDiv.innerHTML = "Your Final Score is " + score;
        textBox.style.display = "block";
        span.style.display = "block";
        submitButton.style.display = "block";

        if(runningQuestion < lastQuestion){
            runningQuestion++;
        }
        else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
  }

/*-----------------Checking user selected answer-----------------------*/

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        console.log(score);
        answerIsCorrect();
    }else{
        // answer is wrong
        count = count - 10;
        answerIsWrong();
    }
    /*-----------------Rendering questions-----------------------*/
    if(runningQuestion < lastQuestion){
        setTimeout(function(){
            runningQuestion++;  
            renderQuestion();
        },1000);
        
    }
    else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
  }

/*-----------------Based on correct answer displaying message-----------------------*/
    function answerIsCorrect(){
        var element = document.getElementById("correct");
        element.style.display = "block";
        setTimeout(function(){
            element.style.display = "none";
        }, 1000);
        

    }

/*-----------------Based on incorrect answer displaying message-----------------------*/
    function answerIsWrong(){

        var element = document.getElementById("incorrect");
        element.style.display = "block";
        setTimeout(function(){
            element.style.display = "none";
        }, 1000);
    }

   /*-----------------Displaying the total score-----------------------*/
    let todo = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
    function scoreRender(){
        setTimeout(function() {
        quiz.style.display = "none";
        scoreDiv.style.display = "block";
        scoreDiv.innerHTML = " your score is " + score ;
        textBox.style.display = "block";
        span.style.display = "block";
        submitButton.style.display = "block";
        },1000)
        
    
    }
/*-----------------Function that stores score and username to local storage-----------------------*/
        function passValue(){
        var todotext = textBox.value.trim();
        if(todotext === ""){
        return;
        }
        todo.push(todotext);
        localStorage.setItem("todo" , JSON.stringify(todo));

        var scoretext = scoreDiv.textContent;
        if(scoretext === ""){
        return;
        }
        todo.push(scoretext);
        localStorage.setItem("todo", JSON.stringify(todo));
        
        }

    
            
            
        
        
       
        
      
        
    