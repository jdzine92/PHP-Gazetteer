
<?php

//DEFINE HTTP USER AGENT
$headers = array(
    "User-Agent: Jordan's Gazetteer",
);

$executionStartTime = microtime(true) / 1000;
//newsCountryCode value is defined in ajax (taken from selectCountry)
$url = 'https://newsapi.org/v2/top-headlines?country=' .
    $_REQUEST['countryCode'] . '&apiKey=fbf75e89c7c742c69a187499ceffd309';


$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
//curl handle for HTTP
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$result = curl_exec($ch);

curl_close($ch);

$decode = json_decode($result, true);

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
$output['data'] = $decode;


header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);
