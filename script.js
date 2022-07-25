const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const historyBtn = document.querySelector('.history');
const infoBtn = document.querySelector('.info');
const closeModalBtn = document.querySelector('.close');

const stopwatch = document.querySelector('.stopwatch');
const time = document.querySelector('.time');
const timeList = document.querySelector('.time-list');
const modal = document.querySelector('.modal');

let countTime;
let minutes = 0;
let seconds = 0;
let miliseconds = 0;

let historyShown = true;

let timesArr = [];

const handleStart = () => {
  clearInterval(countTime);
  countTime = setInterval(() => {
    let time =
      ('0' + minutes).slice(-2) +
      ':' +
      ('0' + seconds).slice(-2) +
      ':' +
      ('0' + miliseconds).slice(-2);

    if (miliseconds < 100) {
      miliseconds += 1;
      stopwatch.textContent = time;
    } else if (miliseconds == 100) {
      seconds++;
      miliseconds = 0;
      if (seconds == 59) {
        seconds = 0;
        minutes++;
      }
    }
  }, 10);
};

const handlePause = () => {
  clearInterval(countTime);
};

const handleStop = () => {
  clearInterval(countTime);

  if (stopwatch.textContent != '00:00:00') {
    timesArr.push(stopwatch.textContent);
    time.textContent = stopwatch.textContent;
    time.style.visibility = 'visible';
    console.log(timesArr);
  }

  stopwatch.textContent = '00:00:00';
  addHistory();
  minutes = 0;
  seconds = 0;
  miliseconds = 0;
};

const handleReset = () => {
  time.textContent = '0';
  time.style.visibility = 'hidden';
  timesArr = [];
  timeList.textContent = '';
};

const showHistory = () => {
  if (!historyShown) {
    historyShown = true;
    timeList.style.display = 'none';
  } else {
    historyShown = false;
    timeList.style.display = 'unset';
  }
};

const addHistory = () => {
  let num = 1;
  timeList.textContent = '';
  timesArr.forEach((time) => {
    const newTime = document.createElement('li');
    newTime.innerHTML = `Time No. ${num}: <span>${time}</span>`;
    timeList.appendChild(newTime);
    num++;
  });
};

startBtn.addEventListener('mousedown', handleStart);

pauseBtn.addEventListener('mousedown', handlePause);

stopBtn.addEventListener('mousedown', handleStop);

resetBtn.addEventListener('mousedown', handleReset);

historyBtn.addEventListener('click', showHistory);

infoBtn.addEventListener('click', () => {
  modal.showModal();
});

closeModalBtn.addEventListener('click', () => {
  modal.close();
});
