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
$conn->select_db('paysblog');

//  Load and run SQL schema (only if 'data.php' is a valid SQL file)
$data_sql_query = "query.sql";
if (file_exists($data_sql_query)) {
    $conn->multi_query(file_get_contents($data_sql_query));
}

function post($conn, $limit) {
    $start = (int)$limit->start;
    $count = (int)$limit->end; // Ideally rename 'end' to 'count' for clarity
    
    $stmt = $conn->prepare("SELECT post FROM videos ORDER BY id DESC LIMIT ?, ?");
    $stmt->bind_param("ii", $start, $count);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $jsondata = [];
    
    while ($row = $result->fetch_assoc()) {
        $jsondata[] = json_decode($row['post'], true); // Decode as associative array
    }

    return json_encode($jsondata);
}


// ✅ Member function
function member($conn, $data) {
    $_id = $data->_id ?? '';
    $email = $data->user ?? '';

    $query = $conn->prepare("SELECT * FROM users WHERE _id=? AND email=? LIMIT 1");
    $query->bind_param('ss', $_id, $email);
    $query->execute();
    $result = $query->get_result();

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode([
            "status" => true,
            "data" => $row['profile']
        ]);
    } else {
        echo json_encode([
            "status" => false,
            "message" => "session expired"
        ]);
    }

    $query->close();
}

// ✅ Login function
function login($conn, $data){
    $user = $data->user ?? '';
    $pass = $data->pass ?? '';

    // SQL with typo fix — must include SELECT *
    $query = $conn->prepare("SELECT * FROM users WHERE (user=? OR email=?) AND pass=? LIMIT 1");

    if (!$query) {
        // Debugging help
        echo json_encode([
            "status" => false,
            "message" => "SQL prepare failed",
            "error" => $conn->error
        ]);
        return;
    }

    $query->bind_param('sss', $user, $user, $pass);
    $query->execute();
    $result = $query->get_result();

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $_id=md5($email.time().md5(time()));
        $query=$conn->prepare("update users set _id=? where (user=? OR email=?) AND pass=? LIMIT 1");
        $query->bind_param('ssss',$_id, $user, $user, $pass);
        $query->execute();
        echo json_encode([
            "status" => true,
            "message" => "successful",
            "email" => $row['email'],
            "_id" => $_id
        ]);

    } else {
        echo json_encode([
            "status" => false,
            "message" => "invalid credentials!"
        ]);
    }

    $query->close();
}

function signup($conn,$data){
    $email=mysqli_real_escape_string($conn,$data->user);
    $smt=$conn->prepare("select * from users where email=? limit 1");
    $smt->bind_param('s',$email);
    $smt->execute();
    $result=$smt->get_result();
    $_id=rand(100000,999999);
    if(filter_var($email,FILTER_VALIDATE_EMAIL)){
        if($result->num_rows){
            $row=$result->fetch_assoc();
            if($row['status'] === 'pending'){
                $smt=$conn->prepare("update users set _id=? where email=? limit 1");
                $smt->bind_param('ss',$_id,$email);
                $smt->execute();
            echo  json_encode([
                "status" => true,
                "message" => "email address updated successfull",
                "_id" => md5($_id),
                "email" => $email
            ]);
           }
           else{
               echo json_encode([
                'status' =>  false,
                'message' => "invalid email address already in use"
               ]);
           }
        }
        else{
                $smt=$conn->prepare("insert into users (_id,email) values (?,?)");
                $smt->bind_param('ss',$_id,$email);
                $smt->execute();
                echo  json_encode([
                    "status" => true,
                    "message" => "email address inserted successfull",
                    "_id" => md5($_id),
                    "email" => $email,
                ]);
        }
    }
    else {
        echo  json_encode([
            "status" => false,
            "message" => "invalid email address",
        ]);
    }
}

?>
