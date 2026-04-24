document.addEventListener('DOMContentLoaded', () => {
    renderHourly();
    renderWeekly();

    // Xử lý tìm kiếm
    const searchInput = document.getElementById('citySearch');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            updateDashboardData(e.target.value);
        }
    });
});

function renderHourly() {
    const container = document.getElementById('hourlyContainer');
    const times = [
        { time: '6:00 AM', temp: '25°', active: false },
        { time: '9:00 AM', temp: '28°', active: true },
        { time: '12:00 PM', temp: '33°', active: false },
        { time: '3:00 PM', temp: '34°', active: false },
        { time: '6:00 PM', temp: '32°', active: false },
        { time: '9:00 PM', temp: '30°', active: false }
    ];

    container.innerHTML = times.map(t => `
        <div class="hour-item ${t.active ? 'active' : ''}">
            <p>${t.time}</p>
            <i class="fa-solid fa-sun"></i>
            <h4>${t.temp}</h4>
        </div>
    `).join('');
}

function renderWeekly() {
    const container = document.getElementById('weeklyContainer');
    const days = ['Hôm nay', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
    const conditions = ['Nắng', 'Nắng', 'Ít mây', 'Nhiều mây', 'Nhiều mây', 'Mưa rào', 'Nắng'];

    container.innerHTML = days.map((day, index) => {
        const min = Math.floor(Math.random() * 5 + 24);
        const max = Math.floor(Math.random() * 5 + 31);
        const icon = conditions[index] === 'Mưa rào' ? 'fa-cloud-rain' : 'fa-sun';
        
        return `
            <li class="forecast-item">
                <span class="day-name">${day}</span>
                <div class="weather-state">
                    <i class="fa-solid ${icon}"></i> ${conditions[index]}
                </div>
                <span class="temp-range">${max} / <span>${min}</span></span>
            </li>
        `;
    }).join('');
}

function updateDashboardData(city) {
    document.getElementById('cityName').innerText = city;
    
    // Cập nhật ngẫu nhiên các thông số cơ bản
    const temp = Math.floor(Math.random() * 10 + 25);
    document.getElementById('currentTemp').innerText = temp + '°';
    document.getElementById('realFeel').innerText = (temp + 2) + '°';
    
    const rain = Math.floor(Math.random() * 20);
    document.getElementById('mainRainChance').innerText = rain + '%';
    document.getElementById('rainChance').innerText = rain + '%';
    
    document.getElementById('windSpeed').innerText = (Math.random() * 10).toFixed(1) + ' km/h';
    document.getElementById('uvIndex').innerText = Math.floor(Math.random() * 8 + 1);
    
    renderWeekly();
}
