<?php

$id_p=$_SESSION['id'];

$rez = mysqli_query($dblink,"SELECT * FROM user WHERE id='$id_p'"); //запрашиваем строку из БД с логином, введённым пользователем 
$data = mysqli_fetch_assoc($rez);
echo "<p />";
echo '';
echo "<p />";
echo '<form method="post" action="setting_controller.php">';
echo 'Логин: <input id="login" type="text" name="login" value='.$data['login'].' /><br />';
echo "<p />";
echo 'Почта: <input id="mail" type="text" name="mail" value='.$data['email'].' /><br />';
echo "<p />";
echo '<input type="submit" name="Setting" value="Сохранить изменения"> </form>';

?>