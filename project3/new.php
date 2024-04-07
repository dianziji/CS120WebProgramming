<?php

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if the "data" field is available in the POST request
    var_dump($_POST);
    if (isset($_POST['cart'])) {
        $data = $_POST['cart'];
        
        // Print the data
        echo "Received data: " . htmlspecialchars($data);
    } else {
        // Print an error message if "data" is not in the POST request
        echo "No data received.";
    }
} else {
    echo "get request.";
}

?>