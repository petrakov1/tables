<?php
$link = $_REQUEST["link"];
include '../scripts/connectNew.php'; //подключаемся к БД


$query = "SELECT * FROM links WHERE link='".$link."'";
	
$result = $conn->query($query);


if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    

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
    <script src="https://code.jquery.com/jquery-latest.js"></script>
    <script src="../js/converter.js"></script>
    
    <script src="../js/main.js"></script>
</head>

<body>
    <section class="container">
        <div class="main">
        <div id="">
                    <div id="table-container">

                    </div>
                    
                    <p class="button" onclick="<?php
                    
                    if($row["type"]==2)
                    { 
                        echo "saveProviderOrder()";
                    }
                    else echo "save()";
                    
                    ?>">Сохранить изменения</p>
                    
                    </div>
           
        </div>

    </section>
   
    <script>

        <?php
        
        
            if($row["type"]==2)
            {
                echo "openProviderOrder(".$row["order_id"]."); currentID=".$row["order_id"];

            }
            else {
                echo "openOrder(".$row["order_id"].")";
            }
        }

        ?>
       
    </script>
</body>

</html>