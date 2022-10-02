const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let intervalId = null;

refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);

// stopBtn.setAttribute('disabled', 'true');
// stopBtn.classList.add('is-inactive');

setAttributeBtn();

function onStartClick() {
  refs.startBtn.disabled = true;
  setAttributeBtn();

  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  refs.startBtn.disabled = false;
  setAttributeBtn();

  clearInterval(intervalId);
}

function setAttributeBtn() {
  refs.stopBtn.disabled = true;
  if (refs.startBtn.disabled) {
    refs.stopBtn.disabled = false;
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
