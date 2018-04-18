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
	echo "goood";
}
else 
{echo "2";
	if (isset($_POST['GO'])) //если была нажата кнопка регистрации, проверим данные на корректность и, если данные введены и введены правильно, добавим запись с новым пользователем в БД
	{echo "3";
		$correct = registrationCorrect(); //записываем в переменную результат работы функции registrationCorrect(), которая возвращает true, если введённые данные верны и false в противном случае
		//$correct=true;
		if ($correct) //если данные верны, запишем их в базу данных
		{echo "4";
			$login = htmlspecialchars($_POST['login']);
			$password = $_POST['password'];
			$salt = mt_rand(100, 999);
			$tm = time();
			$password = md5($password);
			$result = mysqli_query($dblink,"INSERT INTO users (login,password) VALUES ('$login','$password')") or die("Ошибка " . mysqli_error($dblink)); 
			if ($result) //пишем данные в БД и авторизовываем пользователя
			{echo "5";
				
				$rez = mysqli_query($dblink,"SELECT * FROM users WHERE login='$login'");
				$row = mysqli_fetch_assoc($rez);
				$_SESSION['id'] = $row['id'];
				$regged = true;
				echo "good"; //подключаем шаблон
			}
			else echo "ggwp";
		}
		else
		{echo "6";
			include_once ("regest/reg.php"); //подключаем шаблон в случае некорректности данных
		}
	}
	else
	{echo "7";
		include_once ("regest/reg.php"); //подключаем шаблон в случае если кнопка регистрации нажата не была, то есть, пользователь только перешёл на страницу регистрации
	}
}
?>