<?php

namespace App\Http\Controllers;
use Webklex\PDFMerger\Facades\PDFMergerFacade as PDFMerger;
use Elibyy\TCPDF\Facades\TCPDF;
use mikehaertl\pdftk\Pdf;

/*use PDF;*/
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use ZipArchive;
Use File;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Imagick;

class pdfController extends Controller
{
    /*merge pdf view*/ 
    public function mergePdfView(){
    	return view('mergepdf');
    }
    

      /*pdf viewer */
    public function pdfViewer(){
      return view('pdfViewer');
    }



       /*split pdf view */
    public function splitpdfView(){
      return view('splitpdf');
    }

    /*rotatePdfView pdf view */
    public function rotatePdfView(){
      return view('rotatePdf');
    }  
    
     /*rotatePdfView pdf view */
    public function pdfPasswordView(){
      return view('pdfPassword');
    } 
    
      /*printToPdfView pdf view */
    public function printToPdfView(){
      return view('printToPdfView');
    } 

    

       /*compressPDFView pdf view */
    public function compressPDFView(){
      return view('compressPDFView');
    } 
   
         /* extractPage pdf view */
    public function  extractPageView(){
      return view(' extractPage');
    } 


    /*merge pdf funcction*/
    public function mergepdf(Request $req){

       $input_File_Folder = Str::random(30);
       $path= public_path("pdf/".$input_File_Folder);

       /*count file to delete after merge*/
       $countFile=array();

       if(count($req->file('file')))
       {

              for($i=0;$i<count($req->file('file'));$i++)
              {
              
                  $InputfileName =Str::random(10).time().$req->file[$i]->getClientOriginalName();      
           
                   $path1=$req->file[$i]->move(public_path('pdf/'. $input_File_Folder), $InputfileName);  
                   $countFile[]=$InputfileName;  
                 
                }
        }      

      $outputFile="merge".$input_File_Folder.".pdf";
      $cmd = "cd ".$path." & pdftk *.pdf cat output $outputFile";
      exec($cmd,$output,$result_code);


       /*delete input file*/
       if(count($req->file('file')))
       {

             for($i=0;$i<count($countFile);$i++) {
             

              File::delete(public_path("pdf/".$input_File_Folder."/".$countFile[$i])); 
              }
        } 
        
          ob_end_clean();    
         
         return response()->download(public_path('pdf/'. $input_File_Folder."/". $outputFile));     

    }

   

      /*set password pdf*/
      public function setPdfPassword(Request $req){
           
       $InputfileName;

        $input_File_Folder = Str::random(30);
        $path= public_path("pdf/".$input_File_Folder);
        $filepath;

        for($i=0;$i<count($req->file('file'));$i++)
            {
                
              
                  $InputfileName =Str::random(10).time().$req->file[$i]->getClientOriginalName();      
           
                   $path1=$req->file[$i]->move(public_path('pdf/'. $input_File_Folder), $InputfileName);  
                  
                    $filepath=public_path("pdf/".$input_File_Folder."/". $InputfileName);



                      $pdf = new Pdf( $filepath);

                    $password = $req->input('Password'); 
                    $userPassword="11111111";                   
                     $result = $pdf->allow('AllFeatures')
                        ->setPassword($password)
                        ->setUserPassword($userPassword)                        
                        ->passwordEncryption(128)
                        ->saveAs($filepath);
            }

          ob_end_clean(); 
                $downloadfile="pdf/".$input_File_Folder."/". $InputfileName;
          return response()->download(public_path($downloadfile));


    }

    /*pdf viewer function*/
    public function pdfViewerView(Request $req){

        $userFile=time();
       $path=$req->file('file')->move(public_path('wordFile'), $userFile);
       return view('pdfViewerView',compact('userFile'));


    }



