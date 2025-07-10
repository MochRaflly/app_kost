<?php
class Penghuni {
    private $conn;
    private $table = 'tb_penghuni';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $stmt = $this->conn->prepare("SELECT * FROM {$this->table}");
        $stmt->execute();
        return $stmt->fetchAll();
    }

    // Fungsi CRUD lain (create, update, delete, getById) akan ditambahkan
} 