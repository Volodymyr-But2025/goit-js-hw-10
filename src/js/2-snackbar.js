// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', e => {
  e.preventDefault();

  const { delay, state } = e.target.elements;

  // Отримуємо їхні значення
  const delayValue = Number(delay.value); // Перетворюємо рядок на число
  const stateValue = state.value; // Буде "fulfilled" або "rejected"

  console.log(`Delay: ${delayValue}, State: ${stateValue}`);
  createPromise(delayValue, delayValue, stateValue === 'fulfilled')
    .then(res => {
      console.log(res);
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${res}ms`,
        position: 'topRight',
      });
    })
    .catch(err => {
      console.error(err);
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${err}ms`,
        position: 'topRight',
      });
    });
  form.reset();
});

function createPromise(value, delay, isPositive) {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (isPositive) {
        res(value);
      } else {
        rej(value);
      }
    }, delay);
  });
  return promise;
}
