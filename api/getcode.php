<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
include "db.php";
$sauid = $_GET["ogrno"];
$sauid = trim($sauid);
$sauid = str_replace(".","",$sauid);
$sauid = str_replace("_","",$sauid);
$sauid = str_replace(" ","",$sauid);
$sauid = strtoupper($sauid);
$q = $db->prepare("CALL getCode(:sauid)");
$q->execute(array("sauid" => $sauid));
$f = $q->fetchAll();
$code = $f[0]["Code"];
$mailadd = $sauid."@sakarya.edu.tr";
if($f[0]['result'] == 'ok'){

$mail = new PHPMailer();
try {
    $mail->isSMTP();
    $mail->Host       = 'mail.isim.link';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'verification@isim.link';
    $mail->Password   = 'n^mWexsHB1#(';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->setFrom('verification@isim.link', 'IsimLink');
    $mail->addAddress($mailadd);
    $mail->isHTML(true);
    $mail->Subject = 'SAUCAN Onay Kodu';
    $mail->Body    = 'Email Onay Kodunuz: <b>'.$code.'</b>';
    $mail->AltBody = 'Email Onay Kodunuz: '.$code;
    $mail->send();
	echo 1;
} catch (Exception $e) {
	echo 0;
    //echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
}



