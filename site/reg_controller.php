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
	if (isset($_POST['GO'])) //если была нажата кнопка регистрации, проверим данные на корректность и, если данные введены и введены правильно, добавим запись с новым пользователем в БД
	{echo "3";
		$correct = registrationCorrect(); //записываем в переменную результат работы функции registrationCorrect(), которая возвращает true, если введённые данные верны и false в противном случае
		//$correct=true;
		if ($correct) //если данные верны, запишем их в базу данных
		{echo "4";
			$login = htmlspecialchars($_POST['login']);
			$password = $_POST['password'];
			$email=htmlspecialchars($_POST['mail']);
			$type=htmlspecialchars($_POST['type_user']);

			//$salt = mt_rand(100, 999);
			//$tm = time();
			$password = md5($password);
			$result = mysqli_query($dblink,"INSERT INTO user (login,password,email,type) VALUES ('$login','$password','$email',1)") or die("Ошибка " . mysqli_error($dblink)); 
			if ($result) //пишем данные в БД и авторизовываем пользователя
			{	
				header('Location: /site/home_page.php');
				$regged = true;
				echo "good"; //подключаем шаблон
			}
			else echo "ggwp";
		}
		else
		{	echo "<script>alert(\"Некооектные данные. Повторите,пожалйста ввод.\");</script>"; 
			include_once ("regest/reg.php"); //подключаем шаблон в случае некорректности данных
		}
	}
	else
	{echo "7";
		include_once ("regest/reg.php"); //подключаем шаблон в случае если кнопка регистрации нажата не была, то есть, пользователь только перешёл на страницу регистрации
	}
}
else{
	header('Location: /site');
}
?>