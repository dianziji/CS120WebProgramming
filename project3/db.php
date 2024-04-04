<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>product database</title>
</head>
<body>
<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

//establish connection info
$server = "shuoy.sgedu.site"; // your server
$userid = "ulccatdvz74vl"; // your user id
$pw = "lldo8we0gwbt"; // your pw
$db = "dbkvhxs8xwd2gd"; // your database

// Create connection
$conn = new mysqli($server, $userid, $pw, $db); // You can directly pass $db here

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully<br>";

// SQL query to fetch all products
$productSQL = "SELECT product_id, name, price, description, image_url FROM products";
$productResult = $conn->query($productSQL);

//for testing


if ($productResult->num_rows > 0) {
    // Output data of each row
    while($product = $productResult->fetch_assoc()) {
        echo '<div class="product">';
        echo '<img src="' . htmlspecialchars($product['image_url']) . '" alt="' . htmlspecialchars($product['name']) . '">';
        echo '<h2>' . htmlspecialchars($product['name']) . '</h2>';
        echo '<p>$' . htmlspecialchars($product['price']) . '</p>';
        echo '<p>' . htmlspecialchars($product['description']) . '</p>';
        // Assuming you will handle the "Add to Cart" functionality later
        echo '<button>Add to Cart</button>';
        echo '<button class="more-info-btn">More</button>';
        echo '<div class="description" style="display:none;">' . htmlspecialchars($product['description']) . '</div>';
        echo '</div>';
    }
} else {
    echo "No products found.";
}

// Close the database connection
$conn->close();


// //get results
// if ($result->num_rows > 0) {
//     while($row = $result->fetch_assoc()) {
//         echo $row["name"]. " - $" . $row["price"]. " - " . $row["description"]."<br>";
//     }
// } else {
//     echo "No results";
// }
// ini_set('display_errors', 1);
// error_reporting(E_ALL);
//close the connection  
// $conn->close();
?>
</body>
</html>