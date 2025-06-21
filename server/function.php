<?php
include 'conn.php';
function upload($conn, $input) {
    $dir = "myfile/";
    $now = date("Ymd_His");

    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }

    // Get file extensions
    $imgExt = explode('/', explode(';', $input->image)[0])[1];
    $vidExt = explode('/', explode(';', $input->video)[0])[1];

    // File names
    $imgFile = "image_" . $now . "." . $imgExt;
    $vidFile = "video_" . $now . "." . $vidExt;

    // Get base64 content
    $imgData = base64_decode(explode(',', $input->image)[1]);
    $vidData = base64_decode(explode(',', $input->video)[1]);

    // Save files
    file_put_contents($dir . $imgFile, $imgData);
    file_put_contents($dir . $vidFile, $vidData);

    // Save path to DB
    $post = json_encode([
        "title" => $input->title,
        "video" => $vidFile,
        "image" => $imgFile,
        "duration" => $input->length
    ]);

    $stmt = $conn->prepare("INSERT INTO videos (post) VALUES (?)");
    $stmt->bind_param("s", $post);

    echo $stmt->execute() ? "Upload successful." : "DB error: " . $stmt->error;
}




function post($conn, $limit) {
    // Sanitize and validate input
    $start = isset($limit->start) ? (int)$limit->start : 0;
    $count = isset($limit->end) ? (int)$limit->end : 4;

    // Prepare and execute SQL
    $stmt = $conn->prepare("SELECT post FROM videos ORDER BY id DESC LIMIT ?, ?");
    if (!$stmt) {
        http_response_code(500);
        return json_encode(['error' => 'Database prepare failed']);
    }

    $stmt->bind_param("ii", $start, $count);
    $stmt->execute();
    $result = $stmt->get_result();

    // Fetch and decode JSON from DB
    $jsondata = [];
    while ($row = $result->fetch_assoc()) {
        $decoded = json_decode($row['post'], true);
        if (json_last_error() === JSON_ERROR_NONE) {
            $jsondata[] = $decoded;
        }
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
