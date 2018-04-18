<?php
$server = 'localhost';
$user = 'root';
$password = '';
 
$dblink= mysqli_connect($server, $user, $password);
 
if($dblink)
echo 'Соединение установлено.';
else
die('Ошибка подключения к серверу баз данных.');
mysqli_select_db($dblink,"db_home1");
?>