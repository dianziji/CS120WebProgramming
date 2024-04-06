<?php
// Assuming order total and ship date are passed as query parameters for simplicity
$orderTotal = $_GET['total'] ?? 'N/A';
$shipDate = new DateTime('+2 days');
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>thank you</title>
</head>
<body>
<h1>Thank You for Your Order!</h1>
    <p>Your order total is: $<?= htmlspecialchars($orderTotal) ?></p>
    <p>Expected Ship Date: <?= htmlspecialchars($shipDate->format('Y-m-d')) ?></p>
    <a href="product.php">Continue Shopping</a>
</body>
</html>