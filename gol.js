class gameBoard {
    constructor(numberRow, numberCol){
        this.numberRow = numberRow;
        this.numberCol = numberCol;
        this.grid = Array(numberRow);

        for (let i = 0; i < numberRow ; i++){
            this.grid[i]=[];
        }
        for (let i = 0; i < numberRow; i++){
            for (let j = 0; j < numberCol; j++) {
                    this.grid[i][j]=0; 
            }
        }
    }
    numberRows() {
        return this.numberRow;
    }
    numberCols() {
        return this.numberCol;
    }
    result() {
        return this.grid;
    }
    getElement(row, col) {
        return this.grid[row][col];
    }
    birth(row, col) {
        this.grid[row][col] = 1;
    }
    death(row, col){
        this.grid[row][col] = 0;
    }
    elementNhb(row, col){
        let nhbMeasure = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let x = (row + i + this.numberRow) % this.numberRow ;
                let y = (col + j + this.numberCol) % this.numberCol ;
                nhbMeasure += this.grid[x][y] ;
            }
        }
        nhbMeasure -= this.grid[row][col];
        return nhbMeasure;
    }
}

function setGeneration(generation){
}

function nextGeneration(generation){
    nextBoard = new gameBoard(generation.numberRows(), generation.numberCols());
    for (let i = 0; i < generation.numberRows(); i++){
        for (let j = 0; j < generation.numberCols(); j++) {
            if (generation.getElement(i,j) == 1) {
                if (generation.elementNhb(i,j) < 2) {
                    nextBoard.death(i,j);
                }
                if (generation.elementNhb(i,j) == 2 || generation.elementNhb(i,j) == 3) {
                    nextBoard.birth(i,j);
                }
                if (generation.elementNhb(i,j) > 3) {
                    nextBoard.death(i,j);
                }
            } else {
                if (generation.elementNhb(i,j) == 3) {
                    nextBoard.birth(i,j);
                }
            } 
        }
    }
    for (let i = 0; i < generation.numberRows(); i++){
        for (let j = 0; j < generation.numberCols(); j++) {
            generation.grid[i][j] = nextBoard.grid[i][j]
        }
    }
}

// Presets
function glider(currGeneration,i,j) {
    // ordered row by row
    // left most element is (i,j)
    currGeneration.birth(i,j);
    currGeneration.birth(i+1,j-2);
    currGeneration.birth(i+1,j);
    currGeneration.birth(i+2,j-1);
    currGeneration.birth(i+2,j);
}
function spaceShip(currGeneration, i, j){
    // ordered row by row
    // left most element is (i,j)
    currGeneration.birth(i,j);
    currGeneration.birth(i,j+3);
    currGeneration.birth(i+1,j+4);
    currGeneration.birth(i+2,j);
    currGeneration.birth(i+2,j+4);
    currGeneration.birth(i+3,j+1);
    currGeneration.birth(i+3,j+2);
    currGeneration.birth(i+3,j+3);
    currGeneration.birth(i+3,j+4);
}
function gliderGun(currGeneration, i, j){
    // ordered row by row
    // left most element is (i,j)
    currGeneration.birth(i-4,j+24);
    currGeneration.birth(i-3,j+24);
    currGeneration.birth(i-3,j+22);
    currGeneration.birth(i-2,j+21);
    currGeneration.birth(i-2,j+20);
    currGeneration.birth(i-2,j+12);
    currGeneration.birth(i-2,j+13);
    currGeneration.birth(i-1,j+21);
    currGeneration.birth(i-1,j+20);
    currGeneration.birth(i-1,j+11);
    currGeneration.birth(i-1,j+15);
    currGeneration.birth(i,j);
    currGeneration.birth(i,j+1);
    currGeneration.birth(i,j+10);
    currGeneration.birth(i,j+16);
    currGeneration.birth(i,j+21);
    currGeneration.birth(i,j+20);
    currGeneration.birth(i+1,j);
    currGeneration.birth(i+1,j+1);
    currGeneration.birth(i+1,j+10);
    currGeneration.birth(i+1,j+14);
    currGeneration.birth(i+1,j+16);
    currGeneration.birth(i+1,j+17);
    currGeneration.birth(i+1,j+22);
    currGeneration.birth(i+1,j+24);
    currGeneration.birth(i+2,j+10);
    currGeneration.birth(i+2,j+16);
    currGeneration.birth(i+2,j+24);
    currGeneration.birth(i+3,j+11);
    currGeneration.birth(i+3,j+15);
    currGeneration.birth(i+4,j+12);
    currGeneration.birth(i+4,j+13);
}
// Draw Section
// Initialize
let resolution = 20;
let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");
canvas.addEventListener('click', clickGrid);

// Draw functions 

function initBoard() {
    context.clearRect(0, 0, canvas.width,canvas.height);
    for (let i = 0; i < numberRow; i++) {
        for (let j = 0; j < numberCol; j++) {
            context.strokeStyle = "0000";
            context.strokeRect(j*resolution, i*resolution, resolution-1, resolution-1);
        }
    }
}

function updateBoard(currGeneration){
    context.clearRect(0, 0, canvas.width,canvas.height);
    for (let i = 0; i < numberRow; i++) {
        for (let j = 0; j < numberCol; j++) {
            if (currGeneration.getElement(i,j) == 1) {
                context.fillstyle = "#000";
                context.fillRect(j*resolution, i*resolution, resolution-1, resolution-1);
            } else{
                context.strokeStyle = "0000";
                context.strokeRect(j*resolution, i*resolution, resolution-1, resolution-1);
            } 
        }
    }
}

// Interations

function clickGrid(ev){
    canvas.fillstyle = "000";
    context.fillRect(Math.floor(ev.offsetX / resolution)*resolution, Math.floor(ev.offsetY / resolution)*resolution, resolution-1, resolution-1);
    currBoard.birth(Math.floor(ev.offsetY / resolution),Math.floor(ev.offsetX / resolution));
}

let prevTime;
let interval = null;
document.getElementById("start").onclick = function () {
    var i = 0;
    interval = setInterval(function () {
        updateBoard(currBoard);
        nextGeneration(currBoard);
    }, 300);
};

document.getElementById("pause").onclick = function () {
    clearInterval(interval);

};
document.getElementById("clear").onclick = function () {
    currBoard = new gameBoard(numberRow,numberCol);
    clearInterval(interval);
    initBoard(currBoard);
};

document.getElementById("pres1").onclick = function () {
    currBoard = new gameBoard(numberRow,numberCol);
    glider(currBoard, i, j);
    updateBoard(currBoard);
};
document.getElementById("pres2").onclick = function () {
    currBoard = new gameBoard(numberRow,numberCol);
    spaceShip(currBoard, i, j);
    updateBoard(currBoard);
};
document.getElementById("pres3").onclick = function () {
    currBoard = new gameBoard(numberRow,numberCol);
    gliderGun(currBoard, i, j);
    updateBoard(currBoard);
};
// Initialize Game
let numberRow = 30;
let numberCol = 50;
let i = 10;
let j = 10;
currBoard = new gameBoard(numberRow,numberCol);
initBoard();