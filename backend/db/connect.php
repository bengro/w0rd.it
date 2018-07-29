<?php

require_once 'meekrodb.2.3.class.php';
require_once(dirname(__FILE__) . '/config.php');

class DbConnection
{
    function __construct()
    {
        DB::$host = MYSQL_HOST;
        DB::$user = MYSQL_USER;
        DB::$password = MYSQL_PASSWORD;
        DB::$dbName = MYSQL_DB;
        DB::$port = 3306;
        DB::$encoding = 'utf8';
    }
}
