<!DOCTYPE html>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]> <html class="lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]> <html class="lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html lang="en"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <title>Новый аккаунт</title>
    <link rel="stylesheet" href="/site/css/style.css">
</head>
<body>
    <section class="container">
        <div class="login">
            <h1>Новый аккаунт</h1>
			<form method="post" action="reg_controller.php">
                <!-- <p><input type="text" name="name" value="" placeholder="Имя"></p>
                <p><input type="text" name="surname" value="" placeholder="Фамилия"></p>
                <p><input type="text" name="site" value="" placeholder="Сайт компании"></p>
                <p><input type="text" name="phone" value="" placeholder="Телефон"></p>
                <p><input type="text" name="email" value="" placeholder="E-mail"></p>
                <p><input type="text" name="surname" value="" placeholder="Фамилия"></p>
				<p><input type="text" name="password" value="" placeholder="Пароль"></p> -->
				<p><input id="login" type="text" name="login" placeholder="Логин" />
				</p><p><input id="mail" type="text" name="mail" placeholder="Почта" />
				</p><p><input id="pass" type="password" name="password" placeholder="Пароль" />
				</p><p><input id="re_pass" type="password" name="password2" placeholder="Подтверждение" />
					<p>
						Выберите тип пользователя: <select name="type_user">      
							<option value="1" selected="selected">Менеджер по покупкам</option>
							<option value="2">Менеджер по закупкам</option>
							<option value="3">менеджер по покупкам и заказам</option>
						</select>
					</p>
                </p><p class="submit"><input type="submit" name="go" value="Регистрация"></p>
            </form>
        </div>
    </section>
</body>
</html>

<!-- <label><input id="no_xyz" type="checkbox" name="lic" value="ok" /> Обязуюсь не творить хуйни!<br /></label><br /> -->
