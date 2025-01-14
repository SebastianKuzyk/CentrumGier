document.addEventListener("DOMContentLoaded", () => {
    const memoryBoard = document.querySelector(".memory-board");
    const restartButton = document.getElementById("restart-memory");

    if (!memoryBoard || !restartButton) {
        console.error("Brak elementów gry!");
        return;
    }

    const icons = [
        "🍎", "🍌", "🍇", "🍒", 
        "🥝", "🍓", "🍍", "🍉",
        "🍎", "🍌", "🍇", "🍒", 
        "🥝", "🍓", "🍍", "🍉"
    ];

    let shuffledIcons, firstCard, secondCard, lockBoard;

    function createBoard() {
        shuffledIcons = [...icons].sort(() => Math.random() - 0.5);
        memoryBoard.innerHTML = "";
        lockBoard = false;
        firstCard = null;
        secondCard = null;
    
        shuffledIcons.forEach(icon => {
            const cell = document.createElement("div");
            cell.classList.add("memory-cell");
            cell.dataset.icon = icon;
            cell.dataset.hidden = icon;
            cell.addEventListener("click", flipCard);
            memoryBoard.appendChild(cell);
        });
    }
    

    function flipCard() {
        if (lockBoard || this === firstCard) return;

        this.textContent = this.dataset.icon;
        this.classList.add("flipped");

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        setTimeout(checkMatch, 800);
    }

    function checkMatch() {
        if (firstCard.dataset.icon === secondCard.dataset.icon) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard.removeEventListener("click", flipCard);
            secondCard.removeEventListener("click", flipCard);
        } else {
            firstCard.textContent = "";
            secondCard.textContent = "";
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
        }

        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    restartButton.addEventListener("click", createBoard);

    createBoard();
});

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.textContent = "";
        secondCard.textContent = "";
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        resetBoard();
    }, 1000);
}