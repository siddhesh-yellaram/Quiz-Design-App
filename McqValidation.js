var quizContainer = document.getElementById('container');
var resultsContainer = document.getElementById('results');
var submitBtn = document.getElementById('submit');
var nextBtn = document.getElementById('next');
var questionAnsweredCorrectly = 0;

var currentQuestionNumber = 0;
showNextQuestion(questions, currentQuestionNumber);

submitBtn.addEventListener("click", function () {
    showResults(questions, resultsContainer);
})

nextBtn.addEventListener("click", function () {
    checkAnswer(questions, currentQuestionNumber);
    if (currentQuestionNumber === questions.length) {
        showSubmitButton();
        this.style.visibility = "hidden";
        return
    }
    hideExistingQuestion();
    showNextQuestion(questions, currentQuestionNumber);
})

function showNextQuestion(questions, i) {
    var question = questions[i];
    var output = [];
    var answers = [];
    for (letter in question.answers) {
        answers.push(
            '<label>'
            + '<input type="radio" name="question' + i + '" value="' + letter + '">'
            + ' ' + question.answers[letter]
            + '</label>' + '<br>'
        );
    }
    output.push(
        '<div class="question">' + question.question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
    );
    quizContainer.innerHTML = output.join('');
}

function hideExistingQuestion() {
    var innerDiv = quizContainer.childNodes

    for (var i = 0; i < innerDiv.length; i++) {
        var a = innerDiv[i];
        a.style.visibility = 'hidden';
    }
}

function checkAnswer(questions, i) {
    var answerContainers = quizContainer.querySelectorAll('.answers');
    userAnswer = (answerContainers[0].querySelector('input[name=question' + i + ']:checked') || {}).value;

    if (userAnswer === questions[i].correctAnswer) {
        questionAnsweredCorrectly++;
    }
    currentQuestionNumber++;
}

function showResults(questions, resultsContainer) {

    resultsContainer.innerHTML = '<br>' + 'Percentages of Total Questions Answered Correctly is: ' + questionAnsweredCorrectly / questions.length * 100 + '%';
}

function showSubmitButton() {
    submitBtn.removeAttribute("hidden");
}




