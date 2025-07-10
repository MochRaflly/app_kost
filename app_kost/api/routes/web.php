<?php
// Routing dasar, akan dikembangkan untuk semua endpoint CRUD dan khusus

switch (true) {
    // Contoh: GET /penghuni
    case $uri === '/penghuni' && $method === 'GET':
        (new PenghuniController())->index();
        break;
    // Endpoint notifikasi admin tagihan terlambat
    case $uri === '/tagihan/overdue' && $method === 'GET':
        (new TagihanController())->overdue();
        break;
    // Endpoint lain akan ditambahkan di sini
    default:
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'message' => 'Endpoint not found',
        ]);
        break;
} 