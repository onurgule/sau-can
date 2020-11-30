<?php
include "db.php";
$sauid = $_GET["ogrno"];
$wid = $_GET["wid"];
$grade= $_GET["grade"];
$sauid = trim($sauid);
$sauid = str_replace(".","",$sauid);
$sauid = str_replace("_","",$sauid);
$sauid = str_replace(" ","",$sauid);
$sauid = strtoupper($sauid);
$q = $db->prepare("CALL addGrade(:sauid,:wid,:grade)");
$q->execute(array("sauid" => $sauid,"wid" => $wid,"grade" => $grade));
$f = $q->fetchAll();
echo json_encode($f);