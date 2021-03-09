// Global Variables
var wantsMore = true;
var body = document.body;
var h1Element = document.createElement("h1");
var button1 = document.createElement("button");
var subtractWrongAnswer = 5;
var subtractWrongAnswerWord = subtractWrongAnswer;
let numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
var questNumb = 0;
var quizTime = 75;
var audioRight = "./assets/sounds/tada.wav";
var audioWrong = "./assets/sounds/Error.wav";
var clickedStartPage = false;

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
    values: ["numbes and strings", "other arrays", "booleans", "all of the above"]
  }, {
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
const topRowRightDivElement = document.createElement("div");
// var cardElement = document.createElement("section");
var footerText = " ";

// Mainline Code
h1Element.setAttribute("class", "question");


do {
  // Do Not display first page if already done
  if (!clickedStartPage) {
    // If secconds to subtract < = elments in the numberWords array get the word to display in text later.
    if (subtractWrongAnswer <= numberWords.length) {
      subtractWrongAnswerWord = numberWords[subtractWrongAnswerWord];
    }

    // Top row with link and timer should be displayed on every page except for the high scores page
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
  const cardElement = document.createElement("section");
  const cardBodyElement = document.createElement("p");
  const cardFooterElement = document.createElement("div")
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
  var button0 = document.createElement("button");
  var button1 = document.createElement("button");
  var button2 = document.createElement("button");
  var button3 = document.createElement("button");

  cardElement.setAttribute("class", "card");
  cardElement.setAttribute("id", "card");
  cardBodyElement.setAttribute("class", "card-body");
  cardBodyElement.setAttribute("id", "answers");
  cardFooterElement.setAttribute("class", "card-footer");
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
    button.textContent = `${i+1}. ${answer}`;
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
      footerText = `Wrong: ${questions[questNumb].question} ${answer}`;
    } else {
      console.log("Right Answer");
      new Audio(audioRight).play();
      footerText = "Correct!!!";
    }
    questNumb++;
    if (questNumb < questions.length){
      displayQuestions();
    }
    return;
  }
}

  // All Done
  function displayAllDone() {
    return;
  }

  // High Scores
  function displayHighScores() {
    return;
  }
