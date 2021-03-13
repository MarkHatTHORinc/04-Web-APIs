// Global Variables
var body = document.body;
var h1Element = document.createElement("h1");
var subtractWrongAnswer = 5;
var subtractWrongAnswerWord = subtractWrongAnswer;
let numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
var questNumb = 0;
var quizStartTime = 75;
var quizTime = quizStartTime;
var audioRight = "./assets/sounds/tada.wav";
var audioWrong = "./assets/sounds/Error.wav";
var correct = true;
var playerCount = 0;

let questions = [
  {
    question: "Commonly used data types DO NOT Include",
    correct: "alerts",
    values: ["strings", "booleans", "alerts", "functions"]
  },
  {
    question: "The condition in an if / else statement is enclosed within _____.",
    correct: "parenthesis",
    values: ["quotes", "curly brackets", "parenthesis", "square brackets"]
  },
  {
    question: "Arrays in JavaScript can be used to store",
    correct: "all of the above",
    values: ["numbers and strings", "other arrays", "booleans", "all of the above"]
  },
  {
    question: "String values must be enclosed within ______ when being assigned to variables",
    correct: "quotes",
    values: ["commas", "curly brackets", "quotes", "parentheses"]
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    correct: "console.log",
    values: ["JavaScript", "terminal/bash", "for loops", "console.log"]
  }
]
// var highScore = {
//   initials: " ",
//   score: "0",
//   date: "",
//   time: "" 
// };
const topRowElement = document.createElement("section");
const topRowLeftDivElement = document.createElement("div");
const topRowRightDivElement = document.createElement("div");
// var cardElement = document.createElement("section");
var footerText = null;

// Mainline Code
h1Element.setAttribute("class", "question");
topRowElement.setAttribute("class", "topRowFlexContainer");
topRowLeftDivElement.setAttribute("class", "topRowLeft");
topRowRightDivElement.setAttribute("class", "topRowRight");

// do {
// Do Not display first page if already done
// if (!clickedStartPage) {
  // If secconds to subtract < = elments in the numberWords array get the word to display in text later.
  if (subtractWrongAnswer <= numberWords.length) {
    subtractWrongAnswerWord = numberWords[subtractWrongAnswerWord];
  }

  // Top row with link and timer should be displayed on every page except for the high scores page
  topRowElement.setAttribute("id", "topRow");
  topRowLeftDivElement.textContent = "View High Scores";
  // topRowLeftDivElement.setAttribute("class", "topRowLeft");
  // topRowRightDivElement.setAttribute("class", "topRowRight");
  topRowRightDivElement.setAttribute("id", "timeLeft");
  
  body.append(topRowElement);
  topRowElement.append(topRowLeftDivElement);
  topRowElement.append(topRowRightDivElement);
  displayStartPage();
// }
// wantsMore = false;
// } while (wantsMore)

function quizTimer() {
  quizTime--;
  topRowRightDivElement.textContent = `Time: ${quizTime}`;

  if (quizTime < 1) {
    window.clearInterval(update);
    displayAllDone();
  }
}

// Start Page
function displayStartPage() {
  console.log("displayStartPage called...");
  var previousPage = document.getElementById("card");
  if (previousPage){
  previousPage.remove();
  console.log("removed previous page...");
  }
  footerText = null;
  quizTime = quizStartTime;
  questNumb = 0;
  topRowRightDivElement.textContent = `Time: ${quizTime}`;
  const cardElement = document.createElement("section");
  const cardBodyElement = document.createElement("p");
  const cardFooterElement = document.createElement("div");
  const startButton = document.createElement("button");
  cardElement.setAttribute("class", "card");
  cardElement.setAttribute("id", "card");
  cardBodyElement.setAttribute("id", "card-body");
  cardBodyElement.setAttribute("class", "card-body");
  cardFooterElement.setAttribute("class", "card-footer");
  startButton.setAttribute("id", "start");
  startButton.setAttribute("class", "btn");
  h1Element.textContent = "Coding Quiz Challenge";
  cardBodyElement.textContent = `Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ${subtractWrongAnswerWord} seconds!`;
  startButton.textContent = "Start Quiz";
  body.append(h1Element);
  body.append(cardElement);
  cardElement.append(cardBodyElement);
  cardElement.append(cardFooterElement);
  cardFooterElement.append(startButton);
  var startBtn = document.querySelector("#start");
  startBtn.addEventListener("click", startQuiz);
  return;
}

