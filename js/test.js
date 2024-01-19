$(document).ready(function () {
  $(".scroll_section_wrap").on("mousewheel", function (event) {
    if (event.originalEvent.deltaY > 0) {
      // 스크롤 아래로
      $(this).stop().animate(
        {
          scrollTop: "+=100vh",
        },
        1000
      );
    } else {
      // 스크롤 위로
      $(this).stop().animate(
        {
          scrollTop: "-=100vh",
        },
        1000
      );
    }
    event.preventDefault();
  });
});
