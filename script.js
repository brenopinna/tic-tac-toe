const startButton = document.getElementById("start")
const turnText = document.getElementById("turn")
const boardHouses = document.querySelectorAll(".board-house")

let turnPlayer
let xPlayer, oPlayer

startButton.addEventListener("click", () => {
  boardHouses.forEach(house => {
    house.style.backgroundColor = "white"
    house.innerText = ""
    house.style.cursor = "pointer"
    house.removeAttribute("data-symble")
    house.addEventListener("click", handleClick)
    house.addEventListener("mouseenter", handleHover)
    house.addEventListener("mouseleave", handleBlur)
  })
  xPlayer = { name: prompt("Qual o nome do jogador 1 (X)?") || "X", symble: "X" }
  oPlayer = { name: prompt("Qual o nome do jogador 2 (O)?") || "O", symble: "O" }
  turnPlayer = xPlayer
  turnText.innerText = `Jogador da vez: ${turnPlayer.name}`
})

function handleClick(e) {
  e.target.dataset.symble = turnPlayer.symble
  e.target.innerText = turnPlayer.symble
  freezeBoardHouse(e.target)
  if (checkWin()) {
    freezeGame(`${turnPlayer.name} venceu!`)
    return
  } else if (checkTie()) {
    freezeGame("Deu velha!!!")
    return
  }
  changeTurnPlayer()
}

function handleHover(e) {
  e.target.innerText = turnPlayer.symble
}

function handleBlur(e) {
  e.target.innerText = ""
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

function isTurnPlayerSymbol(houseIndex) {
  return boardHouses[houseIndex].dataset.symble === turnPlayer.symble
}

function changeTurnPlayer() {
  turnPlayer = turnPlayer === xPlayer ? oPlayer : xPlayer
  turnText.innerText = `Jogador da vez: ${turnPlayer.name}`
}

function freezeGame(text) {
  turnText.innerText = text
  boardHouses.forEach(house => freezeBoardHouse(house))
}

function freezeBoardHouse(house) {
  house.removeEventListener("click", handleClick)
  house.removeEventListener("mouseenter", handleHover)
  house.removeEventListener("mouseleave", handleBlur)
  house.style.cursor = "not-allowed"
}
