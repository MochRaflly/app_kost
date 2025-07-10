// Panel Kamar CRUD
function loadKamarPanel() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h4>Data Kamar</h4>
        <button class="btn btn-primary" id="btnTambahKamar"><i class="bi bi-plus"></i> Tambah Kamar</button>
    </div>
    <table class="table table-bordered" id="tabelKamar" style="width:100%">
        <thead><tr>
            <th>Nomor</th><th>Harga</th><th>Status</th><th>Fasilitas</th><th>Foto</th><th>Aksi</th>
        </tr></thead>
        <tbody></tbody>
    </table>
    <!-- Modal Form Kamar -->
    <div class="modal fade" id="modalKamar" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
        <form id="formKamar" enctype="multipart/form-data">
        <div class="modal-header"><h5 class="modal-title" id="modalTitleKamar">Tambah Kamar</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
            <input type="hidden" name="id" id="kamarId">
            <div class="mb-2"><label>Nomor</label><input type="text" class="form-control" name="nomor" required></div>
            <div class="mb-2"><label>Harga</label><input type="number" class="form-control" name="harga" required></div>
            <div class="mb-2"><label>Status</label><select class="form-control" name="status"><option value="kosong">Kosong</option><option value="terisi">Terisi</option></select></div>
            <div class="mb-2"><label>Fasilitas</label><input type="text" class="form-control" name="fasilitas"></div>
            <div class="mb-2"><label>Foto</label><input type="file" class="form-control" name="foto" accept="image/*"></div>
            <div id="previewFoto" class="mb-2"></div>
        </div>
        <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Simpan</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
        </div>
        </form>
    </div></div></div>
    `;
    loadDataKamar();
    document.getElementById('btnTambahKamar').onclick = function() {
        showModalKamar();
    };
}

function loadDataKamar() {
    fetch('/kamar')
        .then(res => res.json())
        .then(res => {
            const tbody = document.querySelector('#tabelKamar tbody');
            tbody.innerHTML = '';
            res.data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.nomor}</td>
                    <td>Rp ${parseInt(row.harga).toLocaleString('id-ID')}</td>
                    <td>${row.status || '-'}</td>
                    <td>${row.fasilitas || '-'}</td>
                    <td>${row.foto ? `<img src="${row.foto}" alt="foto" style="width:48px;">` : '-'}</td>
                    <td>
                        <button class="btn btn-sm btn-info me-1" onclick="showModalKamar(${row.id})"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="hapusKamar(${row.id})"><i class="bi bi-trash"></i></button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        });
}

function showModalKamar(id = null) {
    const modal = new bootstrap.Modal(document.getElementById('modalKamar'));
    const form = document.getElementById('formKamar');
    form.reset();
    document.getElementById('modalTitleKamar').textContent = id ? 'Edit Kamar' : 'Tambah Kamar';
    document.getElementById('previewFoto').innerHTML = '';
    if (id) {
        fetch(`/kamar/${id}`)
            .then(res => res.json())
            .then(res => {
                for (const key in res.data) {
                    if (form[key]) form[key].value = res.data[key];
                }
                if (res.data.foto) {
                    document.getElementById('previewFoto').innerHTML = `<img src="${res.data.foto}" alt="foto" style="width:80px;">`;
                }
                modal.show();
            });
    } else {
        form.kamarId.value = '';
        modal.show();
    }
    form.foto.onchange = function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(ev) {
                document.getElementById('previewFoto').innerHTML = `<img src="${ev.target.result}" alt="foto" style="width:80px;">`;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    form.onsubmit = function(e) {
        e.preventDefault();
        const data = new FormData(form);
        const method = id ? 'PUT' : 'POST';
        fetch('/kamar' + (id ? '/' + id : ''), {
            method: method,
            body: data
        })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                modal.hide();
                loadDataKamar();
            } else {
                alert(res.message || 'Gagal menyimpan data');
            }
        });
    };
}

function hapusKamar(id) {
    if (!confirm('Yakin hapus kamar ini?')) return;
    fetch('/kamar/' + id, { method: 'DELETE' })
        .then(res => res.json())
        .then(res => {
            if (res.success) loadDataKamar();
            else alert(res.message || 'Gagal hapus data');
        });
} 