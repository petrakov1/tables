<?php
//admin
if ($_SESSION['type']==0){
	header('Location: /admin');
}
//manager orders
if ($_SESSION['type']==3){
	header('Location: /manager');
}
//manager provaiders
if ($_SESSION['type']==2){
	header('Location:  /manager/buy');
}
//manager universal
if ($_SESSION['type']==1){
	header('Location:  /manager/sell');
}
?>