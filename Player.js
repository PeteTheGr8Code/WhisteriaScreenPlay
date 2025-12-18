export default class Player{
    name;
    GoodAnswersNeeded=[2,2,2,2,2];
    FinishedDifficultyLevels=[0,0,0,0,0];
    Skips=3;
    Lives=5;
    score=0;
    winner=false;
    eliminated=false;
    constructor(name){
        this.name=name;
    }

    goodAnswer(difficulty){
        if(difficulty<5){
            this.GoodAnswersNeeded[difficulty]--;
            if(this.GoodAnswersNeeded[difficulty]==0){
                this.FinishedDifficultyLevels[difficulty]=1;
            }
            this.score+=Math.pow(2,difficulty)*100;
        }
    }
    badAnswer(difficulty){

        this.Lives--;
        if(this.Lives<=0){
            this.eliminated=true;
        }
        this.score-=Math.pow(2,difficulty)*100;
    }


}