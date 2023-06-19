<!DOCTYPE html>
<html>
<head>
	<title>File Converter</title>

	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- bootstrap css -->
	<link rel="stylesheet"  href="{{asset('bootstrap/css/bootstrap.css')}}">
	<!-- custom css -->
	<link rel="stylesheet"  href="{{asset('custom-css/style.css')}}">

	 

 <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js" integrity="sha512-pumBsjNRGGqkPzKHndZMaAG+bir374sORyzM3uulLV14lN5LyykqNk8eEeUlUkB3U0M4FApyaHraT65ihJhDpQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.9.3/dropzone.min.js" integrity="sha512-U2WE1ktpMTuRBPoCFDzomoIorbOyUv0sP8B+INA3EzNAhehbzED1rOJg6bCqPf/Tuposxb5ja/MAUnC8THSbLQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<!-- pdfjs cdn -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.5.141/pdf.min.js" integrity="sha512-BagCUdQjQ2Ncd42n5GGuXQn1qwkHL2jCSkxN5+ot9076d5wAI8bcciSooQaI3OG3YLj6L97dKAFaRvhSXVO0/Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

</head>
<body>
	<div class=" text-center header">
		<h1>File Converter</h1>

	
	<div class="container" style="margin-top:65px;" >
		<!-- tab -->
		<div class="row">
			<div class="col col-md-2">
				<a href="/" class="btn btn-success">Word To Pdf</a>
			</div>
			<div class="col col-md-2">
				<a href="/xlstopdfView" class="btn btn-success">excel To Pdf</a>
			</div>
			<div class="col col-md-2">
				<a href="/pptToPdf" class="btn btn-success">PowerPoint To Pdf</a>
			</div>
			<div class="col col-md-2">
				<a href="/printToPdfView" class="btn btn-success">print to pdf</a>
			</div>
			
			<div class="col col-md-2">
				<a href="/pdfToWordView" class="btn btn-success">pdf to word</a>
			</div>
			<div class="col col-md-2">
				<a href="/pdftojpgView" class="btn btn-success">pdf to JPG</a>
			</div>
			<div class="col col-md-2">
				<a href="/pdftopngView" class="btn btn-success">pdf to png</a>
			</div>
			<div class="col col-md-2">
				<a href="/mergepdf" class="btn btn-success">merge pdf</a>      
			</div>
			<div class="col col-md-2">
				<a href="/splitpdfView" class="btn btn-success">Split pdf</a>  
			</div>

			<div class="col col-md-2">
				<a href="/rotatePdfView" class="btn btn-success">rotate Pdf</a>    
			</div>
			<div class="col col-md-2">
				<a href="/pdfPasswordView" class="btn btn-success">Protect Pdf</a>    
			</div>
			<div class="col col-md-2">
				<a href="/compressPDFView" class="btn btn-success">pdf Compress</a>    
			</div>  
			
			<div class="col col-md-2">
				<a href="/extractPageView" class="btn btn-success">Extract Pdf Page</a>    
			</div> 

			<div class="col col-md-2">
				<a href="/jpgtopngView" class="btn btn-success">jpg to png</a>
			</div>
			<div class="col col-md-2">
				<a href="/pngtojpgView" class="btn btn-success">png to jpg</a>
			</div>
			
			<div class="col col-md-2">
				 <a href="/jpgtopdfView" class="btn btn-success">jpg to pdf</a>
			</div>
			<div class="col col-md-2">
				 <a href="/pngtopdfView" class="btn btn-success">png to pdf</a>
			</div>

		</div>

	</div>

</div>
      

