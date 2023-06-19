<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/', [Controller::class, 'index']);
/*word conversion */
//Route::view('/{path?}', 'index');


Route::get("test",[Controller::class,"test"]);
Route::get('/{path?}', [ConvertController::class, 'index']);
Route::post('/doc-to-pdf', [ConvertController::class, 'convertDocToPDF']); 

Route::get('/upload-file', [ConvertController::class, 'upload']);

Route::get('/xlstopdfView',[ConvertController::class,'xlstopdfView']);
Route::post('/xlstopdf',[ConvertController::class,'xlstopdf']);   
/*Route::get('/xltopdf',[ConvertController::class,'xltopdf']); */

Route::get('/pptToPdf',[ConvertController::class,'pptToPdfView']);  
Route::post('/pptToPdf',[ConvertController::class,'pptToPdf']);     

Route::get('/pdfToWordView',[ConvertController::class,'pdfToWordView']);  
Route::post('/pdfToWord',[ConvertController::class,'pdfToWord']);

/*end word conversion*/

/*image conversion*/
Route::get('/jpgtopngView',[ImageController::class,'jpgtopngView']); 
Route::post('/jpgtopng',[ImageController::class,'jpgtopng']);     

Route::get('/pngtojpgView',[ImageController::class,'pngtojpgView']); 
Route::post('/pngtojpg',[ImageController::class,'pngtojpg']);

Route::get('/pdftojpgView',[ImageController::class,'pdftoimageView']);
Route::post('/pdftojpg',[ImageController::class,'pdftojpg']);  

Route::get('/pdftopngView',[ImageController::class,'pdftopngView']);
Route::post('/pdftopng',[ImageController::class,'pdftopng']);  

Route::get('/jpgtopdfView',[ImageController::class,'jpgtopdfView']);
Route::post('/jpgtopdf',[ImageController::class,'jpgtopdf']);  

Route::get('/pngtopdfView',[ImageController::class,'pngtopdfView']);
Route::post('/pngtopdf',[ImageController::class,'pngtopdf']); 

/*end image conversion route */



/*pdf conversion*/
Route::get('/mergepdf',[pdfController::class,'mergePdfView']);  
Route::post('/mergepdf',[pdfController::class,'mergepdf']);
 
Route::get('/pdfPasswordView',[pdfController::class,'pdfPasswordView']);
Route::post('/setPdfPassword',[pdfController::class,'setPdfPassword']);   

Route::get('/pdfViewer',[pdfController::class,'pdfViewer']);  
Route::post('/pdfViewerView',[pdfController::class,'pdfViewerView']);  

Route::get('/splitpdfView',[pdfController::class,'splitpdfView']);  
Route::post('/splitpdf',[pdfController::class,'splitpdf']);    

Route::get('/rotatePdfView',[pdfController::class,'rotatePdfView']);  
Route::post('/rotatePdf',[pdfController::class,'rotatePdf']);    

Route::get('/printToPdfView',[pdfController::class,'printToPdfView']);  
Route::post('/printToPdfView',[pdfController::class,'printToPdf']);   

Route::get('/compressPDFView',[pdfController::class,'compressPDFView']);  
Route::post('/compressPDFView',[pdfController::class,'compressPDF']);     

Route::get('/extractPageView',[pdfController::class,'extractPageView']);  
Route::post('/extractPage',[pdfController::class,'extractPage']);


 
