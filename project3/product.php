<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>product</title>
    <link rel="stylesheet" href="style.css">

    <?php include 'db.php';?>

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
        <section class="product-list">
            <div class="products-container">
                <?php while($product = $productResult->fetch_assoc()): ?>
                <div class="product">
                    <img src="<?= htmlspecialchars($product['image_url']) ?>"
                        alt="<?= htmlspecialchars($product['name']) ?>">
                    <h2>
                        <?= htmlspecialchars($product['name']) ?>
                    </h2>
                    <p>$
                        <?= htmlspecialchars($product['price']) ?>
                    </p>
                    <select name="quantity" class="quantity-select">
                        <?php for ($i = 1; $i <= 5; $i++): ?>
                        <option value="<?= $i ?>">
                            <?= $i ?>
                        </option>
                        <?php endfor; ?>
                    </select>
                    <button class="more-info-btn">More</button>
                    <div class="description" style="display:none;">
                        <?= htmlspecialchars($product['description']) ?>
                    </div>
                    <button class="add-to-cart-btn" data-product-id="<?= $product['product_id'] ?>">Add to Cart</button>
                </div>
                <?php endwhile; ?>
            </div>
        </section>
    </main>


    <footer>
        <h2>EcoTrend Totes</h2>
        <p>Welcome to EcoTrend Totes - where fashion embraces sustainability! Discover our stylish collection of
            eco-friendly tote bags made from 100% recycled materials. Perfect for every occasion, our totes are designed
            for the eco-conscious shopper with a flair for style. Shop now and carry a piece of sustainability wherever
            you go!</p>
        <p>&copy; 2024 Shuo Yang</p>
    </footer>




    <script src="productScript.js"></script>

</body>

</html>