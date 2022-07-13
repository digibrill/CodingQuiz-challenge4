// variables to keep track of quiz state
var currQuestionIndex = 0;
var time = questions.length * 15;
var timerId;
var highscores = [];
var initials;
var currQuestion;
var answer;
var score = 0;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var loginEl = document.getElementById("login");
var startScreenEl = document.getElementById("start-screen");

// sound effects not in use
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

//start quiz from button
function startQuiz() {

    //initials should be filled in before start
    while( initialsEl.value == '' ){
      feedback.setAttribute("class"," show");
      feedbackEl.textContent = 'Please enter your initials before starting';
      return;
    }
    
    //grab initials
    initials = initialsEl.value;
    
    //set initial timer
    timerEl.textContent = '';
  
    // un-hide questions section
    questionsEl.removeAttribute("class");

    // clear existing interval
    if (timerId) {
      clearInterval(timerId);
    }
    // start timer
    timerId = setInterval(noteSeconds, 1000);

    // show starting time
    timerEl.textContent = time;

    //hide login screen
    loginEl.style.display = 'none';
    
    // get first question
    getQ();
}

// start button
startBtn.addEventListener('click',startQuiz);

// clear all buttons
function clearQs(){
  while (choicesEl.firstChild) {
    choicesEl.removeChild(choicesEl.firstChild);
  }
}

// get question
function getQ() {
  clearQs();
  var titleEl = document.getElementById("question-title");
  currQuestion = questions[currQuestionIndex];
  titleEl.textContent = currQuestion.title;
  answer = currQuestion.answer;
  currQuestion.choices.forEach(function(choice, i) {
        var questionOption = document.createElement('button');
        questionOption.textContent = i + 1 + ". " + choice;
        questionOption.value = choice;
        questionOption.className = "btn btn-success";
        choicesEl.appendChild(questionOption);
        questionOption.addEventListener('click',clickOnQ);
  });
}

// answer, i.e. click on question button
function clickOnQ(e) {

    // if answer is correct and no questions are left
    if(e.target.value === answer){
      sfxRight.play();
      if(currQuestionIndex >= questions.length - 1){
        clearQs();
        score = score + 10;

        feedbackEl.setAttribute('class', 'show');
        feedbackEl.textContent = `Correct! Your final score is ${score}`;
        endQuiz();

      }else{

        // If the answer is correct and there are more questions
        currQuestionIndex++;
        score = score + 10;
        feedbackEl.setAttribute('class', 'show');
        feedbackEl.textContent = `Correct! Your score is ${score}`;
        if(currQuestionIndex < questions.length){
          getQ();
        }else{
          endQuiz();
        }
      }

    //if the answer is wrong and there are questions left
    }else if(e.target.value !== answer){
        sfxWrong.play();
        if(currQuestionIndex < questions.length-1){

          feedbackEl.setAttribute('class', 'show');
          feedbackEl.textContent = `Wrong! 10 second penalty. Your score is ${score}`;
          time = time - 10;
          currQuestionIndex++;
          getQ();

        //if the answer is wrong and there are no questions left
        }else{
          clearQs();
          feedbackEl.setAttribute('class', 'show');
          feedbackEl.textContent = `Wrong! Your final score is ${score}`;
          e.target.removeEventListener('click',clickOnQ);
          endQuiz();
        }

    //anything else
    }else{
        console.log('Game end due to foul weather');
    }
}

//end quiz, wrap it up
function endQuiz() {
    submitBtn.style.display = 'block';
    clearInterval(timerId);
    time = 0;
    
    // show final score
    timerEl.textContent = time;

    // get value of input box
    initials = initialsEl.value.trim();

    // save current score and initials
    var newScoreObj = {
      score: score,
      initials: initials
    };

    // get saved scores from localstorage, or if not any, set to empty array
    highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    
    // push scores to highscores array
    highscores.push(newScoreObj);

    // finishing message
    document.getElementById("question-title").textContent = "Game Over!";

    clearQs();
}

// decrement time, end quiz if time up
function noteSeconds() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      feedbackEl.textContent = 'Times up! Game Over!';
      timerEl.textContent = 0;
      endQuiz();
    }
}


function saveHighscore() {

    // save to localstorage
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscores.html";

}

// user clicks button to submit initials
submitBtn.style.display = 'none';
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

