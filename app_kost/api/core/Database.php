<?php
class Database {
    private $host = 'localhost';
    private $db_name = 'nama_database'; // Ganti dengan nama database Anda
    private $username = 'root'; // Ganti dengan username database Anda
    private $password = '';
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch(PDOException $exception) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => 'Database connection error: ' . $exception->getMessage()
            ]);
            exit;
        }
        return $this->conn;
    }
} 