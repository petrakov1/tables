
<?php

include "connectNew.php";
$query = trim($_REQUEST["query"]);
$result = $conn->query("SELECT * FROM user Where id=".$_POST["id"]);
if ($result->num_rows > 0) {
    $res = "";
    $row = $result->fetch_assoc() ;
    $res.= '{"id":"'.$row["id"].'","fio":"'.$row["name"].' '.$row["surname"].'","tel":"'.$row["phone"].'","site":"'.$row["site"].'","email":"'.$row["email"].'"}';
    
    
    echo $res;
}	
?>