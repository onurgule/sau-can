<?php
include "db.php";
$semester = $_GET["semester"];
$q = $db->prepare("CALL getLectures(:sem)");
$q->execute(array("sem" => $semester));
$f = $q->fetchAll();
echo json_encode($f);