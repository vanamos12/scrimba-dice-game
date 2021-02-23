// Create variables for the game state
let player1Score = 0
let player2Score = 0
let player1Turn = true
let nbTurns = 0
let nbPlay = 0
const NB_TURNS_TO_WIN = 5

// Create variables to store references to the necessary DOM nodes
const player1Dice = document.getElementById("player1Dice")
const player2Dice = document.getElementById("player2Dice")
const player1Scoreboard = document.getElementById("player1Scoreboard")
const player2Scoreboard = document.getElementById("player2Scoreboard")
const message = document.getElementById("message")
const rollBtn = document.getElementById("rollBtn")
const resetBtn = document.getElementById("resetBtn")
const doubleNothingBtn = document.getElementById("doubleNothingBtn")

function reset(){
    player1Score = 0
    player2Score = 0
    player1Turn = true
    player1Dice.textContent = '-'
    player2Dice.textContent = '-'
    player1Scoreboard.textContent = '0'
    player2Scoreboard.textContent = '0'
    message.textContent = 'Player 1 Turn'
    rollBtn.style.display = 'block'
    doubleNothingBtn.style.display = 'block'
    resetBtn.style.display = 'none'
    player1Dice.classList.add('active')
    player2Dice.classList.remove('active')
    message.classList.remove("message-animation")
}

function showDisplayButton() {
    rollBtn.style.display = "none"
    doubleNothingBtn.style.display = "none"
    resetBtn.style.display = "block"
}

function showWinner(messageText){
    message.textContent = messageText
    message.classList.add("message-animation")
}

function play(randomNumber){
    if (player1Turn) {
        player1Score += randomNumber
        player1Scoreboard.textContent = player1Score
        player1Dice.textContent = randomNumber
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
    } else {
        player2Score += randomNumber
        player2Scoreboard.textContent = player2Score
        player2Dice.textContent = randomNumber
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "Player 1 Turn"
    }
    nbPlay += 1
    if (nbPlay % 2 == 0){
        nbPlay = 0
        nbTurns += 1
    }
    
    if (nbTurns >= NB_TURNS_TO_WIN) {
        if (player2Score > player1Score) {
            showWinner("Player 2 has won! 🎉")
            
            showDisplayButton()
        }else if (player2Score < player1Score){
            showWinner("Player 1 has won! 🥳") 
            showDisplayButton()
        }else {
            showWinner("Null Match") 
            showDisplayButton()
        }
    }  
    
    player1Turn = !player1Turn
}
/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    const randomNumberGenerated = Math.floor(Math.random() * 6) + 1
    play(randomNumberGenerated) 
})

resetBtn.addEventListener('click', function(){
    reset()
})

doubleNothingBtn.addEventListener("click", function(){
    const doubleNothing = Math.floor(Math.random() * 2) // Nombre entre 0 et 1
    const twiceRandomNumber = doubleNothing == 1 ? 2 * (Math.floor(Math.random() * 6) + 1) : 0
    console.log(twiceRandomNumber)
    play(twiceRandomNumber)
})
 
// 1. Hook a click event listener up with the Reset Button
// 2. Create a reset() function that resets the game
// 3. Invoke the reset() function when the Reset Button is clicked
 