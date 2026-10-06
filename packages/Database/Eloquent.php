<?php

namespace Packages\Database;

use Illuminate\Database\Capsule\Manager as Capsule;
use Illuminate\Events\Dispatcher;
use Illuminate\Container\Container;
use Illuminate\Pagination\Paginator;

$dbConfig = [
    'driver' => $_ENV['DB_CONNECTION'] ?? 'mysql',
    'host' => $_ENV['DB_HOST'] ?? '127.0.0.1',
    'database' => $_ENV['DB_DATABASE'] ?? '',
    'username' => $_ENV['DB_USERNAME'] ?? '',
    'password' => $_ENV['DB_PASSWORD'] ?? '',
    'charset' => $_ENV['DB_CHARSET'] ?? 'utf8mb4',
    'collation' => $_ENV['DB_COLLATION'] ?? 'utf8mb4_unicode_ci',
    'prefix' => $_ENV['DB_PREFIX'] ?? '',
];

$capsule = new Capsule;
$capsule->addConnection($dbConfig);

$capsule->setEventDispatcher(new Dispatcher(new Container));

$capsule->setAsGlobal();

$capsule->bootEloquent();

if (class_exists(Paginator::class)) {
    Paginator::currentPathResolver(function () {
        return strtok($_SERVER['REQUEST_URI'], '?');
    });
    Paginator::currentPageResolver(function ($pageName = 'page') {
        return isset($_GET[$pageName]) ? (int)$_GET[$pageName] : 1;
    });
}