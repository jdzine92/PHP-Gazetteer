<?php

$executionStartTime = microtime(true);

//GET COUNTRY FLAG IMAGE
//. $_REQUEST['newsCountryCode']
$flag = file_get_contents('https://countryflagsapi.com/svg/' . $_REQUEST['countryCode']);

echo $flag;
