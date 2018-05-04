<?php


			$data_missing = array();

			if (empty($_POST['id'])) {
				$data_missing[] = 'Name';
			} else {
				$f_id= trim($_POST['id']);
            }
            if (empty($_POST['numbers'])) {
				$data_missing[] = 'Order';
			} else {
                $f_order= trim($_POST['numbers']);
                // $f_order= json_encode($f_order);
			}
            echo $_POST['order'];
			
				$f_json= "{}";
			

			if(empty($data_missing)) {
				require "connectNew.php";
				$query = "UPDATE `orders_dublicates` SET `numbers` = '".$f_order."' WHERE `id` = ".$f_id;
               
                    if (!$conn->query($query))
                    {
                    echo("<h1 class='white'>Error description: " . mysqli_error($conn)). "</h1>";
                    }

			} else
{
				
			}

	 ?>