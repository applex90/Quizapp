let questions = [
    {
        "question": "What does HTML stand for?",
        "answer_1": "Hyper Text Markup Language",
        "answer_2": "Hyperlinks and Text Markup Language",
        "answer_3": "Home Tool Markup Language",
        "answer_4": "Hyper Text Math Language",
        "right_answer": 1,
        "category": "HTML"
    },
    {
        "question": "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        "answer_1": "alt",
        "answer_2": "src",
        "answer_3": "longdesc",
        "answer_4": "title",
        "right_answer": 1,
        "category": "HTML"
    },
    {
        "question": "Who is making the Web standards?",
        "answer_1": "Mozilla",
        "answer_2": "Google",
        "answer_3": "Microsoft",
        "answer_4": "The World Wide Web Consortium",
        "right_answer": 4,
        "category": "HTML"
    },
    {
        "question": "What is the correct HTML element for inserting a line break?",
        "answer_1": "&lt;break&gt;",
        "answer_2": "&lt;br&gt;",
        "answer_3": "&lt;lb&gt;",
        "answer_4": "&lt;b&gt;",
        "right_answer": 2,
        "category": "HTML"
    },
    {
        "question": "What does CSS stand for?",
        "answer_1": "Cascading Style Sheets",
        "answer_2": "Colorful Style Sheets",
        "answer_3": "Creative Style Sheets",
        "answer_4": "Computer Style Sheets",
        "right_answer": 1,
        "category": "CSS"
    },
    {
        "question": "Which is the correct CSS syntax?",
        "answer_1": "body:color=black;",
        "answer_2": "{body:color=black;}",
        "answer_3": "{body;color:black;}",
        "answer_4": "body {color: black;}",
        "right_answer": 4,
        "category": "CSS"
    },
    {
        "question": "Which property is used to change the background color?",
        "answer_1": "bgcolor",
        "answer_2": "background-color",
        "answer_3": "color",
        "answer_4": "background-size",
        "right_answer": 2,
        "category": "CSS"
    },
    {
        "question": "How do you write 'Hello World' in an alert box?",
        "answer_1": "alert('Hello World');",
        "answer_2": "msgBox('Hello World');",
        "answer_3": "msg('Hello World');",
        "answer_4": "alertBox('Hello World');",
        "right_answer": 1,
        "category": "JS"
    },
    {
        "question": "How do you call a function named 'myFunction'?",
        "answer_1": "myFunction()",
        "answer_2": "call function myFunction()",
        "answer_3": "call myFunction()",
        "answer_4": "function myFunction()",
        "right_answer": 1,
        "category": "JS"
    },
    {
        "question": "How does a FOR loop start?",
        "answer_1": "for (i = 0; i <= 5)",
        "answer_2": "for (i <= 5; i++)",
        "answer_3": "for i = 1 to 5",
        "answer_4": "for (i = 0; i <= 5; i++)",
        "right_answer": 4,
        "category": "JS"
    }
];

let ArrayOfCategory = 0;
let topic = '';
let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('audio/sound_success.mp3');
let AUDIO_FAIL = new Audio('audio/sound_fail.mp3');


function init(category) {
    topic = category;
    highlightTheNavPoint(topic);
    showStartscreen(topic);
    resetAnswerButtons();
    cleanToStart();
}


function cleanToStart() {
    document.getElementById('startscreen').style = '';
    document.getElementById('question-body').style = 'display: none;';
    document.getElementById('endscreen').style = 'display: none;';
    rightQuestions = 0;
    currentQuestion = 0;
}


function highlightTheNavPoint(topic) {
    let removeClass = document.getElementsByClassName('nav-link');
    for (let i = 0; i < removeClass.length; i++) {
        removeClass[i].classList.remove('active');
    }
    document.getElementById(topic).classList.toggle('active');
}


function showStartscreen(topic) {
    //Render Category
    let categoryTag = document.getElementById('categoryTag');
    categoryTag.innerHTML = topic;
    //Render Category Start-Btn
    let startbtn = document.getElementById('start-btn');
    startbtn.onclick = function () { startGame(topic); };
}



function startGame(category) {
    topic = category;
    ArrayOfCategory = questions.filter(c => c.category == topic);
    document.getElementById('all-questions').innerHTML = ArrayOfCategory.length;
    document.getElementById('startscreen').style = 'display: none;';
    document.getElementById('question-body').style = '';
    showQuestion();
}


