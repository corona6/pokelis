

$(function() {

  auto_link();

  $('#new_list').on('ajax:success', function(event, data, status, xhr) {
    var text = $("#list_data").val();
    var text2 = encodeURIComponent(text);
    var well = $("<div>").attr("class", "well");
    var newlistText = $("<td>").text(text);
    var newDeleteButton = $("<a>").attr("class", "del-lid").attr("data-method", "delete").attr("data-remote", "true").attr("data-lid", data.lid).attr("href", "/lists/" + data.key + "?lid=" + data.lid);
    var delBtn = $("<button>").attr("type", "button").attr("aria-label", "Close").attr("class", "close").prepend($("<span>").attr("aria-hidden", "true").text("×"))
    $("#list").prepend(well.prepend(text).prepend(newDeleteButton.prepend(delBtn)));
    $("#list_data").val('');
    auto_link();
  }).on('ajax:error', function(event, xhr, status, error) {
    return alert(error);
  });

  $(document).on('click', '.del-lid', function(){
    $(this).parent('div').fadeOut('slow', function() {
      $(this).remove();
    });
  });

});

function auto_link() {
  $('.well').each(function(){
    $(this).html( $(this).html().replace(/((http|https|ftp):\/\/[\w?=&.\/\+-;#~%@-]+(?![\w\s?&.\/\+;#~%@"=-]*>))/g, '<a href="$1" rel="noreferrer">$1</a> ') );
  });
}
