const gridDayContainer = document.querySelector('.day_list');
const gridWeekContainer = document.querySelector('.week_list');
const month_and_year = document.querySelector('.month_and_year');

const data = new Date();

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function setDataMonthYear() {
    const month = data.getMonth();
    const year = data.getFullYear();

    return month_and_year.innerHTML = `${months[month]} ${year}`
}

for (let i = 1; i <= 35; i++){
    const day = document.createElement('div');
    day.classList.add('one_day');
    day.textContent = i;
    gridDayContainer.appendChild(day)
}

const arrWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

for (let i = 0; i < arrWeek.length; i++) {
    const nameDay = document.createElement('div');
    nameDay.classList.add('name_day_of_week');
    nameDay.textContent = arrWeek[i];
    gridWeekContainer.appendChild(nameDay);
}


setDataMonthYear()