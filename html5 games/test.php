
<?php

	// database info
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "tripletriaddata";
	$tbl_name ="monster";
  
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	////////////////////////Username and Password///////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////
	// username and password sent from form 
	$myusername=$_POST['myusername']; 
	$mypassword=$_POST['mypassword']; 

	// To protect MySQL injection (more detail about MySQL injection)
	$myusername = stripslashes($myusername);
	$mypassword = stripslashes($mypassword);
	$myusername = mysql_real_escape_string($myusername);
	$mypassword = mysql_real_escape_string($mypassword);
	$sql="SELECT * FROM $tbl_name WHERE username='$myusername' and password='$mypassword'";
	$result = mysqli_query($conn, $sql);

	// Mysql_num_row is counting table row
	$count=mysqli_num_rows($result);

	// If result matched $myusername and $mypassword, table return true
	if($count==1){
		$rows = array();
		$rows = mysqli_fetch_assoc($result);
		//echo json_encode($rows);
	} else {
		//echo json_encode("failure");
	}
	
	//////////////////////GAME DATA////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
	
	$card_array =  json_decode($_POST['myCardArray']);
	$first_card = $card_array[0];
	
	// insert the array that contains name and number of copy into table called "monster" 
	// in the tripletriaddata  database
	// note need to make the database has "primary" key to prevent duplicates value from being inserted
	
	for ($i = 0; $i < 110; $i++){
		$card = $card_array[$i];
		$sql_add = "INSERT IGNORE INTO $tbl_name (monstername, numcopy) VALUES ('$card->name', '$card->numCopy')";
		
		if ($conn->query($sql_add) === TRUE) {
			//echo ("New record created successfully");
		} else {
			//echo ("Error");
		}
	}
	echo json_encode($first_card);
	
	/*
	$sql_add = "INSERT IGNORE INTO $tbl_name(monstername, numcopy) VALUES ('$first_card->name','$first_card->numCopy')";
		
	if ($conn->query($sql_add) === TRUE) {
		echo json_encode("New record created successfully");
	} else {
		echo json_encode ("Error");
	}
    
	//echo json_encode(array($first_card->name));
	*/
	
	//echo json_decode($first_card->name);
	
	$conn->close();
	//echo "Connected successfully";
	
	  
?>