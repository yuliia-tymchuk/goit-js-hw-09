import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  span: document.querySelector('.value'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let chooseDate = null;

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onHandleClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chooseDate = selectedDates[0].getTime();
    const delta = chooseDate - Date.now();
    if (delta <= 0) {
      Notify.failure('Qui timide rogat docet negare', {
        position: 'center-center',
        clickToClose: true,
      });
      return;
    }
    refs.startBtn.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.intervalId = setInterval(() => {
      const delta = chooseDate - Date.now();
      const data = convertMs(delta);
      Object.entries(data).forEach(([name, value]) => {
        refs[name].textContent = addLeadingZero(value);
      });
      if (delta <= 1000) {
        clearInterval(this.intervalId);
      }
    }, 1000);
  },
};

function onHandleClick() {
  timer.start();
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// styles
refs.timer.style.display = 'flex';
refs.timer.style.gap = '10px';
refs.startBtn.style.color = 'black';
