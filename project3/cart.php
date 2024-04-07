<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>cart</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="cartScript.js"></script>
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


<main id="cartContainer">
    
<table id="cartTable">
    <thead>
        <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>           
            <th>&nbsp;</th>
        </tr>
    </thead>
    <tbody id="cartItemsContainer">
        <!-- Cart items will be inserted here -->
    </tbody>
</table>
</main>




<div class='end_btn'>
    <button id="continueShopping">Continue Shopping</button>
    <button id="checkOut">Check Out</button>
</div>

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