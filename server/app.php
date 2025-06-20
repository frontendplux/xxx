<?php
$data=json_decode(file_get_contents('php://input'));
$router=explode('/',$_GET['url']);
include 'function.php';
switch ($router[0]) {
    case 'post':
        echo post($conn,$data);  
        break;
    
    default:
         echo 'error';
        break;
}