let questions = [
    {
        "question": "Wie heißt die Hauptstadt von Schweden?",
        "answer_1": "Oslo",
        "answer_2": "Stockholm",
        "answer_3": "Kopenhagen",
        "answer_4": "Reykjavík",
        "right_answer": 2
    },
    {
        "question": "Welche ist die Hauptstadt Australiens?",
        "answer_1": "Canberra",
        "answer_2": "Sydney",
        "answer_3": "Melbourne",
        "answer_4": "Perth",
        "right_answer": 1
    },
    {
        "question": "Was heißt BRD",
        "answer_1": "Brot",
        "answer_2": "Bundesrepublikdeutschland",
        "answer_3": "Melbourne",
        "answer_4": "Perth",
        "right_answer": 2
    }
];

let rightQuestions = 0;
let currentQuestion = 0;


function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}


function showQuestion() {

    if (currentQuestion >= questions.length) {
        //Endscreen
        document.getElementById('endscreen').style = '';
        document.getElementById('question-body').style = 'display: none;';

        document.getElementById('amount-of-questions').innerHTML = questions.length;
        document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    } else {
        //Current Question

        //Calc Porgressbar
        let percent = (currentQuestion + 1) / questions.length;
        percent = Math.round(percent * 100);
        document.getElementById('progress-bar').innerHTML = `${percent} %`;
        document.getElementById('progress-bar').style = `width: ${percent}%;`;

        //Show Question
        let question = questions[currentQuestion];
        document.getElementById('question-number').innerHTML = currentQuestion + 1;
        document.getElementById('questiontext').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];
    }
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);

    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }
    document.getElementById('next-button').disabled = false;
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}


function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}


function replay(){
    //Endscreen entfernen und question-body anzeigen
    document.getElementById('question-body').style = '';
    document.getElementById('endscreen').style = 'display: none;'; 
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}