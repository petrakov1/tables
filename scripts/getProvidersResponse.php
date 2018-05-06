<?php
		$id= trim($_REQUEST['id']);
		require_once('connectNew.php');




		$query = "SELECT * FROM orders_dublicates WHERE order_id=".$id ;
		
		$result = $conn->query($query);
		if ($result->num_rows > 0) {
            $res = "[";
            while($row = $result->fetch_assoc())
            {
                $res .= '{"provider_id":'.$row["provider_id"].', "numbers":"'.str_replace('"','\"',$row['numbers']).'"},';
            }	
            $res = substr($res, 0, -1);
            $res .= "]";
            echo $res;
        }
        else {
            http_response_code(500);
        }
?>
