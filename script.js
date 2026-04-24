// Lắng nghe sự kiện thay đổi tùy biến từ người dùng
const cityInput = document.getElementById('cityInput');
const apiSource = document.getElementById('apiSource');

cityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const city = e.target.value;
        const source = apiSource.value;
        fetchWeatherData(city, source);
    }
});

apiSource.addEventListener('change', function(e) {
    const city = cityInput.value || 'Đà Nẵng';
    fetchWeatherData(city, e.target.value);
});

// Hàm mô phỏng việc gọi API để cập nhật UI
function fetchWeatherData(city, source) {
    console.log(`Đang tải dữ liệu cho ${city} từ nguồn ${source}...`);
    
    // Giả lập độ trễ mạng (500ms)
    setTimeout(() => {
        // Cập nhật thông tin cơ bản
        document.getElementById('cityName').innerText = city.charAt(0).toUpperCase() + city.slice(1);
        document.getElementById('currentTemp').innerText = Math.floor(Math.random() * 15 + 20) + '°';
        document.getElementById('realFeel').innerText = Math.floor(Math.random() * 15 + 22) + '°';
        document.getElementById('windSpeed').innerText = (Math.random() * 10).toFixed(1) + ' km/h';
        document.getElementById('humidity').innerText = Math.floor(Math.random() * 40 + 50) + '%';
        
        renderHourly();
        renderWeekly();
    }, 500);
}

function renderHourly() {
    const container = document.getElementById('hourlyForecast');
    container.innerHTML = ''; // Clear cũ
    const times = ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
    
    times.forEach(time => {
        const temp = Math.floor(Math.random() * 10 + 25);
        container.innerHTML += `
            <div class="hour-item">
                <p>${time}</p>
                <i class="fa-solid fa-cloud-sun"></i>
                <h4>${temp}°</h4>
            </div>
        `;
    });
}

function renderWeekly() {
    const container = document.getElementById('weeklyForecast');
    container.innerHTML = '';
    const days = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
    
    days.forEach(day => {
        const tempMin = Math.floor(Math.random() * 5 + 20);
        const tempMax = Math.floor(Math.random() * 10 + 25);
        container.innerHTML += `
            <li>
                <span>${day}</span>
                <span><i class="fa-solid fa-cloud"></i></span>
                <span>${tempMin}° / ${tempMax}°</span>
            </li>
        `;
    });
}

// Khởi tạo dữ liệu mặc định khi trang vừa load xong
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData('Đà Nẵng', 'openweather');
});
