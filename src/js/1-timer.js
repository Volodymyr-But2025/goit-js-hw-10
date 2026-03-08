// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Змінні
const btnStart = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const timer = document.querySelector('.timer');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
btnStart.disabled = true;

// Функції

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      userSelectedDate = null;
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

function onBtnStartClick() {
  btnStart.disabled = true;
  input.disabled = true;

  const intervalId = setInterval(() => {
    const time = userSelectedDate.getTime() - new Date().getTime();

    if (time <= 0) {
      clearInterval(intervalId);

      input.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(time);

    daysEl.textContent = days < 10 ? `0${days}` : days;
    hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
    minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes;
    secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds;
    console.log(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  }, 1000);
}

btnStart.addEventListener('click', () => onBtnStartClick(userSelectedDate));

console.log('55');
