<?php

$executionStartTime = microtime(true);

//GET TITLE, EXTRACT, ARTICLE LINK
//exsentences = 2 (returns 1st 2 sentences only)
$url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&exsentences=2&explaintext&redirects=1&titles=' . $_REQUEST['location'];

$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);

$result = curl_exec($ch);

curl_close($ch);

$decode = json_decode($result, true);

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data'] = $decode;

header('Content-Type: application/json; charset=UTF-8');

echo json_encode($output);
