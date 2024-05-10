$(function () {
  let i = 0;
  let isModalOpen = false;

  if (window.innerWidth > 1024) {
    /*lading_page shape*/

    var renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("canvas"),
      antialias: true,
      alpha: true,
    });
    // 기본 배경색 = 투명 //
    renderer.setClearColor(0xffffff, 0);
    renderer.autoClearColor = false;

    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(window.innerWidth, window.innerHeight);

    var scene = new THREE.Scene();
    var camera;

    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 5;

    var light = new THREE.PointLight();
    light.position.set(5, 5, 5);
    scene.add(light);

    var geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 128, 32);
    var material = new THREE.MeshStandardMaterial({
      color: 0x999999,
      roughness: 0.45,
      metalness: 0.65,
    });
    var mesh = new THREE.Mesh(geometry, material);

    mesh.scale.set(1.2, 1.2, 1.2);

    scene.add(mesh);

    var update = function () {
      var positionAttribute = mesh.geometry.attributes.position;

      mesh.geometry.normalsNeedUpdate = true;
      positionAttribute.needsUpdate = true;
      mesh.geometry.computeVertexNormals();
    };

    function animate() {
      mesh.rotation.x += 0.01;
      mesh.rotation.z += 0.02;

      update();

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  /*lading page animation*/
  function firstAnimation() {
    $("#canvas")
      .css({ display: "block" })
      .animate(
        { opacity: 1, top: "50%" },
        {
          duration: 1000,
          easing: "easeOutExpo",
          start: function () {},
          complete: function () {
            secondAnimation();
          },
        }
      );
  }

  function secondAnimation() {
    $(".ca_inner .before").animate(
      { opacity: "1" },
      {
        duration: 300,
        easing: "easeOutExpo",
        start: function () {},
        complete: function () {
          thirdAnimation();
          $(".ca_inner .before").addClass("on");
        },
      }
    );
  }
  function thirdAnimation() {
    $(".ca_inner .after").animate(
      { opacity: "1" },
      {
        duration: 300,
        easing: "easeOutExpo",
        start: function () {},
        complete: function () {
          $(".ca_inner .after").addClass("on");
          $("#header").stop().animate({ top: "0%" }, 800);
          setTimeout(function () {
            $("#visual h2 span").addClass("on");
          }, 800);
        },
      }
    );
  }

  firstAnimation();

  /***********************************/

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
          if (delta < 0) {
            if ($(elmSelecter).next() != undefined) {
              try {
                moveTop = $(elmSelecter).next().offset().top;
              } catch (e) {}
            }
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
    } else {
      $(this).off("mousewheel DOMMouseScroll");
    }
  };
  mousescroll(true);
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
      $(".con2").addClass("on");
      setTimeout(function () {
        $(".con2.on").addClass("after-hidden");
      }, 2000);
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
      setTimeout(function () {
        $(".con2.on").addClass("after-hidden");
      }, 2000);
      $(".navi_bar>div").removeClass("on");
      $(".navi_bar>div:nth-of-type(3)").addClass("on");
      $(".navi a").removeClass("on");
      $(".navi a:nth-of-type(3)").addClass("on");
      if (isModalOpen) {
        $(window).scrollTop($(".con2").offset().top);
      }
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
    $(".modal_box").on("wheel mousewheel DOMMouseScroll", function (e) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    });
    $(".modal").eq(i).addClass("on");
    $("html, body").css({ overflow: "hidden" });
    $(window).off("mousewheel DOMMouseScroll");
    $("html, body").off("mousewheel DOMMouseScroll");
    mousescroll(false);
    $(".modal")
      .eq(i)
      .on("mousewheel DOMMouseScroll", function (e) {
        let delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
        let scrollTop = this.scrollTop;
        this.scrollTop = scrollTop - delta;
        e.preve;
      });
    $(window).scrollTop($(".con2").offset().top);
    isModalOpen = true;
  });
  $("#close_1").on("click", function () {
    $(".modal_box").removeClass("on");
    $(".modal").removeClass("on");
    $("html, body").css({ overflow: "auto" });
    mousescroll(true);
    isModalOpen = false;
    $(".modal").off("mousewheel DOMMouseScroll");
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
  var resizeTimer;
  let resize = function () {
    $(window).on("resize", function () {
      winsize = window.innerWidth;
      if (winsize > 1520) {
        mousescroll();
        drag();
      } else if (winsize < 431) {
        $(window).off("mousescroll");
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
