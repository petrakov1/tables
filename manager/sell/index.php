<?php

include '../../scripts/connect.php'; //подключаемся к БД
include "../../scripts/func.php"; //подключаем библиотеку функций

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
            
            <a href="">Главная</a>
            <a href="">Поставщики</a>
            <a href="">Выход</a>
        </div>
    </div>
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
                    <button class="tablinks active" onclick="openTab(event, 'tab1')">Заказ <span id="name1">Б24_12838</span></button>
                    <button class="tablinks" onclick="openTab(event, 'tab4')">Поставщики</button>
                    <button class="tablinks" onclick="openTab(event, 'tab3')">Списки поставщиков</button>
                    <button class="tablinks" onclick="openTab(event, 'tab2');concatTable();">Сводная таблица заказа <span id="name2">Б24_12838</span></button>
                    <!-- <button class="tablinks" onclick="openTab(event, 'tab3')"> ...</button> -->
                </div>

                <div id="tab1" class="tabcontent active" style="display: block;">
                    <div id="table-container">

                    </div>
                    <div>
                    <input type="number" name="" value="1" id="rows_numbers">
                    <input type="button" value="Добавить строки снизу" class="button button-small" onclick="addRow()">
                
                    </div>
                    <div>
                    <input type="text" name="" value="2,3,10-100,10" id="delete_rows">
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
                    <p class="button" onclick="save()">Скопировать товары в буфер обмена</p>
                </div>
                <div id="tab3" class="tabcontent">
                    <div id="table-container1">

                    </div>
                    <div>
                    <input type="number" name="" value="1" id="rows_numbers">
                    <input type="button" value="Добавить строки снизу" class="button button-small" onclick="addRowProviders()">
                
                    </div>
                    <div>
                    <input type="text" name="number" value="2,3,10-100,10" id="delete_rows">
                    <input type="button" value="Удалить строки" class="button button-small" onclick="removeRow()">
                
                    </div>
                  
                    <p class="button" onclick="saveProviders()">Сохранить изменения</p>
                    <p class="button" onclick="chooseProviders();createOrder()">Создать список</p>
                    
                </div>
                <div id="tab4" class="tabcontent ">
                <p class="button" onclick="sendToProviders()">Отправить запрос по выбранному списку поставщиков</p>
                    
                

                    <div id="tab4-container">

                    </div>
                </div>
          
                
            </div>
        </div>

    </section>
    <div class="modal">
        <form id="newOrderForm">
            <div class="close">
                <span></span>
                <span></span>
            </div>
            <label for="">Введите номер сделки из Битрикс24: 
                <input type="text" name="name" id="" placeholder="Б24_****">
            </label>
            <input type="submit" value="Создать">
        </form>
    </div>
    <div class="modal">
        <form id="newListForm">
            <div class="close">
                <span></span>
                <span></span>
            </div>
            <label for="">Введите название: 
                <input type="text" name="name" id="ListName" placeholder="">
            </label>
            <label for="">Выберете поставщиков: 
                <div id="chooseProviders">
                    
                </div>
            </label>
            <input type="button" onclick="createList()" value="Создать">
        </form>
    </div>
    <script>
        // openProviders();
        // openProvidersLists();
    </script>
</body>

</html>