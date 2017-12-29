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
        addQuestion: function(q,answers, answer, player){
            repository.questions.push(new Question(q,answers,answer));
            repository.players[player].questions.push(new Question(q,answers,answer));
            //console.log(repository.players[0]);
        },
        addPlayer: function(name, score, qsts){
            repository.players.push(new Player(name, score,qsts));
            return repository.players.length - 1;
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

    var addPlayerToUI = function(name,id){
        //var html = '<div id="player-%id%"><h3>%playerName%</h3></div>';
        //var newHtml = html.replace('%playerName%', name);
        //newHtml = newHtml.replace('%id%', id);
        //document.querySelector(DOMStrings.playerOne).insertAdjacentHTML('beforeend',newHtml);
        var x = document.querySelector(DOMStrings.playerOne);
        var option = document.createElement("option");
        option.text = name;
        option.value = id;
        x.add(option,x[0]);
        x.selectedIndex = x[0];
    };

    return {
        getDOMStrings: function(){
            return DOMStrings;
        },
        addPlayer: function(name,id){
            //1. display in UI
            addPlayerToUI(name,id);
        },
        getPlayerInput: function(){
            return document.getElementById(DOMStrings.playerInput).value;
        },
        selectPlayer: function(playerId){
            document.getElementById(playerId).classList.add('red');
        }
    };
})();

var gameController =(function (questionCtrl, uiCtrl) {
    var DOMStrings = uiCtrl.getDOMStrings();
    var selectedPlayer;

    var addPlayer = function(){
        var input, id;
        //1. get input
        input = UIController.getPlayerInput();
        //2. add player
        id = questionController.addPlayer(input,0,[]);
        //3. update UI
        UIController.addPlayer(input,id);
    };

    var selectPlayer = function(event){
        var playerId = event.target.parentNode.id;
        var splitPlayerId = playerId.split('-');
        selectedPlayer = splitPlayerId[1];
        UIController.selectPlayer(playerId);
        console.log('selected player: '+ selectedPlayer);
    }

    var setupEventListeners = function(){
        document.querySelector(DOMStrings.addPlayerBtn).addEventListener('click', addPlayer);
        document.querySelector(DOMStrings.playerOne).addEventListener('click', selectPlayer);
    };

    return {
        init : function(){
            console.log('game started....');
            setupEventListeners();

        },
        addQuestion: function(question, answers, rightAnswer) {
            questionController.addQuestion(question,answers,rightAnswer,selectedPlayer);
        }

    };

})(questionController, UIController);
gameController.init();