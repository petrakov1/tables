
<form method="post" action="index.php">
Логин: <input id="login" type="text" name="login" /><br />
Почта: <input id="mail" type="text" name="mail" /><br />
Пароль: <input id="pass" type="password" name="password" /><br />
Подтверждение: <input id="re_pass" type="password" name="password2" /><br />
Выберите тип пользователя: <select name="type_user">      
	<option selected="selected">Менеджер по покупкам</option>
   	<option>Менеджер по закупкам</option>
    <option>менеджер по покупкам и заказам</option>
</select>
<p></p>
<label><input id="no_xyz" type="checkbox" name="lic" value="ok" /> Обязуюсь не творить хуйни!<br /></label><br />
<input type="submit" name="GO" value="Регистрация">
</form>
