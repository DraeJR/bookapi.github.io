$(document).ready(function(){
  
  $("#books").on("submit", function(e){
    
    
    
    var searchB = $("#search").val();
      
       
      
      
      
      fetchBooks(searchB)
      
     
      e.preventDefault();
     
      
  }); 
   
    
    
 
 
    function fetchBooks(searchB){
    
        console.log(searchB);
        
      
        
       $("#p").html(searchB);
        
        $.ajax({
            
            method: "GET",
           
            
            url: "https://www.googleapis.com/books/v1/volumes?q=search+" + searchB ,
           
            dataType: "json"
           
           
        }).done(function(data){
            
            console.log(data);
           
     // look up data.response in the movies js file       
          if(searchB == "") {
              $("#alert").css('display','block');
              
          }
            
           else{
              
               $("#alert").css('display','none');
               
           } 
         
       //that next bit is about getting the placeholder image for items that don't have an image  
           
          var arrayOfBooks = data.items;
          var placeholder= " "; 
         
            
            
            //console.log("this " + arrayOfBooks);
  
            
$.each(arrayOfBooks, function(index,book){
  var id = book.id;
  var singlebook = book.selflink;
  var BOOK = book.volumeInfo;
    
    
    
    
    //console.log("this is id " + id);
    //console.log("this is volume info " + BOOK);
  
    //this doesnt work yet
    if(BOOK.imageLinks.thumbnail  == "undefined"){
            console.log("not there");
         
        //book.Poster = "img/poster1.jpg";
        BOOK.imageLinks.thumbnail = "img/poster1.jpg";
     }
    
    
     
          placeholder +=   `<a onclick="bookDetails('${id}')" > <div class="row d-inline-block"> <div class="container2 m-auto" data-toggle="modal" data-target=".m1">
        <img src="${BOOK.imageLinks.thumbnail}" class=" poster m-3">
         <div class="overlay  m-3">
    <div class="text">View Preview</div>
  </div>
                   
    </div></div></a>`;
    $("#mList").html(placeholder);
       
    

  
});
  
    
      
            
        });
       
    };
   
    
}); //doc ready thing


//i thinl the id is the book id 
//this replaces book details
function bookDetails(id){
     console.log("This is my clicked BOOK: " + id);
    
     $.ajax({
             
            method: "GET",
     //trying to find the correct link to       
            url: "https://www.googleapis.com/books/v1/volumes/"+id ,
          
            dataType: "json"
           
           
        }).done(function(result){
            console.log(result);
    
   //title is result.volumeInfo.title
         
           var details = " ";
           var bookImage = result.selfLink.imageLinks
         
     details = `

<div class="row">
<div class="col-lg m-auto p-5 text-center">
<img src="${result.volumeInfo.imageLinks.thumbnail}" class="poster2">
</div>



<div class="col-lg m-auto p-3">
<ul>


    <li><i class="fas fa-bookmark m-2 icon"></i> <span class="modlist">Title:</span> ${result.volumeInfo.title}</li><br>

     <li><i class="fas fa-star m-2 icon"></i><span class="modlist">Author:</span> ${result.volumeInfo.authors}</li><br> 

     <li><i class="fab fa-readme m-2 icon"></i><span class="modlist"> Average Rating: </span> ${result.volumeInfo.averageRating}</li><br> 

     <li><i class="fas fa-theater-masks m-2 icon"></i> <span class="modlist">Genre: </span>${result.volumeInfo.categories}</li><br>

    <li><i class="fas fa-book-reader m-2 icon"></i> <span class="modlist"> Maturity Rating: </span> ${result.volumeInfo.maturityRating}</li><br>

     <li><i class="fas fa-file-alt m-2 icon"></i><span class="modlist">Page Count: </span> ${result.volumeInfo.pageCount}</li><br> 
 

    </ul>
</div>
</div

<div class="row p-5 m-5">
     </i><span class="modlist p-5"><h5 class="text-center">Description: </h5> </span>${result.volumeInfo.description}<br> 
        

</div>

`
   
     $("#mDetails").html(details);    
   
    
});










/*




function bookDetails(id){
    
    console.log("This is my clicked BOOK: " + id);
   
    $.ajax({
             
            method: "GET",
     //trying to find the correct link to       
            url: "https://www.googleapis.com/books/v1/volumes?q=search+" + id ,
          
            dataType: "json"
           
           
        }).done(function(result){
            console.log(result);
     
        
    var details = " ";
    
     details = `

<div class="row">
<div class="col-lg m-auto p-5 text-center">
<img src="${result.thumbnail}">
</div>



<div class="col-lg m-auto p-3">
<ul>


    <li><i class="fas fa-film m-2 icon2"></i> <span class="modlist">Title:</span> ${result.Title}</li><br>

     <li><i class="fas fa-star m-2 icon2"></i><span class="modlist">Rating:</span> ${result.Rated}</li><br> 

     <li><i class="fas fa-book m-2 icon2"></i><span class="modlist"> Plot: </span> ${result.Plot}</li><br> 

     <li><i class="fas fa-theater-masks m-2 icon2"></i> <span class="modlist">Actors: </span>${result.Actors}</li><br>

    <li><i class="fas fa-video m-2 icon2 "></i></i> <span class="modlist">Director: </span> ${result.Director}</li><br>

     <li><i class='far fa-calendar-alt m-2 icon'></i> <span class="modlist">Release Date: </span> ${result.Released}</li><br> 

     <li><i class="fas fa-trophy m-2 icon2"></i></i><span class="modlist">Awards: </span>${result.Awards}</li><br> 
        

    </ul>
</div>
</div

`
   
     $("#mDetails").html(details);    
   
    });
    
    
 
*/   
   
    
}; 



