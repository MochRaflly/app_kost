<?php
class PenghuniController {
    public function index() {
        try {
            $database = new Database();
            $db = $database->getConnection();
            $model = new Penghuni($db);
            $data = $model->getAll();
            echo json_encode([
                'success' => true,
                'data' => $data
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
    }
    // Method CRUD lain akan ditambahkan
} 