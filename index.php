<?php
ini_set ("session.use_trans_sid", true);
session_start();
include 'scripts/connect.php'; //подключаемся к БД
//$links=$dblink;
include "scripts/func.php"; //подключаем библиотеку функций

//проверим, быть может пользователь уже авторизирован. Если это так, перенаправим его на главную страницу сайта
if (isset($_SESSION['id'])) 
{
	header('Refresh:0, personal_account.php');
}
else //если пользователь не авторизирован, то проверим, была ли нажата кнопка входа на сайт
{
	echo "post";
	
}
include ('login.php'); //подключаем файл с формой
?>