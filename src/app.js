var questionController = (function(){
    var Question = function(question, answers, rightAnswer){
        this.question = question;
        this.answers = answers;
        this.rightAnswer = rightAnswer;
    };

    var repository = {
        questions: []
    };

    return {
        addQuestion: function(question){
            repository.questions.push(question);
        },
        newQuestion: function(q,as,ra){
            return new Question(q,as,ra);
        },
        testing: function(){
            return repository;
        }
    };
})();

var gameController =(function (questionCtrl) {
    return {
        init : function(){
            console.log('game started....');

        },
        addQuestion: function(question) {
            questionController.addQuestion(question);
        }
    };

})(questionController);
gameController.init();