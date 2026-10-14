const boxes = document.querySelectorAll(".box");
const msgContainer = document.querySelector('.msg-container');
const msg = document.querySelector('#msg')
const newBtn = document.querySelector("#new-btn");
const resetBtn = document.querySelector("#reset");


let turnO = true;
let count = 0;
let winner = null;


const winPattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
[0, 3, 6], [1, 4, 7], [2, 5, 8],
[0, 4, 8], [2, 4, 6]];

boxes.forEach(function (box) {
    box.addEventListener('click', function () {
        if (winner || box.textContent) {
            return;
        }

        if (turnO) {
            box.textContent = 'O';
            box.classList.add('O-move');
        }
        else {
            box.textContent = 'X';
            box.classList.add('X-move');
        }

        turnO = !turnO;
        count++;

        checkWinner();
    });

});

function checkWinner() {
    for (const pattern of winPattern) {
        const [a, b, c] = pattern;

        if (boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && boxes[a].textContent === boxes[c].textContent) {
            winner = boxes[a].textContent;
            msg.textContent = `Winner: ${winner}`;
            msgContainer.classList.remove('hide');
        }
    }
    if (count === 9) {
        msg.textContent = "Draw";
        msgContainer.classList.remove('hide');
    }

}

function resetGame() {
    boxes.forEach(function (box) {
        box.textContent = '';
        box.classList.remove('X-move', 'O-move');
    });

    turnO = true;
    count = 0;
    winner = null;
    msgContainer.classList.add('hide');
}

newBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);