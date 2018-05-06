<?php




$email = $_POST["mail"];
$order = $_POST["order"];
$link = $_POST["link"];


$data = $_POST["data"];
$provider = $_POST["provider"];
$response = $_POST["response"];
$table = $_POST["table"];
$products = "";
foreach($data as $row)
{
    $products .= $row[1]."<br>";
}

$template = file_get_contents("supplier2.html");
$template = str_replace("[name]",$provider[2],$template);
$template = str_replace("[link]",$link,$template);
$template = str_replace("[site]",$response["site"],$template);
$template = str_replace("[mail]",$response["email"],$template);
$template = str_replace("[fio]",$response["fio"],$template);
$template = str_replace("[tel]",$response["tel"],$template);
$template = str_replace("[product1]",$products,$template);
$template = str_replace("[table]",$table,$template);

require 'class.phpmailer.php';
$subject = "Tables";
$mail = new PHPMailer();
$mail->AddAddress($provider[4],'');   // кому - адрес, Имя 
$mail->IsHTML(true);                        // выставляем формат письма HTML
$mail->Subject = $subject; // тема письма
$mail->CharSet = "UTF-8";                   // кодировка
$mail->Body = $template;
echo $provider[4];
// отправляем наше письмо
if (!$mail->Send()){
    die ('Mailer Error: ' . $mail->ErrorInfo);
}else{
}


?>