<?php
ini_set ("session.use_trans_sid", true);
session_start();
session_destroy();
header('Location: ../')
?>