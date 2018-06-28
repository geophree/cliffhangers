const yodel = document.createElement('audio');
yodel.setAttribute('src', 'assets/sounds/yodel.mp3');
const fail = document.createElement('audio');
fail.setAttribute('src', 'assets/sounds/fail.mp3');
const win = document.createElement('audio');
win.setAttribute('src', 'assets/sounds/win.mp3');
const theme = document.createElement('audio');
theme.setAttribute('src', 'assets/sounds/theme.mp3');

theme.addEventListener('ended', function() {
  this.play();
}, false);

let themePlaying = false;
let movement;

/* Input button listeners */
$('#submitFirst').click(() => {
  const input = $('#firstPrice').val();
  /* TODO: Set the actual price of the first item */
  const actualPrice = 10;
  const dollarsOff = Math.abs(actualPrice - parseInt(input));
  submitGuess(dollarsOff);
});

$('#submitSecond').click(() => {
  const input = $('#secondPrice').val();
  /* TODO: Set the actual price of the second item */
  const actualPrice = 10;
  const dollarsOff = Math.abs(actualPrice - parseInt(input));
  submitGuess(dollarsOff);
});

$('#submitThird').click(() => {
  const input = $('#thirdPrice').val();
  /* TODO: Set the actual price of the third item */
  const actualPrice = 10;
  const dollarsOff = Math.abs(actualPrice - parseInt(input));
  submitGuess(dollarsOff, true);
});

/* Toggle theme song on space bar press */
$(document).keypress(function(event) {
  if (event.which == 32) {
    if (themePlaying) {
      theme.pause();
      theme.currentTime = 0;
      themePlaying = false;
    } else {
      theme.play();
      themePlaying = true;
    }
  }
});

const submitGuess = (dollarsOff, isLastItem) => {
  if (dollarsOff) {
    yodel.play();
    moveClimber(); // start moving immediately
  } else {
    win.play();
  }

  setTimeout(function() { // after the correct number of steps moved, stop
    stopClimber();
    if (isLastItem) { // check for win
      const top = $('.climber').css('top');
      if (parseFloat(top) > 56) {
        win.play();
        setTimeout(function() {
          theme.play();
          themePlaying = true;
        }, 1000);
      }
    }
  }, dollarsOff * 1000);

  // Move one step after every second until stopped
  movement = setInterval(moveClimber, 1000);
};

const stopClimber = () => {
  clearInterval(movement);
  yodel.pause();
};

const moveClimber = () => {
  const $climber = $('.climber');
  let top = $climber.css('top');
  let left = $climber.css('left');
  let increment = 21;
  let decrement = 16;
  if (parseFloat(left) > 430) {
    increment = 24.5;
    decrement = 19;
  }
  if (parseFloat(top) >= 56) {
    $climber.animate({ 
      top: `-=${decrement}px`,
      left: `+=${increment}px`
    }, 1000, 'linear');
  }
  if (parseFloat(top) < 58) { // moved too far! fail.
    setTimeout(() => {
      stopClimber();
      fall();
      fail.play();
    }, 1000);
  }
};

const fall = () => {
  const $climber = $('.climber');
  $climber.animate({ 
    top: `800px`
  }, 500, 'linear');
  $climber.css({
    'transform':'rotate(180deg)'
  });
  setTimeout(function() {
    $climber.remove();
  }, 500);
};
