<?php

include "connectNew.php";
$query = trim($_REQUEST["query"]);
$result = $conn->query("SELECT * FROM orders WHERE name_order LIKE '%".$query."%'");
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo '<span data-id="'.$row["id"].'" onclick="openOrder('.$row["id"].')">'.$row["name_order"].'</span>';
    }
}	
?>