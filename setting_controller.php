<?php
ini_set ("session.use_trans_sid", true);
session_start();
include 'scripts/connect.php'; //подключаемся к БД
//$links=$dblink;
include "scripts/func.php"; 
if (isset($_SESSION['id'])) 
{
	
	if(isset($_POST['Setting'])) 
		{
			// echo "3";
			$correct = CorrectSetting(); //функция проверки значений
			// echo "4";
			if ($correct) //если нет ошибок, авторизируем юзера 
			{	
				// echo "5";
				$login = htmlspecialchars($_POST['login']);
				$email=htmlspecialchars($_POST['mail']);
				$id_p=$_SESSION['id'];
				$rez = mysqli_query($dblink,"UPDATE user SET login='$login', email='$email' WHERE id='$id_p'");
				header('Location: home_page.php');
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
?>
<!DOCTYPE html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Авторизация</title>
	<link rel="stylesheet" href="css/style.css">
	<link rel="icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
	<link rel="shortcut icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
</head>
<body>
  <section class="container">
    <div class="login">
      <h1>Изменить</h1>

<?php
include ('setting.php'); //подключаем файл с формой
?>

   </div>
  </section>
</body>
</html>
