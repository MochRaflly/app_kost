-- Struktur Database Aplikasi Kos
-- -----------------------------------

-- 1. Tabel Penghuni
CREATE TABLE tb_penghuni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    no_ktp VARCHAR(20) NOT NULL UNIQUE,
    no_hp VARCHAR(15) NOT NULL,
    tgl_masuk DATE NOT NULL,
    tgl_keluar DATE
);
CREATE INDEX idx_penghuni_no_ktp ON tb_penghuni(no_ktp);

-- 2. Tabel Kamar
CREATE TABLE tb_kamar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nomor VARCHAR(10) NOT NULL UNIQUE,
    harga DECIMAL(10,2) NOT NULL
);
CREATE INDEX idx_kamar_nomor ON tb_kamar(nomor);

-- 3. Tabel Barang
CREATE TABLE tb_barang (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(50) NOT NULL,
    harga DECIMAL(10,2) NOT NULL
);
CREATE INDEX idx_barang_nama ON tb_barang(nama);

-- 4. Tabel Kamar Penghuni
CREATE TABLE tb_kmr_penghuni (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_kamar INT NOT NULL,
    id_penghuni INT NOT NULL,
    tgl_masuk DATE NOT NULL,
    tgl_keluar DATE,
    FOREIGN KEY (id_kamar) REFERENCES tb_kamar(id),
    FOREIGN KEY (id_penghuni) REFERENCES tb_penghuni(id)
);
CREATE INDEX idx_kmr_penghuni_kamar ON tb_kmr_penghuni(id_kamar);
CREATE INDEX idx_kmr_penghuni_penghuni ON tb_kmr_penghuni(id_penghuni);

-- 5. Tabel Barang Bawaan
CREATE TABLE tb_brng_bawaan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_penghuni INT NOT NULL,
    id_barang INT NOT NULL,
    FOREIGN KEY (id_penghuni) REFERENCES tb_penghuni(id),
    FOREIGN KEY (id_barang) REFERENCES tb_barang(id)
);
CREATE INDEX idx_brng_bawaan_penghuni ON tb_brng_bawaan(id_penghuni);

-- 6. Tabel Tagihan
CREATE TABLE tb_tagihan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bulan CHAR(7) NOT NULL, -- Format: YYYY-MM
    id_kmr_penghuni INT NOT NULL,
    jml_tagihan DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_kmr_penghuni) REFERENCES tb_kmr_penghuni(id)
);
CREATE INDEX idx_tagihan_bulan ON tb_tagihan(bulan);
CREATE INDEX idx_tagihan_kmr_penghuni ON tb_tagihan(id_kmr_penghuni);

-- 7. Tabel Bayar
CREATE TABLE tb_bayar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_tagihan INT NOT NULL,
    jml_bayar DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'lunas') NOT NULL DEFAULT 'pending',
    FOREIGN KEY (id_tagihan) REFERENCES tb_tagihan(id)
);
CREATE INDEX idx_bayar_tagihan ON tb_bayar(id_tagihan);
CREATE INDEX idx_bayar_status ON tb_bayar(status);

-- Sample Data
INSERT INTO tb_penghuni (nama, no_ktp, no_hp, tgl_masuk, tgl_keluar) VALUES
('Rafly', '3201010101010001', '081234567890', '2024-01-10', NULL),
('Cecep', '3201010101010002', '081234567891', '2024-02-01', NULL);

INSERT INTO tb_kamar (nomor, harga) VALUES
('A1', 750000),
('A2', 800000);

INSERT INTO tb_barang (nama, harga) VALUES
('Kipas Angin', 150000),
('Kasur', 500000);

INSERT INTO tb_kmr_penghuni (id_kamar, id_penghuni, tgl_masuk, tgl_keluar) VALUES
(1, 1, '2024-01-10', NULL),
(2, 2, '2024-02-01', NULL);

INSERT INTO tb_brng_bawaan (id_penghuni, id_barang) VALUES
(1, 1),
(1, 2),
(2, 2);

INSERT INTO tb_tagihan (bulan, id_kmr_penghuni, jml_tagihan) VALUES
('2024-03', 1, 750000),
('2024-03', 2, 800000);

INSERT INTO tb_bayar (id_tagihan, jml_bayar, status) VALUES
(1, 750000, 'lunas'),
(2, 400000, 'pending'); 