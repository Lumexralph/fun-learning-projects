$.ajaxSetup({
  xhrFields: { withCredentials: true },
  error: (xhr, status, error) => {
    $('.alert').removeClass('hidden');
    $('.alert').html(`Status: ${status}`, `error: ${error}`);
  }
});

// helper function for event handler
const findTr = (event) => {
  const target = event.srcElement || event.target;
  const $target = $(target);
  const $tr = $target.parents('tr');
  return $tr;
};

// event handlers to remove, publish and unpublish an article
// remove event handler that sends request to the 
// API route /api/articles/:id

const remove = (event) => {
  const $tr = findTr(event);
  const id = $tr.data('id');
  $.ajax({
    url: `/api/articles/${id}`,
    type: 'DELETE',
    success: (data, status, xhr) => {
      $('.alert').addClass('hidden');
      $tr.remove();
    }
  });
};

// publish and unpublish  an article
// both send PUT to the api route
// /api/articles/:id

const update = (event) => {
  const $tr = findTr(event);
  $tr.find('button').attr('disabled', 'disabled');
  const data = {
    published: $tr.hasClass('unpublished')
  };
  const id = $tr.attr('data-id');
  $.ajax({
    url: `/api/articles/${id}`,
    type: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify({ article: data }),
    success: (dataResponse, status, xhr) => {
      $tr.find('button').removeAttr('disabled');
      $('.alert').addClass('hidden');
      if (data.published) {
        $tr.removeClass('unpublished').find('.glyphicon-play')
          .removeClass('glyphicon-play')
          .addClass('glyphicon-pause');
      } else {
        $tr.addClass('unpublished')
          .find('.glyphicon-pause')
          .removeClass('glyphicon-pause')
          .addClass('glyphicon-play');
      }
    }
  });
};

// add event listener
$(document).ready(() => {
  const $element = $('.admin tbody');
  $element.on('click', 'button.remove', remove);
  $element.on('click', 'button', update);
});
