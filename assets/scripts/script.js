// Global Variables
var body = document.body;
var h1Element = document.createElement("h1");
var subtractWrongAnswer = 5;  // change this value to subtract a different amount for wrong answers
// get the wording for amount of seconds to subtract for wrong answer. Default to number in case it isn't in our array
var subtractWrongAnswerWord = subtractWrongAnswer;
let numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
var questNumb = 0;
var quizStartTime = 75;  // change this value to have a different amount of seconds to start
var quizTime = quizStartTime;
var audioRight = "./assets/sounds/tada.wav";  // played for correct answer
var audioWrong = "./assets/sounds/Error.wav";  // played for wrong answer
var correct = true;
var playerCount = 0;
// questions and associated answer choices are stored in array of objects to make this dynamic and allow for reusable functions
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

const topRowElement = document.createElement("section");
const topRowLeftDivElement = document.createElement("div");
const linkElement = document.createElement("a");
const topRowRightDivElement = document.createElement("div");
var footerText = null;

// This function runs the timer
function quizTimer() {
  quizTime--;
  topRowRightDivElement.textContent = `Time: ${quizTime}`;

  if (quizTime < 1) { // if time has run out display the all done page
    window.clearInterval(update); // stop the timer
    displayAllDone();
  }
}

// Display the Start Page
function displayStartPage() {
  // remove previous page if there was one
  var previousPage = document.getElementById("card");
  if (previousPage) {  // only try to remove if there was a previous page
    previousPage.remove();
  }
  // initialize variables for start of quiz
  footerText = null;
  quizTime = quizStartTime;
  questNumb = 0;
  topRowRightDivElement.textContent = `Time: ${quizTime}`;
  // build html elements needed for this page
  const cardElement = document.createElement("section");
  const cardBodyElement = document.createElement("p");
  const cardFooterElement = document.createElement("div");
  const startButton = document.createElement("button");
  // set the attributes to the html elements
  cardElement.setAttribute("class", "card");
  cardElement.setAttribute("id", "card");
  cardBodyElement.setAttribute("id", "card-body");
  cardBodyElement.setAttribute("class", "card-body");
  cardFooterElement.setAttribute("class", "card-footer");
  startButton.setAttribute("id", "start");
  startButton.setAttribute("class", "btn");
  h1Element.textContent = "Coding Quiz Challenge";
  // substitute in the word value for the number of seconds to subtract for wrong answer
  cardBodyElement.textContent = `Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ${subtractWrongAnswerWord} seconds!`;
  startButton.textContent = "Start Quiz";
  // add the html elements to the document
  body.append(h1Element);
  body.append(cardElement);
  cardElement.append(cardBodyElement);
  cardElement.append(cardFooterElement);
  cardFooterElement.append(startButton);
  // Monitor for when the user clicks the start button
  var startBtn = document.querySelector("#start");
  startBtn.addEventListener("click", startQuiz);
  return;
}

// Start Quiz
function startQuiz() {
  var timeEl = document.querySelector(".time");
  questNumb = 0;  // set the question number to the first one
  clickedStartPage = true;
  // start the timer
  update = setInterval("quizTimer()", 1000); // timer will decrement 1 second at a time
  displayQuestions();

  return;
}

// Display Current Question with asssociated choices of answers
function displayQuestions() {
  // remove the previous page that was displayed
  var previousPage = document.getElementById("card");
  previousPage.remove();
  // create html elements needed to display this page
  const cardElement = document.createElement("section");
  const cardBodyElement = document.createElement("div");
  const buttonsUlElement = document.createElement("ul");
  var cardFooterElement = document.createElement("div");
  // set attributes to html elements
  cardElement.setAttribute("class", "card");
  cardElement.setAttribute("id", "card");
  cardBodyElement.setAttribute("class", "card-body");
  cardBodyElement.setAttribute("id", "answers");
  // Set the appropriate style for the previous question/answer displayed in the footer
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
  // add the html elements to the document
  cardBodyElement.appendChild(buttonsUlElement);
  cardElement.append(cardFooterElement);
  cardFooterElement.textContent = footerText;
  // Monitor for user to click on one of the answer buttons
  var answers = document.querySelector("#answers");
  answers.addEventListener("click", checkAnswer);
  return;
}

