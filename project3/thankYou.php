<?php
// Assuming order total and ship date are passed as query parameters for simplicity
// $orderTotal = $_GET['total'] ?? 'N/A';
$shipDate = new DateTime('+2 days');

include 'db.php';

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>thank you</title>
    <link rel="stylesheet" href="style.css">
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
    <style>
        /* Centering the content with Flexbox */


    </style>
</header>

<main>
    <div id="thankyoucontainer">
    <h1>Thank You for Your Order!</h1>
    <p>Your order total is: $<span id="orderTotal"></span></p>
    <p>Expected Ship Date: <?= htmlspecialchars($shipDate->format('Y-m-d')) ?></p>
    <a href="product.php">Continue Shopping</a>
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


    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Retrieve the total order cost from Local Storage
            const orderTotal = localStorage.getItem('orderTotal');
            document.getElementById('orderTotal').textContent = orderTotal;

            localStorage.clear(); 

        });
    </script>

</body>




</html>