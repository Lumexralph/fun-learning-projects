//creating date for footer
var today = new Date();
var year = today.getUTCFullYear();

$(function() {
  var $searchText, urlAPI;

  function emptySearch() { //empties the dom for a new search
    $('#displayData').empty();
  }

  function onSearch(word) { //does the search of content 

    urlAPI = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + word + '&limit=20';

    $.ajax({
      url: urlAPI,
      dataType: 'jsonp',
      success: function(data) {

        var resultLink = data[data.length - 1]; //collects the links in index order

        for (var i = 0; i < data[1].length; i++) { //loops through the data
          var output = '';
          for (var j = 1; j < data.length; j++) {
            output += data[j][i] + '<br>';

          };
          //console.log(output);
          $('#displayData').append('<b><a target =_blank href =' + resultLink[i] + '><div id=result class = list-group-item>' + output + '</div></a></b><br>');
        };
      }

    });

  }

  //on click and keyboard press event handler
  $('button').click(function(event) {

    $searchText = $('#inputText').val();
     if ($searchText !== '') {
        emptySearch();
        onSearch($searchText);
      } else {
        $('#displayData').html('<div class="alert alert-danger" role=alert><b>No word!</b> There is no word to search for!</div>');
      }
  });

  $('#inputText').keydown(function(event) {

    $searchText = $('#inputText').val();
    if (event.which === 13) {
      if ($searchText !== '') {
        emptySearch();
        onSearch($searchText);
      } else {
        $('#displayData').html('<div class="alert alert-danger" role=alert><b>No word!</b> There is no word to search for!</div>');
      }
    }
  });

  //working on footer date
  $('footer').append('<p><b>COPYRIGHT &copy ' + year + '</b></p>')
});