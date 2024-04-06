<?php
header('Content-Type: application/json');
ini_set('display_errors', 1); // Good for production, but you might temporarily set it to 1 for debugging
error_reporting(E_ALL);

include 'db.php'; // Your database connection setup
//for testing
// $rawData = file_get_contents("php://input");

// $rawData = json_decode($_POST['cart']);

var_dump($_POST);
echo json_encode($_POST['cart']);
echo json_encode(['success' => true]);
// echo json_encode(['received_raw' => $rawData]);

// exit;


// $data = json_decode(file_get_contents('php://input'), true);

// echo json_encode(['received' => $data]);

// echo json_encode($data['cart']);
// $data = json_decode($rawData, true);

// if ($data) {
//     // Handle the decoded data
//     echo "Data received: " . print_r($data, true);
// } else {
//     echo "No data received or data is not valid JSON.";
// }
// echo json_encode(["message" => "This is a test response"]);
// $data = json_decode(file_get_contents('php://input'), true);





// Check if the cart data is correctly structured and not empty
if (empty($data['hardcodedJson'])) {
    // If the cart is empty or not set, send an appropriate response
    echo json_encode(['success' => false, 'message' => 'Cart is empty']);
    exit;
}
if (!isset($data['hardcodedJson'])) {
    // If the cart is empty or not set, send an appropriate response
    echo json_encode(['success' => false, 'message' => 'isset issue']);
    exit;
}


$conn->begin_transaction(MYSQLI_TRANS_START_READ_WRITE);

try {
    $stmt = $conn->prepare("INSERT INTO orders (date_ordered) VALUES (NOW())");
    $stmt->execute();
    $order_id = $conn->insert_id;

    $stmtItem = $conn->prepare("INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)");

    foreach ($data['cart'] as $product_id => $item) {
        // Validate and sanitize input
        $quantity = $item['quantity'];

        
        // Insert the order item
        $stmtItem->bind_param("iii", $order_id, $product_id, $quantity);
        $stmtItem->execute();
    }
    $conn->commit();

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => 'Checkout failed: ' . $e->getMessage()]);
}


$conn->close();
?>
