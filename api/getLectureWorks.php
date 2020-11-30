<?php
include "db.php";
$lid = $_GET["lid"];
$q = $db->prepare("CALL getLectureWorks(:lid)");
$q->execute(array("lid" => $lid));
$f = $q->fetchAll();
echo json_encode($f);