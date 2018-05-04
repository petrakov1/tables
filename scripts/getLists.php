<?php

include "connectNew.php";
$query = trim($_REQUEST["query"]);
$result = $conn->query("SELECT * FROM list_providers");
if ($result->num_rows > 0) {
    $res = "[";
    while($row = $result->fetch_assoc()) {
        $res.= '{"id":"'.$row["id"].'","name":"'.$row["name_list"].'","provider_info":"'.str_replace('"','\"',$row["provider_info"]).'" },';
    }
    $res = substr($res, 0, -1);
    $res .= "]";
    echo $res;
}	
?>