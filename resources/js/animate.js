$(document).ready(() => {
  $(".expandMenu").on("click", () => {
    $(".sidebar-toggle").slideToggle(500);
  });

  $("#closeBtn").on("click", () => {
    $("#newsWindow").fadeOut(1000);
  });
});
