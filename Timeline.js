export default class Timeline{
    id=-1;
    category="";
    subCategory="";
    difficultyLevels=[1,2,4,8,16];
    questions=[];
    constructor(id,QuestionList){
        this.id=id;
        this.category=QuestionList[0].category;
        this.subCategory=QuestionList[0].subcategory;
        for(let i=0;i<QuestionList.length;i++){
            this.questions.push(QuestionList[i].question);
        }
    }
}