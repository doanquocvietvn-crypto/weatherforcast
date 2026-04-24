document.addEventListener('DOMContentLoaded', () => {
    initChart();
    
    // Xử lý thanh tìm kiếm
    const searchInput = document.getElementById('citySearch');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            updateDashboardData(e.target.value);
        }
    });

    // Xử lý đổi nguồn API
    const sourceSelect = document.getElementById('apiSourceSelect');
    sourceSelect.addEventListener('change', () => {
        const currentCity = document.getElementById('cityName').innerText;
        updateDashboardData(currentCity);
    });
});

let weatherChartInstance = null;

function initChart() {
    const ctx = document.getElementById('weatherChart').getContext('2d');
    
    // Tạo hiệu ứng đổ bóng mờ dưới đường biểu đồ
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 300);
    gradientFill.addColorStop(0, 'rgba(0, 168, 255, 0.4)');
    gradientFill.addColorStop(1, 'rgba(0, 168, 255, 0.0)');

    const data = {
        labels: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
        datasets: [{
            label: 'Nhiệt độ (°C)',
            data: [26, 29, 32, 34, 30, 28, 26],
            borderColor: '#00A8FF',
            backgroundColor: gradientFill,
            borderWidth: 3,
            pointBackgroundColor: '#111A28',
            pointBorderColor: '#00A8FF',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true,
            tension: 0.4 // Tạo đường cong mượt
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1A2639',
                    titleFont: { family: 'Nunito', size: 14 },
                    bodyFont: { family: 'Nunito', size: 14, weight: 'bold' },
                    padding: 10,
                    displayColors: false
                }
            },
            scales: {
                x: {
                    grid: { display: false, drawBorder: false },
                    ticks: { color: '#8B95A5', font: { family: 'Nunito', weight: '600' } }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)', borderDash: [5, 5] },
                    ticks: { color: '#8B95A5', stepSize: 5, font: { family: 'Nunito' } }
                }
            }
        }
    };

    weatherChartInstance = new Chart(ctx, config);
}

// Hàm mô phỏng việc update dữ liệu khi đổi thành phố/nguồn
function updateDashboardData(city) {
    document.getElementById('cityName').innerText = city;
    
    // Cập nhật ngẫu nhiên các thông số để thấy sự thay đổi
    document.getElementById('mainTemp').innerText = Math.floor(Math.random() * 10 + 25) + '°';
    document.getElementById('realFeel').innerText = Math.floor(Math.random() * 10 + 27) + '°';
    document.getElementById('windSpeed').innerText = Math.floor(Math.random() * 20 + 5) + ' km/h';
    
    const newHumidity = Math.floor(Math.random() * 40 + 50);
    document.getElementById('humidity').innerText = newHumidity + '%';
    document.querySelector('.progress-fill').style.width = newHumidity + '%';
    
    // Cập nhật lại data biểu đồ
    const newData = Array.from({length: 7}, () => Math.floor(Math.random() * 15 + 20));
    weatherChartInstance.data.datasets[0].data = newData;
    weatherChartInstance.update();
}
