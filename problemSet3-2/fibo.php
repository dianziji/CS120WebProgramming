<?php

    $n=$_GET["n"];

    function fibSeq($n) {

    $fiboArr = array(0,1);

    if($n== 0){
        return [];
    }
    if($n== 1){
        return [0];
    }


    for ($i = 2; $i < $n; $i++) {
        $fiboArr[$i] = $fiboArr[$i-1] + $fiboArr[$i-2];
        
    }
    return $fiboArr;
    }

    $fibJson = [
        "length" => $n,
        "fibSequence" => fibSeq($n)

    ];

    echo json_encode($fibJson);


?>




<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Problem3</title>
</head>
<body>
    
</body>
</html>