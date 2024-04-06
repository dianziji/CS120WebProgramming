<?php

include 'db.php';

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>order page</title>
    <link rel="stylesheet" href="order_style.css">
</head>
<body>
    
<header>
        <img src="images/tote-bag-logo.png" alt="EcoTrend Totes Logo">
        <h1>EcoTrend Totes</h1>
        <nav>
            <ul>
                <li><a href="product.php">Products</a></li>
                <li><a href="cart.php">Cart</a></li>
                <li><a href="orders.php">Orders</a></li>
            </ul>
        </nav>
    
    </header>

    <main>
    <div class="order-container">
        <?php
        // Your existing PHP and MySQL connection setup

        $orderSQL = "SELECT order_id, date_ordered FROM orders ORDER BY order_id DESC";
        $orderResult = $conn->query($orderSQL);

        if ($orderResult->num_rows > 0) {
            while ($order = $orderResult->fetch_assoc()) {
                echo "<div class='order-header'>";
                echo "<h2>Order #" . htmlspecialchars($order["order_id"]) . "</h2>";
                echo "<p>Date Ordered: " . htmlspecialchars($order["date_ordered"]) . "</p>";
                echo "</div>";

                $orderItemsSQL = "SELECT oi.order_id, oi.product_id, oi.quantity, p.name, p.price FROM order_items oi JOIN products p ON oi.product_id = p.product_id WHERE oi.order_id = " . $order["order_id"];
                $orderItemsResult = $conn->query($orderItemsSQL);

                if ($orderItemsResult->num_rows > 0) {
                    echo "<table>";
                    echo "<thead>";
                    echo "<tr><th>Product Name</th><th>Quantity</th><th>Cost</th></tr>";
                    echo "</thead>";
                    echo "<tbody>";
                    while ($item = $orderItemsResult->fetch_assoc()) {
                        echo "<tr>";
                        echo "<td>" . htmlspecialchars($item["name"]) . "</td>";
                        echo "<td>" . htmlspecialchars($item["quantity"]) . "</td>";
                        echo "<td>$" . htmlspecialchars(number_format($item["price"] * $item["quantity"], 2)) . "</td>";
                        echo "</tr>";
                    }
                    echo "</tbody>";
                    echo "</table>";
                } else {
                    echo "<p>No items found for this order.</p>";
                }
            }
        } else {
            echo "<p>No orders found.</p>";
        }


        ?>
            <a href="product.php" class="continue-shopping">Continue Shopping</a>
    </div>

</main>

    



<footer>
    <h2>EcoTrend Totes</h2>
    <p>Welcome to EcoTrend Totes - where fashion embraces sustainability! Discover our stylish collection of
            eco-friendly tote bags made from 100% recycled materials. Perfect for every occasion, our totes are designed
            for the eco-conscious shopper with a flair for style. Shop now and carry a piece of sustainability wherever
            you go!</p>
        <p>&copy; 2024 Shuo Yang</p>
    </footer>

</body>
</html>