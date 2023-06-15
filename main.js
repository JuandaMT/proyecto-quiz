/* AXIOS */
axios.get("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then(res => console.log(res))
.catch(err => console.error(err))
/* ESTRUCTURA BASE DE DATOS 
res.data.results = sale la estructura de las preguntas
res.data.results[i].question = pregunta
res.data.results[i].correct_answer = respuesta correcta
res.data.results[i].incorrect_answers = respuestas incorrectas*/

/* ME TRAIGO EL HTML A JS */
const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const stats = document.getElementById("stats");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

/* AÑADO CLASS LIST */
const removePages = () => {
    home.classList.add("hide")
    stats.classList.add("hide")
    quiz.classList.add("hide")
}
const goQuiz = () => {
    removePages()
    quiz.classList.remove("hide")
}

const goHome = () => {
    removePages()
    home.classList.remove("hide")
}
const goStats = () => {
    removePages()
    stats.classList.remove("hide")
}
/* ADD EVENT LISTENERS */
quiz.addEventListener("click", goQuiz)
home.addEventListener("click", goHome)
stats.addEventListener("click", goStats)