// Start Quiz
function startQuiz() {
  var timeEl = document.querySelector(".time");
  questNumb = 0;
  clickedStartPage = true;
  console.log("Start Button Clicked.")

  update = setInterval("quizTimer()", 1000);
  displayQuestions();

  return;
}

// Questions
function displayQuestions() {
  console.log("displayQuestions called...");
  console.log("working on question: " + questNumb);
  var previousPage = document.getElementById("card");
  previousPage.remove();
  console.log("removed previous page...");
  const cardElement = document.createElement("section");
  const cardBodyElement = document.createElement("div");
  const buttonsUlElement = document.createElement("ul");

  var cardFooterElement = document.createElement("div");

  cardElement.setAttribute("class", "card");
  cardElement.setAttribute("id", "card");
  cardBodyElement.setAttribute("class", "card-body");
  cardBodyElement.setAttribute("id", "answers");
  if (correct) {
    cardFooterElement.setAttribute("class", "card-answer-correct");
  } else {
    cardFooterElement.setAttribute("class", "card-answer-wrong");
  }
  h1Element.textContent = questions[questNumb].question;
  body.append(h1Element);
  body.append(cardElement);
  cardElement.append(cardBodyElement);
  cardBodyElement.append(buttonsUlElement);
  // Loop through the answers and put them in a button
  let i = 0;
  questions[questNumb].values.forEach(answer => {
    const buttonsLiElement = document.createElement("li");
    var button = document.createElement("button");
    button.setAttribute("id", "btn_" + answer);
    button.setAttribute("data-value", answer);
    button.setAttribute("class", "btn");
    button.textContent = `${i + 1}. ${answer}`;
    buttonsLiElement.appendChild(button);
    buttonsUlElement.appendChild(buttonsLiElement);
    i++;
  }
  )
  cardBodyElement.appendChild(buttonsUlElement);
  cardElement.append(cardFooterElement);
  cardFooterElement.textContent = footerText;

  var answers = document.querySelector("#answers");
  answers.addEventListener("click", checkAnswer);
  return;
}

// Check Answer
function checkAnswer(event) {
  var element = event.target;

  if (element.matches("button")) {
    var answer = element.getAttribute("data-value");

    console.log("Button Clicked = " + answer + ".");

    if (answer !== questions[questNumb].correct) {
      // wrong answer
      console.log("Wrong Answer");
      new Audio(audioWrong).play();
      quizTime -= subtractWrongAnswer;
      topRowRightDivElement.textContent = `Time: ${quizTime}`;
      footerText = `Wrong: ${questions[questNumb].question} ${questions[questNumb].correct}`;
      correct = false;
    } else {
      console.log("Right Answer");
      new Audio(audioRight).play();
      footerText = "Correct!!!";
      correct = true;
    }
    questNumb++;
    if (questNumb < questions.length) {
      displayQuestions();
    } else {
      displayAllDone();
    }
    return;
  }
}

// All Done
function displayAllDone() {
  // Stop the timer
  window.clearInterval(update);
  console.log("displayAllDone called...");
  console.log(`score is: ${quizTime}`);
  var previousPage = document.getElementById("card");
  previousPage.remove();
  console.log("removed previous page...");
  const cardElement = document.createElement("section");
  const cardBodyElement = document.createElement("div");
  const scoreElement = document.createElement("div");
  const initialsElement = document.createElement("div");
  const initsTextElement = document.createElement("div");
  const initsInputElement = document.createElement("input");
  const button = document.createElement("button");
  var cardFooterElement = document.createElement("div");
  // var cardFooterElement = document.createElement("div");

  if (correct) {
    cardFooterElement.setAttribute("class", "card-answer-correct");
  } else {
    cardFooterElement.setAttribute("class", "card-answer-wrong");
  }
  cardElement.setAttribute("class", "card");
  cardElement.setAttribute("id", "card");
  cardBodyElement.setAttribute("class", "card-body");
  // cardBodyElement.setAttribute("id", "results");
  // cardFooterElement.setAttribute("class", "card-footer");
  h1Element.textContent = 'All done!';
  scoreElement.textContent = `Your final score is ${quizTime}.`;
  initialsElement.setAttribute("class", "inlineFlexContainer");
  initsTextElement.textContent ="Enter Initials:";
  initsTextElement.setAttribute("class", "initsLeft");
  initsInputElement.setAttribute("type", "text");
  initsInputElement.setAttribute("id", "inits");
  initsInputElement.setAttribute("minlength", "1");
  initsInputElement.setAttribute("minlength", "8");
  initsInputElement.setAttribute("size", "8");
  initsInputElement.setAttribute("placeholder", "initials");
  initsInputElement.setAttribute("class", "initsCenter");
  // initsInputElement.setAttribute("onkeyup", "this.value.toUpperCase();");
  button.textContent = "Submit";
  button.setAttribute("class", "btn");
  // button.setAttribute("class", "initsRight");
  button.setAttribute("id", "submit");
  body.append(h1Element);
  body.append(cardElement);
  cardElement.append(cardBodyElement);
  cardBodyElement.append(scoreElement);
  initialsElement.append(initsTextElement);
  initialsElement.append(initsInputElement);
  initialsElement.append(button);
  cardBodyElement.append(initialsElement);
  cardElement.append(cardFooterElement);
  cardFooterElement.textContent = footerText;

  var submit = document.querySelector("#submit");
  submit.addEventListener("click", checkAllDone);

  return;
}

