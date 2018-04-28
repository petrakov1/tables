<?php
include 'connect.php'; //подключаемся к БД
include "func.php"; //подключаем библиотеку функций
if ($_SERVER["REQUEST_METHOD"] == "POST")
	{
        
		$error = enter(); //функция входа на сайт  
		if (count($error) == 0) //если нет ошибок, авторизируем юзера 
		{
            
			header('Location: home_page.php');
			//$admin = is_admin($UID);
        }
        else {
            echo $error;
        }

    }
    else 
{
    echo "no post";
}

?>