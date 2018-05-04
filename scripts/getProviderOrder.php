<?php

$id= trim($_REQUEST['id']);
		require_once('connectNew.php');


    
		$query = "SELECT * FROM orders_dublicates WHERE id=".$id;
		
		$result = $conn->query($query);
		if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();	
      
		$query1 = "SELECT * FROM orders WHERE id=".$row["order_id"];
		
		$result1 = $conn->query($query1);
		if ($result1->num_rows > 0) {
			$row1 = $result1->fetch_assoc();	
			echo '{"provider_id":"'.$row['provider_id'].'","order":"'.str_replace('"','\"',$row1['order']).'","numbers":"'.str_replace('"','\"',$row['numbers']).'"}';
		}


			// echo '{"last":'.$row["provider"].', ';
		}

?>