<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use PDF;
use ZipArchive;
use File;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Str;



class ConvertController extends Controller
{

   public function index(){

   	return view('index');
   }


 public function docToPdfView(){

   	return view('docToPdf');
   }
      /*excel to pdf view*/
    public function xlstopdfView(){
      return view('xsltopdfView');
    }

     /*ppt to pdf view*/
    public function pptToPdfView(){
      return view('pptToPdf');
    }

    

      /*pdfToWordView*/
    public function pdfToWordView(){
      return view('pdfToWord');
    }

    public function convertDocToPDF(Request $req){
    	
        $req->validate([

        	'file'=>'required'
        ],
        [
        	'file'=>'Please upload File  OR select Only PPT File'


        ]);

    	

        $countFile=array();
         $input_File_Folder = Str::random(20);
         $path= public_path("wordFile/". $input_File_Folder);
             
       

         for($i=0;$i<count($req->file('file'));$i++)
         {
            
          $fileName =Str::random(10).time().$req->file[$i]->getClientOriginalName();  
   
          $path1=$req->file[$i]->move(public_path('wordFile/'.$input_File_Folder), $fileName); 
          $countFile[]=$fileName;               
         
        }
        $cmd = "cd ".$path.' & soffice --convert-to pdf *';
       shell_exec($cmd);
           
         
     /*delete input file*/
       if(count($req->file('file')))
       {
             for($i=0;$i<count($countFile);$i++) {            

              File::delete(public_path("wordFile/".$input_File_Folder."/".$countFile[$i])); 
              }
        } 
          /*make zip file*/
               $zip = new ZipArchive;
   
                  $fileName = 'WordToPdf.zip';
             
                  if ($zip->open(public_path("wordFile/".$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
                  {
                      $files = File::files(public_path('wordFile/'.$input_File_Folder));
             
                      foreach ($files as $key => $value) {
                          $relativeNameInZipFile = basename($value);
                          $zip->addFile($value, $relativeNameInZipFile);
                      }
                       
                      $zip->close();
                  }
              /*end zip*/

              $downloadurl="wordFile/".$input_File_Folder."/".$fileName;
               ob_end_clean();                    
                return response()->download(public_path($downloadurl));	
                
   }

    public function upload(Request $request){
    	 
              $image=$request->file('file');
        $fileName=  $request->file('file')->storeAs('public/adminImage',$image);
    }

     /*xsl to pdf funcction*/
        public function xlstopdf(Request $req)

    {
       
    	
         $countFile=array();
         $input_File_Folder = Str::random(20);
         $path= public_path("wordFile/". $input_File_Folder); 
         $get_extension;    
             
       

         for($i=0;$i<count($req->file('file'));$i++)
         {
            
          $fileName =Str::random(10).time().$req->file[$i]->getClientOriginalName(); 
           $get_extension= $req->file[$i]->extension();
           echo $get_extension;

           $file=$fileName.$get_extension;
           echo $file;
          
          
   
          $path1=$req->file[$i]->move(public_path('wordFile/'.$input_File_Folder), $fileName); 
          $countFile[]=$fileName; 
          $cmd = "cd ".$path.' & "c:/Program Files/LibreOffice/program/soffice.exe" --convert-to pdf *';
        exec($cmd,$output1,$result_code1);   
        echo $result_code1;
        echo $cmd;               
         
        }
            
         
     /*delete input file*/
       if(count($req->file('file')))
       {
             for($i=0;$i<count($countFile);$i++) {            

              File::delete(public_path("wordFile/".$input_File_Folder."/".$countFile[$i])); 
              }
        } 
          /*make zip file*/
               $zip = new ZipArchive;
   
                  $fileName = 'ExcelToPdf.zip';
             
                  if ($zip->open(public_path("wordFile/".$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
                  {
                      $files = File::files(public_path('wordFile/'.$input_File_Folder));
             
                      foreach ($files as $key => $value) {
                          $relativeNameInZipFile = basename($value);
                          $zip->addFile($value, $relativeNameInZipFile);
                      }
                       
                      $zip->close();
                  }
              /*end zip*/

              $downloadurl="wordFile/".$input_File_Folder."/".$fileName;
               ob_end_clean();                    
                return response()->download(public_path($downloadurl));	


    }


/*ppt to pdf*/

public function pptToPdf(Request $req){

     $countFile=array();
         $input_File_Folder = Str::random(20);
         $path= public_path("wordFile/". $input_File_Folder); 
         $get_extension;    
             
       

         for($i=0;$i<count($req->file('file'));$i++)
         {
            
          $fileName =Str::random(10).time().$req->file[$i]->getClientOriginalName(); 
           $get_extension= $req->file[$i]->extension();
           echo $get_extension;

           $file=$fileName.$get_extension;
           echo $file;
          
          
   
          $path1=$req->file[$i]->move(public_path('wordFile/'.$input_File_Folder), $fileName); 
          $countFile[]=$fileName; 
          $cmd = "cd ".$path.' & "c:/Program Files/LibreOffice/program/soffice.exe" --convert-to pdf *';
        exec($cmd,$output1,$result_code1);   
        echo $result_code1;
        echo $cmd;               
         
        }
            
         
     /*delete input file*/
       if(count($req->file('file')))
       {
             for($i=0;$i<count($countFile);$i++) {            

              File::delete(public_path("wordFile/".$input_File_Folder."/".$countFile[$i])); 
              }
        } 
          /*make zip file*/
               $zip = new ZipArchive;
   
                  $fileName = 'ExcelToPdf.zip';
             
                  if ($zip->open(public_path("wordFile/".$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
                  {
                      $files = File::files(public_path('wordFile/'.$input_File_Folder));
             
                      foreach ($files as $key => $value) {
                          $relativeNameInZipFile = basename($value);
                          $zip->addFile($value, $relativeNameInZipFile);
                      }
                       
                      $zip->close();
                  }
              /*end zip*/

              $downloadurl="wordFile/".$input_File_Folder."/".$fileName;
               ob_end_clean();                    
                return response()->download(public_path($downloadurl));	
       
}

/*pdf to word*/

public function pdfToWord(Request $req){

        $countFile=array();
         $input_File_Folder = Str::random(20);
         $path= public_path("wordFile/". $input_File_Folder); 
         $python_script_path=public_path("pythonScript");
         
        
         for($i=0;$i<count($req->file('file'));$i++)
         {
            
          $fileName =Str::random(10).time().".pdf"; 
          
   
          $file_path=$req->file[$i]->move(public_path('wordFile/'.$input_File_Folder), $fileName); 
          $countFile[]=$fileName; 
          
          $file_path=trim($file_path,".pdf");
         $cmd = "cd ".$python_script_path.' & py pdfToWord.py '.$file_path.".pdf"." ".$file_path.".docx".' san';
         $cmd1='cd D:\word-to-docs\office-tools\public\pythonScript & py pdfToWord.py "test-pdf.pdf" san'; 

          exec($cmd,$output1,$result_code1);   
        }
            
         
     /*delete input file*/
      if(count($req->file('file')))
       {
             for($i=0;$i<count($countFile);$i++) {            

              File::delete(public_path("wordFile/".$input_File_Folder."/".$countFile[$i])); 
              }
        } 
          /*make zip file*/
               $zip = new ZipArchive;
   
                  $fileName = 'pdfToWord.zip';
             
                  if ($zip->open(public_path("wordFile/".$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
                  {
                      $files = File::files(public_path('wordFile/'.$input_File_Folder));
             
                      foreach ($files as $key => $value) {
                          $relativeNameInZipFile = basename($value);
                          $zip->addFile($value, $relativeNameInZipFile);
                      }
                       
                      $zip->close();
                  }
              /*end zip*/

              $downloadurl="wordFile/".$input_File_Folder."/".$fileName;
               ob_end_clean();                    
                return response()->download(public_path($downloadurl));	
       
}

  
}