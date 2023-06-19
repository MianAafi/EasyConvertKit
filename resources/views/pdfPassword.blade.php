@include('header')
   <div class="container mt-5">
      	<div class="row text-center">
      		<h3>Set PDF Password</h3>
      		 @error('file')
      			<span class="text-danger">{{$message}}</span>
      			@enderror
      		<div class="col-12 d-flex justify-content-center">
      			
      			<!-- form -->
      			<form action="{{url('setPdfPassword')}}" method="post"  class="dropzone fileForm" id="my-awesome-dropzone" enctype='multipart/form-data' style="margin-top: 50px;">
                          @csrf

                          <div class="mb-3 d-flex justify-content-between" style="position: absolute; top:-50px; width: 100%;"> 
                          <label>Enter Password</label>
                         <input type="text" name="Password" class="form-control" style="width: 155px" >
                         </div>

                         <input type="file" name="file[]" multiple>
				     
				      <button class="btn btn-success upload-btn">Upload</button>
				      	
                 </form>
      		</div>      		
      	</div>
      </div>
      @include('footer')