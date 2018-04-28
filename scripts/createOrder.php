<?php


			$data_missing = array();

			if (empty($_POST['name'])) {
				$data_missing[] = 'Name';
			} else {
				$f_name= trim($_POST['name']);
			}

			
				$f_json= "{}";
			

			if(empty($data_missing)) {
				require "connectNew.php";
				$template = '[{"1": "Тип оборудования", "2": "Артикул или название", "3": "Материал", "4":"Диаметр","5":"Давление","6":"Присоединение","7":"Среда","8":"Привод","9":"Проход","10":"Производитель","11":"Количество","12":"Комментарий/Пожелания"}]';
				$query = "INSERT INTO `orders` (`id`, `order`, `name_order`) VALUES (NULL, '".$template."', '".$f_name."')";
               
                    if (!$conn->query($query))
                    {
                    echo("<h1 class='white'>Error description: " . mysqli_error($conn)). "</h1>";
                    }

			} else
{
				echo 'You need to enter following data<br />';
				foreach($data_missing as $missing) {
					echo "$missing<br />";
				}
			}

	 ?>