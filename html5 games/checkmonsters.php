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

// username and password sent from form 
$myuserID=$_POST['myuserID']; 

// To protect MySQL injection (more detail about MySQL injection)
$myuserID = stripslashes($myuserID);
$myuserID = mysql_real_escape_string($myuserID);
$sql="SELECT * FROM $tbl_name WHERE userID='$myuserID'";
$result = mysqli_query($link, $sql);

// Mysql_num_row is counting table row
$count=mysqli_num_rows($result);

// If result matched $myusername and $mypassword, table row must be 1 row
if($count==1){
	$rows = mysqli_fetch_assoc($result);
	echo json_encode($rows);
} else {
	echo json_encode("failure");
}

?>