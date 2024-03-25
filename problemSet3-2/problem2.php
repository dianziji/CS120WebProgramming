<?php

$officeHours = [
    'Monday' => '9am - 4pm',
    'Tuesday' => '9am - 4pm',
    'Wednesday' => '9am - 4pm',
    'Thursday' => '9am - 4pm',
    'Friday' => '9am - 4pm',
    'Saturday' => '9am - 4pm',
    'Sunday' => '9am - 4pm',
];

function displayOfficeHours($officeHours) {

    $result = "<div id='hours'>";

    foreach ($officeHours as $day => $time) {

    $result .= "<div class='day-time'><div class='day'>{$day}:</div> <div class='time'>{$time}</div></div>";
    

}

$result .= "</div>";
return $result;

}

echo displayOfficeHours($officeHours);
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Problem2</title>
</head>
<body>
    <style>
        #hours{

            font-family: Arial;
           
        }

        .day-time{
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
        }
        .days{
            
            flex-basis: 90%;

        }
        .time{
            flex-basis: 90%;
        }


    </style>
    
</body>
</html>