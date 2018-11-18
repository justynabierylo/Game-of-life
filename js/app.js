document.addEventListener("DOMContentLoaded", function(event) {

    var GameOfLife = function (boardWidth,boardHeight) {

        this.width = boardWidth;
        this.height= boardHeight;
        this.board = document.getElementById("board");
        this.cells = [];

        var self = this;

        this.createBoard = function () {
            var divWidth = parseInt(this.board.querySelector('div').style.width);
            var divHeight = parseInt(this.board.querySelector('div').style.height);
            this.board.style.width = (boardWidth * divWidth) + 'px';
            this.board.style.height = (boardHeight * divHeight) + 'px';

            var boardSize = boardWidth *  boardHeight;

            for(var i = 0; i < boardSize; i++){
                var newDiv = document.createElement('div');
                this.board.appendChild(newDiv);
                this.cells.push(newDiv);
            }

            this.cells.forEach(function (el) {
                el.addEventListener("mouseover", function () {
                    this.classList.toggle('live');
                })
            })
        };
        
        this.position = function (x,y) {
            var index = x + y * this.width;
            return this.cells[index];
        };

        this.setCellState = function (x, y, state) {
            if(state === 'live') {
                this.position(x,y).classList.add('live')
            } else {
                this.position(x,y).classList.remove('live')
            }
        };

        this.firstGlider = function(){
            this.setCellState(3, 3, 'live');
            this.setCellState(4, 2, 'live');
            this.setCellState(3, 8, 'live');
            this.setCellState(2, 8, 'live');
            this.setCellState(3,5, 'live');
            this.setCellState(4,5, 'live');
            this.setCellState(5,5, 'live');
            this.setCellState(2,9, 'live');
        };

        this.computeCellNextState = function(x,y){

            var aliveCounter = 0;

            for(var i = y-1; i < y+2; i++){
                for (var j = x-1; j < x+2; j++){

                    if ( (!( i===y && j===x))
                        && (i >= 0 && i < this.height  && j >= 0 && j < this.width)
                        && this.position(j,i).className === 'live') {

                            aliveCounter++;
                    }
                }
            }

            if(this.position(x,y).className === 'live'){

                if ( aliveCounter < 2 || aliveCounter > 3 ){
                    return 0
                } else {
                    return 1
                }

            } else {

                if(aliveCounter === 3){
                    return 1
                } else {
                    return 0
                }
            }
        };

        this.computeNextGeneration = function(){

            this.nextGeneration = [];

            for(var i =0; i<this.height; i++){
                for(var j=0; j<this.width; j++){
                    this.nextGeneration.push(this.computeCellNextState(j,i));
                }
            }
        };

        this.printNextGeneration = function(){

            self.computeNextGeneration();

            for(var i =0; i <this.cells.length; i++){
                this.cells[i].classList.remove('live');

                if(this.nextGeneration[i] === 1){
                    this.cells[i].classList.add('live')
                }
            }
        };

        this.start = function(){
            this.createBoard();
            this.firstGlider();
        };

        document.querySelector('button#play').addEventListener('click',function () {
            self.interval = setInterval(function () {
                self.printNextGeneration();
            }, 1000);
        });

        document.querySelector('button#pause').addEventListener('click',function () {
            clearInterval(self.interval);
        })
    };

    var boardWidth = prompt("Please enter board width:");
    var boardHeight = prompt("Please enter board height:");

    var game = new GameOfLife(boardWidth,boardHeight);
    game.start();
});