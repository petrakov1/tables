<?php
    $id = $_REQUEST["order_id"];
    $order_type = $_REQUEST["order_type"];
// function find_link($order_name,$order_type){
    include ("connect.php");
    global $dblink;
//   $rez = mysqli_query($dblink,"SELECT * FROM links WHERE name='$order_name'");
//   if (mysqli_num_rows($rez) == 1){
    // $data = mysqli_fetch_assoc($rez);
    // return $data['link'];
//   }
//   else{
    // $new_link="http://crossmergedata.com/";
    $new_link=md5(time());
    $result = mysqli_query($dblink,"INSERT INTO links (order_id,link,type,email) VALUES ('$id','$new_link','$order_type','".$_REQUEST["email"]."')") or die("Ошибка " . mysqli_error($dblink)); 
    if ($result) //пишем данные в БД и авторизовываем пользователя
      {  
          echo $new_link;
        // http_response_code(200);
      }
//   }
// }
//  echo $new_link;
?>