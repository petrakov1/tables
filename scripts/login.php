<?php
ini_set ("session.use_trans_sid", true);
session_start();
include 'connect.php'; //подключаемся к БД
include "func.php"; //подключаем библиотеку функций
if ($_SERVER["REQUEST_METHOD"] == "POST")
	{
        
		$error = enter(); //функция входа на сайт  
		if (count($error) == 0) //если нет ошибок, авторизируем юзера 
		{
            
			include '../Go_type.php';
			//$admin = is_admin($UID);
        }
        else {
            echo "<script>alert(\"Некооектные данные. Повторите,пожалйста ввод.\");</script>";
        }

    }
    else 
{
    echo "no post";
}

?>