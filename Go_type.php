<?php
//admin
if ($_SESSION['type']==0){
	header('Location: personal_account.php');
}
//manager orders
if ($_SESSION['type']==1){
	header('Location: /tab/personal_account.php');
}
//manager provaiders
if ($_SESSION['type']==2){
	header('Location: personal_account.php');
}
//manager universal
if ($_SESSION['type']==3){
	header('Location: personal_account.php');
}
?>