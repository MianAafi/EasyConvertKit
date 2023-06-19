<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;
use Illuminate\Support\Str;
use File;
use Illuminate\Support\Facades\Response;

class ApiDownloadUrlFile extends Controller
{
    public function googleDrive(Request $req)
    {
       
        /* create unique folder for each file */
        $folderName = Str::random(20).time();
        $folderPath = storage_path('app/public/allfiles/'.$folderName);
        /* create folder if not exist */
    if (!File::isDirectory($folderPath)) {
            File::makeDirectory($folderPath, 0777, true, true);
        }  
        
        $googleDriveLink = $req->input('driveUrl');        
       
        /* get google drive file id */
          preg_match('/\/d\/(.+)\//',$googleDriveLink, $result);
         $fileId= $result[1];
       
        /* run gdown to download file from drive */
       
        $cmd = "cd " .$folderPath. ' && /usr/local/bin/gdown ' .$fileId;
      	$output = null; $status_code = null;
        exec($cmd,$output,$status_code); 
      
        if($status_code==1)
        {
            return response()->json(['error'=>"File not accessable"]);
        }  
        else{
                $fileName = [];
                $filesInFolder = \File::files($folderPath);
                foreach ($filesInFolder as $value) 
                {
                    $fileName[] = pathinfo($value);
                 }

                 
            $size = File::size(storage_path('app/public/allfiles/'.$folderName."/". $fileName["0"]["basename"]));
            /* convert in mb */
            $file_size = number_format($size / 1048576, 2);

            /* sendFilepath */
            $filePath=$folderName."/". $fileName["0"]["basename"];

                return response()->json(['fileName'=> $fileName["0"]["basename"],"filePath" => $filePath, 'fileSize'=>$file_size]);
            }   
    }

    /* dropbox download file function */
    public function dropBox(Request $req)
    {

        /* create unique folder for each file */
        $folderName = Str::random(20) . time();
        $folderPath = storage_path('app/public/allfiles/' . $folderName);
        
        /* create folder if not exist */
        if (!File::isDirectory($folderPath)) {
            File::makeDirectory($folderPath, 0777, true, true);
        }

        $dropBoxFileLink = $req->input('dropBoxUrl');      

        /* make download link by replacing url */
        $dropbox_download_url=str_replace("https://www.dropbox.com/", "https://dl.dropboxusercontent.com/", $dropBoxFileLink);
        $dropbox_download_url= str_replace("?dl=0","", $dropbox_download_url);

        /* run gdown to download file from dropbox */        

        $cmd = "cd " . $folderPath . ' && /usr/local/bin/gdown ' . $dropbox_download_url;
        exec($cmd, $output, $status_code);
        if ($status_code == 1) {
            return response()->json(['error' => "File not accessable"]);
        } else 
        {

            $fileName = [];
            $filesInFolder = \File::files($folderPath);
            foreach ($filesInFolder as $value) {
                $fileName[] = pathinfo($value);
            }

           

            $size = File::size(storage_path('app/public/allfiles/' . $folderName ."/" . $fileName["0"]["basename"]));
            /* convert in mb */
            $file_size = number_format($size / 1048576, 2);

            /* sendFilepath */
            $filePath = $folderName . "/" . $fileName["0"]["basename"];

            return response()->json(['fileName' => $fileName["0"]["basename"],"filePath" => $filePath,"fileSize"=>$file_size]);
        }
    }

   
}
