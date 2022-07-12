// TODO: add game logic
// variables to keep track of quiz state
var currQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var scores = [];
//var q = 0;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var loginEl = document.getElementById("login");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

var initials;
function startQuiz() {
    while( initialsEl.value == '' ){
      feedback.setAttribute("class"," show");
      feedbackEl.textContent = 'Please enter your initials before starting';
      return;
    }
    initials = initialsEl.value;
    feedback.setAttribute("class"," hide");
    //feedbackEl.textContent = 'Please enter your initials before starting';
    //console.log('this');
    //JSON.stringify(window.localStorage.setItem("initials", initialsEl.value));
    timerEl.textContent = '';
    // hide start screen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");

    // un-hide questions section
    questionsEl.removeAttribute("class");

    if (timerId) {
      clearInterval(timerId);
    }
    // start timer
    timerId = setInterval(noteSeconds, 1000);

    // show starting time
    timerEl.textContent = time;

        //console.log(questions.length);
        //if(timerId > 0 || questions.length > 0){
        // console.log(questions);
            //clear choices
            //currQuestionIndex++;
    loginEl.style.display = 'none';
    getQ();
    //return;
 // } else {
   // quizEnd();
 // }
}
startBtn.addEventListener('click',startQuiz);

var currQuestion;
var answer;

function clearQs(){
  while (choicesEl.firstChild) {
    choicesEl.removeChild(choicesEl.firstChild);
  }
}
function getQ() {
  //console.log(window.localStorage.getItem("initials"));
  clearQs();
  var titleEl = document.getElementById("question-title");
  currQuestion = questions[currQuestionIndex];
  titleEl.textContent = currQuestion.title;
  answer = currQuestion.answer;
  //console.log(answer);
  currQuestion.choices.forEach(function(choice, i) {
        var questionOption = document.createElement('button');
        questionOption.textContent = i + 1 + ". " + choice;
        questionOption.value = choice;
        questionOption.className = "btn btn-success";
        choicesEl.appendChild(questionOption);
        questionOption.addEventListener('click',clickOnQ);
        //currentQuestionIndex = currQuestIndex;
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
/*else{
    
  if( currQuestionIndex < questions.length ){
    titleEl.textContent = '';
    feedbackEl.setAttribute('class','show');
  }*/
var score = 0;
function clickOnQ(e) {
    //console.log(currQuestionIndex);
    //currQuestionIndex++;
    // If answer is correct and there are no questions left
    if(e.target.value === answer){
      if(currQuestionIndex >= questions.length - 1){
        clearQs();
        score = score + 10;

        feedbackEl.setAttribute('class', 'show');
        feedbackEl.textContent = `Correct! Your final score is ${score}`;
        endQuiz();
        //questions.length = questions.length - 1;
        
        // If the answer is correct and there are more questions
        e.target.removeEventListener('click',clickOnQ);
      }else{
        //console.log('answer correct and still questions left');
        currQuestionIndex++;
        score = score + 10;
        feedbackEl.setAttribute('class', 'show');
        feedbackEl.textContent = `Correct! Your score is ${score}`;
        //questions.pop();
        if(currQuestionIndex < questions.length){
          getQ();
        }else{
          endQuiz();
        }
        //questions.length = questions.length - 1;
      }
    //if the answer is wrong and there are questions left
    }else if(e.target.value !== answer){
        //console.log(currQuestionIndex);
        if(currQuestionIndex < questions.length-1){
          //console.log('penalty');
          feedbackEl.setAttribute('class', 'show');
          feedbackEl.textContent = `Wrong! 10 second penalty. Your score is ${score}`;
          time = time - 10;
          //score = score - 10;
          //questions.pop();
          currQuestionIndex++;
          getQ();
        //if the answer is wrong and there are no questions left
        }else{
          clearQs();
          //score = score - 10;
          feedbackEl.setAttribute('class', 'show');
          feedbackEl.textContent = `Wrong! Your final score is ${score}`;
          e.target.removeEventListener('click',clickOnQ);
          endQuiz();
        }
    //anything else
    }else{
        console.log('end game');
    }
}
var highscores = [];

function endQuiz() {
    submitBtn.style.display = 'block';
    clearInterval(timerId);
    time = 0;
    //console.log(timerId);
    //timerEl.textContent = 'Game Over';
    //console.log('Game over');
    //questionsEl.setAttribute("class", "hide");
      // show final score
    timerEl.textContent = time;
    var newScoreObj = {
      score: score,
      initials: initials
    };
    //console.log(score, initials);
    highscores.push(newScoreObj);
    /*presentItem = 0;
    function getValue(item) {
      presentItem += item;
      console.log(presentItem += item);
    }
    highscores.forEach(getValue);*/
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    document.getElementById("question-title").textContent = "Game Over!";
    clearQs();
}
function noteSeconds() {
  //if(timerId){
    //console.log('test');
    time--;
    //console.log(time);
    //console.log(time + " 2");
    timerEl.textContent = time;
  //} else {
    // check if user ran out of time
    if (time <= 0) {
      feedbackEl.textContent = 'Times up! Game Over!';
      timerEl.textContent = 0;
      endQuiz();
    }
  //}
}

function saveHighscore() {
      // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  //if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    //var highscores =
      //JSON.parse(window.localStorage.getItem("highscores")) || [];

   /* // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);*/
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscores.html";
  //}
}

//getStoredValues();
function checkForEnter(event) {
}

// user clicks button to submit initials
submitBtn.style.display = 'none';
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;

/*function getStoredValues(){
  console.log(window.localStorage.getItem("highscores"));
  //console.log(window.localStorage.getItem("initials"));
  //console.log(window.localStorage.getItem("score"));
}*/
