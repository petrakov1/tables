<?php


			$data_missing = array();

            $data = $_POST['data'];
            
			if(empty($data_missing)) {
                require "connectNew.php";
                
                // echo $data['result'];
                foreach($data['result'] as $mydata)
                {
                    //  echo $mydata->order_id."\n";

                     

				$template = '[{"1": "Цена, Руб", "2": "Срок поставки"}]';
				$query = "INSERT INTO `orders_dublicates` (`id`, `order_id`, `provider_id`, `numbers`, `name_order`) VALUES (NULL, '".$mydata['order_id']."', '".$mydata['provider_id']."', '".$template."', '".$mydata['name']."')";
            //    echo $query;
                    if (!$conn->query($query))
                    {
                    echo("<h1 class='white'>Error description: " . mysqli_error($conn)). "</h1>";
					}
					else {
                        // echo $conn->insert_id;
                        include ("connect.php");
                        global $dblink;
                        $id = $conn->insert_id;
                        $new_link=md5(time());
                        $result = mysqli_query($dblink,"INSERT INTO links (order_id,link,type) VALUES ('$id','$new_link',2)") or die("Ошибка " . mysqli_error($dblink)); 
                        if ($result) //пишем данные в БД и авторизовываем пользователя
                          {  
                            //   echo $new_link;
                            // http_response_code(200);
                          }
					}
                }
			} else
{
				echo 'You need to enter following data<br />';
				foreach($data_missing as $missing) {
					echo "$missing<br />";
				}
			}

            echo $new_link;
	 ?>