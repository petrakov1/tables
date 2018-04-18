<?php

function registrationCorrect() {
	if ($_POST['login'] == "") return false; //не пусто ли поле логина 	
	if ($_POST['mail'] == "") return false; //не пусто ли поле email	
	if ($_POST['password'] == "") return false; //не пусто ли поле пароля
	if ($_POST['password2'] == "") return false; //не пусто ли поле подтверждения пароля
	if ($_POST['lic'] != "ok") return false; //приняты ли правила
	if (!preg_match('/^([a-z0-9])(\w|[.]|-|_)+([a-z0-9])@([a-z0-9])([a-z0-9.-]*)([a-z0-9])([.]{1})([a-z]{2,4})$/is', $_POST['mail'])) return false; //соответствует ли поле e-mail регулярному выражению
	if (!preg_match('/^([a-zA-Z0-9])(\w|-|_)+([a-z0-9])$/is', $_POST['login'])) return false; // соответствует ли логин регулярному выражению
	if (strlen($_POST['password']) < 5) return false; //не меньше ли 5 символов длина пароля
 	if ($_POST['password'] != $_POST['password2']) return false; //равен ли пароль его подтверждению
	$login = $_POST['login'];
	global $dblink;
	$rez = mysqli_query($dblink,"SELECT * FROM users WHERE login='$login'");
	if (mysqli_num_rows($rez) != 0) return false; // проверка на существование в БД такого же логина
	return true; //если выполнение функции дошло до этого места, возвращаем true }
}
function enter ()
{ 
	$error = array(); //массив для ошибок 	
	if ($_POST['login'] != "" && $_POST['password'] != "") //если поля заполнены 	
	{ 		
		$login = $_POST['login']; 
		$password = $_POST['password'];
		global $dblink ;
		$rez = mysqli_query($dblink,"SELECT * FROM users WHERE login='$login'"); //запрашиваем строку из БД с логином, введённым пользователем 
		$count=	mysqli_num_rows($rez);
		if ($count == 1) //если нашлась одна строка, значит такой юзер существует в БД 		
		{ 			
			$row = mysqli_fetch_assoc($rez); 			
			if (md5($password) == $row['password']) //сравниваем хэшированный пароль из БД с хэшированными паролем, введённым пользователе		
			{ 				
				$_SESSION['id'] = $row['id'];	//записываем в сессию id пользователя 				
				$id = $_SESSION['id']; 								
				return $error; 			
			} 			
			else //если пароли не совпали 			
			{ 				
				$error[] = "Неверный пароль";
				echo "Неверный пароль"; 										
				return $error; 			
			} 		
		}	 		
		else //если такого пользователя не найдено в БД 		
		{ 			
			$error[] = "Неверный логин и пароль"; 	
							echo "Неверный логин и пароль"; 
							printf("В выборке %d рядов.\n", $count)	;									
		
			return $error; 		
		} 	
	} 	
	else 	
	{ 		
		$error[] = "Поля не должны быть пустыми!"; 				
		return $error; 	
	} 
}
?>