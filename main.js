const gameContainer = document.querySelector(".game-container")
const dialog = document.getElementById("dialog")
const  winnerContainer = document.getElementById("winner-container")

const submitBtn = document.getElementById("submit-btn")

document.getElementById("playerOne").value = ""
document.getElementById("playerTwo").value = ""
let playerOne = {
    name: "",
    mark: "X"
}
let playerTwo = {
    name: "",
    mark: "O"
}
let currentPlayer = ""

const createGameboard = () => {
    const gameboard = ["","","","","","","","",""]
    for (let i = 0; i < gameboard.length; i++) {
        gameContainer.innerHTML += `
        <div id="square-${i}" class="square"></div>
        `
    }
    gameContainer.innerHTML += `<button id="restart-button">Restart</button>`
    const restartButton = document.getElementById("restart-button")
    restartButton.addEventListener("click", () => {
        restartGame()
    })
}

const newGame = () => {
playerOne.name = document.getElementById("playerOne").value
playerTwo.name  = document.getElementById("playerTwo").value
currentPlayer = playerOne

document.querySelector(".message").textContent = `Welcome ${playerOne.name} (X) & ${playerTwo.name} (O)!`
updatePage()

}

submitBtn.addEventListener("click", () => {
    if (document.getElementById("playerOne").value !== "" &&
    document.getElementById("playerTwo").value !== "")
    newGame()
})
const checkWin = (squares, currentPlayer) => {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ]
    return winConditions.some(conidition => {
        return conidition.every(index => {
            return squares[index].textContent === currentPlayer.mark
        })
    })
}

const checkDraw = (squares) => {
    return Array.from(squares).every(square => square.textContent !== "")
}
const restartGame = () => {
    gameContainer.innerHTML = ""
    winnerContainer.innerHTML = ""
    document.getElementById("playerOne").value = ""
    document.getElementById("playerTwo").value = ""
    document.querySelector(".message").textContent = ""
    playerOne = {
        name: "",
        mark: "X"
    }
    playerTwo = {
        name: "",
        mark: "O"
    }
    currentPlayer = ""
    dialog.show()
}

const updatePage = () => {
    createGameboard()
    const squares = document.querySelectorAll(".square")
    squares.forEach((square) => {
        square.addEventListener("click", () => {
            if (square.textContent === "") {
                square.textContent = currentPlayer.mark

                if (checkWin(squares, currentPlayer)) {
                    document.querySelector(".message").textContent = ""
                    gameContainer.innerHTML = ""
                    winnerContainer.innerHTML =  `
                    <div id="winner-container">
                        <p id="winner-p">${currentPlayer.name} Wins!</p>
                        <button id="play-again-btn">Play Again?</button>
                    </div>
                    `
                    const playAgainBtn = document.getElementById("play-again-btn")
                    playAgainBtn.addEventListener("click", () => restartGame())

                } else if (checkDraw(squares)) {
                    alert("It's a draw")
                } else {
                    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne
                    document.querySelector(".message").textContent = (`Next player: ${currentPlayer.name} (${currentPlayer.mark})`)
                }
            }
            
        })
    })
}










