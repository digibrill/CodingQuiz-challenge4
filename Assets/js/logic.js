// TODO: add game logic
// variables to keep track of quiz state
var currQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
//var q = 0;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
    if(initialsEl.value !== ''){
        JSON.stringify(window.localStorage.setItem("initials", initialsEl.value));
        timerEl.textContent = '';
        // hide start screen
        var startScreenEl = document.getElementById("start-screen");
        startScreenEl.setAttribute("class", "hide");

        // un-hide questions section
        questionsEl.removeAttribute("class");

        // start timer
        timerId = setInterval(clockTick, 1000);

        // show starting time
        timerEl.textContent = time;

        //console.log(questions.length);
        //if(timerId > 0 || questions.length > 0){
        // console.log(questions);
            //clear choices
            //currQuestionIndex++;
            getQ(currQuestionIndex);
    }else{
        timerEl.textContent = 'Please enter your initials before starting';
        startQuiz();
    }
    //return;
 // } else {
   // quizEnd();
 // }
}
startBtn.addEventListener('click',startQuiz);
var currQuestion;
var answer;
function getQ(currQuestIndex) {
    while (choicesEl.firstChild) {
        choicesEl.removeChild(choicesEl.firstChild);
    }
    var titleEl = document.getElementById("question-title");
    currQuestion = questions[currQuestIndex];
    titleEl.textContent = currQuestion.title;
    answer = currQuestion.answer;
    //console.log(answer);
    currQuestion.choices.forEach(function(choice, i) {
        var myNewOption = document.createElement('button');
        myNewOption.textContent = i + 1 + ". " + choice;
        myNewOption.value = choice;
        choicesEl.appendChild(myNewOption);
        myNewOption.addEventListener('click',questionClick);
        currentQuestionIndex = currQuestIndex;
        //console.log(this.textContent);
    });
    //questions.length = questions.length - 1;
    /**
    var questions = [
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
    */
    
}
var score = 0;
function questionClick(e) {
    //console.log(e.target.value);
    if(e.target.value === answer && questions.length <= 0){
        score = score + 10;
        console.log('Correct! Play again!');
        feedbackEl.textContent = `Game Over! Your final score is ${score}`;
        clearInterval(timerId);
        endQuiz();
    }else if(e.target.value === answer){
        score = score + 10;
        //console.log('Correct!');
        feedbackEl.textContent = `Correct! Score so far: ${score}`;
        getQ(currentQuestionIndex + 1);
    }else if(e.target.value !== answer && questions.length > 0){
        console.log('Wrong! 10 second penalty.');
        time = time - 10;
        getQ(currentQuestionIndex + 1);
    }else if(e.target.value !== answer && questions.length <= 0){
        console.log('Wrong!');
        feedbackEl.textContent = 'Game Over!';
        clearInterval(timerId);
        endQuiz();
    }else{
        console.log('end game');
    }
}

function endQuiz() {
    //time = 0;
    clearInterval(timerId);
    timerEl.textContent = 'Game Over';
    //console.log('Game over');
    JSON.stringify(window.localStorage.setItem("score", initialsEl.value));
}

function clockTick() {
  time--;
  timerEl.textContent = time;
  
  // check if user ran out of time
  if (time <= 0) {
    endQuiz();
    time = 0;
    feedbackEl.textContent = 'Time up! Game Over!';
  }
}

function saveHighscore() {
      // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;

