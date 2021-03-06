// Global Variables
var wantsMore = true;
var body = document.body;
var h1Element = document.createElement("h1");
var button1 = document.createElement("button");
var subtractWrongAnswer = 5;
var subtractWrongAnswerWord = subtractWrongAnswer;
let numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
var quizTime = 75;
var audioRight = "./assets/sounds/tada.wav";
var audioWrong = "./assets/sounds/Error.wav";
var clickedStartPage = false;

var topRowElement = document.createElement("section");
var topRowLeftDivElement = document.createElement("div");
var topRowRightDivElement = document.createElement("div");
// var cardElement = document.createElement("section");

// Mainline Code
// cardElement.setAttribute("class", "card")
h1Element.setAttribute("class", "question");


do {
  // Do Not display first page if already done
  if (!clickedStartPage) {
    // If secconds to subtract < = elments in the numberWords array get the word to display in text later.
    if (subtractWrongAnswer <= numberWords.length) {
      subtractWrongAnswerWord = numberWords[subtractWrongAnswerWord];
    }
    
    // Top row with link and timer should be displayed on every page except for the high scores page
    // var topRowElement = document.createElement("section");
    // var topRowLeftDivElement = document.createElement("div");
    // var topRowRightDivElement = document.createElement("div");

    topRowElement.setAttribute("id", "topRow");
    topRowLeftDivElement.textContent = "View High Scores";
    topRowLeftDivElement.setAttribute("class", "topRowLeft");
    topRowRightDivElement.setAttribute("class", "topRowRight");
    topRowRightDivElement.setAttribute("id", "timeLeft");
    topRowRightDivElement.textContent = `Time: ${quizTime}`;
    body.append(topRowElement);
    topRowElement.append(topRowLeftDivElement);
    topRowElement.append(topRowRightDivElement);
    displayStartPage();
  }
  wantsMore = false;
} while (wantsMore)

// Start Page
function displayStartPage() {
  console.log("displayStartPage called...");
  var cardElement = document.createElement("section");
  var cardBodyElement = document.createElement("p");
  var cardFooterElement = document.createElement("div")
  var startButton = document.createElement("button");
  // h1Element.setAttribute("class", "question");
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
  clickedStartPage = true;
  console.log("Start Button Clicked.")
  displayQuestion1();

  return;
}

// Question 1
function displayQuestion1() {
  console.log("displayQuestion1 called...");
  var previousPage = document.getElementById("card")
  previousPage.remove();
  console.log("removed previous page...");
  var cardElement = document.createElement("section");
  var cardBodyElement = document.createElement("div");
  var buttonsUlElement = document.createElement("ul");
  var buttonsLi1Element = document.createElement("li");
  var buttonsLi2Element = document.createElement("li");
  var buttonsLi3Element = document.createElement("li");
  var buttonsLi4Element = document.createElement("li");

  var cardFooterElement = document.createElement("div");
  var button2 = document.createElement("button");
  var button3 = document.createElement("button");
  var button4 = document.createElement("button");

  cardElement.setAttribute("class", "card");
  cardElement.setAttribute("id", "card");
  cardBodyElement.setAttribute("class", "card-body");
  cardBodyElement.setAttribute("id", "q1Buttons");
  cardFooterElement.setAttribute("class", "card-footer");
  button1.setAttribute("id", "btnStrings");
  button1.setAttribute("data-value", "btnStrings");
  button2.setAttribute("id", "btnBooleans");
  button2.setAttribute("data-value", "btnBooleans");
  button3.setAttribute("id", "btnAlerts");
  button3.setAttribute("data-value", "btnAlerts");
  button4.setAttribute("id", "btnFunctions");
  button4.setAttribute("data-value", "btnFunctions");
  button1.setAttribute("class", "btn");
  button2.setAttribute("class", "btn");
  button3.setAttribute("class", "btn");
  button4.setAttribute("class", "btn");
  h1Element.textContent = "Commonly used data types DO NOT Include";
  button1.textContent = "strings";
  button2.textContent = "booleans";
  button3.textContent = "alerts";
  button4.textContent = "functions";
  body.append(h1Element);
  body.append(cardElement);
  cardElement.append(cardBodyElement);
  cardBodyElement.append(buttonsUlElement);
  buttonsUlElement.append(buttonsLi1Element);
  buttonsLi1Element.append(button1);
  buttonsUlElement.append(buttonsLi2Element);
  buttonsLi2Element.append(button2);
  buttonsUlElement.append(buttonsLi3Element);
  buttonsLi3Element.append(button3);
  buttonsUlElement.append(buttonsLi4Element);
  buttonsLi4Element.append(button4);
  cardElement.append(cardFooterElement);

  var q1Buttons = document.querySelector("#q1Buttons");
  q1Buttons.addEventListener("click", checkQuestion1);

  return;
}

