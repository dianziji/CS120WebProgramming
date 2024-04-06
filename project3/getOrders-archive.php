<?php
header('Content-Type: application/json');

include 'db.php';

$response = [];

$orderSQL = "SELECT order_id, date_ordered FROM orders ORDER BY order_id DESC";
$orderResult = $conn->query($orderSQL);

while ($order = $orderResult->fetch_assoc()) {
    $items = [];
    $orderItemsSQL = "SELECT product_id, quantity, price FROM order_items WHERE order_id = " . $order['order_id'];
    $orderItemsResult = $conn->query($orderItemsSQL);
    
    while ($item = $orderItemsResult->fetch_assoc()) {
        $items[] = $item;
    }

    $order['items'] = $items;
    $response[] = $order;
}

echo json_encode($response);
?>