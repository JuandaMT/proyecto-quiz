/* ME TRAIGO EL HTML A JS */
const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const stats = document.getElementById("stats");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const quizNav = document.getElementById("quizNav");
const statsNav = document.getElementById("statsNav");
const btnMyResult = document.getElementById("myResult");
const showResult = document.getElementById("showResult");

/* VARIABLES */
const API_URL =
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
let questions = [];
let currentQuestionIndex;
let questionsFormatted = [];
let respuestasCorrectas = 0;
let score = 0;

/* FUNCTIONS */
const questionTransform = async () => {
  try {
    const response = await axios.get(API_URL);
    const questions = response.data.results;
    questionsFormatted = questions.map((question) => {
      const incorrectAnswers = question.incorrect_answers.map((text) => {
        return {
          text,
          correct: false,
        };
      });
      const correctAnswer = { text: question.correct_answer, correct: true };
      return {
        question: question.question,
        answers: [...incorrectAnswers, correctAnswer].sort(
          () => Math.random() - 0.5
        ),
      };
    });
    return questionsFormatted;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
questionTransform();

const setStatusClass = (element) => {
  if (element.dataset.correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
  element.disabled = true;
};

const selectAnswer = () => {
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button);
  });

  if (questionsFormatted.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove("hide");
  } else {
    startBtn.innerText = "Restart";
    startBtn.classList.remove("hide");
    btnMyResult.classList.remove("hide");
  }
};

const showQuestion = (question) => {
  questionElement.innerHTML = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;

    if (answer.correct) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", () => {
      console.log(button.dataset.correct);
      if (button.dataset.correct) {
        score++;
        showResult.innerHTML = `YOU GET ${score}/10`;
      }
      selectAnswer();
    });
    answerButtonsElement.appendChild(button);
  });
};

const resetState = () => {
  nextBtn.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
};

const setNextQuestion = () => {
  resetState();
  showQuestion(questionsFormatted[currentQuestionIndex]);
};

const startGame = () => {
  startBtn.classList.add("hide");
  btnMyResult.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  console.log(questionsFormatted);
  setNextQuestion();
};

/* AÑADO CLASS LIST */
const removePages = () => {
  stats.classList.add("hide");
  quiz.classList.add("hide");
};
const goQuiz = () => {
  removePages();
  quiz.classList.remove("hide");
};
const goStats = () => {
  console.log("ey");
  removePages();
  stats.style = "display:block;";
  quiz.style = "display:none;";
  console.log(stats);
};

/* ADD EVENT LISTENERS */
quiz.addEventListener("click", goQuiz);
stats.addEventListener("click", goStats);
startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
quizNav.addEventListener("click", goQuiz);
statsNav.addEventListener("click", goStats);
btnMyResult.addEventListener("click", goStats);
