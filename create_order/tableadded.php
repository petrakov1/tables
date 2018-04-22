<html>
<head>
	<title>Add Table</title>
</head>
<body>
	<?php


			$data_missing = array();

			if (empty($_POST['name'])) {
				$data_missing[] = 'Name';
			} else {
				$f_name= trim($_POST['name']);
			}

			if (empty($_POST['json'])) {
				$data_missing[] = 'Json';
			} else {
				$f_json= trim($_POST['json']);
			}

			if(empty($data_missing)) {
				require_once('./connect.php');
				$query = "INSERT INTO table_list (name, json) VALUES (?, ?)";
				$stmt = mysqli_prepare($dbc, $query);
				mysqli_stmt_bind_param($stmt, "ss", $f_name, $f_json);
				mysqli_stmt_execute($stmt);
				$affected_rows = mysqli_stmt_affected_rows($stmt);

				if ($affected_rows == 1) {

					echo 'Tables Entered';
					mysqli_stmt_close($stmt);
					mysqli_close($dbc);
				} else {

					echo 'Error Occured<br />';
					echo mysqli_error();
					mysqli_close($dbc);
				}
			} else
{
				echo 'You need to enter following data<br />';
				foreach($data_missing as $missing) {
					echo "$missing<br />";
				}
			}

	 ?>
 </body>
</html>
