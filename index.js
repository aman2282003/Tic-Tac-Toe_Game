let boxElements = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-btn");
let newGameButton = document.querySelector("#new-btn");
let messageContainer = document.querySelector(".msg-container");
let message = document.querySelector("#msg");

let isPlayerOTurn = true; //playerX, playerO
let moveCount = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  isPlayerOTurn = true;
  moveCount = 0;
  enableBoxes();
  messageContainer.classList.add("hide");
};

boxElements.forEach((box) => {
  box.addEventListener("click", () => {
    if (isPlayerOTurn) {
      //playerO
      box.innerText = "O";
      isPlayerOTurn = false;
      box.style.color = "orange"
    } else {
      //playerX
      box.innerText = "X";
      isPlayerOTurn = true;
    }
    box.disabled = true;
    moveCount++;

    let isWinner = checkWinner();

    if (moveCount === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  message.innerText = `Game was a Draw.`;
  messageContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxElements) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxElements) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  message.innerText = `Congratulations, Winner is ${winner}`;
  messageContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxElements[pattern[0]].innerText;
    let pos2Val = boxElements[pattern[1]].innerText;
    let pos3Val = boxElements[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};
newGameButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);
