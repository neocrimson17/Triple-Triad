<?php

$host="localhost"; // Host name 
$username="root"; // Mysql username 
$password=""; // Mysql password 
$db_name="tripletriad_database"; // Database name 
$tbl_name="monsterAlt"; // Table name 

// Connect to server and select databse.
$link = mysqli_connect("$host", "$username", "$password", "$db_name");

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

// username, wins, losses, totalgames, and cards sent from form 
$chosenCard=$_POST['chosenCard'];
$newValue=$_POST['newValue'];
$userID=$_POST['userID'];

// To protect MySQL injection (more detail about MySQL injection)
$chosenCard = stripslashes($chosenCard);
$newValue = stripslashes($newValue);
$userID = stripslashes($userID);
$chosenCard = mysql_real_escape_string($chosenCard);
$newValue = mysql_real_escape_string($newValue);
$userID = mysql_real_escape_string($userID);

// _________________________________



//UPDATE `tripletriad_database`.`monsteralt` SET `Geezard` = '0' WHERE `monsteralt`.`userID` = 0;
//UPDATE monsteralt SET `Geezard`=1 WHERE userID=0
$sql="UPDATE $tbl_name SET `$chosenCard`=$newValue WHERE userID=$userID";
$result = mysqli_query($link, $sql);
echo json_encode($result);

// Mysql_num_row is counting table row
//$count=mysqli_num_rows($result);

/*/ If result matched $myusername and $mypassword, table row must be 1 row
if($count==1){
	$rows = array();
	$rows = mysqli_fetch_assoc($result);
	echo json_encode($rows);
} else {
	echo json_encode("failure");
}*/

?>