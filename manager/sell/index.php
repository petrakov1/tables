<?php
ini_set ("session.use_trans_sid", true);
session_start();
include '../../scripts/connect.php'; //подключаемся к БД
include "../../scripts/func.php"; //подключаем библиотеку функций
if (isset($_SESSION['id'])) 
{
	echo "connected";

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
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
    <script src="https://code.jquery.com/jquery-latest.js"></script>
    <script src="../../js/converter.js"></script>
    
    <script src="../../js/main.js"></script>
</head>

<body>
    <div id="nav">
        <div>
            
            <a href="/tables/personal_account.php">Главная</a>
            <!-- <a href="">Поставщики</a> -->
            <?php

                echo "<script>loadUser(".$_SESSION['id'].")</script>";
                }
            ?>
            <a href="/tables/scripts/exit.php">Выход</a>
        </div>
    </div>
    <section class="container">
        <div class="main">
            <div class="list">
                <div class="search">
                    <input type="text" name="query" id="query" onkeyup="searchOrders()">
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
                    <button class="tablinks active" onclick="openTab(event, 'tab1')">Заказ <span id="name1">Б24_12838</span></button>
                                    <button class="tablinks" onclick="openTab(event, 'tab2');concatTable();">Сводная таблица заказа <span id="name2">Б24_12838</span></button>
                   
                </div>

                <div id="tab1" class="tabcontent active" style="display: block;">
                    <div id="table-container">

                    </div>
                    <div>
                    <input type="number"  name="" value="1" id="rows_numbers">
                    <input type="button" value="Добавить строки снизу" class="button button-small" onclick="addRow()">
                
                    </div>
                    <div>
                    <input type="text" name=""  class="number"  placeholder="2,3,10-100,10" id="delete_rows">
                    <input type="button" value="Удалить строки" class="button button-small" onclick="removeRow()">
                
                    </div>
                    <p>Ссылка для заказчика: <br> 
                        <a id="link" href="">link</a>
                    </p>
                    <p class="button" onclick="save()">Сохранить изменения</p>
                    
                </div>
                <div id="tab2" class="tabcontent ">
                    <div id="tab2-container">

                    </div>
                    <!-- <input type="text" class="hidden" id="hidenIn"> -->
                    <p class="button btn" data-clipboard-action="copy" >Скопировать товары в буфер обмена</p>
                </div>
             
          
                
            </div>
        </div>

    </section>
    <div class="modal modal-order">
        <form id="newOrderForm">
            <div class="close" onclick='$(".modal-order").removeClass("open");'>
                <span></span>
                <span></span>
            </div>
            <label for="">Введите номер сделки из Битрикс24: 
                <input type="text" name="name" id="" placeholder="Б24_****">
            </label>
            <input type="submit" value="Создать">
        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js"></script>
    <script>
        openProviders();
        new ClipboardJS('.btn');
        openOrder(parseInt(getCookie("lastOrder")));
    </script>
</body>

</html>