    /*split pdf pdf funcction*/
    public function splitpdf(Request $req){

      

       /*count file to delete after merge*/
      $allfileName;    
       $InputfileName;
        $input_File_Folder = Str::random(30);
         $path= public_path("pdf/".$input_File_Folder);

       if(count($req->file('file')))
       {

              for($i=0;$i<count($req->file('file'));$i++)
              {
                
                  $InputfileName =Str::random(10).time().$req->file[$i]->getClientOriginalName();      
           
                   $path1=$req->file[$i]->move(public_path('pdf/'. $input_File_Folder), $InputfileName);  
                    $allfileName[]=$InputfileName;
                    $InputfileName='"'.$InputfileName.'"';
                    $ouputName="page-".$i."%d.pdf";
                 

                   /*split pdf*/
                                  $cmd = "cd ".$path." & pdftk  $InputfileName burst output $ouputName";
                                   exec($cmd,$output,$result_code);
                                  
                                 
                   /*end split pdf*/  
                 
                }

                /* delete user input file */
			   $f=0;
			   
			   for($f=0; $f<count($allfileName); $f++ )
			   {
				File::delete(public_path("pdf/".$input_File_Folder."/".$allfileName[$f]));
				
			   }

		      /*make zip file*/
               $zip = new ZipArchive;
   
                $fileName = 'Splitpdf.zip';
				
					if ($zip->open(public_path("pdf/".$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
						{
							echo"if";
							$files = File::files(public_path('pdf/'.$input_File_Folder."/"));
					
							foreach ($files as $key => $value) {
								$relativeNameInZipFile = basename($value);
								$zip->addFile($value, $relativeNameInZipFile);
							}
							
							$zip->close();
						}
				
		      /*end zip*/
			  		$size= File::size(public_path("pdf/".$input_File_Folder."/".$fileName));
					/* convert in mb */					
					$file_size = number_format($size / 1048576,2);
					ob_end_clean();
					return response()->download(public_path("pdf/".$input_File_Folder."/".$fileName));

        }   

    }

   
     /*rotate pdf pdf funcction*/
    public function rotatePdf(Request $req){

      
       $countFile=array();
       $UserInputfileName;
       $InputfileName;
       $outputFile;
       $count_rotate;

       if(count($req->file('file')))
       {

              for($i=0;$i<count($req->file('file'));$i++)
              {

              /*  $direction=$req->input('rotate');             
               $totalPage=$req->input("pageNo"); */
               
               $direction="2right";
               $totalPage="1-6";
               $count_rotate=(int)filter_var($direction, FILTER_SANITIZE_NUMBER_INT);
             
              
                 $input_File_Folder = Str::random(30);
                $path= public_path("pdf/".$input_File_Folder);
              
                  $InputfileName =Str::random(10).time().$req->file[$i]->getClientOriginalName();      
           
                   $path1=$req->file[$i]->move(public_path('pdf/'. $input_File_Folder), $InputfileName);  
                   $countFile[]=$InputfileName;

                   /* rotate pdf*/

                                  $UserInputfileName=$countFile[$i];                                  

                                  /* remove number from string */
                                  $new_direction = preg_replace('/[0-9]+/', '', $direction);                                 

                                  for($count=1;$count<=$count_rotate;$count++){

                                    $outputFile=$count."Rotate.pdf";
                                    
                                 
                                  $cmd = "cd ".$path." & pdftk *.pdf cat $totalPage$new_direction output $outputFile";
                                   exec($cmd,$output,$result_code);
                                  
                                  }
                                 
                   /*end rotate  pdf*/  
                 
                }
        }   

       /*delete input file*/
       if(count($req->file('file')))
       {

             for($i=0;$i<count($countFile);$i++) {
             

             File::delete(public_path("pdf/".$input_File_Folder."/".$countFile[$i])); 
              }
        } 
       ob_end_clean();
       return response()->download(public_path('pdf/'. $input_File_Folder."/". $count_rotate."Rotate.pdf"));
          

    }

    /*end rotate pdf*/

    /* print to pdf function */
    public function printToPdf(Request $req){

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
        $cmd = "cd ".$path.' & "c:/Program Files/LibreOffice/program/soffice.exe" --convert-to pdf *';
        exec($cmd,$output1,$result_code1);        
         
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

    /* compress pdf function */

    public function compressPDF(Request $req){

         $countFile=array();
         $input_File_Folder = Str::random(20);
         $path= public_path("wordFile/". $input_File_Folder);
             
       

         for($i=0;$i<count($req->file('file'));$i++)
         {
            
          $fileName =Str::random(10).time().$req->file[$i]->getClientOriginalName();  
   
          $path1=$req->file[$i]->move(public_path('wordFile/'.$input_File_Folder), $fileName); 
          $countFile[]=$fileName; 
          
          /* convert pdf to image */

           $imagick = new Imagick();

		        $imagick->readImage(public_path('wordFile/'. $input_File_Folder."/".$fileName));
		        $arr[]=$imagick->getnumberimages();
		        $imagick->writeImages('wordFile/'. $input_File_Folder."/".$fileName.".jpg", true);
            $cmd = "cd ".$path." & pdftk *.pdf cat output compresspdf.pdf";
             exec($cmd,$output,$result_code);
         
        }
        $cmd = "cd ".$path.' & "c:/Program Files/LibreOffice/program/soffice.exe" --convert-to pdf *.jpg';
        exec($cmd,$output1,$result_code1);        
         
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
              /*  ob_end_clean();                    
                return response()->download(public_path($downloadurl));	 */
         }




         /*  extractPage function */
         public function  extractPage(Request $req){

  /*count file to delete after merge*/
      $allfileName;    
       $InputfileName;
        $input_File_Folder = Str::random(30);
         $path= public_path("pdf/".$input_File_Folder);
          $pageNo=$req->input('pageNumber');
          $countFile;

       if(count($req->file('file')))
       {

              for($i=0;$i<count($req->file('file'));$i++)
              {
                
                  $InputfileName =Str::random(10).time().$req->file[$i]->getClientOriginalName();      
           
                   $path1=$req->file[$i]->move(public_path('pdf/'. $input_File_Folder), $InputfileName);  
                    $countFile[]=$InputfileName;
                    $InputfileName='"'.$InputfileName.'"';
                                    

                   /*split pdf*/
                                  $cmd = "cd ".$path." & pdftk  $InputfileName burst output page-%d.pdf";
                                   exec($cmd,$output,$result_code);
                                  
                                 
                   /*end split pdf*/  
                 
                }

              



         }

         
       /*delete input file*/
      

             for($i=0;$i<count($countFile);$i++) {             

              File::delete(public_path("pdf/".$input_File_Folder."/".$countFile[$i])); 
              }

              /*delete doc.txt extra file*/  
               /* File::delete(public_path("pdf/".$input_File_Folder."/doc_data.txt")); */

              /*make zip file*/
               $zip = new ZipArchive;
                $counter=1;
   
                  $fileName = 'Extract-Page.zip';
             
                  if ($zip->open(public_path("pdf/".$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
                  {
                      $files = File::files(public_path('pdf/'.$input_File_Folder));
             
                      foreach ($files as $key => $value) {
                        $counter++;
                         $relativeNameInZipFile = basename($value);
                       //  echo $relativeNameInZipFile;
                         echo"<br>";
                         echo $pageNo;
                        // echo "page-".$pageNo.".pdf";
                        if("page-".$pageNo.".pdf"==$relativeNameInZipFile){
                          $zip->addFile($value, $relativeNameInZipFile); 
                                               
                        }                     
                                                    
                      }
                       
                      $zip->close();
                  }
              /*end zip*/

              $downloadurl="pdf/".$input_File_Folder."/Extract-Page.zip";
              ob_end_clean(); 
              return response()->download(public_path($downloadurl));

              /* return response()->json(["url"=>$downloadurl],200); */

}
}

