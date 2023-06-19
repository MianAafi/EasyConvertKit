<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use ZipArchive;
use File;
use Storage;
use mikehaertl\pdftk\Pdf;
class ControllerApiPdf extends Controller
{

    /*merge pdf funcction*/
    public function mergepdf(Request $req){

       $input_File_Folder = Str::random(30).time();
       $path= storage_path('app/public/allfiles/'.$input_File_Folder);
       $size=false;
    
     if (!File::isDirectory($path)) 
     {
      File::makeDirectory($path, 0777, true, true);
    }  

      /*count file to delete after merge*/
       $countFile=array();

       if($req->file('file'))
       {

              for($i=0;$i<count($req->file('file'));$i++)
              {
                  if ($req->file[$i]->getSize() <= 10000000)
                   {  
                      $InputfileName =Str::random(10).time().$req->file[$i]->getClientOriginalName();   
                      $req->file[$i]->move(storage_path('app/public/allfiles/'. $input_File_Folder), $InputfileName);  
                      $countFile[]=$InputfileName;
                      $size = true;
                    }
              }
        }
        /* move file which is coming from dropbox and drive */
        $i = 0;
        if ($req->path) {
          foreach ($req->path as $value) {
        
            $filename = str_replace(' ', '', $req->name[$i]);
            File::move(storage_path('app/public/allfiles/' . $value), storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $filename));
            $countFile[] = $filename;
            $i++;
           $size = true;
          }
        } 
 
      $outputFile="merge".$input_File_Folder.".pdf";
      $cmd = "cd ".$path." && pdftk *.pdf cat output $outputFile";
      exec($cmd,$output,$result_code);
     
       /*delete input file*/        
      for($i=0;$i<count($countFile);$i++) {
             
         File::delete(storage_path('app/public/allfiles/'.$input_File_Folder."/".$countFile[$i])); 
       }

