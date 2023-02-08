export {};

type Question = {
    question: string;
    category: string;
    answer: string;
};

const questionString = document.querySelector(".container p") as HTMLParagraphElement;
const categoryString = document.querySelector(".container span") as HTMLParagraphElement;
const nextBtn = document.querySelector("#next-btn") as HTMLButtonElement;
const categorySelect = document.querySelector(".select") as HTMLSelectElement;
const answerBtns = document.querySelectorAll(".answer-btn") as NodeListOf<HTMLButtonElement>;
const loader = document.querySelector(".loader") as HTMLDivElement;
const quizContent = document.querySelector("#quiz-content") as HTMLDivElement;

let correctAnswer: string;

const initialFetch = async () => {
    const res = await fetch(`https://api.api-ninjas.com/v1/trivia?category=${categorySelect.value}`, {
        headers: { "X-Api-Key": "d6whB4xky+kWCD+nCuvX0Q==3Xatl3352PDwkG6C" },
    });
    const question: Question[] = await res.json();
    return question;
};

const fetchQuestion = async () => {
    loader.classList.remove("hidden");
    quizContent.classList.add("hidden");
    const question: Question[] = await initialFetch();
    const fakeQuestion1: Question[] = await initialFetch();
    const fakeQuestion2: Question[] = await initialFetch();
    const fakeQuestion3: Question[] = await initialFetch();

    if (question) {
        loader.classList.add("hidden");
        quizContent.classList.remove("hidden");
    }

    let category: string;

    if (question[0].category === "artliterature") {
        category = "Art and Literature";
    } else if (question[0].category === "language") {
        category = "Language";
    } else if (question[0].category === "sciencenature") {
        category = "Science and Nature";
    } else if (question[0].category === "general") {
        category = "General";
    } else if (question[0].category === "fooddrink") {
        category = "Food and Drinks";
    } else if (question[0].category === "peopleplaces") {
        category = "Humanitarian";
    } else if (question[0].category === "geography") {
        category = "Geography";
    } else if (question[0].category === "historyholidays") {
        category = "History";
    } else if (question[0].category === "entertainment") {
        category = "Entertainment";
    } else if (question[0].category === "toysgames") {
        category = "Games";
    } else if (question[0].category === "music") {
        category = "Music";
    } else if (question[0].category === "mathematics") {
        category = "Mathematics";
    } else if (question[0].category === "religionmythology") {
        category = "Religion and Mythology";
    } else if (question[0].category === "sportsleisure") {
        category = "Sport";
    } else {
        category = "General";
    }

    questionString.innerText = question[0].question;
    categoryString.innerText = category;

    let numbers: Set<number> | Array<number> = new Set();
    while (numbers.size < 4) {
        const randomNumber = Math.floor(Math.random() * 4);
        numbers.add(randomNumber);
    }
    numbers = [...numbers];

    answerBtns[numbers[0]].innerText = question[0].answer;
    answerBtns[numbers[1]].innerText = fakeQuestion1[0].answer;
    answerBtns[numbers[2]].innerText = fakeQuestion2[0].answer;
    answerBtns[numbers[3]].innerText = fakeQuestion3[0].answer;

    for (let i = 0; i <= 3; i++) {
        answerBtns[i].classList.remove("success");
        answerBtns[i].classList.remove("wrong");
        answerBtns[i].disabled = false;
    }

    correctAnswer = question[0].answer;
};

const checkAnswer = (answer: string, index: number) => {
    if (answer === correctAnswer) {
        answerBtns[index].classList.add("success");
        answerBtns[0].disabled = true;
        answerBtns[1].disabled = true;
        answerBtns[2].disabled = true;
        answerBtns[3].disabled = true;
    } else {
        answerBtns[index].classList.add("wrong");
        answerBtns[index].disabled = true;
    }
};

fetchQuestion();

nextBtn.addEventListener("click", fetchQuestion);

categorySelect.addEventListener("change", fetchQuestion);

answerBtns.forEach((btn, index) => btn.addEventListener("click", () => checkAnswer(answerBtns[index].innerText, index)));
