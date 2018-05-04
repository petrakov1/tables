<?php
ini_set ("session.use_trans_sid", true);
session_start();
include 'scripts/connect.php'; //подключаемся к БД
//$links=$dblink;
include "scripts/func.php"; //подключаем библиотеку функций
// echo "1";
//проверим, быть может пользователь уже авторизирован. Если это так, перенаправим его на главную страницу сайта
// if (isset($_SESSION['id'])) 
// {
	if (isset($_POST['go'])) //если была нажата кнопка регистрации, проверим данные на корректность и, если данные введены и введены правильно, добавим запись с новым пользователем в БД
	{
		// echo "3";
		$correct = registrationCorrect(); //записываем в переменную результат работы функции registrationCorrect(), которая возвращает true, если введённые данные верны и false в противном случае
		//$correct=true;
		if ($correct) //если данные верны, запишем их в базу данных
		{
			// echo "4";
			$login = htmlspecialchars($_POST['login']);
			$password = $_POST['password'];
			$email=htmlspecialchars($_POST['mail']);
			$type=$_POST['type_user'];

			//$salt = mt_rand(100, 999);
			//$tm = time();
			$password = md5($password);
			$result = mysqli_query($dblink,"INSERT INTO user (login,password,email,type) VALUES ('$login','$password','$email','$type')") or die("Ошибка " . mysqli_error($dblink)); 
			if ($result) //пишем данные в БД и авторизовываем пользователя
			{	
				header('Location: personal_account.php');
				
				// echo "good"; //подключаем шаблон
			}
			else echo "<script>alert(\"Некооектные данные. Повторите,пожалйста ввод.\");</script>";
		}
		else
		{	echo "<script>alert(\"Некооектные данные. Повторите,пожалйста ввод.\");</script>"; }
	}
// }

?>
<!DOCTYPE html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Новый пользователь</title>
	<link rel="stylesheet" href="css/style.css">
	<link rel="icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
	<link rel="shortcut icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
</head>
<body>
  <section class="container">
    <div class="login">
      <h1>  Личный кабинет </h1>

<?php
include ('registration.php'); //подключаем файл с формой
?>

   </div>
  </section>
</body>
</html>
