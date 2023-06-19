@include('header')
   <div class="container mt-5">
      	<div class="row text-center">
      		<h3>Compress PDF</h3>
      		 @error('file')
      			<span class="text-danger">{{$message}}</span>
      			@enderror
      		<div class="col-12 d-flex justify-content-center">
      			
      			<!-- form -->
      			<form action="{{url('/compressPDFView')}}" method="post"  class="dropzone fileForm" id="my-awesome-dropzone" enctype='multipart/form-data'>
                          @csrf
                         
                         <input type="file" name="file[]" multiple>
				     
				      <button class="btn btn-success upload-btn">Upload</button>
				      	
                 </form>
      		</div>      		
      	</div>
      </div>
      @include('footer')