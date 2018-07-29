<?php
require_once(dirname(__FILE__) . '/db/connect.php');

/**
 * Attempt to resolve the hash
 * @param $hash
 * @return url if found returns url, if not null
 */
function resolve($hash)
{
    $result = DB::queryFirstRow("select url from dictionary where hash = %s and available = %s LIMIT 1;", $hash, '0');
    return $result['url'];
}

new DbConnection();

$hash = urldecode($_GET['hash']);
$url = resolve($hash);

if ($url != NULL) {
    http_response_code(302);
    header('Location: ' . $url);
    die();
} else {
    http_response_code(404);
    include(dirname(__FILE__) . '/ui/dist/404.html');
    die();
}
