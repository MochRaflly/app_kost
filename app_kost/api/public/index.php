<?php
header('Content-Type: application/json');

// Autoload core, models, controllers
spl_autoload_register(function ($class_name) {
    $paths = [
        __DIR__ . '/../core/' . $class_name . '.php',
        __DIR__ . '/../models/' . $class_name . '.php',
        __DIR__ . '/../controllers/' . $class_name . '.php',
    ];
    foreach ($paths as $path) {
        if (file_exists($path)) {
            require_once $path;
            return;
        }
    }
});

// Simple router
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = str_replace('/api/public', '', $uri); // base path
$method = $_SERVER['REQUEST_METHOD'];

// Routing table (akan diisi endpoint CRUD dan khusus)
require_once __DIR__ . '/../routes/web.php'; 