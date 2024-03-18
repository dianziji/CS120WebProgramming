<?php

$n = $_GET['n'];


echo "<h2>Times table of $n</h2>";

for( $i = 1; $i <= 12; $i++){
    $result = $i * $n;
    echo "$i x $n = $result <br>";
}


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>problem1</title>
</head>
<body>

</body>
</html>