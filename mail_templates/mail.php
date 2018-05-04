<?php

function sendMail($order,$url,$address)
{

$template = file_get_contents("supplier.html");
$template = str_replace("[table]",$order,$template);
$template = str_replace("[link]",$address["link"],$template);
$template = str_replace("[name]",$address["name"],$template);

require 'class.phpmailer.php';
$subject = "Tables";
$mail = new PHPMailer();
$mail->AddAddress($address["email"],'');   // кому - адрес, Имя 
$mail->IsHTML(true);                        // выставляем формат письма HTML
$mail->Subject = $subject; // тема письма
$mail->CharSet = "UTF-8";                   // кодировка
$mail->Body = $template;

// отправляем наше письмо
if (!$mail->Send()){
    die ('Mailer Error: ' . $mail->ErrorInfo);
}else{
    // header('Location: '.$_SERVER['HTTP_REFERER'].'?s=1');
}

}

$addreses = $_POST["result"];

foreach($addreses as $address)
{
    echo $address;
  sendMail($address["order"],$address["link"],$address);
  echo $address["order"].$address["link"].$address["email"]."\n";
}



?>