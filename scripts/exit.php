<?php
ini_set ("session.use_trans_sid", true);
session_start();
unset($_SESSION['id']);
header('Location: ../')
?>