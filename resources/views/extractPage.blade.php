@include('header')
   <div class="container mt-5">
      	<div class="row text-center">
      		<h3>Extract PDF Page</h3>
      		 @error('file')
      			<span class="text-danger">{{$message}}</span>
      			@enderror
      		<div class="col-12 d-flex justify-content-center">
      			
      			<!-- form -->
      			<form action="{{url('/extractPage')}}" method="post"  class="dropzone fileForm" id="my-awesome-dropzone" enctype='multipart/form-data' style="margin-top: 50px;">
                          @csrf
                         
                         <input type="file" name="file[]" multiple>
				     
				      <button class="btn btn-success upload-btn">Upload</button>

                       <div class="mb-3 d-flex justify-content-between" style="position: absolute; top:-50px; width: 100%;"> 
                          <label>Enter Page Number</label>
                         <input type="text" name="pageNumber" class="form-control" style="width: 155px" >
                         </div>

				      	
                 </form>
      		</div>      		
      	</div>
      </div>
 @include('footer')