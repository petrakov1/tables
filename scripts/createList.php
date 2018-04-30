<?php


			$data_missing = array();

			if (empty($_POST['name'])) {
				$data_missing[] = 'Name';
			} else {
				$f_name= trim($_POST['name']);
            }
            
			if(empty($data_missing)) {
				require "connectNew.php";
				$template = '{}';
				$query = "INSERT INTO `list_providers` (`id`, `provider_info`, `name_list`) VALUES (NULL, '".$template."', '".$f_name."')";
               
                    if (!$conn->query($query))
                    {
                    echo("<h1 class='white'>Error description: " . mysqli_error($conn)). "</h1>";
					}
					else {
						echo $conn->insert_id;
					}

			} else
{
				echo 'You need to enter following data<br />';
				foreach($data_missing as $missing) {
					echo "$missing<br />";
				}
			}

	 ?>