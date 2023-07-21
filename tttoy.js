
const CROSS = 'cross';
const CIRCLE = 'circle';
let isCircle;
const boardElements = document.getElementById("board");
const winningMessage = document.getElementById("message");
const winningElement = document.getElementById("winning-message");
const WINNING_POSSIBLITY = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cells = Array.from(boardElements.children);
startGame()
const restart = document.getElementById("restart")
restart.addEventListener("click",startGame)
function startGame(){
    isCircle=false;
cells.forEach(element => {
    element.classList.remove(CIRCLE)
    element.classList.remove(CROSS)
    winningElement.classList.remove("show")
    element.removeEventListener("click",startFill)
    element.addEventListener("click", startFill,{once:true});
});
setBoardHoverClass()
}

function startFill(e){
    const current = e.target;
    const currTargetCss = isCircle?CIRCLE:CROSS;
    setCssClass(current,currTargetCss);
    if(winningGame(currTargetCss)){
        endGame(false)
    }else if(isDrow()){
         endGame(true)
    }else{
        shiftState()
        setBoardHoverClass()
    }
}
function isDrow(){
    return cells.every(cell=>{
        return cell.classList.contains(CIRCLE) || cell.classList.contains(CROSS);
    })
}
function endGame(bool){
    if(bool){
        winningMessage.innerText = "Draw Game!"
    }else{
        winningMessage.innerText = isCircle?'Win O':'win X';
    }
    winningElement.classList.add("show")
}
function setCssClass(element, currClass){
    element.classList.add(currClass);
   
}
function shiftState(){
    isCircle = !isCircle
}

function setBoardHoverClass(){
    boardElements.classList.remove("circle")
    boardElements.classList.remove("cross")
    boardElements.classList.add(isCircle?CIRCLE:CROSS);
}

function winningGame(currentClass){
    return WINNING_POSSIBLITY.some(combination=>{
        return combination.every(index=>{
            return cells[index].classList.contains(currentClass)
        })
    })
}