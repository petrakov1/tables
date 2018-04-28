<?php
		$id= trim($_REQUEST['id']);
		require_once('connectNew.php');
		$query = "SELECT * FROM orders WHERE id=".$id ;
		
		$result = $conn->query($query);
		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();	
			echo $row['order'];
		}
?>
