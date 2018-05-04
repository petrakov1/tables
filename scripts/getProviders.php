<?php
		$id= trim($_REQUEST['id']);
		require_once('connectNew.php');




		$query = "SELECT * FROM providers WHERE id=1" ;
		
		$result = $conn->query($query);
		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();	
			echo '{"last":'.$row["provider"].', "providers":"'.str_replace('"','\"',$row['other']).'"}';
		}
?>
