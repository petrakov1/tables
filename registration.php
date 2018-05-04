
            <h1>Регестрация нового пользователя</h1>
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
                            <option value="0">admin</option>
						</select>
					</p>
                </p><p class="submit"><input type="submit" name="go" value="Регистрация"></p>
            </form>
        </div>
    </section>
</body>
</html>


