<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Image;
use ZipArchive;
use File;
use Imagick;
use Storage;
use Illuminate\Support\Str;

class ControllerApiimage extends Controller
{

  public function jpgtopng(Request $req)
{
		$input_File_Folder;                
        $InputfileName;
		$allfileName=array();
		$size=false;

	 
		$fileFormet=$req->input("formet");  //which formet file convert get it into variable
		$input_File_Folder = Str::random(30).time();
        $path= storage_path('app/public/allfiles/'.$input_File_Folder);
		
		if (!File::isDirectory($path)) {
			File::makeDirectory($path, 0777, true, true);
		}  

		if($req->file)
		{
		    	for($i=0;$i<count($req->file('file'));$i++)
		    	{
				     if($req->file[$i]->getSize()<= 10000000)
					 {
		    	       $InputfileName =$req->file[$i]->getClientOriginalName(); 		   
		               $path=$req->file[$i]->move(storage_path('app/public/allfiles/'.$input_File_Folder),  $InputfileName);		    	  
				       $allfileName[]=$InputfileName; 					  
					   $size = true;
					 }
		        }			
		}

		/* move file which is coming from dropbox and google drive */
		$i = 0;
		if ($req->path) {
			foreach ($req->path as $value) {
              
			    $filename = str_replace(' ', '', $req->name[$i]);  	
				File::move(storage_path('app/public/allfiles/' . $value), storage_path('app/public/allfiles/' . $input_File_Folder . "/" .$filename));
				$allfileName[] = $filename;
				$i++;
				$size = true;
			}
		}
		/* convert image */

		

		foreach($allfileName as $value)
		{
			
			$imagick = new Imagick(); 

			$imageName= substr($value, 0, strrpos($value, ".")); //remove extension from image so we save imgae with new ext
			$imagick->setResolution(300, 300);			
			$imagick->readImage(storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $value));			
			$imagick->writeImages(storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $imageName . $fileFormet), true);	

		}
		
		/* delete user input file */
			   $f=0;
			   
			   for($f=0; $f<count($allfileName); $f++ )
			   {
					File::delete(storage_path('app/public/allfiles/'.$input_File_Folder."/".$allfileName[$f]));
				
			   }

		           /*make zip file*/
                    $zip = new ZipArchive;   
                    $fileName = 'fileConverted.zip';
				
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
				   $file_size=null;
				   $downloadUrl=null;
				   if($size)
				   {
				   	$size= File::size(storage_path('app/public/allfiles/'.$input_File_Folder."/".$fileName));
					/* convert in mb */					
					$file_size = number_format($size / 1048576,2);
		         	$downloadUrl = "storage/allfiles/" . $input_File_Folder . "/" . $fileName;
				   }
					
					
					return response()->json(["url"=>$downloadUrl ,"size"=>$file_size,"fileName" => $fileName]);
}

 /*function png to jpg*/
     public function pngtojpg(Request $req){
            
		      $allfileName;
			  $input_File_Folder;                
              $InputfileName;

			  $input_File_Folder = Str::random(30).time();
              $path= storage_path('app/public/allFiles/'.$input_File_Folder);
				if (!File::isDirectory($path)) {
					File::makeDirectory($path, 0777, true, true);
				}  

            if($req->file)
			{
				for($i=0;$i<count($req->file('file'));$i++)
		    	{

		    	  $InputfileName = $req->file[$i]->getClientOriginalName(); 	   
		          $path=$req->file[$i]->move(storage_path('app/public/allFiles/'.$input_File_Folder),  $InputfileName);
				  $allfileName[]=$InputfileName; 

		         }
			}
		/* move file which is coming from dropbox and google drive */
		   $i = 0;
		if ($req->path) {
			foreach ($req->path as $value) {
				
				File::move(storage_path('app/public/allfiles/' . $value), storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $req->name[$i]));
				$allfileName[] = $req->name[$i];
				$i++;
			}
		}
		
		/* convert image */
		foreach ($allfileName as $value) 
		{

			$imagick = new Imagick();

			$imageName = substr($value, 0, strrpos($value, ".")); //remove extension from image so we save imgae with new ext			
			$imagick->readImage(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $value));
			$imagick->writeImages(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $imageName .".jpg"), true);
		}
			    /* delete user input file */
			   $f=0;
			   
			   for($f=0; $f<count($allfileName); $f++ )
			   {
					File::delete(storage_path('app/public/allFiles/'.$input_File_Folder."/".$allfileName[$f]));
				
			   }

		      /*make zip file*/
                $zip = new ZipArchive;   
                $fileName = 'PNGTojpg.zip';
				
					if ($zip->open(storage_path('app/public/allFiles/'.$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
						{
							
							$files = File::files(storage_path('app/public/allFiles/'.$input_File_Folder."/"));
					
							foreach ($files as $key => $value) {
								$relativeNameInZipFile = basename($value);
								$zip->addFile($value, $relativeNameInZipFile);
							}
							
							$zip->close();
						}
				
		            /*end zip*/
			  		$size= File::size(storage_path('app/public/allFiles/'.$input_File_Folder."/".$fileName));
					/* convert in mb */					
					$file_size = number_format($size / 1048576,2);

					$downloadUrl="storage/allFiles/".$input_File_Folder."/".$fileName;
					return response()->json(["url"=>$downloadUrl ,"size"=>$file_size, "fileName" => $fileName]);

}

 /*end function*/

/*pdf to image converter*/
    public function pdftojpg(Request $req)
    {
            
			  $input_File_Folder;                
              $InputfileName;
			  $allfileName;

			  $input_File_Folder = Str::random(30).time();
		      $path =storage_path('app/public/allFiles/'.$input_File_Folder);

			  if (!File::isDirectory($path)) {
					File::makeDirectory($path, 0777, true, true);
				}  
			  if($req->file)
			  {
		    	for($i=0;$i<count($req->file('file'));$i++)
		    	{
		    	 $InputfileName = $req->file[$i]->getClientOriginalName(); 		   
		         $req->file[$i]->move(storage_path('app/public/allFiles/'.$input_File_Folder),  $InputfileName);	
				 $allfileName[]=$InputfileName;         

		        }
			 }

		/* move file which is coming from dropbox and google drive */
		$i = 0;
		if ($req->path) {
			foreach ($req->path as $value) {
				
				File::move(storage_path('app/public/allfiles/' . $value), storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $req->name[$i]));
				$allfileName[] = $req->name[$i];
				$i++;
			}
		}
		/* convert image */

		foreach ($allfileName as $value) {

			$imagick = new Imagick();
			$imageName = substr($value, 0, strrpos($value, "."));
			$imagick->setResolution(300, 300);
			$imagick->readImage(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $value));
			$imagick->writeImages(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $imageName . ".jpg"), true);
		}
		       /* delete user input file */
			   $f=0;
			   
			   for($f=0; $f<count($allfileName); $f++ )
			   {
					File::delete(storage_path('app/public/allFiles/'.$input_File_Folder."/".$allfileName[$f]));
				
			   }
		        /*make zip file*/
                $zip = new ZipArchive;   
                $fileName = 'pdfTojpg.zip';
				
					if ($zip->open(storage_path('app/public/allFiles/'.$input_File_Folder."/".$fileName), ZipArchive::CREATE) === TRUE)
						{
							
							$files = File::files(storage_path('app/public/allFiles/'.$input_File_Folder."/"));					
							foreach ($files as $key => $value) {
								$relativeNameInZipFile = basename($value);
								$zip->addFile($value, $relativeNameInZipFile);
							}
							
							$zip->close();
						}
					
					$size= File::size(storage_path('app/public/allFiles/'.$input_File_Folder."/".$fileName));
					/* convert in mb */					
					$file_size = number_format($size / 1048576,2);
					$downloadUrl="storage/allFiles/".$input_File_Folder."/".$fileName;
					return response()->json(["url"=>$downloadUrl ,"size"=>$file_size, "fileName" => $fileName]);
             
		      /*end zip*/
    }

    /*pdf to png*/
     public function pdftopng(Request $req)
    {

		$input_File_Folder;
		$InputfileName;
		$allfileName;

		$input_File_Folder = Str::random(30) . time();
		$path = storage_path('app/public/allFiles/' . $input_File_Folder);

		if (!File::isDirectory($path)) {
			File::makeDirectory($path, 0777, true, true);
		}
		if ($req->file) {
			for ($i = 0; $i < count($req->file('file')); $i++) {
				$InputfileName = $req->file[$i]->getClientOriginalName();
				$req->file[$i]->move(storage_path('app/public/allFiles/' . $input_File_Folder),  $InputfileName);
				$allfileName[] = $InputfileName;
			}
		}

		/* move file which is coming from dropbox and google drive */
		$i = 0;
		if ($req->path) {
			foreach ($req->path as $value) {
				
				File::move(storage_path('app/public/allfiles/' . $value), storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $req->name[$i]));
				$allfileName[] = $req->name[$i];
				$i++;
			}
		}
		/* convert image */

		foreach ($allfileName as $value) {

			$imagick = new Imagick();
			$imageName = substr($value, 0, strrpos($value, "."));
			$imagick->setResolution(300, 300);
			$imagick->readImage(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $value));
			$imagick->writeImages(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $imageName . ".png"), true);
		}
		/* delete user input file */
		$f = 0;

		for ($f = 0; $f < count($allfileName); $f++) {
			File::delete(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $allfileName[$f]));
		}
		/*make zip file*/
		$zip = new ZipArchive;
		$fileName = 'pdfTojpg.zip';

		if ($zip->open(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $fileName), ZipArchive::CREATE) === TRUE) {

			$files = File::files(storage_path('app/public/allFiles/' . $input_File_Folder . "/"));
			foreach ($files as $key => $value) {
				$relativeNameInZipFile = basename($value);
				$zip->addFile($value, $relativeNameInZipFile);
			}

			$zip->close();
		}

		$size = File::size(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $fileName));
		/* convert in mb */
		$file_size = number_format($size / 1048576, 2);
		$downloadUrl = "storage/allFiles/" . $input_File_Folder . "/" . $fileName;
		return response()->json(["url" => $downloadUrl, "size" => $file_size, "fileName" => $fileName]);
    }

