<?php
$link = $_REQUEST["link"];
include './scripts/connect.php'; //подключаемся к БД
include "./scripts/func.php"; //подключаем библиотеку функций
echo $link;
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
    <link rel="stylesheet" href="../css/style.css">
    <link rel="icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="http://vladmaxi.net/favicon.ico" type="image/x-icon">
    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <script src="../js/converter.js"></script>
    
    <script src="../js/main.js"></script>
</head>

<body>
    <section class="container">
        <div class="main">
          
                    <div id="table-container">

                    </div>
                    <div>
                    <input type="number" name="" value="1" id="rows_numbers">
                    <input type="button" value="Добавить строки снизу" class="button button-small" onclick="addRow()">
                
                    </div>
                    <div>
                    <input type="number" name="" id="delete_rows">
                    <input type="button" value="Удалить строки" class="button button-small" onclick="removeRow()">
                
                    </div>
                    <p>Ссылка для заказчика: <br> 
                        <a href="">link</a>
                    </p>
                    <p class="button" onclick="save()">Сохранить изменения</p>
                    
              
           
        </div>

    </section>
   
    <script>
       
    </script>
</body>

</html>