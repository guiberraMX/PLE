<?php
header('Content-Type: text/html; charset=UTF-8');

// http://www.tele-pro.co.uk/scripts/contact_form/ 

// get posted data into local variables
$EmailFrom = "web@pl-e.mx";
$EmailTo = "contacto@pl-e.mx";
$headers = "From: $EmailFrom\n";
$Subject = "Entrada en www.pl-e.mx";
$name = Trim(stripslashes($_POST['name'])); 
$name = utf8_decode($name);
$email = Trim(stripslashes($_POST['email']));
$email = utf8_decode($email);
$phone = Trim(stripslashes($_POST['phone'])); 
$phone = utf8_decode($phone);
$kind = Trim(stripslashes($_POST['kind']));
$kind = utf8_decode($kind); 
$place = Trim(stripslashes($_POST['place'])); 
$place = utf8_decode($place);
$from = Trim(stripslashes($_POST['from']));
$from = utf8_decode($from);
$to = Trim(stripslashes($_POST['to'])); 
$to = utf8_decode($to);
$people = Trim(stripslashes($_POST['people'])); 
$people = utf8_decode($people);
$description = Trim(stripslashes($_POST['description'])); 
$description = utf8_decode($description);


// validation
$validationOK=true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=404.shtml\">";
  exit;
}

// prepare email body text
$Body = "";
$Body .= "Nombre: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Correo: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Teléfono: ";
$Body .= $phone;
$Body .= "\n";
$Body .= "Tipo de evento: ";
$Body .= $kind;
$Body .= "\n";
$Body .= "Lugar del evento: ";
$Body .= $place;
$Body .= "\n";
$Body .= "Fecha del evento: del ";
$Body .= $from;
$Body .= " al ";
$Body .= $to;
$Body .= "\n";
$Body .= "Número de personas: ";
$Body .= $people;
$Body .= "\n";
$Body .= "Descripción del evento: ";
$Body .= $description;
$Body .= "\n";
$Body .= "\n";
$Body .= "\n";
$Body .= "Fecha de entrada web: " . date("d/m/Y H:i");


// send email 
$success = mail($EmailTo, $Subject, $Body, $headers);

// redirect to success page 
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=OK.html\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=404.shtml\">";
}
?>

