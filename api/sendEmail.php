<?php
session_start();
//print_r($_SESSION);
//BURADA BAKALIM ONAYLI MI, ONAYLIYSA GÖNDERME BOŞUNA. 
$randomKey = mt_rand(100000, 999999);
//$mailadd = $_GET["email"];
// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

		require 'PHPMailer/src/Exception.php';
		require 'PHPMailer/src/PHPMailer.php';
		require 'PHPMailer/src/SMTP.php';

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer();

try {
    //Server settings
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'mail.isim.link';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'verification@isim.link';                     // SMTP username
    $mail->Password   = 'n^mWexsHB1#(';                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('verification@isim.link', 'IsimLink');
    $mail->addAddress($mailadd);               // Name is optional
    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'IsimLink Email Onay';
    $mail->Body    = 'Email Onay Kodunuz: <b>'.$randomKey.'</b>';
    $mail->AltBody = 'Email Onay Kodunuz: '.$randomKey;

    $mail->send();
} catch (Exception $e) {
	echo 0;
    //echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}