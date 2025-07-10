// Panel Penghuni CRUD
let dtPenghuni;
function loadPenghuniPanel() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>Data Penghuni</h4>
        <button class="btn btn-primary" id="btnTambahPenghuni"><i class="bi bi-plus"></i> Tambah Penghuni</button>
    </div>
    <table class="table table-bordered" id="tabelPenghuni" style="width:100%">
        <thead><tr>
            <th>Nama</th><th>No KTP</th><th>No HP</th><th>Email</th><th>Tgl Masuk</th><th>Tgl Keluar</th><th>Aksi</th>
        </tr></thead>
        <tbody></tbody>
    </table>
    <!-- Modal Form Penghuni -->
    <div class="modal fade" id="modalPenghuni" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <form id="formPenghuni">
        <div class="modal-header"><h5 class="modal-title" id="modalTitle">Tambah Penghuni</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
            <input type="hidden" name="id" id="penghuniId">
            <div class="mb-2"><label>Nama</label><input type="text" class="form-control" name="nama" required></div>
            <div class="mb-2"><label>No KTP</label><input type="text" class="form-control" name="no_ktp" required></div>
            <div class="mb-2"><label>No HP</label><input type="text" class="form-control" name="no_hp" required></div>
            <div class="mb-2"><label>Email</label><input type="email" class="form-control" name="email" required></div>
            <div class="mb-2"><label>Tgl Masuk</label><input type="date" class="form-control" name="tgl_masuk" required></div>
            <div class="mb-2"><label>Tgl Keluar</label><input type="date" class="form-control" name="tgl_keluar"></div>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Simpan</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
        </div>
        </form>
    </div></div></div>
    `;
    loadDataPenghuni();
    document.getElementById('btnTambahPenghuni').onclick = function() {
        showModalPenghuni();
    };
}

function loadDataPenghuni() {
    fetch('/penghuni')
        .then(res => res.json())
        .then(res => {
            const tbody = document.querySelector('#tabelPenghuni tbody');
            tbody.innerHTML = '';
            res.data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.nama}</td>
                    <td>${row.no_ktp}</td>
                    <td>${row.no_hp}</td>
                    <td>${row.email}</td>
                    <td>${row.tgl_masuk}</td>
                    <td>${row.tgl_keluar || '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-info me-1" onclick="showModalPenghuni(${row.id})"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="hapusPenghuni(${row.id})"><i class="bi bi-trash"></i></button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        });
}

function showModalPenghuni(id = null) {
    const modal = new bootstrap.Modal(document.getElementById('modalPenghuni'));
    const form = document.getElementById('formPenghuni');
    form.reset();
    document.getElementById('modalTitle').textContent = id ? 'Edit Penghuni' : 'Tambah Penghuni';
    if (id) {
        fetch(`/penghuni/${id}`)
            .then(res => res.json())
            .then(res => {
                for (const key in res.data) {
                    if (form[key]) form[key].value = res.data[key];
                }
                modal.show();
            });
    } else {
        form.penghuniId.value = '';
        modal.show();
    }
    form.onsubmit = function(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        const method = id ? 'PUT' : 'POST';
        fetch('/penghuni' + (id ? '/' + id : ''), {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                modal.hide();
                loadDataPenghuni();
            } else {
                alert(res.message || 'Gagal menyimpan data');
            }
        });
    };
}

function hapusPenghuni(id) {
    if (!confirm('Yakin hapus penghuni ini?')) return;
    fetch('/penghuni/' + id, { method: 'DELETE' })
        .then(res => res.json())
        .then(res => {
            if (res.success) loadDataPenghuni();
            else alert(res.message || 'Gagal hapus data');
        });
} 