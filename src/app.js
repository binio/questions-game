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
        getNumOfPlayers: function(){
            return repository.players.length;
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
        'addQuestionBtn': 'add-question-btn',
        'playerInput': 'player',
        'playerSelect':'.player-select',
        'userDropDown': 'userDropDown',

    };

    var addPlayerToUI = function(name,id){
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
        displayPlayers: function(number){
            var playerSelect = document.querySelector(DOMStrings.playerSelect);
            if(number > 0){
                playerSelect.hidden = false;
            } else {
                playerSelect.hidden = true;
            }
        },
        clearPlayerInput: function() {
            document.getElementById(DOMStrings.playerInput).value = '';
        },
        addQuestion: function(){

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
        //4. Show select players
        UIController.displayPlayers(questionController.getNumOfPlayers());
        //5. Clear player input
        UIController.clearPlayerInput();
    };

    var selectPlayer = function(event){
        var index = event.target.selectedIndex;
        var options = document.getElementById(DOMStrings.userDropDown).options;
        console.log(options[index].text + ' ' + options[index].value);
    };

    var setupEventListeners = function(){
        document.querySelector(DOMStrings.addPlayerBtn).addEventListener('click', addPlayer);
        document.getElementById(DOMStrings.userDropDown).addEventListener('change',selectPlayer);
        document.getElementById(DOMStrings.addQuestionBtn).addEventListener('click', addQuestion);

    };

    return {
        init : function(){
            console.log('game started.....');
            setupEventListeners();
            UIController.displayPlayers(questionController.getNumOfPlayers());

        },
        addQuestion: function() {
            //1.get active user
            //2.get question
            //3.get answers
            //4.prepare Question object
            //5.add question to collection and user
            //questionController.addQuestion(question,answers,rightAnswer,selectedPlayer);
        }

    };

})(questionController, UIController);
gameController.init();