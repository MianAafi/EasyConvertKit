@include('header')
<h1>pdf viewer</h1>

<input type="hidden" name="pdfName" value="{{$userFile}}">

<div class="container">
	<div class="row">
		<div class="col-12">
			<div class="pdfViewer">
			</div>
		</div>
	</div>
</div>

    <div class="top-bar">
      <button class="btn" id="prev-page">
        <i class="fas fa-arrow-circle-left"></i> Prev Page
      </button>
      <button class="btn" id="next-page">
        Next Page <i class="fas fa-arrow-circle-right"></i>
      </button>
      <span class="page-info">
        Page <span id="page-num"></span> of <span id="page-count"></span>
      </span>
    </div>

    <canvas id="pdf-render"></canvas>



@include('footer')

