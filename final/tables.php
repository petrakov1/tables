<?php

include 'scripts/connect.php'; //подключаемся к БД
include "scripts/func.php"; //подключаем библиотеку функций

?>

<!DOCTYPE html>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]> <html class="lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]> <html class="lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en">
<!--<![endif]-->

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Таблицы</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <script src="js/main.js"></script>
</head>

<body>
    <section class="container">
        <div class="main">
            <div class="list">
                <div class="search">
                    <input type="text" name="query" id="query">
                    <input type="button" value="Поиск" onclick="searchOrders()">
                </div>
                <div class="orders" id="ordersList">
                   <?php
                        loadOrders();
                   ?>
                </div>
                <p class="button" onclick="createOrder()">Создать документ заказа</p>
            </div>
            <div class="tables">
                <div class="tab">
                    <button class="tablinks active" onclick="openTab(event, 'tab1')">Заказ Б24_12838</button>
                    <button class="tablinks" onclick="openTab(event, 'tab2')">Сводная таблица заказа Б24_12838</button>
                    <button class="tablinks" onclick="openTab(event, 'tab3')"> ...</button>
                </div>

                <div id="tab1" class="tabcontent active" style="display: block;">
                    1
                </div>
                <div id="tab2" class="tabcontent ">
                    2
                </div>
                <div id="tab3" class="tabcontent">
                    3
                </div>
            </div>
        </div>

    </section>
    <div class="modal">
        <form id="newOrderForm">
            <label for="">Введите номер сделки из Битрикс24: 
                <input type="text" name="name" id="" placeholder="Б24_****">
            </label>
            <input type="submit" value="Создать">
        </form>
    </div>
    <script>
       
    </script>
</body>

</html>