    $file_size = null;
    $downloadUrl = null;
    if ($size) 
    {
        $size= File::size(storage_path('app/public/allfiles/'.$input_File_Folder."/".$outputFile));
					/* convert in mb */					
				$file_size = number_format($size / 1048576,2);
        $downloadUrl='storage/allfiles/'. $input_File_Folder."/". $outputFile;
    }
       return response()->json(['url'=>$downloadUrl,"size"=>$file_size,"fileName"=>  $outputFile],200);  

}
   
 /*rotate pdf pdf funcction*/
    public function rotatePdf(Request $req){
   
      
               $direction=$req->input('rotate'); 
               $direction=$direction*90;  
               $python_script_path=public_path("storage/pythonScript"); 
               $size=false;
               $source_file_path=null;
    
               $input_File_Folder = Str::random(30).time();
               $path= storage_path('app/public/allfiles/'.$input_File_Folder);
              if (!File::isDirectory($path)) {
                File::makeDirectory($path, 0777, true, true);
              }             
               $InputfileName =Str::random(10).time();
               $output_file_location = storage_path('app/public/allfiles/' . $input_File_Folder);
               if($req->file)
               {
                    if ($req->file[0]->getSize() <= 10000000) 
                    {                    
                        $source_file_path=$req->file[0]->move(storage_path('app/public/allfiles/'. $input_File_Folder."/". $InputfileName)); 
                        $size=true;
                    }
             
               }


            /* move file which is coming from dropbox and drive */
            $i = 0;
              if ($req->path) {
                foreach ($req->path as $value) {

                  $filename = str_replace(' ', '', $req->name[$i]);                
                  File::move(storage_path('app/public/allfiles/' . $value), storage_path('app/public/allfiles/' . $input_File_Folder . "/" .$filename));
                  $countFile[] = $filename;
                   $source_file_path= storage_path('app/public/allfiles/' . $input_File_Folder . "/" .$filename);
                  $i++;
                  $size=true;
                }
              } 
                 
              /* output file name */
               $outputFile="Rotate.pdf";                                    
               $cmd = "cd " ."$python_script_path". " && py rotate-pdf.py ".$source_file_path." " .$output_file_location."/Rotate.pdf ".$direction;
               exec($cmd,$output,$result_code);
              
              /*end rotate  pdf*/                  
                
         

       /*delete input file*/       

        File::delete(storage_path('app/public/allfiles/'.$input_File_Folder."/".$InputfileName));

    /* count size and eturn download link */
    $file_size = null;
    $download_url = null;
    if ($size) 
    {     
        $size= File::size(storage_path('app/public/allfiles/'.$input_File_Folder."/Rotate.pdf"));
					/* convert in mb */					
				$file_size = number_format($size / 1048576,2);
        $download_url="storage/allFiles/".$input_File_Folder."/Rotate.pdf";
    }
        return response()->json(['url'=>$download_url,'size'=>$file_size, "fileName" =>"Rotate.pdf"],200);
  }

    /*split pdf pdf funcction*/
    public function splitpdf(Request $req){

      $allfileName=array();    
      $InputfileName;
      $ouputName;
      $size=false;
      $input_File_Folder = Str::random(30).time();
      $path= storage_path('app/public/allfiles/'.$input_File_Folder);

      if (!File::isDirectory($path)) {
        File::makeDirectory($path, 0777, true, true);
      }  
        if ($req->file('file')) 
        {
              for($i=0;$i<count($req->file('file'));$i++)
              {

                 if ($req->file[$i]->getSize() <= 10000000)
                  {  
                      $InputfileName =Str::random(10).time().".pdf";
                      $InputfileName=str_replace(" ","",$InputfileName);
                      $path1=$req->file[$i]->move(storage_path('app/public/allfiles/'. $input_File_Folder), $InputfileName);  
                      $allfileName[]=$InputfileName;
                      $InputfileName='"'.$InputfileName.'"';
                      $size=true;
                  }
                                    

                }
         }

    /* move file which is coming from dropbox and drive */
    $i = 0;
    if ($req->path) {
      foreach ($req->path as $value) {
        $filename = str_replace(' ', '', $req->name[$i]);
        File::move(storage_path('app/public/allfiles/' . $value), storage_path('app/public/allfiles/' . $input_File_Folder . "/". $filename));
        $allfileName[]=  $filename;
        $InputfileName = Str::random(10) . time();
        $InputfileName = '"' . $InputfileName . '"';       
        $i++;
        $size=true;
      }
    }
    /*split pdf*/
    $count = 0;
    foreach($allfileName as $value)
    {
      
      $ouputName = "page-" . $count . "%d.pdf";
      $cmd = "cd " . $path . " && pdftk  $value burst output $ouputName";      
      exec($cmd, $output, $result_code); 
      $count++;
      
    }

        /* delete user input file */
			   $f=0;
			   
			   for($f=0; $f<count($allfileName); $f++ )
			   {
				    File::delete(storage_path('app/public/allfiles/'.$input_File_Folder."/".$allfileName[$f]));
				
			   }
         /* del doc_data.txt file */
    File::delete(storage_path('app/public/allfiles/' . $input_File_Folder . "/doc_data.txt"));

		      /*make zip file*/
         $zip = new ZipArchive;   
         $fileName = 'Splitpdf.zip';
				
					if ($zip->open(storage_path('app/public/allfiles/'.$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
						{
							
							 $files = File::files(storage_path('app/public/allfiles/'.$input_File_Folder."/"));
					
                foreach ($files as $key => $value) {
                  $relativeNameInZipFile = basename($value);
                  $zip->addFile($value, $relativeNameInZipFile);
                }
							
							$zip->close();
						}

    /*end zip*/
    $file_size = null;
    $downloadUrl = null;
      if ($size)
      {
			  	$size= File::size(storage_path('app/public/allfiles/'.$input_File_Folder."/".$fileName));
					/* convert in mb */					
					$file_size = number_format($size / 1048576,2);					
           $downloadUrl="storage/allfiles/".$input_File_Folder."/".$fileName;
        }
					return response()->json(["url"=>$downloadUrl ,"size"=>$file_size, "fileName" => $fileName]);

          
}


 /*set password pdf*/
      public function setPdfPassword(Request $req){
           
        $InputfileName=null;       
        $userPassword = "1";
        $downloadurl=null;
        $password = $req->input('Password'); 
        $input_File_Folder = Str::random(30).time();
        $filePath=null;
        $size=false;
    if ($req->file) {
        for($i=0;$i<count($req->file('file'));$i++)
            {
               if ($req->file[$i]->getSize() <= 10000000) 
               { 
                  $InputfileName =Str::random(10).time().$req->file[$i]->getClientOriginalName();      
                  $req->file[$i]->move(storage_path('app/public/allfiles/'. $input_File_Folder), $InputfileName);                   
                  $filePath= 'storage/allfiles/'.$input_File_Folder."/". $InputfileName;        
                  $downloadurl = "storage/allfiles/" . $input_File_Folder . "/" . $InputfileName;
                  $size=true;
               }
            }
          }

        /* if  file coming from dropbox and drive */

        if ($req->path) {
            foreach ($req->path as $value) 
            {
              $filePath='storage/allfiles/'. $value;
              $downloadurl= "storage/allfiles/".$value;
              $InputfileName=$req->name[0];
              $size=true;
            
            }
        }

        /* set pdf password */
          $pdfFile = new Pdf($filePath);

          $result = $pdfFile->allow('AllFeatures')
          ->setPassword($password)
          ->setUserPassword($userPassword)
          ->passwordEncryption(128)
          ->saveAs($filePath);
      $file_size = null;
      if($size) 
      {
         $size= File::size($filePath);
					/* convert in mb */					
					$file_size = number_format($size / 1048576,2);
        }
          return response()->json(["url"=>$downloadurl,"size"=>$file_size, "fileName" => $InputfileName],200);


}
  
   /* print to pdf function */
    public function printToPdf(Request $req){

         $countFile=array();
         $input_File_Folder = Str::random(20).time();
         $path= storage_path('app/public/allFiles/'. $input_File_Folder);
         $InputfileName;    
       
         for($i=0;$i<count($req->file('file'));$i++)
         {
            
          $fileName =Str::random(10).time().$req->file[$i]->getClientOriginalName();  
          $path1=$req->file[$i]->move(storage_path("app/public/pdf/".$input_File_Folder), $fileName); 
          $countFile[]=$fileName;               
         
        }
           $cmd = "cd " . $path . '& soffice --convert-to pdf *';
           shell_exec($cmd);
     
     /*delete input file*/
       if(count($req->file('file')))
       {
             for($i=0;$i<count($countFile);$i++) {            

                  File::delete(storage_path('app/public/allFiles/'.$input_File_Folder."/".$countFile[$i])); 
              }
        } 
          /*make zip file*/
                  $zip = new ZipArchive;   
                  $fileName = 'PrintToPdf.zip';
             
                  if ($zip->open(storage_path('app/public/allFiles/'.$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
                  {
                      $files = File::files(storage_path('app/public/allFiles/'.$input_File_Folder));
                      foreach ($files as $key => $value) {
                          $relativeNameInZipFile = basename($value);
                          $zip->addFile($value, $relativeNameInZipFile);
                      }
                       
                      $zip->close();
                  }
              /*end zip*/
                 $downloadurl="storage/allFiles/".$input_File_Folder."/".$fileName;  
                 $size= File::size(storage_path('app/public/allFiles/'.$input_File_Folder."/".$fileName));
					        /* convert in mb */					
				        	$file_size = number_format($size / 1048576,2);
                            	
              return response()->json(["url"=>$downloadurl,"size"=>$file_size, "fileName" => $fileName],200);
}

/*  extractPage function */
 public function  extractPage(Request $req){

        $allfileName=array();    
        $InputfileName=null;
        $size=false; 
        $input_File_Folder = Str::random(30).time();
        $path= storage_path('app/public/allfiles/'.$input_File_Folder);
        $pageNo=$req->input('pageNumber');

    if (!File::isDirectory($path)) {
      File::makeDirectory($path, 0777, true, true);
    }
    if ($req->file('file')) {
      for ($i = 0; $i < count($req->file('file')); $i++) {

          if ($req->file[$i]->getSize() <= 10000000) 
          {

            $InputfileName = Str::random(10) . time();
            $path1 = $req->file[$i]->move(storage_path('app/public/allfiles/' . $input_File_Folder), $InputfileName);
            $allfileName[] = $InputfileName;
            $InputfileName = '"' . $InputfileName . '"';
            $size = true;
          }
      }
    }

    /* move file which is coming from dropbox and drive */
    $i = 0;
    if ($req->path) {
      foreach ($req->path as $value) {
        $filename = str_replace(' ', '', $req->name[$i]);  
        File::move(storage_path('app/public/allfiles/' . $value), storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $filename));
        $allfileName[] = $filename;
        $InputfileName = Str::random(10) . time();
        $InputfileName = '"' . $InputfileName . '"';
        $i++;
        $size = true;
      }
    }
    /*split pdf*/
  
    foreach ($allfileName as $value) {

      /* first make new pdf for page range */

      $cmd = "cd " . $path . " && pdftk  $value cat $pageNo output newfile.pdf";
      exec($cmd, $output, $result_code);
      
      /* split page */
      $ouputName = "page-"."%d.pdf";
      $cmd = "cd " . $path . " && pdftk  newfile.pdf burst output $ouputName";
      exec($cmd, $output, $result_code);

      $allfileName[]="newfile.pdf";
          
    }         
             /*delete input file*/
             for($i=0;$i<count($allfileName);$i++) {             

                 File::delete(storage_path('app/public/allfiles/'.$input_File_Folder."/". $allfileName[$i])); 
              }
              /* del doc_data.txt file */
              File::delete(storage_path('app/public/allfiles/' . $input_File_Folder . "/doc_data.txt"));
              /*make zip file*/
                 $zip = new ZipArchive;
                 $counter=1;   
                 $fileName = 'Extract-Pages.zip';
             
                  if ($zip->open(storage_path('app/public/allfiles/'.$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
                  {
                      $files = File::files(storage_path('app/public/allfiles/'.$input_File_Folder));
             
                      foreach ($files as $key => $value) {
                         $counter++;
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

                  $downloadurl="storage/allfiles/".$input_File_Folder."/Extract-Pages.zip";             
                  $size= File::size(storage_path('app/public/allfiles/'.$input_File_Folder."/Extract-Pages.zip"));
                    /* convert in mb */					
                  $file_size = number_format($size / 1048576,2);
                }
                 return response()->json(["url"=>$downloadurl,"size"=> $file_size, "fileName" => $fileName],200);

}


}