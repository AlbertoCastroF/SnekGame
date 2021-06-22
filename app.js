//variables declarations and assignment
const gameover = document.getElementById("gameover")
const grid = document.getElementById("grid-container")
const start = document.getElementById("start")
const scoreDisplay = document.getElementById("score")
const mobUpBtn = document.querySelector(".up")
const mobDownBtn = document.querySelector(".down")
const mobLeftBtn = document.querySelector(".left")
const mobRightBtn = document.querySelector(".right")
const pMobLeftBtn = document.querySelector(".pLeft")
const pMobUpBtn = document.querySelector(".pUp")
const pMobDownBtn = document.querySelector(".pDown")
const pMobRightBtn = document.querySelector(".pRight")
const pMobUpBtn2 = document.querySelector(".pUp2")
const pMobDownBtn2 = document.querySelector(".pDown2")
console.log(mobUpBtn)
// array of grid elements
let squares = []
//snek starting position
let snek = [13, 12, 11]
//snek start walking right 
let direction = 1
//apple index
let appleIndex = 0
// apples eaten
let score = 0
//grid width
const width = 10
//snek speed
let intervalTime = 1000
//speed incrementer
const speed = .9
//function that call loop for moving snek
let myTimer = 0

//space needed for moving snek
function createGrid() {
    for (let i=0; i<=99; i++) {
        const square = document.createElement("div")
        square.classList.add("square")
        grid.appendChild(square)
        squares.push(square)
    }
}

createGrid()

//rendering snake in initial state
snek.forEach(v => squares[v].classList.add("snek") )

//main function wich calls myTimer loop for moving snek and resets variables
function startGame() {
    gameover.style.display = "none"
    snek.forEach(index => squares[index].classList.remove("snek"))
    squares[appleIndex].classList.remove("apple")
    clearInterval(myTimer)
    score = 0
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    snek = [13, 12, 11]
    snek.forEach(v => squares[v].classList.add("snek") )
    generateApple()
    myTimer = setInterval(move, intervalTime)
}

//function that handles gameover, snek movement, score display,
//apple generation and speed increment
function move() {
    //conditions for losing game
    if (
        (snek[0] + width > (width*width)-1 && direction === width) || //if snek hits bottom 
        (snek[0] % width === width - 1 && direction === 1) || //if snek hits right wall
        (snek[0] % width === 0 && direction === -1) || //if snek hits left wall
        (snek[0] - width < 0 && direction === -width) || //if snek hits top
        (squares[snek[0] + direction].classList.contains("snek")) //if snek hits itself
    ) {

        //loop stops if game lost and gameover function
        gameOver()
        return clearInterval(myTimer)
    }

    //these lines move the snek by removing tail and unshifting snek class
    //to head
    const tail = snek.pop()
    squares[tail].classList.remove("snek")
    snek.unshift(snek[0] + direction)
    
    //condition to generate apple and speed increment if apple is eaten
    if (squares[snek[0]].classList.contains("apple")) {
        squares[appleIndex].classList.remove("apple")
        squares[tail].classList.add("snek")
        snek.push(tail)
        generateApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(myTimer)
        intervalTime *= speed
        myTimer = setInterval(move, intervalTime)
        
    }
    //we render snek head after apple conditions
    squares[snek[0]].classList.add("snek")


}

//we read keyboards arrows to control snek
document.addEventListener("keydown", snekControl)    

//reading mobile controls
mobUpBtn.addEventListener("click", function() {
    direction = 0
    snekUp()
})
mobDownBtn.addEventListener("click", function() {
    direction = 0
    snekDown()
})
mobLeftBtn.addEventListener("click", function() {
    direction = 0
    snekLeft()
})
mobRightBtn.addEventListener("click", function() {
    direction = 0
    snekRight()
})

//reading portrait mobile controls
pMobLeftBtn.addEventListener("click", function() {
    direction = 0
    snekLeft()
})
pMobUpBtn.addEventListener("click", function() {
    direction = 0
    snekUp()
})
pMobDownBtn.addEventListener("click", function() {
    direction = 0
    snekDown()
})
pMobRightBtn.addEventListener("click", function() {
    direction = 0
    snekRight()
})
pMobUpBtn2.addEventListener("click", function() {
    direction = 0
    snekUp()
})
pMobDownBtn2.addEventListener("click", function() {
    direction = 0
    snekDown()
})

// const pMobLeftBtn = document.querySelector(".pLeft")
// const pMobUpBtn = document.querySelector(".pUp")
// const pMobDownBtn = document.querySelector(".PDown")
// const pMobRightBtn = document.querySelector(".pRight")
// const pMobUpBtn2 = document.querySelector(".pUp2")
// const pMobDownBtn2 = document.querySelector(".pDown2")

//apple generation function
function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains("snek"))
    squares[appleIndex].classList.add("apple")
}

generateApple()

//direction assignment according to arrow pushed
function snekControl() {
    event.preventDefault()
    direction = 0
    if (event.key === "ArrowUp") {
        direction -= width
    } else if(event.key === "ArrowDown") {
        direction += width
    } else if(event.key === "ArrowLeft") {
        direction -= 1    
    } else if(event.key === "ArrowRight"){
        direction += 1    
    }
}

//direction assignment occording to mobile buttons
function snekUp() {
    direction -= width
}
function snekDown() {
    direction += width
}
function snekLeft() {
    direction -= 1
}
function snekRight() {
    direction += 1
}

//function that renders the gameover message
function gameOver() {
    gameover.style.display = "block"
    
}

//game is started or reset if start button pushed
start.addEventListener("click", startGame)



