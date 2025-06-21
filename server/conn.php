<?php
// ✅ Allow cross-origin requests and set content type
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

//  Connect to MySQL
$conn = new mysqli('localhost', 'root', '') or die('Unable to connect');

//  Create database if it doesn't exist
$conn->query("CREATE DATABASE IF NOT EXISTS xgod");
$conn->select_db('xgod');

//  Load and run SQL schema (only if 'data.php' is a valid SQL file)
$data_sql_query = "query.sql";
if (file_exists($data_sql_query)) {
    $conn->multi_query(file_get_contents($data_sql_query));
}
?>