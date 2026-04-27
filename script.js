document.addEventListener("DOMContentLoaded", function() {
    
    // Cấu hình Biểu đồ Line (Phân tích lượng khách)
    const trafficCtx = document.getElementById('trafficChart').getContext('2d');
    
    // Tạo màu Gradient cho vùng dưới đường Line
    let gradientFill = trafficCtx.createLinearGradient(0, 0, 0, 300);
    gradientFill.addColorStop(0, 'rgba(67, 97, 238, 0.2)'); // Màu primary nhạt
    gradientFill.addColorStop(1, 'rgba(67, 97, 238, 0)');

    new Chart(trafficCtx, {
        type: 'line',
        data: {
            labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
            datasets: [{
                label: 'Lượt khách',
                data: [12450, 11200, 13500, 14200, 16800, 22500, 24100],
                borderColor: '#4361ee', // Primary color
                backgroundColor: gradientFill,
                borderWidth: 3,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#4361ee',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.4 // Tạo đường cong mềm mại
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Ẩn chú thích vì chỉ có 1 data line
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    titleFont: { size: 13, family: 'sans-serif' },
                    bodyFont: { size: 14, weight: 'bold', family: 'sans-serif' },
                    displayColors: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f1f5f9',
                        drawBorder: false,
                    },
                    ticks: {
                        color: '#64748b',
                        font: { size: 12 }
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                        color: '#64748b',
                        font: { size: 12 }
                    }
                }
            }
        }
    });

    // Cấu hình Biểu đồ Doughnut (Cơ cấu hạng vé)
    const doughnutCtx = document.getElementById('ticketDoughnutChart').getContext('2d');
    
    new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: ['Vé Người lớn', 'Vé Trẻ em', 'Vé Combo', 'Vé Ưu tiên'],
            datasets: [{
                data: [45, 25, 20, 10],
                backgroundColor: [
                    '#4361ee', // Primary
                    '#38bdf8', // Light Blue
                    '#f59e0b', // Orange
                    '#10b981'  // Teal
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%', // Tạo độ mỏng cho vòng cung
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        color: '#64748b',
                        font: { size: 12, family: 'sans-serif' }
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 10,
                    bodyFont: { size: 13, family: 'sans-serif' }
                }
            }
        }
    });
});