// Check Answer entered
function checkAnswer(event) {
  var element = event.target;

  if (element.matches("button")) {
    var answer = element.getAttribute("data-value");  // retrieve the answer the user selected
    if (answer !== questions[questNumb].correct) {
      // wrong answer
      new Audio(audioWrong).play();  // play the error sound for wrong answer
      quizTime -= subtractWrongAnswer;  // deduct time from the score
      topRowRightDivElement.textContent = `Time: ${quizTime}`; // update the remaining time
      footerText = `Wrong: ${questions[questNumb].question} ${questions[questNumb].correct}`; // show what answer is
      correct = false; // this will cause coloring of message in footer
    } else {
      // write answer
      new Audio(audioRight).play();  // play the tada sound for right answer
      footerText = "Correct!!!";  // Display that the user got the question correct
      correct = true;  // this will cause coloring of message in footer
    }
    // See if there is another question to process
    questNumb++;
    if (questNumb < questions.length) {
      displayQuestions();
    } else { // no more questions so display the All Done page
      displayAllDone();
    }
    return;
  }
}

// Display the All Done page
function displayAllDone() {
  // Stop the timer
  window.clearInterval(update);
  // remove the previous page that was displayed
  var previousPage = document.getElementById("card");
  previousPage.remove();
  // create html elments needed to display this page
  const cardElement = document.createElement("section");
  const cardBodyElement = document.createElement("div");
  const scoreElement = document.createElement("div");
  const initialsElement = document.createElement("div");
  const initsTextElement = document.createElement("div");
  const initsInputElement = document.createElement("input");
  const button = document.createElement("button");
  var cardFooterElement = document.createElement("div");
  // set attributes of elements
  if (correct) {
    cardFooterElement.setAttribute("class", "card-answer-correct");
  } else {
    cardFooterElement.setAttribute("class", "card-answer-wrong");
  }
  cardElement.setAttribute("class", "card");
  cardElement.setAttribute("id", "card");
  cardBodyElement.setAttribute("class", "card-body");
  h1Element.textContent = 'All done!';
  scoreElement.textContent = `Your final score is ${quizTime}.`;
  initialsElement.setAttribute("class", "inlineFlexContainer");
  initsTextElement.textContent = "Enter Initials:";
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
  button.setAttribute("id", "submit");
  body.append(h1Element);
  body.append(cardElement);
  // add the html elements to the document
  cardElement.append(cardBodyElement);
  cardBodyElement.append(scoreElement);
  initialsElement.append(initsTextElement);
  initialsElement.append(initsInputElement);
  initialsElement.append(button);
  cardBodyElement.append(initialsElement);
  cardElement.append(cardFooterElement);
  cardFooterElement.textContent = footerText;
  // Monitor for user to click on Submit Button  
  var submit = document.querySelector("#submit");
  submit.addEventListener("click", checkAllDone);

  return;
}

// Check All Done - make sure required input was supplied
function checkAllDone(event) {
  var element = event.target;
  var initialsInput = document.getElementById("inits");
  // Make initials uppercase for consistency and trim any leading / trailing blanks
  var initials = initialsInput.value.toUpperCase().trim();

  if (!initials || initials.length === 0) {
    footerText = `Please provide your initials for the high score board.`;
    correct = false;
    displayAllDone();  // redisplay page to get required input
  } else {
    // Get the completion time of this quiz
    var rightNow = new Date();
    dateString = rightNow.toDateString();
    var timeNow = rightNow.getHours();
    var minutesNow = rightNow.getMinutes();
    // format minutes since leading zeros need to be presented
    if (minutesNow < 10) {
      timeNow += ':0' + minutesNow;
    } else {
      timeNow += ':' + minutesNow;
    }
    playerCount++;  // keep track of number of times played in this session
    // Store the score info in local storage
    var highScore = `${initials} Scored: ${quizTime} on ${dateString} at ${timeNow}`;
    localStorage.setItem("highscore-" + initials, highScore);
    displayHighScores();
  }

  return;
}

