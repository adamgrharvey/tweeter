$(document).ready(function() {
  $("textarea").on('input propertychange', function() {
    //console.log($("textarea").val().length);
    //console.log($(this).parent()[0][2].value);
    $(this).parent()[0][2].value = 140 - $("textarea").val().length;

    if($(this).val().length > 140) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#545149");
    }

  })
});