<?php
include "db.php";
$sauid = $_GET["ogrno"];
$code = $_GET["code"];
$sauid = trim($sauid);
$sauid = str_replace(".","",$sauid);
$sauid = str_replace("_","",$sauid);
$sauid = str_replace(" ","",$sauid);
$sauid = strtoupper($sauid);
$code = trim($code);
$q = $db->prepare("CALL doLogin(:sauid,:code)");
$q->execute(array("sauid" => $sauid,"code" => $code));
$f = $q->fetchAll();
echo count($f);