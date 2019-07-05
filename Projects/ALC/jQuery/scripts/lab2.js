$(function(){ 
  $('#save-rating').click(function () {
  //object to upload
  var selectedCircles = $('.rating-chosen').length;
  var maxNumOfCircles = $('.rating-circle').length;
  var rate = { value: selectedCircles, maxValue: maxNumOfCircles };
  
  //Call to POST verb
  $.post('http://jquery-edx.azurewebsites.net/api/Rating',rate,function (data){
  // success event handler
  
  $('#output').text(data.message);
  // parameter contains value returned by server
  
  });
  
  });
  
  $('#update-max-value').click(function(){ 
  $("#rating-container").empty();
  var number = $('input#max-value').val();
  var i = 0; 
  for(i=0;i<number;i++){
  $('#rating-container').append('<div class="rating-circle"></div>');
  } 
  });
  
  $('div').delegate('.rating-circle','mouseenter',function(){
  $(this).removeClass('rating-chosen');
  $(this).prevAll().removeClass('rating-chosen'); 
  $(this).addClass('rating-hover');
  $(this).prevAll().addClass('rating-hover');
  })
  
  $('div').delegate('.rating-circle','mouseleave',function(){
  $(this).removeClass('rating-hover');
  $(this).prevAll().removeClass('rating-hover');
  })
  
  $('div').delegate('.rating-circle','click',function(){
  $(this).addClass('rating-chosen');
  $(this).prevAll().addClass('rating-chosen');
  })
  
  });