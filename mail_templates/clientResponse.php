<?php




$email = $_POST["mail"];
$order = $_POST["order"];
$link = $_POST["link"];
echo $email;

$template = file_get_contents("client1.html");
$template = str_replace("[order]",$order,$template);
$template = str_replace("[link]",$link,$template);
// $template = str_replace("[name]",$address["name"],$template);

require 'class.phpmailer.php';
$subject = "Tables";
$mail = new PHPMailer();
$mail->AddAddress($email,'');   // кому - адрес, Имя 
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


?>