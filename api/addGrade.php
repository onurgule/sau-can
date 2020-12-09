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

$users = null;

$q1 = $db->prepare("CALL getNotification(:wid)");
$q1->execute(array("wid" => $wid));
$f1 = $q1->fetchAll();

if ($f1) $users = $f1;
$i = 0;
$ids = null;
foreach ($users as $row) {
	$ids[$i] = $row[0];
	$i++;
}
$postData = '';
    foreach($ids as $v) { 
    $postData = "to" . '='.$v.'&title=Yeni Bir Not!&body=Not eklediginiz derse yeni bir not eklendi!&priority=normal';
	echo $postData;
    rtrim($postData, '&'); 
    $ch = curl_init(); 
    curl_setopt($ch,CURLOPT_URL,"https://exp.host/--/api/v2/push/send"); 
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,true); 
    curl_setopt($ch,CURLOPT_HEADER, false); 
    curl_setopt($ch, CURLOPT_POST, count($postData));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData); 
    $output=curl_exec($ch); 
	echo $output;
    curl_close($ch);
    } 
echo json_encode($f);