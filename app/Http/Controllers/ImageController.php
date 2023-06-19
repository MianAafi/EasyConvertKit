<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Image;
use ZipArchive;
use File;
use Imagick;
use Illuminate\Support\Str;
use Storage;


class ImageController extends Controller
{
	

	public function jpgtopngView()
	{
		return view('jpgtopng');
	}
	/*png to jpg view*/
	public function pngtojpgView()
	{
		return view('pngto-jpg');
	}

	/*end view*/

	/*pdf to image view*/
	public function pdftoimageView()
	{
		return view('pdftoImage');
	}

	/*end view*/

	/*pdf to png view*/
	public function pdftopngView()
	{
		return view('pdftopng');
	}

	/*end view*/

	/*jpg to pdf view*/
	public function jpgtopdfView()
	{
		return view('jpgtopdf');
	}

	/*end view*/

	/*jpg to pdf view*/
	public function pngtopdfView()
	{
		return view('pngtopdf');
	}

	/*end view*/

    public function jpgtopng(Request $req)
    {
        $allfileName;
         $req->validate([

        	'file'=>'required'
        ],
        [
        	'file'=>'Please upload File'


        ]);
    	
		 $allfileName;
			  $input_File_Folder;                
             $InputfileName;
			 $allfileName;

			  $input_File_Folder = Str::random(30);
              $path= public_path("Image/".$input_File_Folder);

		    	for($i=0;$i<count($req->file('file'));$i++)
		    	{

		    	  $InputfileName = Str::random(10).time().$req->file[$i]->getClientOriginalName();  
		   
		          $path=$req->file[$i]->move(public_path('Image/'.$input_File_Folder),  $InputfileName);

		    	 $imagick = new Imagick();

		        $imagick->readImage(public_path('Image/'.$input_File_Folder."/".$InputfileName));

		        $imagick->writeImages('Image/'.$input_File_Folder."/".$InputfileName.'.png', true);	
				$allfileName[]=$InputfileName; 

		      }
			
			    /* delete user input file */
			   $f=0;
			   
			   for($f=0; $f<count($allfileName); $f++ )
			   {
				File::delete(public_path("Image/".$input_File_Folder."/".$allfileName[$f]));
				
			   }

		      /*make zip file*/
               $zip = new ZipArchive;
   
                $fileName = 'jpgTopng.zip';
				
					if ($zip->open(public_path("Image/".$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
						{
							echo"if";
							$files = File::files(public_path('Image/'.$input_File_Folder."/"));
					
							foreach ($files as $key => $value) {
								$relativeNameInZipFile = basename($value);
								$zip->addFile($value, $relativeNameInZipFile);
							}
							
							$zip->close();
						}
				
		      /*end zip*/
			  		$size= File::size(public_path("Image/".$input_File_Folder."/".$fileName));
					/* convert in mb */					
					$file_size = number_format($size / 1048576,2);
					ob_end_clean();
					return response()->download(public_path("Image/".$input_File_Folder."/".$fileName));
    }

    /*function png to jpg*/
        public function pngtojpg(Request $req)
    {
        $allfileName;
			  $input_File_Folder;                
             $InputfileName;
			 $allfileName;

			  $input_File_Folder = Str::random(30);
              $path= public_path("Image/".$input_File_Folder);

		    	for($i=0;$i<count($req->file('file'));$i++)
		    	{

		    	  $InputfileName = Str::random(10).time().$req->file[$i]->getClientOriginalName();  
		   
		          $path=$req->file[$i]->move(public_path('Image/'.$input_File_Folder),  $InputfileName);

		    	 $imagick = new Imagick();

		        $imagick->readImage(public_path('Image/'.$input_File_Folder."/".$InputfileName));

		        $imagick->writeImages('Image/'.$input_File_Folder."/".$InputfileName.'.jpg', true);	
				$allfileName[]=$InputfileName; 

		      }
			
			    /* delete user input file */
			   $f=0;
			   
			   for($f=0; $f<count($allfileName); $f++ )
			   {
				File::delete(public_path("Image/".$input_File_Folder."/".$allfileName[$f]));
				
			   }

		      /*make zip file*/
               $zip = new ZipArchive;
   
                $fileName = 'PNGTojpg.zip';
				
					if ($zip->open(public_path("Image/".$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
						{
							echo"if";
							$files = File::files(public_path('Image/'.$input_File_Folder."/"));
					
							foreach ($files as $key => $value) {
								$relativeNameInZipFile = basename($value);
								$zip->addFile($value, $relativeNameInZipFile);
							}
							
							$zip->close();
						}
				
		      /*end zip*/
			  		$size= File::size(public_path("Image/".$input_File_Folder."/".$fileName));
					/* convert in mb */					
					$file_size = number_format($size / 1048576,2);
					ob_end_clean();
					return response()->download(public_path("Image/".$input_File_Folder."/".$fileName));

    }

    /*end function*/

    /*pdf to image converter*/
    public function pdftojpg(Request $req)
    {
            
			$input_File_Folder;                
             $InputfileName;
			 $allfileName;

			  $input_File_Folder = Str::random(30);
              $path= public_path("Image/".$input_File_Folder);

		    	for($i=0;$i<count($req->file('file'));$i++)
		    	{
					

		    	  $InputfileName = Str::random(10).time().$req->file[$i]->getClientOriginalName();  
		   
		          $path=$req->file[$i]->move(public_path('Image/'.$input_File_Folder),  $InputfileName);

		    	 $imagick = new Imagick();

		        $imagick->readImage(public_path('Image/'.$input_File_Folder."/".$InputfileName));

		        $imagick->writeImages('Image/'.$input_File_Folder."/".$InputfileName.'.jpg', true);	
				$allfileName[]=$InputfileName;         

		          /* for($i=0;$i<=$arr[0];$i++){
		         
				        $allfileName[]= array($i=>$fileName);
				    } */

		      }

		       /* delete user input file */
			   $f=0;
			   
			   for($f=0; $f<count($allfileName); $f++ )
			   {
				File::delete(public_path("Image/".$input_File_Folder."/".$allfileName[$f]));
				
			   }



		        /*make zip file*/
               $zip = new ZipArchive;
   
                $fileName = 'pdfTojpg.zip';
				
					if ($zip->open(public_path("Image/".$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
						{
							
							$files = File::files(public_path('Image/'.$input_File_Folder."/"));
					
							foreach ($files as $key => $value) {
								$relativeNameInZipFile = basename($value);
								$zip->addFile($value, $relativeNameInZipFile);
							}
							
							$zip->close();
						}


                  
					
					$size= File::size(public_path("Image/".$input_File_Folder."/".$fileName));
					/* convert in mb */					
					$file_size = number_format($size / 1048576,2);
					ob_end_clean();
					return response()->download(public_path("Image/".$input_File_Folder."/".$fileName));
             
		      /*end zip*/
    }

    /*pdf to png*/
     public function pdftopng(Request $req)
    {
            
			 $input_File_Folder;                
             $InputfileName;
			 $allfileName;

			  $input_File_Folder = Str::random(30);
              $path= public_path("Image/".$input_File_Folder);

		    	for($i=0;$i<count($req->file('file'));$i++)
		    	{

		    	 $InputfileName = Str::random(10).time().$req->file[$i]->getClientOriginalName();  
		   
		          $path=$req->file[$i]->move(public_path('Image/'.$input_File_Folder),  $InputfileName);

		    	 $imagick = new Imagick();

		        $imagick->readImage(public_path('Image/'.$input_File_Folder."/".$InputfileName));

		        $imagick->writeImages('Image/'.$input_File_Folder."/".$InputfileName.'.png', true);	
				$allfileName[]=$InputfileName; 	         

		      }

			   /* delete user input file */
			   $f=0;
			   
			   for($f=0; $f<count($allfileName); $f++ )
			   {
				File::delete(public_path("Image/".$input_File_Folder."/".$allfileName[$f]));
				
			   }

		      /*make zip file*/
               $zip = new ZipArchive;
   
                $fileName = 'pdfToPng.zip';
				
					if ($zip->open(public_path("Image/".$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
						{
							echo"if";
							$files = File::files(public_path('Image/'.$input_File_Folder."/"));
					
							foreach ($files as $key => $value) {
								$relativeNameInZipFile = basename($value);
								$zip->addFile($value, $relativeNameInZipFile);
							}
							
							$zip->close();
						}


                  
					 //Storage::size("public/Image/".$input_File_Folder."/".$fileName);
					$size= File::size(public_path("Image/".$input_File_Folder."/".$fileName));					
					$file_size = number_format($size / 1048576,2);
					ob_end_clean();
					return response()->download(public_path("Image/".$input_File_Folder."/".$fileName));
    }

     /*jpg to pdf*/
     public function jpgtopdf(Request $req)
    {
             $allfileName;
			  $input_File_Folder;                
             $InputfileName;
			 $allfileName;

			  $input_File_Folder = Str::random(30);
              $path= public_path("Image/".$input_File_Folder);

		    	for($i=0;$i<count($req->file('file'));$i++)
		    	{

		    	  $InputfileName = Str::random(10).time().$req->file[$i]->getClientOriginalName();  
		   
		          $path=$req->file[$i]->move(public_path('pdf/'.$input_File_Folder),  $InputfileName);

		    	 $imagick = new Imagick();

		        $imagick->readImage(public_path('pdf/'.$input_File_Folder."/".$InputfileName));

		        $imagick->writeImages('pdf/'.$input_File_Folder."/".$InputfileName.'.pdf', true);	
				$allfileName[]=$InputfileName; 

		      }
			
			    /* delete user input file */
			   $f=0;
			   
			   for($f=0; $f<count($allfileName); $f++ )
			   {
				File::delete(public_path("pdf/".$input_File_Folder."/".$allfileName[$f]));
				
			   }

		      /*make zip file*/
               $zip = new ZipArchive;
   
                $fileName = 'jpgTopdf.zip';
				
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

       /*jpg to pdf*/
     public function pngtopdf(Request $req)
    {
             $allfileName;
			  $input_File_Folder;                
             $InputfileName;
			 $allfileName;

			  $input_File_Folder = Str::random(30);
              $path= public_path("Image/".$input_File_Folder);

		    	for($i=0;$i<count($req->file('file'));$i++)
		    	{

		    	  $InputfileName = Str::random(10).time().$req->file[$i]->getClientOriginalName();  
		   
		          $path=$req->file[$i]->move(public_path('pdf/'.$input_File_Folder),  $InputfileName);

		    	 $imagick = new Imagick();

		        $imagick->readImage(public_path('pdf/'.$input_File_Folder."/".$InputfileName));

		        $imagick->writeImages('pdf/'.$input_File_Folder."/".$InputfileName.'.pdf', true);	
				$allfileName[]=$InputfileName; 

		      }
			
			    /* delete user input file */
			   $f=0;
			   
			   for($f=0; $f<count($allfileName); $f++ )
			   {
				File::delete(public_path("pdf/".$input_File_Folder."/".$allfileName[$f]));
				
			   }

		      /*make zip file*/
               $zip = new ZipArchive;
   
                $fileName = 'PngTopdf.zip';
				
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