/* ME TRAIGO EL HTML A JS */
const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const stats = document.getElementById("stats");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

/* VARIABLES */

const API_URL =
  "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
let questions = [];
let currentQuestionIndex;

/* AXIOS */
// const questions=[
//     {
//         question:"preguntaa?",
//         answers:[
//             {
//                 text:"ey",
//                 correct:true
//             },
//             {
//                 text:"ey2",
//                 correct:false
//             }
//         ]
//     }
// ]
const questionTransform = async () => {
  try {
    const response = await axios.get(API_URL);
    const questions = response.data.results;
    const questionsFormatted = questions.map((question) => {
      const incorrectAnswers = question.incorrect_answers.map((text) => {
        return {
          text,
          correct: false,
        };
      });
      const correctAnswer = { text: question.correct_answer, correct: true };
      return {
        question: question.question,
        answers: [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5),
      };
    });
    return questionsFormatted;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

async function example() {
  try {
    const questionsFormatted = await questionTransform();
    console.log(questionsFormatted);
    showQuestion(questionsFormatted[0])
  } catch (error) {
    console.error(error);
  }
}

example();



//setTimeout(()=> {showQuestion(questionsFormated[0])}, 1000)





const showQuestion = (question) => {
  console.log(question)
  questionElement.innerHTML = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;

    if(answer.correct){
      button.dataset.correct = true;
    }
    
    answerButtonsElement.appendChild(button)
  });

};


/* FUNCTIONS */
const startGame = () => {
  startBtn.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");

  /* ESTRUCTURA BASE DE DATOS 
res.data.results = sale la estructura de las preguntas
res.data.results[i].question = pregunta
res.data.results[i].correct_answer = respuesta correcta
res.data.results[i].incorrect_answers = respuestas incorrectas*/
};
/* AÑADO CLASS LIST */
const removePages = () => {
  home.classList.add("hide");
  stats.classList.add("hide");
  quiz.classList.add("hide");
};
const goQuiz = () => {
  removePages();
  quiz.classList.remove("hide");
};

const goHome = () => {
  removePages();
  home.classList.remove("hide");
};
const goStats = () => {
  removePages();
  stats.classList.remove("hide");
};
/*  PARA PODER HACER ESTE PASO DEBO DE SABER RECOGER LOS DATOS DE LA API  */
/* const showQuestion = (question) => {
questionContainer.innerText = question.question;
question.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    if(answer.correct){
        button.dataset.correct = true;
    }
    answerButtonsElement.appendChild(button)

});
} */

/* ADD EVENT LISTENERS */
quiz.addEventListener("click", goQuiz);
home.addEventListener("click", goHome);
stats.addEventListener("click", goStats);
startBtn.addEventListener("click", startGame);
