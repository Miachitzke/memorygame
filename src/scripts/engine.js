const emojis = [
  "👽",
  "👽",
  "☠️",
  "☠️",
  "🐸",
  "🐸",
  "🐽",
  "🐽",
  "🐲",
  "🐲",
  "🦈",
  "🦈",
  "🦐",
  "🦐",
  "🐓",
  "🐓",
];

let openedCards = [];

let shuffledCards = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < emojis.length; i++) {
  let card = document.createElement("div");
  card.className = "item";
  card.innerText = shuffledCards[i];
  card.onclick = flipCard;
  document.querySelector(".game").appendChild(card);
}

var mute = document.querySelector("#sound");
var mutado = mute.classList.contains("muted");
mute.addEventListener("click", () => {
  if (mutado) {
    mute.classList.remove("muted");
    mute.classList.add("unmuted");
    mute.style.background = "src/img/muted.png";
  } else {
    mute.classList.remove("unmuted");
    mute.classList.add("muted");
    mute.style.background = "src/img/unmuted.png";
  }
  mutado = !mutado;
});

function flipCard() {
  // Verifica se a carta já está aberta
  if (this.classList.contains("boxOpened")) {
    return;
  }
  // Verifica se já tem duas cartas abertas
  if (openedCards.length < 2) {
    soundEffect("flip");
    this.classList.add("boxOpened");
    openedCards.push(this);
  }
  // Verifica o conteudo das cartas abertas
  if (openedCards.length === 2) {
    setTimeout(() => {
      checkMatch();
    }, 500);
  }
}

function soundEffect(som) {
  var audio = new Audio(`src/sounds/${som}.mp3`);
  audio.muted = mutado;
  audio.play();
}

function hideMatchedCards() {
  if (openedCards.length === 2) {
    openedCards[0].style.visibility = "hidden";
    openedCards[1].style.visibility = "hidden";
  }
}

function checkMatch() {
  if (openedCards.length !== 2) {
    return;
  }

  if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
    soundEffect("match");
    openedCards[0].classList.add("boxMatched");
    openedCards[1].classList.add("boxMatched");
    setTimeout(hideMatchedCards(), 1000);
  } else {
    soundEffect("wrong");
    openedCards[0].classList.remove("boxOpened");
    openedCards[1].classList.remove("boxOpened");
  }
  openedCards = [];

  let matchedCards = document.querySelectorAll(".boxMatched");
  if (matchedCards.length === emojis.length) {
    soundEffect("win");
    endGame();
  }
}

function endGame() {
  var reset = document.querySelector("#reset");
  reset.style.visibility = "hidden";

  var endMessage = document.createElement("div");
  endMessage.id = "end-game";
  endMessage.classList.add("center-content");
  var messageContent = document.createElement("p");
  messageContent.innerHTML =
    `PARABÉNS! <br/> Você venceu!`;
  endMessage.appendChild(messageContent);

  var playAgainBtn = document.createElement("button");
  playAgainBtn.textContent = "Jogar novamente";
  playAgainBtn.addEventListener("click", () => {
    window.location.reload();
  });
  playAgainBtn.style.marginTop = "15px";
  playAgainBtn.style.padding = "1rem";
  endMessage.appendChild(playAgainBtn);

  document.body.appendChild(endMessage);
}