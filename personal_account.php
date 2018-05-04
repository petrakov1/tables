
<?php

ini_set ("session.use_trans_sid", true);
session_start();

if (isset($_SESSION['id'])) 
{ 
	?>
<!DOCTYPE html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Личный кабинет</title>
	<link rel="stylesheet" href="/tables/css/style.css">
	<link rel="icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
	<link rel="shortcut icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
</head>
<body>
  <section class="container">
    <div class="login">
      <h1>  Личный кабинет</h1>
    
 
      


<?php 
	//admin
	if ($_SESSION['type']==0){
		echo '<h1><a href="/tables/admin/">Переход на рабочую страницу</a></h1>';
		// echo '<h1><a href="reg_controller.php">Переход на рабочую страницу менеджера по продажам</a></h1>';
		echo '<h1><a href="/tables/reg_controller.php">Регистрация нового менеджера</a></h1>';

	}
	//manager orders
	if ($_SESSION['type']==1){
		echo '<h1><a href="/tables/manager/buy/">Переход на рабочую страницу менеджера по покупкам</a></h1>';
	}
	//manager provaiders
	if ($_SESSION['type']==2){
		echo '<h1><a href="/tables/manager/sell/">Переход на рабочую страницу менеджера по продажам</a></h1>';
	}
	//manager universal
	if ($_SESSION['type']==3){
		echo '<h1><a href="manager/buy/">Переход на рабочую страницу менеджера по покупкам</a></h1>';
		echo '<h1><a href="manager/sell/">Переход на рабочую страницу менеджера по продажам</a></h1>';

	}

}
else //если пользователь не авторизирован, то проверим, была ли нажата кнопка входа на сайт
{
	header('Location: index.php');
	
}

?>
 <h1><a href="setting_controller.php">Настройки информации</a></h1>
 <h1><a href="/tables/scripts/exit.php">Выход</a></h1>
 	</div>
  </section>
   	</div>
  </section>
</body>
</html>