// Check All Done
function checkAllDone(event) {
  console.log("checkAllDone called...");
  var element = event.target;
  var initialsInput = document.getElementById("inits");
  var initials = initialsInput.value.toUpperCase().trim();
  
  if (!initials || initials.length === 0) {
    footerText = `Please provide your initials for the high score board.`;
    correct = false;
    displayAllDone();
  } else {
  console.log(`initials are: ${initials}`);

  var rightNow = new Date();
  dateString = rightNow.toDateString();
  var timeNow = rightNow.getHours();
  console.log(`hours: ${timeNow}`);
  var minutesNow = rightNow.getMinutes();
  console.log(`minutes:  ${minutesNow}`);
  if(minutesNow < 10){
    timeNow += ':0' + minutesNow;
  } else {
    timeNow += ':' + minutesNow;
  }
  playerCount++;
  var highScore = `${initials} Scored: ${quizTime} on ${dateString} at ${timeNow}`;
  localStorage.setItem("highscore-" + initials, highScore);
  displayHighScores();  
}
  
  return;
}

// High Scores
function displayHighScores() {
  console.log("displayHighScores called...");
  var previousPage = document.getElementById("card");
  previousPage.remove();
  console.log("removed previous page...");
  const cardElement = document.createElement("section");
  const cardBodyElement = document.createElement("div");
  

  const buttons = document.createElement("div")
  const goBackButton = document.createElement("button");
  const clearButton = document.createElement("button");
  const cardFooterElement = document.createElement("div");
  cardElement.setAttribute("class", "card");
  cardElement.setAttribute("id", "card");
  cardBodyElement.setAttribute("class", "card-body");
  h1Element.textContent = 'High Scores';
  cardFooterElement.setAttribute("class", "card-footer");
  buttons.setAttribute("class", "inlineFlexContainer");
  goBackButton.textContent = "Go Back";
  goBackButton.setAttribute("class", "btn");
  goBackButton.setAttribute("id", "goBack");
  clearButton.textContent = "Clear Highscores";
  clearButton.setAttribute("class", "btn");
  clearButton.setAttribute("id", "clearHs");

  body.append(h1Element);
  body.append(cardElement);
  cardElement.append(cardBodyElement);

  var odd = true;
  var highScoreText = "";
for (let i = 0; i < playerCount; i++){
  const key = localStorage.key(i);
  const highScoreText = localStorage.getItem(key);
  console.log(highScoreText);
  const scoreElement = document.createElement("div");
  if (odd){
    scoreElement.setAttribute("class", "score-odd");
  } else {
    scoreElement.setAttribute("class", "score-even");
  }
  
  odd = !odd;
  scoreElement.textContent = highScoreText;
  cardBodyElement.appendChild(scoreElement);
  console.log("Set scoreElement #:" + i);
}
  cardElement.append(cardFooterElement);
  cardFooterElement.append(buttons);
  buttons.append(goBackButton);
  buttons.append(clearButton);

  var goBack = document.querySelector("#goBack");
  goBack.addEventListener("click", displayStartPage);
  return;
}
