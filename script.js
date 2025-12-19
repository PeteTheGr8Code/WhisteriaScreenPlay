import { QuestionList } from './newquestionList.js';
import TimelineManager from './TimelineManager.js';
import GameStateManager from './GameStateManager.js';

function createCategoryColumns(index = 0) {
    for (let i = 0; i < 5; i++) {
        let selected = i == 2;
        var column = document.createElement("div");
        column.classList.add("quiz-column")
        var columnHeader = document.createElement("h2");
        columnHeader.classList.add("quiz-column-header" + (selected ? "-selected" : ""));
        columnHeader.textContent = tm.getTimeline(index + i - 2).subCategory;
        if (column)
            column.append(columnHeader);
        addQuestionsToColumn(column, selected);
        gameboard.append(column);
    }

}
function addQuestionsToColumn(column, selected = false) {
    for (let j = 0; j < 5; j++) {
        let question = document.createElement('button');
        question.setAttribute('data-question', tm.getCurrentTimeline().questions[j]);
        question.addEventListener('click', function () {

            showQuestionBoard();
            let questionText = this.getAttribute('data-question');
            questionlabel.textContent = questionText;
            questionlabel.setAttribute('data-question-difficulty', j);
        });
        question.classList.add('quiz-questions' + (selected ? '-selected' : ''));
        question.setAttribute('data-question-difficulty', j);
        question.textContent = tm.getCurrentTimeline().difficultyLevels[j] * 100;

        column.appendChild(question);
    }
}

function hideBoards() {
    answerBoard.hidden = true;
    gameboard.hidden = true;
    diceBoard.hidden = true;
}

function showQuestionBoard() {
    hideBoards();
    answerBoard.hidden = false;
}
function showGameBoard() {

    hideBoards();
    gameboard.hidden = false;
}

function showDiceBoard() {
    hideBoards();
    diceBoard.hidden = false;
}

function assignEventsToButtons() {

    skip.addEventListener("click", function () {
        if (gsm.hasSkips()) {
            gsm.skip();
            nextTurn();
            showDiceBoard();
        }
        else {
            alert("No More Skips left!");
        }
    });

    correct.addEventListener("click", function () {
        console.log(questionlabel.getAttribute('data-question-difficulty'));
        let difficulty = Number.parseInt(questionlabel.getAttribute('data-question-difficulty'));
        console.log(difficulty);
        gsm.answered(difficulty, GameStateManager.CORRECT);
        nextTurn();
        showDiceBoard();

    });

    wrong.addEventListener("click", function () {
        let difficulty = questionlabel.getAttribute('data-question-difficulty');
        Number.parseInt(difficulty);
        gsm.answered(difficulty, GameStateManager.WRONG);
        nextTurn();
        showDiceBoard();


    });

    roll.addEventListener("click", function () {
        // validate that the dice input contains a non-empty integer
        const raw = (staticDice.value ?? staticDice.textContent ?? "").trim();
        let result = 0;
        if (raw === "") {
            result = Math.floor(Math.random() * timelinesCount) + 1;
            console.log(result);
            gameboard.innerHTML = "";
            createCategoryColumns(result - 1);
            showGameBoard();

            return;
        }
        // integer check (allows optional leading + or -)
        if (!/^[-+]?\d+$/.test(raw)) {
            alert("Please enter a valid integer.");
            return;
        }

        result = Number.parseInt(raw, 10);

        console.log(result);
        gameboard.innerHTML = "";
        createCategoryColumns(result - 1);
        showGameBoard();

    })
}

function nextTurn() {
    let winner = gsm.nextTurn();
    if (winner) {

    }
    renderScoreboard(gsm)

}
function renderScoreboard(gameState) {
    scoresDiv.innerHTML = "<h2>Scoreboard</h2>";

    gameState.getPlayers().forEach((player, index) => {
        const row = document.createElement("div");
        row.classList.add("score-row");

        if (player.eliminated) {
            row.classList.add("eliminated-player");
        } else if (index === gameState.currentPlayerTurn) {
            row.classList.add("active-player");
        }

        const name = document.createElement("span");
        name.textContent = player.name;

        const score = document.createElement("span");
        score.textContent = player.score;

        row.append(name, score);
        scoresDiv.appendChild(row);
    });
}

var gsm = new GameStateManager();
var tm = new TimelineManager(QuestionList);
var timelinesCount = tm.buildTimelines();

var gameboard = document.getElementById('game-board-div');

var answerBoard = document.getElementById('game-question-board-div');
const questionlabel = document.getElementById('question-text');
var skip = document.getElementById('skip-question-btn');
var correct = document.getElementById('correct-answer-btn');
var wrong = document.getElementById('wrong-answer-btn');

const diceBoard = document.getElementById('game-dice-roll-div');
var roll = document.getElementById('d100-btn');
var staticDice = document.getElementById('dice-input');
assignEventsToButtons();
var tm = new TimelineManager(QuestionList);
tm.buildTimelines();
showDiceBoard();

const scoresDiv = document.getElementById("scores");
renderScoreboard(gsm);





