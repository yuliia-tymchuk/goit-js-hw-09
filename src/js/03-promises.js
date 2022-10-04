import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onHandleSubmit);

let delayInput = null;
let stepInput = null;
let amountInput = null;

function onHandleSubmit(event) {
  event.preventDefault();
  if (!event.target.tagName === 'BUTTON') return;
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  delayInput = Number(delay.value);
  stepInput = Number(step.value);
  amountInput = Number(amount.value);

  for (let i = 1; i <= amountInput; i += 1) {
    createPromise(i, delayInput)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayInput += stepInput;
  }

  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
