var questionController = (function(){
    var Question = function(question, answers, rightAnswer){
        this.question = question;
        this.answers = answers;
        this.rightAnswer = rightAnswer;
    };

    var Player = function(name,score,questions){
        this.name = name;
        this.score = score;
        this.questions = questions;
    };

    var repository = {
        questions: [],
        players:[]
    };

    return {
        addQuestion: function(q,answers, answer){
            repository.questions.push(new Question(q,answers,answer));
        },
        addPlayer: function(name, score, qsts){
            repository.players.push(new Player(name, score,qsts));
        },
        testing: function(){
            return repository;
        }
    };
})();

var UIController = (function(){
    var DOMStrings = {
        'playerOne': '.user-1',
        'addPlayerBtn': '.add-player'
    };

    var addPlayerToUI = function(name){
        var html = '<h3>%playerName%</h3>';
        var newHtml = html.replace('%playerName%', name);
        document.querySelector(DOMStrings.playerOne).insertAdjacentHTML('beforeend',newHtml);
    };

    return {
        getDOMStrings: function(){
            return DOMStrings;
        },
        addPlayer: function(name, score, questions){
            //1. add player to play
            questionController.addPlayer(name,score,questions);
            //2. display in UI
            addPlayerToUI(name);

        }
    };
})();

var gameController =(function (questionCtrl, uiCtrl) {
    var DOMStrings = uiCtrl.getDOMStrings();

    var setupEventListeners = function(){
        document.querySelector(DOMStrings.addPlayerBtn).addEventListener('click',function(){
            console.log('player to add');
        });
    };
    return {
        init : function(){
            console.log('game started....');
            setupEventListeners();

        },
        addQuestion: function(question, answers, rightAnswer) {
            questionController.addQuestion(question,answers,rightAnswer);
        },
        addPlayer: function(name,score,questions){
            UIController.addPlayer(name,score,questions);
        }
    };

})(questionController, UIController);
gameController.init();