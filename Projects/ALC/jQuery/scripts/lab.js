$(function(){
  var rating=-1,numofstars=5;
  
  $('div').delegate('.rating-circle','mouseenter',function () {
  $('.rating-circle').removeClass('rating-chosen');
  $(this).prevAll().addClass('rating-hover');
  $(this).addClass('rating-hover');
  });
  
  $('div').delegate('.rating-circle','click',function () {
  $(this).prevAll().addClass('rating-chosen');
  $(this).addClass('rating-chosen');
  $(this).nextAll().removeClass('rating-chosen');
  rating = $(this).index();
  });
  
  $('div').delegate('.rating-circle','mouseout',function () {
  $(this).parent().children().removeClass('rating-hover');
  $($('div.rating-circle')[rating+1]).prevAll().addClass('rating-chosen');
  });
  
  $('#update-max-value').click(function() {
  $('div.rating-circle').remove();
  numofstars = parseInt($('#max-value').val());
  if(numofstars>0){}
  else{numofstars=5};
  for (let index = 0; index < numofstars; index++) {
  $('#rating-container').prepend('<div class=rating-circle></div>');
  }
  });
  $('#update-max-value').click();
  
  $('#save-rating').click(function(){
  $('#save-rating').attr('disabled','disabled');
  var obj = {value:rating+1,maxValue:numofstars};
  //obj.value=4;
  //obj.maxValue=5;
  $.post('http://jquery-edx.azurewebsites.net/api/Rating',obj).done(function(data) {
  $('#output').text(data.message);
  $('#save-rating').removeAttr('disabled');
  })
  });
  
  });