// Check Question 1
function checkQuestion1(event) {
  var element = event.target;

  if (element.matches("button")) {
    var answer = element.getAttribute("data-value");

    console.log("Button Clicked = " + answer + ".");

    if (answer !== "btnAlerts") {
      // wrong answer
      console.log("Wrong Answer");
      new Audio(audioWrong).play();
    }else {
      console.log("Right Answer");
      new Audio(audioRight).play();
    }

    displayQuestion2();
  }
  return;
}

// Question 2
function displayQuestion2() {
  console.log("displayQuestion2 called...");
  var previousPage = document.getElementById("card")
  previousPage.remove();
  console.log("removed previous page...");
  var cardElement = document.createElement("section");
  var cardBodyElement = document.createElement("div");
  var buttonsUlElement = document.createElement("ul");
  var buttonsLi1Element = document.createElement("li");
  var buttonsLi2Element = document.createElement("li");
  var buttonsLi3Element = document.createElement("li");
  var buttonsLi4Element = document.createElement("li");

  var cardFooterElement = document.createElement("div");
  var button1 = document.createElement("button");
  var button2 = document.createElement("button");
  var button3 = document.createElement("button");
  var button4 = document.createElement("button");

  cardElement.setAttribute("class", "card");
  cardElement.setAttribute("id", "card");
  cardBodyElement.setAttribute("class", "card-body");
  cardBodyElement.setAttribute("id", "q2Buttons");
  cardFooterElement.setAttribute("class", "card-footer");
  button1.setAttribute("id", "btnQuotes");
  button1.setAttribute("data-value", "btnQuotes");
  button2.setAttribute("id", "btnCurly");
  button2.setAttribute("data-value", "btnCurly");
  button3.setAttribute("id", "btnParen");
  button3.setAttribute("data-value", "btnParen");
  button4.setAttribute("id", "btnSquare");
  button4.setAttribute("data-value", "btnSquare");
  button1.setAttribute("class", "btn");
  button2.setAttribute("class", "btn");
  button3.setAttribute("class", "btn");
  button4.setAttribute("class", "btn");
  h1Element.textContent = "The condition in an if / else statement is enclosed within _____.";
  button1.textContent = "quotes";
  button2.textContent = "curly brackets";
  button3.textContent = "parenthesis";
  button4.textContent = "square brackets";
  // body.append(h1Element);
  body.append(cardElement);
  cardElement.append(cardBodyElement);
  cardBodyElement.append(buttonsUlElement);
  buttonsUlElement.append(buttonsLi1Element);
  buttonsLi1Element.append(button1);
  buttonsUlElement.append(buttonsLi2Element);
  buttonsLi2Element.append(button2);
  buttonsUlElement.append(buttonsLi3Element);
  buttonsLi3Element.append(button3);
  buttonsUlElement.append(buttonsLi4Element);
  buttonsLi4Element.append(button4);
  cardElement.append(cardFooterElement);

  var q2button1 = document.querySelector("#q2Buttons");
  q2button1.addEventListener("click", checkQuestion2);
  
  return;
}

// Check Question 2
function checkQuestion2(event) {
  var element = event.target;

  if (element.matches("button")) {
    var answer = element.getAttribute("data-value");
    console.log("Button Clicked = " + answer + ".");

    if (answer !== "btnParen") {
      // wrong answer
      console.log("Wrong Answer");
      new Audio(audioWrong).play();
    }else {
      console.log("Right Answer");
      new Audio(audioRight).play();
    }

    displayQuestion3();
  }
  return;
}

// Question 3
function displayQuestion3() {
  return;
}

// Question 4
function displayQuestion4() {
  return;
}

// Question 5
function displayQuestion5() {
  return;
}

// All Done
function displayAllDone() {
  return;
}

// High Scores
function displayHighScores() {
  return;
}
