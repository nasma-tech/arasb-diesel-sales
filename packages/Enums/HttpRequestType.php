<?php

namespace Packages\Enums;

enum HttpRequestType
{
    case GET;
    case POST;
    case PUT;
    case PATCH;
    case DELETE;
}