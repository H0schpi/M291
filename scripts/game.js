const dino = document.getElementById("dino")
const rock = document.getElementById("rock")
const goodie = document.getElementById("goodie")
const goodiesCollected = document.getElementById("goodies-value")
const score = document.getElementById("score")
const highscore = document.getElementById("highscore-value")
const gameContainer = document.getElementById("game")
const background = document.getElementById("background")
const gameOver = document.getElementById("gameOver")
const startScreen = document.getElementById("startScreen")

let gameLoopInterval = 0

const getHighscore = () => {
  const storedHighscore = localStorage.getItem("highscore")
  highscore.innerText = storedHighscore
  console.log(storedHighscore)
}


getHighscore()

const startGame = () => {
  gameOver.style.display = "none";
  background.classList.add("bg-animation")
  rock.classList.add("rock-animation")
  goodie.classList.add("goodie-animation")
  startScreen.style.display = "none"
  resetScore()
  startGameLoop()
  dino.classList.remove("dino-dies")
}



const resetScore = () => {
  score.innerText = 0
  goodiesCollected.innerText = 0
}

const jump = () => {
  dino.classList.add("jump-animation")
  setTimeout(() => {
    dino.classList.remove("jump-animation")
  }, 500)
}

const dieAnimation = () => {
  dino.classList.add("dino-dies")
}

gameContainer.addEventListener('click', (event) => {
  if (!gameLoopInterval) {
    startGame()
  }
  else {
    if (!dino.classList.contains('jump-animation')) {
      jump()
    }
  }

})

const stopGame = async () => {
  await dieAnimation()
  const scoreNumber = Number(score.innerText)
  const highscoreNumber = Number(highscore.innerText)
  if (scoreNumber > highscoreNumber) {
    highscore.innerText = scoreNumber
    localStorage.setItem("highscore", scoreNumber)
    gameOver.style.display = "block";
  }
  background.classList.remove("bg-animation")
  rock.classList.remove("rock-animation")
  goodie.classList.remove("goodie-animation")

  startScreen.style.display = "block"
  gameLoopInterval = clearInterval(gameLoopInterval)
}

const randomizeGoodieAnimation = (goodieLeft) => {
  const max = 5;
  const min = 1;
  const random = Math.floor(Math.random() * (max - min + 1) + min);
  if (goodieLeft === 550) {
    goodie.style.animationName = "goodie" + random;
  }
};


const startGameLoop = () => {
  gameLoopInterval = window.setInterval(() => {
    const dinoTop = parseInt(window.getComputedStyle(dino)
      .getPropertyValue('top'))
    const rockLeft = parseInt(window.getComputedStyle(rock)
      .getPropertyValue('left'))
    const goodieLeft = parseInt(window.getComputedStyle(goodie)
      .getPropertyValue('left'))
    const goodieTop = parseInt(window.getComputedStyle(goodie)
      .getPropertyValue('top'))

    score.innerText = Number(score.innerText) + 1

    randomizeGoodieAnimation(goodieLeft)

    if (rockLeft < 0) {
      rock.style.display = 'none'
    } else {
      rock.style.display = ''
    }

    if (goodieLeft < 0) {
      goodie.style.display = 'none'
    } else {
      goodie.style.display = ''
    }

    if (goodieLeft < 50 && dinoTop < (goodieTop + 50)) {
      goodie.style.display = 'none';
      goodiesCollected.innerText = Number(goodiesCollected.innerText) + 1;
      score.innerText = Number(score.innerText) + 30;
    }

    if (rockLeft < 50 && rockLeft > 0 && dinoTop > 150) {
      stopGame()
    }
  }, 50)

}


