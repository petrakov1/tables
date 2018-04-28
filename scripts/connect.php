<?php
$server = 'localhost';
$user = 'root';
$password = 'root';
 
$dblink= mysqli_connect($server, $user, $password,"tables");
 
// if($dblink)
// echo 'Соединение установлено.';
// else
// die('Ошибка подключения к серверу баз данных.');
?>