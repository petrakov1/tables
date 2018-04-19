<?php
ini_set ("session.use_trans_sid", true);
session_start();
include 'lib/connect.php'; //подключаемся к БД
//$links=$dblink;
include "lib/func.php"; //подключаем библиотеку функций
echo "1";
//проверим, быть может пользователь уже авторизирован. Если это так, перенаправим его на главную страницу сайта
if (isset($_SESSION['id'])) 
{
	header('Location: /site/home_page.php');
}
else //если пользователь не авторизирован, то проверим, была ли нажата кнопка входа на сайт
{echo "2";
	if(isset($_POST['ENTER'])) 
	{
		$error = enter(); //функция входа на сайт  
		if (count($error) == 0) //если нет ошибок, авторизируем юзера 
		{
			header('Location: /site/home_page.php');
			//$admin = is_admin($UID);
		}

	}
}
include ('regest/enter.php'); //подключаем файл с формой
?>