export default class Player{
    Name;
    GoodAnswersNeeded=[2,2,2,2,2];
    FinishedDifficultyLevels=[0,0,0,0,0];
    Skips=3;
    Lives=5;
    score=0;

    constructor(name){
        this.Name=name;
    }

    goodAnswer(difficulty){
        if(difficulty<5){
            this.GoodAnswersNeeded[difficulty]--;
            if(this.GoodAnswersNeeded[difficulty]==0){
                this.FinishedDifficultyLevels[difficulty]=1;
            }
        }
    }

    
}