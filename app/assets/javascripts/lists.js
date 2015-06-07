
$(function() {
  $('#new_list').on('ajax:success', function(event, data, status, xhr) {
    var text = $("#list_data").val();
    var text2 = encodeURIComponent(text);
    var well = $("<div>").attr("class", "well");
    var newlistText = $("<td>").text(text);
    var newDeleteButton = $("<a>").attr("class", "del-lid").attr("data-method", "delete").attr("data-remote", "true").attr("data-lid", data.lid).attr("href", "/lists/" + data.key + "?lid=" + data.lid);
    var delBtn = $("<button>").attr("type", "button").attr("aria-label", "Close").attr("class", "close").prepend($("<span>").attr("aria-hidden", "true").text("×"))
    $("#list").prepend(well.prepend(text).prepend(newDeleteButton.prepend(delBtn)));
    $("#list_data").val('');
  }).on('ajax:error', function(event, xhr, status, error) {
    return alert(error);
  });

  // $('#new_list').on('ajax:success', function(event, data, status, xhr) {
  //   var text = $("#list_data").val();
  //   var text2 = encodeURIComponent(text);
  //   var newlistText = $("<td>").text(text);
  //   var newDeleteButton = $("<td>").append($("<a>").attr("class", "btn btn-danger oide").attr("data-confirm", "削除しますか？").attr("data-method", "delete").attr("data-remote", "true").attr("data-lid", data.lid).attr("href", "/lists/" + data.key + "?lid=" + data.lid).html("×"));
  //   $(".table").prepend($("<tr>").prepend(newDeleteButton).prepend(newlistText));
  //   $("#list_data").val('');
  //   return alert(data.lid);
  // }).on('ajax:error', function(event, xhr, status, error) {
  //   return alert(error);
  // });

  // $('.btn.btn-danger.oide').on('ajax:success', function(event, data, status, xhr) {
  //   $("[data-lid=" + data.sub_key + "]").parents('tr').fadeOut('slow', function() {
  //     $(this).remove();
  //   });
  //   return alert(data.sub_key);
  // }).on('ajax:error', function(event, xhr, status, error) {
  //   return alert(error);
  // }).on('ajax:complete', function(event, xhr, status, error) {
  //   return alert(error);
  // });


  $(document).on('click', '.del-lid', function(){
    $(this).parent('div').fadeOut('slow', function() {
      $(this).remove();
    });
  });

});
