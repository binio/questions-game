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
        'addPlayerBtn': '.add-player',
        'playerInput': 'player'
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
        addPlayer: function(name){
            //1. display in UI
            addPlayerToUI(name);
        },
        getPlayerInput: function(){
            return document.getElementById(DOMStrings.playerInput).value;
        }
    };
})();

var gameController =(function (questionCtrl, uiCtrl) {
    var DOMStrings = uiCtrl.getDOMStrings();

    var addPlayer = function(){
        //1. get input
        var input = UIController.getPlayerInput();
        //2. add player
        questionController.addPlayer(input,0,[]);
        //3. update UI
        UIController.addPlayer(input);
    }
    var setupEventListeners = function(){
        document.querySelector(DOMStrings.addPlayerBtn).addEventListener('click', addPlayer);
    };
    return {
        init : function(){
            console.log('game started....');
            setupEventListeners();

        },
        addQuestion: function(question, answers, rightAnswer) {
            questionController.addQuestion(question,answers,rightAnswer);
        }

    };

})(questionController, UIController);
gameController.init();