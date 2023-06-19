<?php

namespace App\Http\Controllers;
use App\Models\subscribeNewsLetter;

use Illuminate\Http\Request;

class newsLetterSubscribeControllerApi extends Controller
{
    //
    public function news_letter(Request $req){

       /* check email unique and not empty */
        $validator = \Validator::make($req->all(), ['email' => 'required|email|unique:subscribe_news_letters,email']);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }        
        $email = $req->email;
        $subscribeNewsLetterObj=new subscribeNewsLetter();
        $subscribeNewsLetterObj->email=$email;
        /* 1 for subscribe and 0 for unsubscribe */
        $subscribeNewsLetterObj->subscribed=1;
        $subscribeNewsLetterObj->save(); 
        return response()->json("News Letter Subscribed Successfully");    

        
    }
}
