<?php

include('smtp/PHPMailerAutoload.php');

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405); // Method Not Allowed
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit;
}

// Retrieve form data from POST request
$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
$number = isset($_POST['phone']) ? htmlspecialchars(trim($_POST['phone'])) : '';
$email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) : '';
$message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';
$subject = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject'])) : '';

if (!$email) {
    echo json_encode(["status" => "error", "message" => "Invalid email"]);
    exit;
}

// Email Template
$html = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Contact Form Submission</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0; }
        .container { 
            max-width: 600px; 
            background: #ffffff; 
            padding: 20px; 
            border-radius: 10px; 
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); 
            margin: auto;
        }
        .header { 
            background: #1d3b70; 
            color: white; 
            padding: 15px; 
            text-align: center; 
            border-top-left-radius: 10px; 
            border-top-right-radius: 10px;
            font-size: 20px;
            font-weight: bold;
        }
        .content { padding: 20px; color: #333; }
        .content p { font-size: 16px; margin: 10px 0; }
        .content strong { color: #1d3b70; }
        .footer { 
            margin-top: 20px; 
            padding: 10px; 
            text-align: center; 
            font-size: 14px; 
            color: #666;
            border-top: 1px solid #ddd;
        }
        .btn {
            display: inline-block;
            padding: 10px 15px;
            background: #1d3b70;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 15px;
        }
        .btn:hover { background: #142953; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">📩 New Contact Form Submission</div>
        <div class="content">
            <p><strong>Name:</strong> ' . $name . '</p>
            <p><strong>Email:</strong> ' . $email . '</p>
            <p><strong>Phone:</strong> ' . $number . '</p>
            <p><strong>Message:</strong> ' . nl2br($message) . '</p>
        </div>
        <div class="footer">
            <a href="www.aerisexim.com">www.aerisexim.com</a>
        </div>
    </div>
</body>
</html>';


// Send Email
$response = smtp_mailer('utsavbusa222@gmail.com', $subject, $html);
echo $response;

function smtp_mailer($to, $subject, $msg)
{
    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'tls';
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 587;
    $mail->IsHTML(true);
    $mail->CharSet = 'UTF-8';

    // 🔹 Replace these with actual credentials
    $mail->Username = "harshil9915vasoya@gmail.com";
    $mail->Password = "fiummkhswgxudiso";
    $mail->SetFrom("harshil9915vasoya@gmail.com");
    $mail->Subject = $subject;
    $mail->Body = $msg;
    $mail->AddAddress($to);

    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => false
        )
    );

    if (!$mail->Send()) {
        http_response_code(500);
        return json_encode(['status' => 'error', 'message' => 'Error sending email']);
    } else {
        http_response_code(200);
        return json_encode(['status' => 'success', 'message' => 'Email sent successfully']);
    }
}
?>