<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Notifications\Messages\MailMessage;

class TestController extends Controller
{
    function __invoke()
    {

        dd(config('app.frontend_url'));
    }
}
