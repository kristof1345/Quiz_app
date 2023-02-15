import { Quiz } from "./qiuz.js";

//html elements
const startBtn = document.querySelector(".start-game");
const startCont = document.querySelector(".start-container");
const question = document.querySelector(".question");
const next = document.querySelector(".next");
const questionCounter = document.getElementById("counter");
const results = document.querySelector(".result");
const rights = document.querySelector(".rights");
const submitBtn = document.querySelector(".submit");
let options = document.querySelectorAll(".option-div");
let currentQuiz;
let quizCounter = 1;
let selectedOption;
let score = 0;
let questionNum = 1;
options = [...options];

startBtn.addEventListener("click", () => {
  submitBtn.style.display = "none";
  startCont.style.display = "none";
  next.style.display = "inline";
  questionCounter.textContent = questionNum;
  currentQuiz = Quiz[getRandomInt()];
  question.textContent = currentQuiz[0].question;
  options.map((el, index) => {
    el.textContent = currentQuiz[0].options[index];
  });
});

function getRandomInt() {
  return Math.floor(Math.random() * 3);
}

options.forEach((el) => {
  el.addEventListener("click", () => {
    el.dataset.selected = "yes";
    selectedOption = el;
    let index = options.indexOf(el);
    let removeYesses = options.filter((val, ind) => index !== ind);
    removeYesses.map((elem) => {
      elem.dataset.selected = "no";
    });
  });
});

next.addEventListener("click", () => {
  if (selectedOption === undefined) {
  } else {
    if (selectedOption.textContent === currentQuiz[quizCounter - 1].correct) {
      score++;
    }
  }
  question.textContent = currentQuiz[quizCounter].question;
  options.map((el, index) => {
    el.textContent = currentQuiz[quizCounter].options[index];
  });
  quizCounter++;
  selectedOption = undefined;
  options.map((elem) => {
    elem.dataset.selected = "no";
  });
  questionNum++;
  questionCounter.textContent = questionNum;
  if (questionNum === 5) {
    next.style.display = "none";
    submitBtn.style.display = "inline";
  }
});

submitBtn.addEventListener("click", () => {
  if (selectedOption === undefined) {
    console.log("fuck");
  } else {
    if (selectedOption.textContent === currentQuiz[quizCounter - 1].correct) {
      score++;
      console.log("ok");
    }
  }
  startCont.style.display = "block";
  results.style.display = "block";
  rights.textContent = score;
  quizCounter = 1;
  score = 0;
  selectedOption = undefined;
  questionNum = 1;
  options.map((elem) => {
    elem.dataset.selected = "no";
  });
});
