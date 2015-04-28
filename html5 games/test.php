
<?php

	//$q = ($_POST['monsterId']);
	//echo($q);
	//echo json_encode($_POST['monsterId']);
	
	$card_array = json_decode($_POST['monsterId']);
	
	$first_card = $card_array[0];

	echo json_encode(array($first_card->name, $first_card->top));
	
	
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "tripletriaddata";
  
	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	
	// insert the array that contains name and number of copy into table called "monster" 
	// in the tripletriaddata  database
	for ($i = 0; $i < 110; $i++){
		$card = $card_array[$i];
		$sql = "INSERT INTO monster (monstername, numcopy) VALUES ('$card->name', '$card->numCopy')";
		
		if ($conn->query($sql) === TRUE) {
			echo "New record created successfully";
		} else {
			echo "Error";
		}
	
	}
	
	$conn->close();
	//echo "Connected successfully";
	
	  
?>