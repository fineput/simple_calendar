document.addEventListener('DOMContentLoaded', displayNote)

const gridDayContainer = document.querySelector('.day_list');
const gridWeekContainer = document.querySelector('.week_list');
const month_and_year = document.querySelector('.month_and_year');
const notes_day = document.querySelector('.notes_day');
const elDayCalendar = document.querySelector('.day_list')
const btn = document.getElementById('addNoteBtn');
const [prev_btn, next_btn] = [document.querySelector('.prev_btn'), document.querySelector('.next_btn')];

let data = new Date();
const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function renderCalendar() {
    let month = data.getMonth();
    let year = data.getFullYear();
    let day = data.getDate()

    month_and_year.textContent = `${months[month]} ${year}`;
    notes_day.textContent = `Note ${months[month]} ${day}`;

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

    displayNote();
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('addNoteBtn');

    if(btn) {
        btn.addEventListener('click', addNotes);
    } else {
        console.error("Кнопку 'addNoteBtn' не знайдено в HTML!")
    }

    renderCalendar();
})

elDayCalendar.addEventListener('click', (e) => {
    const target = e.target;
    if(!target.dataset.m) return;

    const day = Number(target.textContent.trim());
    const offset = Number(target.dataset.m);

    (data.getMonth() + offset + 12) % 12;
    data.setDate(day)

    renderCalendar()
    displayNote();
    
})

document.querySelector('.week_list').innerHTML = 
    ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => `<div class="name_day_of_week">${d}</div>`).join('');



function getSelectedDataKey() {
    const text = notes_day.textContent.trim();
    if(!text) return null;

    const parts = text.split(' ').filter(part => part.length > 0);
    const day = parts[parts.length - 1];
    const monthName = parts[parts.length - 2];
    const monthIndex = months.indexOf(monthName);
    const year = data.getFullYear();

    if (!day || monthIndex === -1) {
        console.error("Не вдалося розпізнати дату з тексту:", text);
        return null;
    } 
    return `${year}-${monthIndex + 1}-${day}`;
}

function addNotes() {
    const input = document.getElementById('inputText');
    const dataKey = getSelectedDataKey();
    const noteText = input.value.trim();

    if(noteText && dataKey) {
        const allNotes = JSON.parse(localStorage.getItem('calendarNotes') || '{}');
        
        if(!allNotes[dataKey]) allNotes[dataKey] = [];

        allNotes[dataKey].push(noteText);
        localStorage.setItem('calendarNotes', JSON.stringify(allNotes));
        
        input.value = '';
        displayNote();
    } else {
        console.warn("Нотатка порожня або ключ дати не знайдено");
    }
}

function displayNote() {
    const list = document.getElementById('notesList');
    const dataKey = getSelectedDataKey();
    if (!list || !dataKey) return;

    const allNotes = JSON.parse(localStorage.getItem('calendarNotes') || '{}');

    const dayNotes = allNotes[dataKey] || [];

    list.innerHTML = dayNotes.map((note, index) => `
        <div class="note">
            <p>${index + 1}. ${note}</p>
            <button onclick="deleteNote(${index})"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 9L11 15M11 9L17 15M2.72 12.96L7.04 18.72C7.392 19.1893 7.568 19.424 7.79105 19.5932C7.9886 19.7432 8.21232 19.855 8.45077 19.9231C8.72 20 9.01334 20 9.6 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H9.6C9.01334 4 8.72 4 8.45077 4.07689C8.21232 4.14499 7.9886 4.25685 7.79105 4.40675C7.568 4.576 7.392 4.81067 7.04 5.28L2.72 11.04C2.46181 11.3843 2.33271 11.5564 2.28294 11.7454C2.23902 11.9123 2.23902 12.0877 2.28294 12.2546C2.33271 12.4436 2.46181 12.6157 2.72 12.96Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>`
    ).join('');
}

window.deleteNote = function(index) {
    const dataKey = getSelectedDataKey();
    const allNotes = JSON.parse(localStorage.getItem('calendarNotes') || '{}');

    if(allNotes[dataKey]){
        allNotes[dataKey].splice(index, 1);
        localStorage.setItem('calendarNotes', JSON.stringify(allNotes));
        displayNote();
    }
}


const changeMonth = val => {
    data.setMonth(data.getMonth() + val);
    renderCalendar()
};

prev_btn.onclick = () => {data.setMonth(data.getMonth() - 1); renderCalendar()};
next_btn.onclick = () => {data.setMonth(data.getMonth() + 1); renderCalendar()};


renderCalendar();
displayNote();