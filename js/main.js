$(function () {
  let i = 0;
  /*bar효과*/
  $(".bars").on("click", function () {
    console.log(i);
    if (i == 0) {
      $(".bar:nth-of-type(2)").hide();
      $(".bar:nth-of-type(1)").animate(
        {
          top: "50%",
          rotate: "45deg",
        },
        60
      );
      $(".bar:nth-of-type(3)").animate(
        {
          top: "50%",
          rotate: "-45deg",
        },
        60
      );
      $(".side_menu").animate({ left: "0%", zIndex: "95" }, 600);
      $(".bar").addClass("on");
      i = 1;
    } else {
      $(".bar:nth-of-type(1)").animate(
        {
          top: "0%",
          rotate: "0deg",
        },
        60
      );
      $(".bar:nth-of-type(3)").animate(
        {
          top: "100%",
          rotate: "0deg",
        },
        60
      );
      $(".bar:nth-of-type(2)").show();
      $(".side_menu").animate({ left: "100%" }, 600);
      $(".bar").removeClass("on");
      i = 0;
    }
  });
  /*마우스 휠 이벤트*/
  let mousescroll = function () {
    winsize = window.innerWidth;
    if (winsize > 1520) {
      var elm = "#wrap>div";
      $(elm).each(function (index) {
        // 개별적으로 Wheel 이벤트 적용
        $(this).on("mousewheel DOMMouseScroll", function (e) {
          e.preventDefault();
          var delta = 0;
          if (!event) event = window.event;
          if (event.wheelDelta) {
            delta = event.wheelDelta / 120;
            if (window.opera) delta = -delta;
          } else if (event.detail) delta = -event.detail / 3;
          var moveTop = $(window).scrollTop();
          var elmSelecter = $(elm).eq(index);
          // 마우스휠을 위에서 아래로
          if (delta < 0) {
            if ($(elmSelecter).next() != undefined) {
              try {
                moveTop = $(elmSelecter).next().offset().top;
              } catch (e) {}
            }
            // 마우스휠을 아래에서 위로
          } else {
            if ($(elmSelecter).prev() != undefined) {
              try {
                moveTop = $(elmSelecter).prev().offset().top;
              } catch (e) {}
            }
          }

          // 화면 이동 0.8초(800)
          $("html,body")
            .stop()
            .animate(
              {
                scrollTop: moveTop + "px",
              },
              {
                duration: 800,
                complete: function () {},
              }
            );
        });
      });
    } else if ($(window).width() < 431) {
      $(window).off("mousewheel");
    }
  };

  /*마우스 휠 이벤트 끝*/

  /*on load 효과*/
  $(window).on("load", function () {
    let line = -150;
    let i = 0;
    if (
      $(window).scrollTop() >= line &&
      $(window).scrollTop() <= $(".con1").offset().top + line
    ) {
      //visual 부분 해당
      $("#header").removeClass("active");
      $(".bar").css({ backgroundColor: "#fff" });
      $(".navi_bar>div").removeClass("on");
      $(".navi_bar>div").css({ backgroundColor: "#fff" });
      $(".navi_bar>div:nth-of-type(1)").addClass("on");
      $(".navi a").removeClass("on");
      $(".navi a:nth-of-type(1)").addClass("on");
      $("#visual h2 span").addClass("on");
    } else if (
      $(window).scrollTop() >= $(".con1").offset().top + line &&
      $(window).scrollTop() < $(".con2").offset().top + line
    ) {
      //con1부분 해당
      $("#header").removeClass("active");
      $(".con1").addClass("on");
      $(".navi_bar>div").css({ backgroundColor: "#fff" });
      $(".navi_bar>div").removeClass("on");
      $(".navi_bar>div:nth-of-type(2)").addClass("on");
      $(".bar").css({ backgroundColor: "#fff" });
      $(".navi a").removeClass("on");
      $(".navi a:nth-of-type(2)").addClass("on");
    } else if (
      //con2부분 해당
      $(window).scrollTop() >= $(".con2").offset().top &&
      $(window).scrollTop() < $(".con3").offset().top
    ) {
      $("#header").addClass("active");
      $(".bar").css({ backgroundColor: "#111" });
      $(".navi_bar>div").css({ backgroundColor: "#111!" });
      $(".con2").addClass("on");
      $(".navi_bar>div").removeClass("on");
      $(".navi_bar>div:nth-of-type(3)").addClass("on");
      $(".navi a").removeClass("on");
      $(".navi a:nth-of-type(3)").addClass("on");
    } else if (
      //con3 부분 해당
      $(window).scrollTop() >= $(".con3").offset().top &&
      $(window).scrollTop() < $(".con4").offset().top
    ) {
      $("#header").addClass("active");
      $(".bar").css({ backgroundColor: "#111" });
      $(".con3").addClass("on");
      setTimeout(function () {
        $(".con3 .de_bg").addClass("active");
      }, 3000);
      $(".navi_bar>div").removeClass("on");
      $(".navi_bar>div:nth-of-type(4)").addClass("on");
      $(".navi_bar>div").css({ backgroundColor: "#111" });
      $(".navi a").removeClass("on");
      $(".navi a:nth-of-type(3)").addClass("on");
    } else if (
      //con4 마지막 부분 해당
      $(window).scrollTop() >= $(".con4").offset().top
    ) {
      $("#header").addClass("active");
      $(".bar").css({ backgroundColor: "#111" });
      $(".navi_bar>div").removeClass("on");
      $(".navi_bar>div").css({ backgroundColor: "#111" });
      $(".navi_bar>div:nth-of-type(5)").addClass("on");
      $(".navi a").removeClass("on");
      $(".navi a:nth-of-type(4)").addClass("on");
      $(".con4").addClass("on");
    }
  });
  /*on load효과 끝*/

  /*스크롤 효과*/
  $(window).on("scroll", function () {
    let line = -80;
    mousescroll();
    if ($(window).scrollTop() == 0) {
      //visual 부분 해당
      $("#header").removeClass("active");
      $(".bar").css({ backgroundColor: "#fff" });
      $(".navi_bar>div").removeClass("on");
      $(".navi_bar>div").css({ backgroundColor: "#fff" });
      $(".navi_bar>div:nth-of-type(1)").addClass("on");
      $(".navi a").removeClass("on");
      $(".navi a:nth-of-type(1)").addClass("on");
      $("#visual h2 span").addClass("on");
    } else if (
      $(window).scrollTop() >= $(".con1").offset().top + line &&
      $(window).scrollTop() < $(".con2").offset().top + line
    ) {
      //con1부분 해당
      $("#header").removeClass("active");
      $(".con1").addClass("on");
      $(".navi_bar>div").css({ backgroundColor: "#fff" });
      $(".navi_bar>div").removeClass("on");
      $(".navi_bar>div:nth-of-type(2)").addClass("on");
      $(".bar").css({ backgroundColor: "#fff" });
      $(".navi a").removeClass("on");
      $(".navi a:nth-of-type(2)").addClass("on");
    } else if (
      //con2부분 해당
      $(window).scrollTop() >= $(".con2").offset().top + line &&
      $(window).scrollTop() < $(".con3").offset().top + line
    ) {
      $("#header").addClass("active");
      $(".bar").css({ backgroundColor: "#111" });
      $(".navi_bar>div").css({ backgroundColor: "#111" });
      $(".con2").addClass("on");
      $(".navi_bar>div").removeClass("on");
      $(".navi_bar>div:nth-of-type(3)").addClass("on");
      $(".navi a").removeClass("on");
      $(".navi a:nth-of-type(3)").addClass("on");
      if ($(window).width() < 431) {
        $(".con4").addClass("on");
        $(".con3").addClass("on");
      }
    } else if (
      //con3 부분 해당
      $(window).scrollTop() >= $(".con3").offset().top &&
      $(window).scrollTop() < $(".con4").offset().top
    ) {
      $("#header").addClass("active");
      $(".bar").css({ backgroundColor: "#111" });
      $(".navi_bar>div").css({ backgroundColor: "#111" });
      $(".con3").addClass("on");
      setTimeout(function () {
        $(".con3 .de_bg").addClass("active");
      }, 3000);
      $(".navi_bar>div").removeClass("on");
      $(".navi_bar>div:nth-of-type(4)").addClass("on");
      $(".navi a").removeClass("on");
      $(".navi a:nth-of-type(3)").addClass("on");
      if ($(window).width() < 1025) {
        setTimeout(function () {
          $(".con4").addClass("on");
        }, 3000);
      }
    } else if (
      //con4 마지막 부분 해당
      $(window).scrollTop() >= $(".con4").offset().top
    ) {
      $("#header").addClass("active");
      $(".navi_bar>div").removeClass("on");
      $(".navi_bar>div:nth-of-type(5)").addClass("on");
      $(".navi_bar>div").css({ backgroundColor: "#111" });
      $(".navi a").removeClass("on");
      $(".navi a:nth-of-type(4)").addClass("on");
      $(".con4").addClass("on");
    }
  });
  /*scroll효과 끝*/

  $(".navi p").on("click", function () {
    let i = $(this).index();
    $(".navi p").removeClass("on");
    $(".navi p").eq(i).addClass("on");
  });

  /*con2_modal*/
  $(".pp").on("click", function () {
    let i = $(this).closest(".works").find(".pp").index(this);
    $(".modal_box").addClass("on");
    $(".modal").eq(i).addClass("on");
    $("body").css({ overflow: "hidden" });
    $(window).off("mousewheel");
  });
  $("#close_1").on("click", function () {
    $(".modal_box").removeClass("on");
    $(".modal").removeClass("on");
    $("body").css({ overflow: "" });
    if ($(window).width() > 431) {
      mousewheel();
    }
  });

  //*con3_modal*/
  $(".con3_inner .de_bg").on("click", function () {
    let currentIndex = $(this).index();
    $(".con3_inner .de_modal").addClass("on");
    $(".con3_inner .div_wrap").css({ left: -100 * currentIndex + "%" });
    $(".div_wrap").data("currentIndex", currentIndex);
  });

  /*con3_modal prev, next*/
  $(".div_wrap").data("currentIndex", 0);

  $(".next_2").on("click", function () {
    let currentIndex = $(".div_wrap").data("currentIndex");
    let total = $(".mo_bg").length - 1;
    console.log(currentIndex);
    if (currentIndex == total) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    $(".div_wrap")
      .stop()
      .animate({ left: -100 * currentIndex + "%" }, 500);
    $(".div_wrap").data("currentIndex", currentIndex);
  });

  $(".prev_2").on("click", function () {
    let currentIndex = $(".div_wrap").data("currentIndex");
    let total = $(".mo_bg").length - 1;
    if (currentIndex == 0) {
      currentIndex = total;
    } else {
      currentIndex--;
    }
    $(".div_wrap")
      .stop()
      .animate({ left: -100 * currentIndex + "%" }, 500);
    $(".div_wrap").data("currentIndex", currentIndex);
    console.log(currentIndex);
  });
  $("#close_2").on("click", function () {
    $(".de_modal").removeClass("on");
  });

  /*resize이벤트 시작*/
  /*resize*/
  let resize = function () {
    $(window).on("resize", function () {
      winsize = window.innerWidth;
      if (winsize > 1520) {
        mousescroll();
        drag();
      } else if (winsize < 431) {
        $(window).off("mousewheel DOMMouseScroll");
      }
    });
    /*resize 이벤트 끝*/
  };

  $(window).on("resize", function () {
    clearTimeout(resize);
    resize_1 = setTimeout(resize);
  });
  /*여기가 끝(밑에)*/
});
