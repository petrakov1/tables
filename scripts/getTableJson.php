<?php
		$id= trim($_REQUEST['id']);
		require_once('connectNew.php');

$query = "SELECT * FROM links WHERE type=1 AND order_id=".$id;
	
$result = $conn->query($query);
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();	
    $link =  $row['link'];

}



		$query = "SELECT * FROM orders WHERE id=".$id ;
		
		$result = $conn->query($query);
		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();	
			echo '{"name":"'.$row['name_order'].'","link":"'.$link.'","order":"'.str_replace('"','\"',$row['order']).'"}';
		}
?>
