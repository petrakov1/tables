<?php
ini_set ("session.use_trans_sid", true);
session_start();
include 'scripts/connect.php'; //подключаемся к БД
//$links=$dblink;
include "scripts/func.php"; //подключаем библиотеку функций
//проверим, быть может пользователь уже авторизирован. Если это так, перенаправим его на главную страницу сайта
if (isset($_SESSION['id'])) 
{
	header('Location: home_page.php');
}
else //если пользователь не авторизирован, то проверим, была ли нажата кнопка входа на сайт
{
	if(isset($_POST['ENTER'])) 
	{
		$error = enter(); //функция входа на сайт  
		if (count($error) == 0) //если нет ошибок, авторизируем юзера 
		{
			header('Location: home_page.php');
			//$admin = is_admin($UID);
		}

	}
}
include ('login.php'); //подключаем файл с формой
?>