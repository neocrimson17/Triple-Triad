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

// username and password sent from form 
$myusername=$_POST['myusername']; 
$mypassword=$_POST['mypassword']; 
$card_array = json_decode($_POST['myCardArray']);

// To protect MySQL injection (more detail about MySQL injection)
$myusername = stripslashes($myusername);
$mypassword = stripslashes($mypassword);
$myusername = mysql_real_escape_string($myusername);
$mypassword = mysql_real_escape_string($mypassword);
$sql="SELECT * FROM $tbl_name WHERE username='$myusername'";
$result = mysqli_query($link, $sql);

// Mysql_num_row is counting table row
$count=mysqli_num_rows($result);

// If result matched $myusername and $mypassword, table row must be 1 row
if($count==1){
	echo json_encode("failure");
} else {
	//echo json_encode("success");
	// get last row from table to see last ID number
	$sql="SELECT userID FROM user ORDER BY userID DESC LIMIT 1;";
	$result=mysqli_query($link, $sql);
	$lastID=mysqli_result($result,0,0);
	$lastID+=1;
	
	$sql="INSERT INTO $tbl_name (`userID`, `username`, `password`, `wins`, `losses`, `totalgames`) VALUES ('$lastID', '$myusername', '$mypassword', '0', '0', '0');";
	$result=mysqli_query($link, $sql);
	//	$first_card = $card_array[0];
	$tbl_name="monsterAlt";
	$sql="INSERT INTO $tbl_name (`userID`,
	`$card_array[0]`,
	`$card_array[1]`,
	`$card_array[2]`,
	`$card_array[3]`,
	`$card_array[4]`,
	`$card_array[5]`,
	`$card_array[6]`,
	`$card_array[7]`,
	`$card_array[8]`,
	`$card_array[9]`) VALUES ('$lastID', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1');";
	$result=mysqli_query($link, $sql);
	
	
	echo json_encode("success");
}

function mysqli_result($res,$row=0,$col=0){ 
    $numrows = mysqli_num_rows($res); 
    if ($numrows && $row <= ($numrows-1) && $row >=0){
        mysqli_data_seek($res,$row);
        $resrow = (is_numeric($col)) ? mysqli_fetch_row($res) : mysqli_fetch_assoc($res);
        if (isset($resrow[$col])){
            return $resrow[$col];
        }
    }
    return false;
}

?>