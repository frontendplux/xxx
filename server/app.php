<?php
header('Content-Type: application/json');
include 'function.php'; // Where your post() function lives

// Validate JSON input
$input = json_decode(file_get_contents('php://input'));

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON body']);
    exit;
}

// Check if `url` parameter is present
if (!isset($_GET['url'])) {
    http_response_code(404);
    echo json_encode(['error' => 'Missing API endpoint']);
    exit;
}

$router = explode('/', $_GET['url']);

switch ($router[0]) {
    case 'post':
        echo post($conn, $input);
        break;

    case 'upload':
        echo upload($conn, $input);
        break;

        
    // case 'server_user_auth':
    //     // echo server_user_auth($conn, $input);
    //     echo json_encode(['status' => false ]);
    //     break;

        
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Unknown endpoint']);
        break;
}
