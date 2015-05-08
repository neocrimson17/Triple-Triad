<?php

$host="localhost"; // Host name 
$username="root"; // Mysql username 
$password=""; // Mysql password 
$db_name="tripletriad_database"; // Database name 
$tbl_name="user"; // Table name 

// Connect to server and select databse.
$link = mysqli_connect("$host", "$username", "$password", "$db_name");

/* check connection */
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}

// username, wins, losses, totalgames, and cards sent from form 
$user=$_POST['user'];
$wins=$_POST['wins'];
$losses=$_POST['losses'];
$totalgames=$_POST['totalgames'];

// To protect MySQL injection (more detail about MySQL injection)
$user = stripslashes($user);
$wins = stripslashes($wins);
$losses = stripslashes($losses);
$totalgames = stripslashes($totalgames);
$user = mysql_real_escape_string($user);
$wins = mysql_real_escape_string($wins);
$losses = mysql_real_escape_string($losses);
$totalgames = mysql_real_escape_string($totalgames);

// _________________________________




$sql="UPDATE $tbl_name SET wins=$wins,losses=$losses,totalgames=$totalgames
WHERE username='$user'";
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