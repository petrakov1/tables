<?php


			$data_missing = array();

			
            if (empty($_POST['providers'])) {
				$data_missing[] = 'Order';
			} else {
                $f_order= trim($_POST['providers']);
                // $f_order= json_encode($f_order);
			}
			
				$f_json= "{}";
				$f_n = $_POST['last'];
				$f_order = str_replace("'","\'",$f_order);
				
					$f_order = str_replace('\"',"\'",$f_order);

			if(empty($data_missing)) {
				require "connectNew.php";
				$query = "UPDATE `providers` SET `other` = '".$f_order."', `provider` = '".$f_n."' WHERE `id` = 1";
               
                    if (!$conn->query($query))
                    {
                    echo("<h1 class='white'>Error description: " . mysqli_error($conn)). "</h1>";
					}
					else
					{
						echo $_POST['providers'];
						
					}

			} else
{
				
			}

	 ?>