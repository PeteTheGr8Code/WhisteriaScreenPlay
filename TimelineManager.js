import Timeline from "./Timeline.js";
export default class TimelineManager {
    arrayOfTimelines = [];
    currentIndex = -1;
    QuestionList = [];
    amountOfTimelines=0;
    constructor(QuestionList) {
        this.QuestionList = QuestionList;
        this.amountOfTimelines=QuestionList.length/5+1;
        console.log(this.amountOfTimelines);
    }
    buildTimelines() {
        //logic to build timelines from question list
        //Timelines have unique IDs from 1 to 100
        //Timelines represent a category and one subcategory
        //Each timeline has 5 questions of increasing difficulty (1,2,4,8,16)
        //fill array with numbers 1 to 100
        let availableIDs = [];
        for(let i=1;i<this.amountOfTimelines;i++){
            availableIDs.push(i);
        }
        this.shuffleArray(availableIDs);
        //group questions by category
        const questionGroupedByCategory= this.GroupQuestionsByKey('category');
        

        //Create SubCategories of questions
        for (const category in questionGroupedByCategory) {
            const questionsWithSameID = this.GroupQuestionsByKey("subcategory",questionGroupedByCategory[category]);
            for (const subcategory in questionsWithSameID) {
                //get ID for timeline
                const timelineID = availableIDs.pop();
                const questions = questionsWithSameID[subcategory];
                //Create timeline only if there are exactly 5 questions
                if (questions.length === 5) {
                    const timeline = new Timeline(timelineID, questions);
                    this.arrayOfTimelines.push(timeline);
                }
            }
                
        }
        //verify timelines
        console.log(this.arrayOfTimelines);   
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            // Pick a random index from 0 to i
            const j = Math.floor(Math.random() * (i + 1));

            // Swap elements at indices i and j
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    

    GroupQuestionsByKey(key,questions=this.QuestionList) {
        return questions.reduce((acc, question) => {
            if (!acc[question[key]]) {
                acc[question[key]] = [];
            }
            acc[question[key]].push(question);
            return acc;
        }, {});
        
    }

    getCurrentTimeline(){
        return this.arrayOfTimelines[this.currentIndex];
    }
    getNextTimeline(){
        //periodic array access
        this.currentIndex=(this.currentIndex+1)%this.arrayOfTimelines.length;
        return this.getCurrentTimeline();
    }
    getPreviousTimeline(){
        //periodic array access
        this.currentIndex=(this.currentIndex-1+this.arrayOfTimelines.length)%this.arrayOfTimelines.length;
        return this.getCurrentTimeline();
    }

}