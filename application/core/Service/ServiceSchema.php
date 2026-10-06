<?php

namespace App\core\Service;

abstract class ServiceSchema
{
    private array $processActions = [];
    private array $userActions = [];

    public function cartableProcessAction(
        ProcessType $processType,
        ?callable   $callback = null
    ): mixed
    {
        if ($callback !== null) {
            $this->processActions[$processType->value] = $callback;

            return null;
        }

        if (isset($this->processActions[$processType->value])) {
            return ($this->processActions[$processType->value])();
        }
        return null;

    }

    public function finish()
    {

    }

    public function cancel()
    {

    }

    public function resend()
    {
        
    }


    public function userAction(
        int        $userId,
        ActionType $actionType,
        ?callable  $callback = null
    ): mixed
    {
        // Register
        if ($callback !== null) {
            $this->userActions[$userId][$actionType->value] = $callback;

            return null;
        }

        // Execute
        if (!isset($this->userActions[$userId][$actionType->value])) {
            return null;
        }

        return ($this->userActions[$userId][$actionType->value])();
    }
}