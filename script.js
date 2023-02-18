const startButton = document.getElementById("start")
const turnText = document.getElementById("turn")
const boardHouses = document.querySelectorAll(".board-house")

let gameStarted = false
let won = false
let turnPlayer
let xPlayer, oPlayer

startButton.addEventListener("click", startGame)

boardHouses.forEach(boardHouse => {
  boardHouse.addEventListener("mouseenter", () => {
    if (!gameStarted || boardHouse.dataset.symble) return
    boardHouse.innerText = turnPlayer.symble
  })
  boardHouse.addEventListener("mouseleave", () => {
    if (!gameStarted || boardHouse.dataset.symble) return
    boardHouse.innerText = ""
  })
  boardHouse.addEventListener("click", () => {
    if (!gameStarted || boardHouse.dataset.symble !== undefined) return
    insertSymble(boardHouse)
    if (checkWin()) {
      endGame(`${turnPlayer.name} venceu!`)
    } else if (checkTie()) {
      endGame("Deu velha!!!")
    }
    if (won) return
    changeTurnPlayer()
  })
})

function startGame() {
  gameStarted = true
  won = false
  boardHouses.forEach(house => {
    house.style.backgroundColor = "white"
    house.removeAttribute("data-symble")
    house.innerText = ""
  })
  xPlayer = { name: prompt("Qual o nome do jogador 1 (X)?") || "X", symble: "X" }
  oPlayer = { name: prompt("Qual o nome do jogador 2 (O)?") || "O", symble: "O" }
  turnPlayer = xPlayer
  showTurnPlayer()
}

function showTurnPlayer() {
  turnText.innerText = `Jogador da vez: ${turnPlayer.name}`
}

function insertSymble(house) {
  house.dataset.symble = turnPlayer.symble
  house.innerText = turnPlayer.symble
}

function checkWin() {
  const winMatches = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let match of winMatches) {
    if (match.map(index => isTurnPlayerSymbol(index)).every(match => match === true)) {
      for (let index of match) {
        boardHouses[index].style.backgroundColor = "green"
      }
      return true
    }
  }
}

function checkTie() {
  return Array.from(boardHouses)
    .map(house => house.dataset.symble)
    .every(symble => symble !== undefined)
}

function endGame(text) {
  turnText.innerText = text
  gameStarted = false
  won = true
}

function isTurnPlayerSymbol(houseIndex) {
  return boardHouses[houseIndex].dataset.symble === turnPlayer.symble
}

function changeTurnPlayer() {
  turnPlayer = turnPlayer === xPlayer ? oPlayer : xPlayer
  turnText.innerText = `Jogador da vez: ${turnPlayer.name}`
  showTurnPlayer()
}
