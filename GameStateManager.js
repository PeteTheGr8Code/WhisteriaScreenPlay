import Player from "./Player.js";
export default class GameStateManager {
    NumberOfPlayers = 4;
    currentPlayerTurn = 0;
    Players = [new Player('Obiwa'), new Player('Vlad'), new Player('Alba'), new Player('Yapo')];
    turnOrder = [];
    static WRONG = -1;
    static CORRECT = 1;
    eliminatedPlayers=0;
    constructor() {
        this.setTurnOrder();
    }
    currentPlayer() {
        return this.turnOrder[this.currentPlayerTurn];
    }
    setTurnOrder() {
        let indexes = [];
        for (let k = 0; k < this.NumberOfPlayers; k++) {
            indexes.push(k);
        }
        for (let i = this.NumberOfPlayers; i > 0; i--) {
            let indexOfNextTurn = Math.floor(Math.random() * (i));
            console.log(i + " : " + indexOfNextTurn);
            this.turnOrder[this.NumberOfPlayers - i] = this.Players[indexes.splice(indexOfNextTurn, 1)[0]];
            console.log(this.turnOrder);
        }
    }

    hasSkips() {
        console.log(this.turnOrder[this.currentPlayerTurn].Skips);
        return (this.turnOrder[this.currentPlayerTurn].Skips > 0);
    }

    skip() {

        this.turnOrder[this.currentPlayerTurn].Skips--;

    }



    answered(difficulty, correct) {
        if (correct == GameStateManager.CORRECT) {
            let player = this.currentPlayer();
            player.goodAnswer(difficulty);
        }
        else if (correct == GameStateManager.WRONG) {
            let player = this.currentPlayer();
            let eliminated=player.badAnswer(difficulty);
            if(eliminated){
                this.eliminatedPlayers++;
            }
        }
    }

    getPlayers() {
        return this.turnOrder;
    }

    nextTurn() {
        if(this.checkWinner()){
            return true;
        }
        const total = this.turnOrder.length;
        let attempts = 0;

        do {
            this.currentPlayerTurn = (this.currentPlayerTurn + 1) % total;
            attempts++;
        } while (
            this.turnOrder[this.currentPlayerTurn].eliminated &&
            attempts < total
        );
        return false;
    }

    checkWinner(){

    }

}