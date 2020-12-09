<?php
include "db.php";
$sauid = $_GET["sauid"];
$expoid = $_GET["expoid"];
$q = $db->prepare("CALL updateExpoID(:sauid,:expoid)");
$q->execute(array("sauid" => $sauid, "expoid" => $expoid));
$f = $q->fetchAll();
echo json_encode($f);