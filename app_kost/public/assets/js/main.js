// Loading animation
window.addEventListener('load', function() {
  setTimeout(function() {
    document.getElementById('loader').style.opacity = 0;
    setTimeout(function() {
      document.getElementById('loader').style.display = 'none';
    }, 400);
  }, 600);
});

// Dummy data kamar kosong
const kamarData = [
  { nomor: 'A1', harga: 750000, fasilitas: 'AC, Kamar Mandi Dalam, Wifi', status: 'kosong' },
  { nomor: 'A2', harga: 800000, fasilitas: 'Kipas Angin, Kamar Mandi Luar, Wifi', status: 'kosong' },
  { nomor: 'B1', harga: 700000, fasilitas: 'Kipas Angin, Kamar Mandi Dalam', status: 'terisi' },
  { nomor: 'B2', harga: 850000, fasilitas: 'AC, Kamar Mandi Dalam, TV', status: 'kosong' }
];

function renderKamarGrid() {
  const grid = document.getElementById('kamarGrid');
  grid.innerHTML = '';
  kamarData.forEach(kamar => {
    const card = document.createElement('div');
    card.className = 'kamar-card ' + (kamar.status === 'kosong' ? 'kosong' : 'terisi');
    card.innerHTML = `
      <h3>Kamar ${kamar.nomor}</h3>
      <div class="harga">Rp ${kamar.harga.toLocaleString('id-ID')}/bulan</div>
      <div class="fasilitas">${kamar.fasilitas}</div>
      <div class="status">${kamar.status === 'kosong' ? 'Tersedia' : 'Terisi'}</div>
    `;
    grid.appendChild(card);
  });
}

// Dummy data reminder
const reminderData = [
  { kamar: 'A1', nama: 'Rafly', status: 'h3', tgl_jatuh_tempo: '2024-04-03' },
  { kamar: 'B1', nama: 'Cecep', status: 'late', tgl_jatuh_tempo: '2024-03-28' }
];

function renderReminderList() {
  const list = document.getElementById('reminderList');
  list.innerHTML = '';
  reminderData.forEach(item => {
    const div = document.createElement('div');
    div.className = 'reminder-item' + (item.status === 'late' ? ' late' : '');
    div.innerHTML = `
      <strong>Kamar ${item.kamar}</strong><br>
      <span>${item.nama}</span><br>
      <span>Jatuh Tempo: ${item.tgl_jatuh_tempo}</span>
      ${item.status === 'late' ? '<div><b>Terlambat Bayar!</b></div>' : '<div>H-3 Jatuh Tempo</div>'}
    `;
    list.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderKamarGrid();
  renderReminderList();
}); 