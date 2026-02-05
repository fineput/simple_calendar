const gridDayContainer = document.querySelector('.day_list');
const gridWeekContainer = document.querySelector('.week_list');
const month_and_year = document.querySelector('.month_and_year');
const elDayCalendar = document.querySelector('.day_list')

const prev_btn = document.querySelector('.prev_btn');
const next_btn = document.querySelector('.next_btn');


let data = new Date();

function renderCalendar() {
    elDayCalendar.innerHTML = '';

    let month = data.getMonth();
    let year = data.getFullYear();

    let firstDay = new Date(year, month, 1).getDay() || 7;
    let lastDay = new Date(year, month + 1, 0).getDate();
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    month_and_year.textContent = `${months[month]} ${year}`;

    let prevDays = new Date(year, month, 0).getDate();
    let currentDays = firstDay - 1;

    for(let i = currentDays - 1; i >= 0; i--){
        dayNum = prevDays - i;
        elDayCalendar.innerHTML += `<div class="one_day_not_this_mounth">${dayNum}</div>`;
    }

    for( let day = 1; day <= lastDay; day++){
        const isToday =
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear();

         elDayCalendar.innerHTML += `
            <div class="${isToday ? "today" : "one_day"}">
                ${day}
            </div>
         `;
    }

    const currentCell = (firstDay - 1) + lastDay;

    let nextDay = 1;

    if(currentCell <= 35){
        for (let i = currentCell; i < 35; i++) {
            elDayCalendar.innerHTML += `<div class="one_day_not_this_mounth">${nextDay}</div>`;
            nextDay++;
        }
    } else {
        for (let i = currentCell; i < 42; i++) {
            elDayCalendar.innerHTML += `<div class="one_day_not_this_mounth">${nextDay}</div>`;
            nextDay++;
        }
    }

}

const arrWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

for (let i = 0; i < arrWeek.length; i++) {
    const nameDay = document.createElement('div');
    nameDay.classList.add('name_day_of_week');
    nameDay.textContent = arrWeek[i];
    gridWeekContainer.appendChild(nameDay);
}

prev_btn.onclick = () => {
    data.setMonth(data.getMonth() - 1);
    renderCalendar()
}

next_btn.onclick = () => {
    data.setMonth(data.getMonth() + 1);
    renderCalendar()
}

renderCalendar()

