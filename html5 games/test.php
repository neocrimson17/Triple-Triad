<?php

  
	//$q = ($_POST['monsterId']);
	//echo($q);
	//echo json_encode($_POST['monsterId']);
	
	$card_array = json_decode($_POST['monsterId']);
	
	$first_card = $card_array[0];
	//echo json_encode($first_card);
	
	echo json_encode(array($first_card->name, $first_card->top));
	
	$servername = "localhost";
	$username = "root";
	$password = "";
  
	// Create connection
	$conn = new mysqli($servername, $username, $password);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
	//echo "Connected successfully";

?>