// Build and display High Scores
function displayHighScores() {
  // remove the previous page that was displayed
  var previousPage = document.getElementById("card");
  previousPage.remove();
  // create html elements need to display this page
  const cardElement = document.createElement("section");
  const cardBodyElement = document.createElement("div");
  const buttons = document.createElement("div")
  const goBackButton = document.createElement("button");
  const clearButton = document.createElement("button");
  const cardFooterElement = document.createElement("div");
  //set the attributes for elements on this page
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
  // add the html elements to the document
  body.append(h1Element);
  body.append(cardElement);
  cardElement.append(cardBodyElement);

  var odd = true;
  var highScoreText = "";
  // iterate through the stored high scores
  for (let i = 0; i < playerCount; i++) {
    const key = localStorage.key(i);
    const highScoreText = localStorage.getItem(key);
    // Create the div section for high score record
    const scoreElement = document.createElement("div");
    if (odd) {
      scoreElement.setAttribute("class", "score-odd");
    } else {
      scoreElement.setAttribute("class", "score-even");
    }

    odd = !odd;  // cause background color to alternate
    scoreElement.textContent = highScoreText;
    cardBodyElement.appendChild(scoreElement);
  }
  // Put the Go Back & Clear High Scores Button in the footer section
  cardElement.append(cardFooterElement);
  cardFooterElement.append(buttons);
  buttons.append(goBackButton);
  buttons.append(clearButton);

  // Monitor for user to click on Go Back Button
  var goBack = document.querySelector("#goBack");
  goBack.addEventListener("click", sendBack);
  // Monitor for user to click on Clear High Scores Button
  var goBack = document.querySelector("#clearHs");
  clearHs.addEventListener("click", clearHighScores);
  return;
}

// Clear High Scores
function clearHighScores() {
  localStorage.clear();
  playerCount = 0;
  displayHighScores();  // redisplay the high score page which won't haave any high scores
  return;
}

// Send back to right page
function sendBack() {
  if (questNumb < questions.length &&
      quizTime !== quizStartTime) {
    // user clicked on View High Scores in a question page
    displayQuestions();
  } else {
    displayStartPage();
  }
}

// Mainline Code
localStorage.clear();  // Clear out history that may be left over
// set attributes to html elements
h1Element.setAttribute("class", "question");
topRowElement.setAttribute("class", "topRowFlexContainer");
topRowLeftDivElement.setAttribute("class", "topRowLeft");
topRowRightDivElement.setAttribute("class", "topRowRight");

// If seconds to subtract < = elments in the numberWords array get the word to display in text later.
if (subtractWrongAnswer <= numberWords.length) {
  subtractWrongAnswerWord = numberWords[subtractWrongAnswerWord];
}

// Top row with link and timer should be displayed on every page except for the high scores page
topRowElement.setAttribute("id", "topRow");
linkElement.setAttribute("id", "viewHs");
linkElement.setAttribute("href", "#");
linkElement.textContent = "View High Scores";
topRowRightDivElement.setAttribute("id", "timeLeft");
// add the html elements to the document
body.append(topRowElement);
topRowElement.append(topRowLeftDivElement);
topRowElement.append(topRowRightDivElement);
topRowLeftDivElement.append(linkElement);
// Monitor for user clicking on View High Scores link - global because it is on all pages
var viewHs = document.querySelector("#viewHs");
viewHs.addEventListener("click", displayHighScores);
// Display the starting page
displayStartPage();