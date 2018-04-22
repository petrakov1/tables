
	<?php
		$f_name= trim($_POST['name']);
		require_once('./connect.php');
		$query = "SELECT json FROM table_list WHERE name='$f_name'";
		$result = @mysqli_query($dbc, $query);
		$row = mysqli_fetch_array($result);
		echo json_encode(
			array(
    				"json" => $row[json]
    			)
		);
	 ?>
