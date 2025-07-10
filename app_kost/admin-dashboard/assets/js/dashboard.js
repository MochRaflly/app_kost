// Dashboard.js
// Fetch data dashboard dari backend (dummy dulu)
document.addEventListener('DOMContentLoaded', function() {
    // Dummy data, ganti dengan fetch API ke backend
    const data = {
        totalPenghuni: 12,
        kamarKosong: 5,
        tagihanBelumLunas: 3,
        pendapatanBulanIni: 3200000,
        chart: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
            data: [2000000, 2500000, 3000000, 3200000, 3100000, 3300000]
        }
    };
    document.getElementById('totalPenghuni').textContent = data.totalPenghuni;
    document.getElementById('kamarKosong').textContent = data.kamarKosong;
    document.getElementById('tagihanBelumLunas').textContent = data.tagihanBelumLunas;
    document.getElementById('pendapatanBulanIni').textContent = 'Rp ' + data.pendapatanBulanIni.toLocaleString('id-ID');

    // Chart.js
    var ctx = document.getElementById('chartPendapatan').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.chart.labels,
            datasets: [{
                label: 'Pendapatan Bulanan',
                data: data.chart.data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}); 