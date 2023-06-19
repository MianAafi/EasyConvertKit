<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PDF;
use ZipArchive;
use File;
use Storage;
use Illuminate\Support\Str;
class ControllerApiOffice extends Controller
{
 
    public function convertDocToPDF(Request $req){
  
         $countFile=array();
         $size=false; 
         $input_File_Folder = Str::random(20).time();
         $path= storage_path('app/public/allfiles/'. $input_File_Folder);
          if (!File::isDirectory($path)) {
            File::makeDirectory($path, 0777, true, true);
          }  
        

         if($req->file('file'))
         {
            for($i=0;$i<count($req->file('file'));$i++)
            {
            if ($req->file[$i]->getSize() <= 10000000) 
            {
                
                $fileName =$req->file[$i]->getClientOriginalName();  
                $req->file[$i]->move(storage_path('app/public/allfiles/'.$input_File_Folder), $fileName); 
                $countFile[]=$fileName;
                 $size = true; 
              }
          
            }
          }
    /* move file which is coming from dropbox and drive */
             $i = 0;       
              if ($req->path) 
              {
                  foreach($req->path as $value)
                  {               
                      $filename = str_replace(' ', '', $req->name[$i]); 
                      File::move(storage_path('app/public/allfiles/' . $value), storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $filename));
                      $countFile[]= $filename;
                      $i++;
                       $size = true;
                  }
              }      
    
       $cmd = "cd ".$path. ' && soffice --convert-to pdf *';
       shell_exec($cmd); 
         
     /*delete input file*/
      
             for($i=0;$i<count($countFile);$i++) {            

                File::delete(storage_path('app/public/allfiles/'.$input_File_Folder."/".$countFile[$i])); 
              }
        
                 /*make zip file*/
                  $zip = new ZipArchive;   
                  $fileName = 'ConvertToPdf.zip';
             
