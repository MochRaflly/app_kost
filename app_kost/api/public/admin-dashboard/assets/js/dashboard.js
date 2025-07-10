// Sidebar toggle
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar-wrapper');
if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
}

// Panel loader
function loadDashboardPanel() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
    <div class="row g-3 mb-4">
        <div class="col-md-3 col-6">
            <div class="card-info">
                <div class="card-title">Total Penghuni Aktif</div>
                <div class="card-value" id="totalPenghuni">0</div>
                <div class="card-desc">Penghuni yang masih aktif</div>
            </div>
        </div>
        <div class="col-md-3 col-6">
            <div class="card-info">
                <div class="card-title">Kamar Kosong</div>
                <div class="card-value" id="kamarKosong">0</div>
                <div class="card-desc">Kamar belum terisi</div>
            </div>
        </div>
        <div class="col-md-3 col-6">
            <div class="card-info">
                <div class="card-title">Tagihan Belum Lunas</div>
                <div class="card-value" id="tagihanBelumLunas">0</div>
                <div class="card-desc">Tagihan aktif belum dibayar</div>
            </div>
        </div>
        <div class="col-md-3 col-6">
            <div class="card-info">
                <div class="card-title">Pendapatan Bulan Ini</div>
                <div class="card-value" id="pendapatanBulanIni">Rp 0</div>
                <div class="card-desc">Total pembayaran bulan ini</div>
            </div>
        </div>
    </div>
    <div class="row g-3">
        <div class="col-md-6">
            <div class="card p-3">
                <div class="card-title mb-2">Grafik Pendapatan Bulanan</div>
                <canvas id="chartPendapatan" height="120"></canvas>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card p-3">
                <div class="card-title mb-2">Grafik Occupancy Rate</div>
                <canvas id="chartOccupancy" height="120"></canvas>
            </div>
        </div>
    </div>
    `;
    // Dummy data, siap fetch API
    const data = {
        totalPenghuni: 12,
        kamarKosong: 5,
        tagihanBelumLunas: 3,
        pendapatanBulanIni: 3200000,
        chart: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
            pendapatan: [2000000, 2500000, 3000000, 3200000, 3100000, 3300000],
            occupancy: [80, 85, 90, 92, 88, 95]
        }
    };
    document.getElementById('totalPenghuni').textContent = data.totalPenghuni;
    document.getElementById('kamarKosong').textContent = data.kamarKosong;
    document.getElementById('tagihanBelumLunas').textContent = data.tagihanBelumLunas;
    document.getElementById('pendapatanBulanIni').textContent = 'Rp ' + data.pendapatanBulanIni.toLocaleString('id-ID');
    // Chart.js
    var ctx1 = document.getElementById('chartPendapatan').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: data.chart.labels,
            datasets: [{
                label: 'Pendapatan Bulanan',
                data: data.chart.pendapatan,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });
    var ctx2 = document.getElementById('chartOccupancy').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: data.chart.labels,
            datasets: [{
                label: 'Occupancy Rate (%)',
                data: data.chart.occupancy,
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, max: 100 } }
        }
    });
}

// Notifikasi badge dummy
function updateNotifBadge(count) {
    const badge = document.getElementById('notif-badge');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

// Menu event
function setActiveMenu(menuId) {
    document.querySelectorAll('.sidebar ul li').forEach(li => li.classList.remove('active'));
    const li = document.querySelector(`#${menuId}`).parentElement;
    if (li) li.classList.add('active');
}

// Integrasi panel Penghuni
if (typeof loadPenghuniPanel === 'function') {
    // Sudah diimport
} else {
    // Import JS modular jika belum
    var script = document.createElement('script');
    script.src = 'assets/js/penghuni.js';
    document.body.appendChild(script);
}
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardPanel();
    setActiveMenu('menu-dashboard');
    updateNotifBadge(2); // Dummy notif
    // Sidebar menu event
    document.querySelectorAll('.sidebar ul li a').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.id;
            setActiveMenu(id);
            if (id === 'menu-dashboard') loadDashboardPanel();
            if (id === 'menu-penghuni') loadPenghuniPanel();
            if (id === 'menu-kamar') loadKamarPanel();
            // dst, panel lain
        });
    });
    document.getElementById('menu-penghuni').addEventListener('click', function(e) {
        e.preventDefault();
        loadPenghuniPanel();
        setActiveMenu('menu-penghuni');
    });
    document.getElementById('menu-kamar').addEventListener('click', function(e) {
        e.preventDefault();
        loadKamarPanel();
        setActiveMenu('menu-kamar');
    });
}); 