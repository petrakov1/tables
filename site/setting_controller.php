<?php
ini_set ("session.use_trans_sid", true);
session_start();
include 'lib/connect.php'; //подключаемся к БД
//$links=$dblink;
include "lib/func.php"; 
if (isset($_SESSION['id'])) 
{
	
	if(isset($_POST['Setting'])) 
		{echo "3";
			$correct = CorrectSetting(); //функция проверки значений
			echo "4";
			if ($correct) //если нет ошибок, авторизируем юзера 
			{	echo "5";
				$login = htmlspecialchars($_POST['login']);
				$email=htmlspecialchars($_POST['mail']);
				$id_p=$_SESSION['id'];
				$rez = mysqli_query($dblink,"UPDATE user SET login='$login', email='$email' WHERE id='$id_p'");
				header('Location: /site/home_page.php');
				//$admin = is_admin($UID);
			}
			else {
				echo "повторите ввод данных, были допущены ошибки";
			}

		}
}
else 
{
	header('Location: /site');
}

include ('regest/setting.php'); //подключаем файл с формой
?>