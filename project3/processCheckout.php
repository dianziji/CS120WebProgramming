<?php
header('Content-Type: application/json');


// ini_set('display_errors', 1); // Good for production, but you might temporarily set it to 1 for debugging
// error_reporting(E_ALL);

include 'db.php'; // Your database connection setup
//for testing
// $rawData = file_get_contents("php://input");

// $rawData = json_decode($_POST['cart']);
$json = file_get_contents('php://input');

// Converts it into a PHP object
$data = json_decode($json, true);

// var_dump($json);
// var_dump($data);
// var_dump(array_keys($data));
// echo "abc";
// var_dump($data['cart']);
// $data = json_decode(file_get_contents('php://input'), true);

// Check if the cart data is correctly structured and not empty
if (empty($data['cart'])) {
    // If the cart is empty or not set, send an appropriate response
    echo json_encode(['success' => false, 'message' => 'Cart is empty']);
    exit;
}
if (!isset($data['cart'])) {
    // If the cart is empty or not set, send an appropriate response
    echo json_encode(['success' => false, 'message' => 'isset issue']);
    exit;
}

// echo "after empty check";
$conn->begin_transaction();

try {
    $stmt = $conn->prepare("INSERT INTO orders (date_ordered) VALUES (NOW())");
    $stmt->execute();
    $order_id = $conn->insert_id;
    // echo "after insert id";
    // echo "$order_id";
    $stmtItem = $conn->prepare("INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)");

    foreach ($data['cart'] as $product_id => $item) {
        // Validate and sanitize input
        $quantity = $item['quantity'];

        
        // Insert the order item
        $stmtItem->bind_param("iii", $order_id, $product_id, $quantity);
        $stmtItem->execute();

        // echo "$product_id";
    }




    $conn->commit();

    $response = [
        'success' => true,
        'message' => 'Data received successfully',
    ];

    echo json_encode($response);


} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['success' => false, 'message' => 'Checkout failed: ' . $e->getMessage()]);
}


$conn->close();

// ?>