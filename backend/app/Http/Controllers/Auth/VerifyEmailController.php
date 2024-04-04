<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VerifyEmailController extends Controller
{


    public function verifyEmail(Request $request)
    {
        $user = $request->user();
        $token = $request->token;
        return response()->json(['message' => $user->verifyEmail($token)]);
    }
}
