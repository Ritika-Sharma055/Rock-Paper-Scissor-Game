let score = JSON.parse(localStorage.getItem('score'))

  if (!score ) {
    score = {       //providing default values
    wins: 0,
    losses: 0,
    ties: 0  };
  }
  updateScoreElement();

  let isAutoPlaying = false;
  let intervalId;

//const autoPlay = () => { };

function autoPlay() {
  
  if(!isAutoPlaying) {
     intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
     },1000 );
    isAutoPlaying = true;

    document.querySelector('.js-autoplay').innerHTML = 'Stop Playing';
  } 
  else {
    clearInterval(intervalId);
    isAutoPlaying = false;

    document.querySelector('.js-autoplay').innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-autoplay').
addEventListener('click', () =>{
  autoPlay();
});

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors');
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result ='';

  if(playerMove === 'Scissors'){
      if(computerMove === 'Rock'){
        result = 'You Lose';
      } else if( computerMove === 'Paper'){
        result = 'You Win';
      } else if( computerMove === 'Scissors'){
        result = 'Tie';
      }
  } 
  
  else if(playerMove === 'Paper'){
      if(computerMove === 'Rock'){
          result = 'You Win';
      } else if( computerMove === 'Paper'){
          result = 'Tie';
      } else if( computerMove === 'Scissors'){
          result = 'You Lose';
      } 
  } 
  
  else if ( playerMove === 'Rock'){
      if(computerMove === 'Rock'){
         result = 'Tie';
      } else if( computerMove === 'Paper'){
         result = 'You Lose';
      } else if( computerMove === 'Scissors'){
         result = 'You Win';
      }
  }

  if (result === 'You Win'){
    score.wins += 1;
  } else if(result === 'You Lose'){
    score.losses += 1;
  } else if(result === 'Tie'){
    score.ties += 1;
  }
  
localStorage.setItem('score', JSON.stringify(score));

updateScoreElement();

document.querySelector('.js-result').innerHTML= result;

document.querySelector('.js-moves').innerHTML= 
`You
<img src="${playerMove.toLowerCase()}-emoji.png" class="moves-icon"> : 
<img src="${computerMove.toLowerCase()}-emoji.png" class="moves-icon">
Computer`;
}

function updateScoreElement(){
 document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNo = Math.random();

    let computerMove ='';

  if(randomNo >= 0 && randomNo < 1/3){
    computerMove ='Rock';
  }
  else if(randomNo >= 1/3 && randomNo < 2/3){
    computerMove ='Paper';
  } else if(randomNo >= 2/3 && randomNo < 1){
    computerMove ='Scissors';
  }
 
  return computerMove;
}

function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}
document.querySelector('.reset-button')
.addEventListener('click', () =>{
  showResetConfirmation();
});

function showResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = `
      Are you sure you want to reset the score?
      <button class="js-reset-confirm-yes reset-confirm-button">
        Yes
      </button>
      <button class="js-reset-confirm-no reset-confirm-button">
        No
      </button>
    `;
  
  document.querySelector('.js-reset-confirm-yes')
    .addEventListener('click', () => {
      resetScore();
      hideResetConfirmation();
    });
  
  document.querySelector('.js-reset-confirm-no')
    .addEventListener('click', () => {
      hideResetConfirmation();
    });
}

function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = '';
}
