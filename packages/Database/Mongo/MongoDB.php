<?php

namespace Packages\Database\Mongo;

use MongoDB\BSON\ObjectId;
use MongoDB\Driver\BulkWrite;
use MongoDB\Driver\Manager;
use MongoDB\Driver\Query;

class MongoDB
{
    private Manager $manager;

    public function __construct(
        private readonly string $database
    ) {
        $this->manager = new Manager($_ENV['MONGODB_CONNECTION']);
    }

    private function namespace(string $collection): string
    {
        return $this->database . '.' . $collection;
    }

    public function insert(string $collection, array $data): string
    {
        $bulk = new BulkWrite();

        $id = $bulk->insert($data);

        $this->manager->executeBulkWrite(
            $this->namespace($collection),
            $bulk
        );

        return (string) $id;
    }

    public function find(
        string $collection,
        array $filter = [],
        array $options = []
    ): array {
        $query = new Query($filter, $options);

        $cursor = $this->manager->executeQuery(
            $this->namespace($collection),
            $query
        );

        return iterator_to_array($cursor);
    }

    public function findOne(
        string $collection,
        array $filter = []
    ): ?object {
        $result = $this->find(
            $collection,
            $filter,
            [
                'limit' => 1
            ]
        );

        return $result[0] ?? null;
    }

    public function findById(
        string $collection,
        string $id
    ): ?object {
        return $this->findOne(
            $collection,
            [
                '_id' => new ObjectId($id)
            ]
        );
    }

    public function update(
        string $collection,
        array $filter,
        array $data
    ): int {
        $bulk = new BulkWrite();

        $bulk->update(
            $filter,
            [
                '$set' => $data
            ],
            [
                'multi' => false,
                'upsert' => false
            ]
        );

        $result = $this->manager->executeBulkWrite(
            $this->namespace($collection),
            $bulk
        );

        return $result->getModifiedCount();
    }

    public function delete(
        string $collection,
        array $filter
    ): int {
        $bulk = new BulkWrite();

        $bulk->delete(
            $filter,
            [
                'limit' => 1
            ]
        );

        $result = $this->manager->executeBulkWrite(
            $this->namespace($collection),
            $bulk
        );

        return $result->getDeletedCount();
    }
}