                  if ($zip->open(storage_path('app/public/allfiles/'.$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
                  {
                      $files = File::files(storage_path('app/public/allfiles/'.$input_File_Folder));
             
                      foreach ($files as $key => $value) {
                          $relativeNameInZipFile = basename($value);
                          $zip->addFile($value, $relativeNameInZipFile);
                      }                       
                      $zip->close();
                  }
    /*end zip*/
          $file_size = null;
          $downloadurl = null;
          if ($size)
           {
              $downloadurl= "storage/allfiles/".$input_File_Folder."/".$fileName;            
              $size= File::size(storage_path('app/public/allfiles/'.$input_File_Folder."/".$fileName));
				    	/* convert in mb */					
					    $file_size = number_format($size / 1048576,2); 
               }
              return response()->json(["url"=>$downloadurl,"size" => $file_size, "fileName" => $fileName],200);
                
}

   /*xsl to pdf funcction*/

  public function xlstopdf(Request $req){ 
         
         $countFile=array();
         $input_File_Folder = Str::random(20).time();
         $path= storage_path('app/public/allfiles/'. $input_File_Folder);
        if (!File::isDirectory($path)) {
          File::makeDirectory($path, 0777, true, true);
        }  

    if ($req->file) 
    {
         for($i=0;$i<count($req->file('file'));$i++)
         {
            
          $fileName =Str::random(10).time().$req->file[$i]->getClientOriginalName();  
          $path1=$req->file[$i]->move(storage_path('app/public/allfiles/'.$input_File_Folder), $fileName); 
          $countFile[]=$fileName; 
         
          }
     }

    /* move file which is coming from dropbox and drive */
           $i = 0;
          if ($req->path) {
            foreach ($req->path as $value) {
             
              File::move(storage_path('app/public/allfiles/' . $value), storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $req->name[$i]));
              $countFile[] = $req->name[$i];
              $i++;
            }
          } 
            
          $cmd = 'cd '.$path.' && soffice --convert-to pdf *';
          shell_exec($cmd);
         
     /*delete input file*/
      
             for($i=0;$i<count($countFile);$i++) {            

                File::delete(storage_path('app/public/allfiles/'.$input_File_Folder."/".$countFile[$i])); 
              }
        
          /*make zip file*/
               $zip = new ZipArchive;
   
                  $fileName = 'ExcelToPdf.zip';
             
                  if ($zip->open(storage_path('app/public/allfiles/'.$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
                  {
                      $files = File::files(storage_path('app/public/allfiles/'.$input_File_Folder));
             
                      foreach ($files as $key => $value) {
                          $relativeNameInZipFile = basename($value);
                          $zip->addFile($value, $relativeNameInZipFile);
                      }
                       
                      $zip->close();
                  }
              /*end zip*/
             $downloadurl= "storage/allfiles/".$input_File_Folder."/".$fileName;  
              $size= File::size(storage_path('app/public/allfiles/'.$input_File_Folder."/".$fileName));
				      /* convert in mb */					
					     $file_size = number_format($size / 1048576,2);            	
              return response()->json(["url"=>$downloadurl,"size"=>$file_size, "fileName" => $fileName],200);
}


/*ppt to pdf*/

public function pptToPdf(Request $req){

         $countFile=array();
         $input_File_Folder = Str::random(20);
         $path= storage_path('app/public/allfiles/'. $input_File_Folder);

          if (!File::isDirectory($path)) {
            File::makeDirectory($path, 0777, true, true);
          } 
        if($req->file)
        {
          for($i=0;$i<count($req->file('file'));$i++)
          {
              
            $fileName =$req->file[$i]->getClientOriginalName(); 
            $get_extension= $req->file[$i]->extension();          
            $path1=$req->file[$i]->move(storage_path('app/public/allfiles/'.$input_File_Folder), $fileName); 
            $countFile[]=$fileName;                     
          
          }
      }

      /* move file which is coming from dropbox and drive */
      $i = 0;
          if ($req->path) {
            foreach ($req->path as $value) {
              
              File::move(storage_path('app/public/allfiles/' . $value), storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $req->name[$i]));
              $countFile[] = $req->name[$i];
              $i++;
            }
          } 

         $cmd = "cd ".$path." && soffice --convert-to pdf *";
         shell_exec($cmd);  
            
        /*delete input file*/
    
             for($i=0;$i<count($countFile);$i++) {            

                File::delete(storage_path('app/public/allfiles/'.$input_File_Folder."/".$countFile[$i])); 
              }
        
          /*make zip file*/
                  $zip = new ZipArchive;   
                  $fileName = 'pptToPdf.zip';
             
                  if ($zip->open(storage_path('app/public/allfiles/'.$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
                  {
                      $files = File::files(storage_path('app/public/allfiles/'.$input_File_Folder));
             
                      foreach ($files as $key => $value) {
                          $relativeNameInZipFile = basename($value);
                          $zip->addFile($value, $relativeNameInZipFile);
                      }
                       
                      $zip->close();
                  }
              /*end zip*/

              $downloadurl= "storage/allfiles/".$input_File_Folder."/".$fileName;  
               $size= File::size(storage_path('app/public/allfiles/'.$input_File_Folder."/".$fileName));
				      /* convert in mb */					
					     $file_size = number_format($size / 1048576,2);              	
              return response()->json(["url"=>$downloadurl,"size"=>$file_size, "fileName" => $fileName],200);
       
}

/*pdf to word*/

public function pdfToWord(Request $req){

         $countFile=array();
         $size=false;
         $input_File_Folder = Str::random(20);
         $path= storage_path('app/public/allfiles/'. $input_File_Folder); 
         $python_script_path=public_path("storage/pythonScript");
         $completeFileName=array();
          if (!File::isDirectory($path)) {
            File::makeDirectory($path, 0777, true, true);
          }     
        if($req->file)
        {
         for($i=0;$i<count($req->file('file'));$i++)
         {
            if ($req->file[$i]->getSize() <= 10000000) 
            {         
                $fileName =Str::random(10).time().".pdf";     
                $file_path=$req->file[$i]->move(storage_path('app/public/allfiles/'.$input_File_Folder), $fileName); 
                $countFile[]=$fileName;
                $completeFileName[]= $file_path; 
                $size=true; 
            }          
           
        }
      }

        /* move file which is coming from dropbox and drive */
        $i = 0;
          if ($req->path) {
            foreach ($req->path as $value) {
             $filename=str_replace(' ', '', $req->name[$i]);
              $file_path=File::move(storage_path('app/public/allfiles/' . $value), storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $filename ));
              $countFile[] = $filename;
              $completeFileName[] = storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $filename);
              $i++;
              $size = true; 
            }
          } 
          /* run python script */
   
          foreach($completeFileName as $value)
          {
            $file_path = trim($value, ".pdf");
            $cmd = "cd " . $python_script_path . ' && py pdfToWord.py ' . $file_path . ".pdf" . " " . $file_path . ".docx";
            exec($cmd, $output1, $result_code1);   
           
          }
            
         
     /*delete input file*/
     
             for($i=0;$i<count($countFile);$i++) {            

                File::delete(storage_path('app/public/allfiles/'.$input_File_Folder."/".$countFile[$i])); 
              }
       
          /*make zip file*/
               $zip = new ZipArchive;
   
                  $fileName = 'pdfToWord.zip';
             
                  if ($zip->open(storage_path('app/public/allfiles/'.$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
                  {
                      $files = File::files(storage_path('app/public/allfiles/'.$input_File_Folder));
             
                      foreach ($files as $key => $value) {
                          $relativeNameInZipFile = basename($value);
                          $zip->addFile($value, $relativeNameInZipFile);
                      }
                       
                      $zip->close();
                  }
            /*end zip*/

            $file_size = null;
            $downloadurl = null;
            if ($size) 
            {
              $downloadurl= "storage/allfiles/".$input_File_Folder."/".$fileName;  
               $size= File::size(storage_path('app/public/allfiles/'.$input_File_Folder."/".$fileName));
				      /* convert in mb */					
					     $file_size = number_format($size / 1048576,2);
            }              	
              return response()->json(["url"=>$downloadurl,"size"=>$file_size, "fileName" => $fileName],200);
       
}

}
