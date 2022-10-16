const quizData = [
    {
        question: "What is the full form of PHP?",
        options: [
            "Preprocessor Home Page",
            "Hypertext Preprocessor",
            "Pretext Hypertext Processor",
            "None"
        ],
        correct: 2
    },
    {
        question: "Choose the default file extension from the following.",
        options: [
            ".xml",
            ".html",
            ".php",
            ".ph"
        ],
        correct: 3
    },
    {
        question: "What type of language is HTML",
        options: [
            "Markup language",
            "Server-side scripting",
            "Client-side scripting",
            "None"
        ],
        correct: 1
    },
    {
        question: "In how many ways can CSS be written in?",
        options: [
            "1",
            "2",
            "3",
            "4"
        ],
        correct: 3
    },
    {
        question: "The CSS property used to specify the transparency of an element is?",
        options: [
            "Display",
            "Visibility",
            "Filter",
            "None of the above"
        ],
        correct: 4
    }
];

// select html elements
const card         = document.querySelector(".card");
const cardHeading  = card.querySelector(".card-heading");
const cardBody     = card.querySelector(".card-body");
const submitBtn    = card.querySelector(".btn-submit");
const result       = document.querySelector(".result");
const startQuizBtn = document.querySelector(".start-quiz");

// start quiz
startQuizBtn.addEventListener("click", (e) => {
    card.style.display = "block";
    startQuizBtn.style.display = "none";
    startQuiz();
});

// global variables
let currentQuestion = 0;

// to display questions one by one
const renderQuestion = () => {

    // display the question
    cardHeading.innerHTML = quizData[currentQuestion].question;

    // option number count
    let optNum = 1;

    // remove the current options before rendering next one
    while(cardBody.firstChild)
        cardBody.removeChild(cardBody.firstChild);

    // display the options
    quizData[currentQuestion].options.forEach( opt => {

        // create a new element for each option
        let qOption        = document.createElement("div");
        qOption.className  = "q-option";
        qOption.innerHTML  = `<input type="radio" class="q-check" name="option" value="${optNum}" id="opt${optNum}">
                             <label for="opt${optNum}">${opt}</label>`;
        cardBody.appendChild(qOption);
        
        optNum++;
    });
    currentQuestion++;
}

const startQuiz = () => {

    // display the first question
    renderQuestion();

    let numOfCorrectAns = 0;

    submitBtn.addEventListener("click", (e) => {

        // prevent form submission
        e.preventDefault();
        
        // get the selected option element
        const checkedOption = document.querySelector("input[name='option']:checked");

        // ask if no option is selected
        if(checkedOption == null){
            alert("Please select an option.");
            return;
        }

        // evaluate whether the option selected is correct or not and then count and mark
        if(checkedOption.value == quizData[currentQuestion-1].correct){
            numOfCorrectAns++;
            checkedOption.parentElement.style.backgroundColor = "#2ac84a";
        } else {
            checkedOption.parentElement.style.backgroundColor = "#d94646";
            document.getElementsByClassName("q-option")[(quizData[currentQuestion-1].correct)-1].style.backgroundColor = "#2ac84a";
        }

        // check if we reached end
        if(currentQuestion == quizData.length){
            const timeOutID = setTimeout(() => {
                card.style.display    = "none";
                result.style.display  = "block";
                result.innerHTML      = `You have answered correctly ${numOfCorrectAns}/${quizData.length}
                                         <span onclick="location.reload()" class="restart-quiz">Restart</span>`;
                clearTimeout(timeOutID);
            }, 2000);
            return;
        }

        // disable the submit button until next question is rendered
        e.target.disabled = true;

        // render next question after 2 sec (2 sec for showing users the correct or wrong answer)
        const timeOutID = setTimeout(() => {
            renderQuestion();
            e.target.disabled = false;
            clearTimeout(timeOutID);
        }, 2000);
    });
}