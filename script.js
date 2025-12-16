import { QuestionList } from './questionList.js';
import TimelineManager from './TimelineManager.js';
import GameStateManager from './GameStateManager.js';

function createCategoryColumns() {
    for (let i = 0; i < 5; i++) {
        var column = document.createElement("div");
        column.classList.add("quiz-column")
        var columnHeader=document.createElement("h2");
        columnHeader.classList.add("quiz-column-header");
        columnHeader.textContent=tm.getNextTimeline().subCategory;
        column.append(columnHeader);
        addQuestionsToColumn(column);
        gameboard.append(column);
    }

}
function addQuestionsToColumn(column) {
    for (let j = 0; j < 5; j++) {
        let div = document.createElement('div');
        let question = document.createElement('button');
        question.setAttribute('data-question', tm.getCurrentTimeline().questions[j]);
        question.addEventListener('click', function() {

            showQuestionBoard();
            let questionText = this.getAttribute('data-question');
            questionlabel.textContent = questionText;
        });
        question.classList.add('quiz-questions');
        div.classList.add('quiz-questions');
        question.setAttribute('data-question-difficulty',j);
        question.textContent = tm.getCurrentTimeline().difficultyLevels[j]*100;
        div.appendChild(question);

        column.appendChild(question);
    }
}

function showQuestionBoard() {
    answerBoard.hidden = false;
    gameboard.hidden = true;
}
function showGameBoard() {
    answerBoard.hidden = true;
    gameboard.hidden = false;
}

function assignEventsToButtons(){
    skip.addEventListener("click",function(){
        if(gsm.hasSkips()){
            gsm.skip();
            showGameBoard();
        }
        else{
            alert("No More Skips left!");
        }
    });
        correct.addEventListener("click",function(){
            let difficulty=questionlabel.getAttribute('data-question-difficulty');
            Number.parseInt(difficulty);
            gsm.answered(difficulty,GameStateManager.CORRECT);
    });
        wrong.addEventListener("click",function(){
            console.log("clicked");
    });
}
console.log("Script loaded");
var gameboard = document.getElementById('game-board-div');
var answerBoard=document.getElementById('game-question-board-div');
var skip=document.getElementById('skip-question-btn');
var correct=document.getElementById('correct-answer-btn');
var wrong=document.getElementById('wrong-answer-btn');
//const questionLabel=document.querySelector(".question-text");
const questionlabel= document.getElementById('question-text');
var tm= new TimelineManager(QuestionList);
tm.buildTimelines();
createCategoryColumns();
assignEventsToButtons();
showGameBoard();

console.log("Timelines built");
var gsm=new GameStateManager();