/*jpg to pdf*/
     public function jpgtopdf(Request $req)
    {
		$input_File_Folder;
		$InputfileName;
		$allfileName;

		$input_File_Folder = Str::random(30) . time();
		$path = storage_path('app/public/allFiles/' . $input_File_Folder);

		if (!File::isDirectory($path)) {
			File::makeDirectory($path, 0777, true, true);
		}
		if ($req->file) {
			for ($i = 0; $i < count($req->file('file')); $i++) {
				$InputfileName = $req->file[$i]->getClientOriginalName();
				$req->file[$i]->move(storage_path('app/public/allFiles/' . $input_File_Folder),  $InputfileName);
				$allfileName[] = $InputfileName;
			}
		}

		/* move file which is coming from dropbox and google drive */
		$i = 0;
		if ($req->path) {
			foreach ($req->path as $value) {
				
				File::move(storage_path('app/public/allfiles/' . $value), storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $req->name[$i]));
				$allfileName[] = $req->name[$i];
				$i++;
			}
		}
		/* convert image */

		foreach ($allfileName as $value) {

			$imagick = new Imagick();
			$imageName = substr($value, 0, strrpos($value, "."));
			$imagick->setResolution(300, 300);
			$imagick->readImage(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $value));
			$imagick->writeImages(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $imageName . ".pdf"), true);
		}
		/* delete user input file */
		$f = 0;

		for ($f = 0; $f < count($allfileName); $f++) {
			File::delete(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $allfileName[$f]));
		}
		/*make zip file*/
		$zip = new ZipArchive;
		$fileName = 'pdfTojpg.zip';

		if ($zip->open(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $fileName), ZipArchive::CREATE) === TRUE) {

			$files = File::files(storage_path('app/public/allFiles/' . $input_File_Folder . "/"));
			foreach ($files as $key => $value) {
				$relativeNameInZipFile = basename($value);
				$zip->addFile($value, $relativeNameInZipFile);
			}

			$zip->close();
		}

		$size = File::size(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $fileName));
		/* convert in mb */
		$file_size = number_format($size / 1048576, 2);
		$downloadUrl = "storage/allFiles/" . $input_File_Folder . "/" . $fileName;
		return response()->json(["url" => $downloadUrl, "size" => $file_size, "fileName" => $fileName]);
    }

       /*jpg to pdf*/
     public function pngtopdf(Request $req)
    {
		$input_File_Folder;
		$InputfileName;
		$allfileName;

		$input_File_Folder = Str::random(30) . time();
		$path = storage_path('app/public/allFiles/' . $input_File_Folder);

		if (!File::isDirectory($path)) {
			File::makeDirectory($path, 0777, true, true);
		}
		if ($req->file) {
			for ($i = 0; $i < count($req->file('file')); $i++) {
				$InputfileName = $req->file[$i]->getClientOriginalName();
				$req->file[$i]->move(storage_path('app/public/allFiles/' . $input_File_Folder),  $InputfileName);
				$allfileName[] = $InputfileName;
			}
		}

		/* move file which is coming from dropbox and google drive */
		$i = 0;
		if ($req->path) {
			foreach ($req->path as $value) {
				
				File::move(storage_path('app/public/allfiles/' . $value), storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $req->name[$i]));
				$allfileName[] = $req->name[$i];
				$i++;
			}
		}
		/* convert image */

		foreach ($allfileName as $value) {

			$imagick = new Imagick();
			$imageName = substr($value, 0, strrpos($value, "."));
			$imagick->setResolution(300, 300);
			$imagick->readImage(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $value));
			$imagick->writeImages(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $imageName . ".pdf"), true);
		}
		/* delete user input file */
		$f = 0;

		for ($f = 0; $f < count($allfileName); $f++) {
			File::delete(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $allfileName[$f]));
		}
		/*make zip file*/
		$zip = new ZipArchive;
		$fileName = 'pdfTojpg.zip';

		if ($zip->open(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $fileName), ZipArchive::CREATE) === TRUE) {

			$files = File::files(storage_path('app/public/allFiles/' . $input_File_Folder . "/"));
			foreach ($files as $key => $value) {
				$relativeNameInZipFile = basename($value);
				$zip->addFile($value, $relativeNameInZipFile);
			}

			$zip->close();
		}

		$size = File::size(storage_path('app/public/allFiles/' . $input_File_Folder . "/" . $fileName));
		/* convert in mb */
		$file_size = number_format($size / 1048576, 2);
		$downloadUrl = "storage/allFiles/" . $input_File_Folder . "/" . $fileName;
		return response()->json(["url" => $downloadUrl, "size" => $file_size, "fileName" => $fileName]);
    
	}

	/* word to jpg converter */
	public function officeToImage(Request $req)
	{

		$countFile = array();
		$input_File_Folder = Str::random(20).time();
		$size = false; 
		$path = storage_path('app/public/allfiles/' . $input_File_Folder);
		/* which formet file convert get it into variable */
		$fileFormet = $req->input('formet');

		if (!File::isDirectory($path)) {
			File::makeDirectory($path, 0777, true, true);
		} 
		
		if($req->file)
		{

			for ($i = 0; $i < count($req->file('file')); $i++) {

				if ($req->file[$i]->getSize() <= 10000000) 
				{

					$ext = $req->file[$i]->getClientOriginalExtension();
					$fileName = time() . "." . $ext;
					$req->file[$i]->move(storage_path('app/public/allfiles/' . $input_File_Folder), $fileName);
					$countFile[] = $fileName;		
					$size=true;	
				}		
			}

	    }

		/* move file which is coming from dropbox and google drive */
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

		foreach($countFile as $fileName)
		{
			$file_extension = preg_replace('/^.*\.([^.]+)$/D', '$1', $fileName);
			/* convert from office to pdf */
          if($file_extension!=".pdf" && $file_extension!=".pdf")
            {
			  $cmd = "cd " . $path . ' && soffice --convert-to pdf '.$fileName;
			  exec($cmd, $output, $status_code);   
             }

			$get_pdf_fileName = str_replace($file_extension, "pdf", $fileName);
			/* put pdf file in arrary to delete after file convert */
			$countFile[] = $get_pdf_fileName;
			/* make output file name */
			$outputFileName = str_replace("." . $file_extension, "", $fileName);

			/* convert from pdf to image */
			$imagick = new Imagick();
			$imagick->setResolution(200, 200);
			$imagick->readImage(storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $get_pdf_fileName));
			$imagick->writeImages(storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $outputFileName . $fileFormet), true);	

		}

	
			for ($i = 0; $i < count($countFile); $i++) {

				File::delete(storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $countFile[$i]));
			} 
		
		/*make zip file*/
		$zip = new ZipArchive;
		$fileName = 'officeToImage.zip';

		if ($zip->open(storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $fileName), ZipArchive::CREATE) === TRUE) {
			$files = File::files(storage_path('app/public/allfiles/' . $input_File_Folder));

			foreach ($files as $key => $value) {
				$relativeNameInZipFile = basename($value);
				$zip->addFile($value, $relativeNameInZipFile);
			}
			$zip->close();
		}
		/*end zip*/
		$file_size = null;
		$downloadurl = null;
		if ($size) {
		   $downloadurl = "storage/allfiles/" . $input_File_Folder . "/" . $fileName;
		   $size = File::size(storage_path('app/public/allfiles/' . $input_File_Folder . "/" . $fileName));
		/* convert in mb */
		   $file_size = number_format($size / 1048576, 2);
		}
		return response()->json(["url" => $downloadurl, "size" => $file_size, "fileName" => $fileName], 200);
}


}
