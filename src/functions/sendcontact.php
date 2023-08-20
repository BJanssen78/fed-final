<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, Accept");


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    print_r($_POST);
    $username = $_POST["userName"];
    $useremail = $_POST["userEmail"];
    $usermessage = $_POST["userMessage"];

    $subject = "Contact form FED Exam";
    $to = "b.janssen@bepeel.nl";
    $headers = "From: ". $useremail;

    $message = "you got a message from : $username\n";
    $message .="Message :\n $usermessage\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "Form submitted successfully. Thank you for your message.";
    } else {
        echo "Form submission failed. Please try again later." . error_get_last()["message"];
    }
} else {
    echo "Invalid request.";
}
?>