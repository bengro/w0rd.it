<?php
require 'flight/Flight.php';
require_once(dirname(__DIR__) . '/db/connect.php');

/**
 * Returns number of unallocated words for future url shortenings.
 * @return number (integer) of remaining words
 */
function getRemainingWords()
{
    DB::query("SELECT url FROM dictionary WHERE available = %s", '1');
    $counter = DB::count();
    return $counter;
}

/**
 * Shortens a given URL by looking up an unallocated word
 * @param $url to be shortened
 * @return shortened url containing url, hash and description
 */
function shorten($url)
{
    try {
        DB::startTransaction();
        $result = DB::queryFirstRow("SELECT hash,description FROM dictionary WHERE available = %s LIMIT 1;", '1');
        DB::query("UPDATE dictionary SET url = %s, available = %s WHERE hash = %s;", $url, '0', $result['hash']);
        DB::commit();
        return $result;
    } catch (Exception $ex) {
        DB::rollback();
    }
}

new DbConnection();

Flight::route('POST /shorten', function () {
    $url = Flight::request()->data->url;
    $result = shorten($url);
    echo Flight::json(array('hash' => $result['hash'], 'url' => $url, 'description' => $result['description']));
});

Flight::route('GET /stats', function () {
    $remainingWords = getRemainingWords();
    echo Flight::json(array('remainingCount' => $remainingWords));
});

Flight::start();

DB::disconnect();