function showQuestion() {

    if (gameisOver()) {
        updateProgressBar();
        showEndscreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}


function gameisOver() {
    //Callback-Function
    return currentQuestion >= ArrayOfCategory.length;
}


function answer(selection) {
    let question = ArrayOfCategory[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);

    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber)) {
        addClasslistForRightAnswer(selection);
        resetAudio();
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        addClasslistForWrongAnswer(selection, idOfRightAnswer);
        resetAudio();
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
}


function addClasslistForRightAnswer(selection) {
    document.getElementById(selection).parentNode.classList.add('bg-success');
    document.getElementById(selection).previousElementSibling.classList.add('bg-success');
    document.getElementById(selection).previousElementSibling.classList.add('color-white');
}


function addClasslistForWrongAnswer(selection, idOfRightAnswer) {
    document.getElementById(selection).parentNode.classList.add('bg-danger');
    document.getElementById(selection).previousElementSibling.classList.add('bg-danger');
    document.getElementById(selection).previousElementSibling.classList.add('color-white');
    document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    document.getElementById(idOfRightAnswer).previousElementSibling.classList.add('bg-success');
    document.getElementById(idOfRightAnswer).previousElementSibling.classList.add('color-white');
}


function resetAudio() {
    AUDIO_FAIL.pause(); // Zeit für AUDIO_FAIL zurücksetzen, damit AUDIO_SUCCESS direkt beginnen kann
    AUDIO_FAIL.currentTime = 0; // Zeit für AUDIO_FAIL auf 0 s zurücksetzen
    AUDIO_SUCCESS.pause(); // Zeit für AUDIO_SUCCESS zurücksetzen, damit AUDIO_FAIL direkt beginnen kann
    AUDIO_SUCCESS.currentTime = 0; // Zeit für AUDIO_SUCCESS auf 0 s zurücksetzen
}


function rightAnswerSelected(selectedQuestionNumber) {
    let question = ArrayOfCategory[currentQuestion];
    return selectedQuestionNumber == question['right_answer'];
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('prev-button').disabled = false;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();

}


function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        if (rightQuestions > 0) {
            rightQuestions--;
        }
        document.getElementById('prev-button').disabled = false;
        document.getElementById('next-button').disabled = true;
        resetAnswerButtons();
        showQuestion();
    }
}


function resetAnswerButtons() {
    let removeClass = document.getElementsByClassName('answer-choice');
    for (let i = 0; i < removeClass.length; i++) {
        removeClass[i].parentNode.classList.remove('bg-danger');
        removeClass[i].parentNode.classList.remove('bg-success');
        removeClass[i].previousElementSibling.classList.remove('bg-danger');
        removeClass[i].previousElementSibling.classList.remove('bg-success');
        removeClass[i].previousElementSibling.classList.remove('color-white');
    }
}


function replay(category) {
    resetProgressbar();
    //Startscreen enable, Endscreen disable, question-body enable
    document.getElementById('startscreen').style = '';
    document.getElementById('question-body').style = 'display: none;';
    document.getElementById('endscreen').style = 'display: none;';
    rightQuestions = 0;
    currentQuestion = 0;
    init(topic);
}


function resetProgressbar() {
    document.getElementById('progress-bar').innerHTML = `0 %`;
    document.getElementById('progress-bar').style = `width: 0%;`;
}


function showEndscreen() {
    document.getElementById('endscreen').style = '';
    document.getElementById('question-body').style = 'display: none;';
    //Render Category
    let categoryTag = document.getElementById('EndcategoryTag');
    categoryTag.innerHTML = topic;
    let replaybtn = document.getElementById('replay');
    let startbtn = document.getElementById('start-btn');
    replaybtn.onclick = function () { replay(topic); };

    document.getElementById('amount-of-questions').innerHTML = ArrayOfCategory.length;
    document.getElementById('amount-of-right-questions').innerHTML = `${rightQuestions}/`;
}


function updateToNextQuestion() {
    //Show Question
    let question = ArrayOfCategory[currentQuestion];
    document.getElementById('question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}


function updateProgressBar() {
    let percent = (currentQuestion) / ArrayOfCategory.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style = `width: ${percent}%;`;
}