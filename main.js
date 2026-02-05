const gridDayContainer = document.querySelector('.day_list');
const gridWeekContainer = document.querySelector('.week_list');
const month_and_year = document.querySelector('.month_and_year');
const message = document.querySelector('.message');
const elDayCalendar = document.querySelector('.day_list')
const [prev_btn, next_btn] = [document.querySelector('.prev_btn'), document.querySelector('.next_btn')];

let data = new Date();
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function renderCalendar() {
    let month = data.getMonth();
    let year = data.getFullYear();

    month_and_year.textContent = `${months[month]} ${year}`;

    let firstDay = new Date(year, month, 1).getDay() || 7;
    let lastDay = new Date(year, month + 1, 0).getDate();
    let prevLastDays = new Date(year, month, 0).getDate();

    let calendarHtml = '';

    // 1. Дні минулого місяця
    for(let i = firstDay - 1; i > 0; i--){
        calendarHtml += `
        <div class="one_day_prev_month" data-m="-1">
            ${prevLastDays - i + 1}
        </div>`;
    }

    // 2. Дні поточного місяця
    const now = new Date();
    for( let day = 1; day <= lastDay; day++){
        const isToday =
            day === now.getDate() &&
            month === now.getMonth() &&
            year === now.getFullYear();

        calendarHtml += `
            <div class="${isToday ? "today" : "one_day"} day-cell" data-m="0">
                ${day}
            </div>`;
    }

    // 3. Дні наступного місяця
    const totalCells = (firstDay - 1) + lastDay;
    const remainingSmall = 35 - totalCells;
    const remainingBig = 42 - totalCells;

    const renderNextMonth = (val) => {
        for (let i = 1; i <= val; i++){
            calendarHtml += `
            <div class="one_day_next_month" data-m="1">
                ${i}
            </div>`;
        }
    }
    totalCells < 35 ? renderNextMonth(remainingSmall) :renderNextMonth(remainingBig);

    elDayCalendar.innerHTML = calendarHtml; 
}

elDayCalendar.addEventListener('click', (e) => {
    const target = e.target;
    if(!target.classList.contains('day_list')){
        const day = target.textContent.trim();
        const offset = parseInt(target.dataset.m);

        let targetMonthInx = (data.getMonth() + offset + 12) % 12;
        message.textContent = `Ви натиснули на ${day} день ${months[targetMonthInx]} місяць.`
    }
})

document.querySelector('.week_list').innerHTML = 
    ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => `<div class="name_day_of_week">${d}</div>`).join('');


const changeMonth = val => {
    data.setMonth(data.getMonth() + 1);
    renderCalendar()
};

prev_btn.onclick = () => changeMonth(-1);
next_btn.onclick = () => changeMonth(1);

renderCalendar()

