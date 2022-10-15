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

let current = 0;

// to display questions one by one
const showQuestion = () => {

    // display the question
    cardHeading.innerHTML = quizData[current].question;

    // option number count
    let optNum = 1;

    // display the options
    quizData[current].options.forEach(opt => {

        // create a new element for each option
        let qOption = document.createElement("div");
        qOption.className = "q-option";
        qOption.innerHTML = `<input type="radio" class="q-check" name="option" id="opt${optNum}">
                             <label for="opt${optNum}">${opt}</label>`;
        cardBody.appendChild(qOption);
        
        optNum++;
    });
}

showQuestion();