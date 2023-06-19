<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ControllerApiimage;   
use App\Http\Controllers\ControllerApiOffice;  
use App\Http\Controllers\ControllerApiPdf;
use App\Http\Controllers\ApiDownloadUrlFile;
use App\Http\Controllers\newsLetterSubscribeControllerApi;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
 

/*office conversion */
Route::post('/doc-to-pdf', [ControllerApiOffice::class, 'convertDocToPDF']); 

Route::post('/xlstopdf', [ControllerApiOffice::class, 'xlstopdf']);
 
Route::post('/pptToPdf',[ControllerApiOffice::class,'pptToPdf']);

Route::post('/pdfToWord',[ControllerApiOffice::class,'pdfToWord']);

/*end word conversion*/

/*image conversion*/
Route::post('/jpgtopng',[ControllerApiimage::class,'jpgtopng']);     


Route::post('/pngtojpg',[ControllerApiimage::class,'pngtojpg']);

Route::post('/pdftojpg',[ControllerApiimage::class,'pdftojpg']);  

Route::post('/pdftopng',[ControllerApiimage::class,'pdftopng']);  

Route::post('/jpgtopdf',[ControllerApiimage::class,'jpgtopdf']);  

Route::post('/pngtopdf',[ControllerApiimage::class,'pngtopdf']);

Route::post('/officeToImage', [ControllerApiimage::class, 'officeToImage']);

/*end image conversion route */

/*image to pdf*/ 
Route::get('/ImagtoPdf',[ApiConvertController::class,'imagetoPdf']);

/* pdf*/
 
Route::post('/mergepdf',[ControllerApiPdf::class,'mergepdf']);

Route::post('/rotatePdf',[ControllerApiPdf::class,'rotatePdf']);  

Route::post('/splitpdf',[ControllerApiPdf::class,'splitpdf']);

Route::post('/setPdfPassword',[ControllerApiPdf::class,'setPdfPassword']);

Route::post('/printToPdfView',[ControllerApiPdf::class,'printToPdf']);

Route::post('/extractPage',[ControllerApiPdf::class,'extractPage']);

/* google drive and dropbox link */

Route::post('/googleDrive', [ApiDownloadUrlFile::class, 'googleDrive']);
Route::post('/dropBox', [ApiDownloadUrlFile::class, 'dropBox']);
/* subscribe email  */
Route::post('/newsLetter', [newsLetterSubscribeControllerApi::class, 'news_letter']);