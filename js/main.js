$(function () {
  let i = 0;
  let isModalOpen = false;

  /* 커스텀 cursor */
  const cursor = document.querySelector(".cursor");

  const moveCursor = (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
  };
  window.addEventListener("mousemove", moveCursor);

  /*lading_page shape*/
  if (window.innerWidth > 1023) {
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

    if (window.innerWidth < 481) {
      camera = new THREE.PerspectiveCamera(
        105,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
    } else {
      camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
    }
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

    function MeshSize() {
      if (window.innerWidth < 481) {
        mesh.scale.set(0.3, 0.3, 0.3);
      } else {
        mesh.scale.set(1.2, 1.2, 1.2);
      }
    }

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
  } else {
  }

  /***********************************/

  /*skill animation*/
  setInterval(function () {
    $(".skill")
      .stop()
      .animate({ top: "-100%" }, function () {
        $(".skill p:first-child").appendTo(".skill");
        $(".skill").css({ top: "0%" });
      });
  }, 3000);

  /*bar효과*/
  $(".side_menu").css("display:none");
  $(".bars").on("click", function () {
    console.log(i);
    if (i == 0) {
      $(".html, body").css({ overflow: "hidden" });
      $(".bar:nth-of-type(2)").hide();
      $(".bar:nth-of-type(1)").animate(
        {
          top: "50%",
          rotate: "45deg",
        },
        800
      );
      $(".bar:nth-of-type(3)").animate(
        {
          top: "50%",
          rotate: "-45deg",
        },
        800
      );
      $(".side_menu")
        .css({ zIndex: 22, display: "block" })
        .animate({ opacity: "1" }, 100, function () {
          $(".blob").css("display", "block");
          $(".blob svg").animate({ scale: "10" }, 1500);
          $(".blob dot").animate({ scale: "2" }, 1500);
          $(".menu")
            .css("display", "block")
            .animate({ opacity: "1" }, 300, function () {
              $(".menu li a").addClass("on");
            });
        });
      $(".bar").addClass("on");
      i = 1;
    } else {
      $(".html, body").css({ overflow: "auto" });
      $(".bar:nth-of-type(1)").animate(
        {
          top: "0%",
          rotate: "0deg",
        },
        800
      );
      $(".bar:nth-of-type(3)").animate(
        {
          top: "100%",
          rotate: "0deg",
        },
        800
      );
      $(".bar:nth-of-type(2)").show();
      $(".blob svg").animate({ scale: "1" }, 1500, function () {
        $(".menu")
          .css("display", "none")
          .animate({ opacity: "0" }, 100, function () {
            $(".menu li a").removeClass("on");
          });
        $(".side_menu").css({ zIndex: -1, display: "none", opacity: "0" });
      });
      $(".bar").removeClass("on");
      i = 0;
    }
  });

  /*lading page animation*/
  function firstAnimation() {
    $("body,html").css({ height: "100vh", overflow: "hidden" });
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
          setTimeout(function () {
            $("#header").stop().animate({ top: "0%" }, 800);
            $("#visual h2 span").addClass("on");
          }, 800);
          setTimeout(function () {
            $("body,html").css({ height: "auto", overflow: "visible" });
          }, 3000);
        },
      }
    );
  }

  firstAnimation();

  /*con2 text animation*/

  function textAnimation() {
    const con2 = $(".con2").offset().top;
    var scrollTop = $(window).scrollTop();
    var boxOver = $(".box-over");
    const boxHeight = $(".txt-box").height();
    var blank =
      window.innerWidth >= 480 && window.innerWidth < 768 ? -300 : -700;

    $(".work").each(function (index) {
      var workTop = $(this).offset().top;
      if (scrollTop >= workTop + blank) {
        var offset = index * boxHeight;
        boxOver.stop().animate({ top: `-${offset}px` }, 500);
      }
    });
  }

  /*on load 효과*/
  $(window).on("load", function () {
    let line = -150;
    let more = -550;
    let i = 0;
    if (
      $(window).scrollTop() >= line &&
      $(window).scrollTop() <= $(".con1").offset().top + line
    ) {
      //visual 부분 해당
    } else if (
      $(window).scrollTop() >= $(".con1").offset().top + line &&
      $(window).scrollTop() < $(".con2").offset().top + line
    ) {
      //con1부분 해당

      const scrollTop = window.scrollY;
      const con1 = $(".con1").offset().top;
      if (scrollTop > con1 + 30) {
        $(".profile_right div").addClass("on");
        $(".con2 .bg-text").css({ position: "absolute" });
      }
      if (scrollTop > con1 + 500) {
        $(".about .timeline-content p").addClass("on");
      }
    } else if (
      //con2부분 해당
      $(window).scrollTop() >= $(".con2").offset().top + line &&
      $(window).scrollTop() < $(".con3").offset().top + line
    ) {
      $(".con2").addClass("on");
      $(".con2 .bg-text").css({ position: "fixed" });
      setTimeout(function () {
        $(".con2.on").addClass("after-hidden");
      }, 1200);
    } else if (
      //con3 부분 해당
      $(window).scrollTop() >= $(".con3").offset().top &&
      $(window).scrollTop() < $(".con4").offset().top + more
    ) {
      $(".con3").addClass("on");
      setTimeout(function () {
        $(".con3 .de_bg").addClass("active");
      }, 6000);
      $(".con2 .bg-text").css({ position: "absolute" });
    } else if (
      //con4 마지막 부분 해당
      $(window).scrollTop() >= $(".con4").offset().top
    ) {
      $(".con4").addClass("on");
    }
  });
  /*on load효과 끝*/

  /*hello 회전 효과*/
  function scrollRotate() {
    const scrollTop = window.scrollY;
    const skills = scrollTop - $(".skills").offset().top;
    const con1 = $(".con1").offset().top;
    const circle = document.getElementById("a-circle-i");
    const h1 = document.getElementById("scroll-h1");
    const img1 = document.querySelector(".icons img:nth-of-type(1)");
    const img2 = document.querySelector(".icons img:nth-of-type(2)");
    const rotateDeg = scrollTop * 0.8;
    const h1Up = -(scrollTop - con1) * 1.3;
    const rotateImg = skills * 0.1;
    circle.style.transform = `translate(-50%, -50%) rotate(${rotateDeg}deg)`;
    h1.style.transform = `translateY(${h1Up}px)`;
    img1.style.transform = `rotate(${rotateImg}deg)`;
    img2.style.transform = `rotate(${-rotateImg}deg)`;
  }

  /*스크롤 효과*/
  $(window).on("scroll", function () {
    let line = -150;
    let more = -550;

    if ($(window).scrollTop() == 0) {
      //visual 부분 해당
    } else if (
      $(window).scrollTop() >= $(".con1").offset().top + line &&
      $(window).scrollTop() < $(".con2").offset().top + line
    ) {
      //con1부분 해당
      const scrollTop = window.scrollY;
      const con1 = $(".con1").offset().top;

      $(".con2 .bg-text").css({ position: "absolute" });
      if (scrollTop > con1 + 30) {
        $(".profile_right div").addClass("on");
      }
      if (scrollTop > con1 + 500) {
        $(".about .timeline-content p").addClass("on");
      }

      window.addEventListener("scroll", scrollRotate);
    } else if (
      //con2부분 해당
      $(window).scrollTop() >= $(".con2").offset().top + line &&
      $(window).scrollTop() < $(".con3").offset().top + more
    ) {
      $(".con2").addClass("on");
      setTimeout(function () {
        $(".con2.on").addClass("after-hidden");
      }, 200);
      $(".con2 .bg-text").css({ position: "fixed" });

      textAnimation();
    } else if (
      //con3 부분 해당
      $(window).scrollTop() >= $(".con3").offset().top + more &&
      $(window).scrollTop() < $(".con4").offset().top + line
    ) {
      $(".con3").addClass("on");
      $(".con2 .bg-text").css({ position: "absolute" });
      setTimeout(function () {
        $(".con3 .de_bg").addClass("active");
      }, 3000);
    } else if (
      //con4 마지막 부분 해당
      $(window).scrollTop() >=
      $(".con4").offset().top + more
    ) {
      $(".con4").addClass("on");
    }
  });
  /*scroll효과 끝*/

  /*con2_modal*/
  $(".pp").on("click", function () {
    let i = $(this).closest(".work").index();

    console.log(i);

    $(".modal_box").addClass("on");
    $(".modal").eq(i).addClass("on");
    $("html, body").css({ overflowY: "hidden" });
  });

  $("#close_1").on("click", function () {
    $(".modal_box").removeClass("on");
    $(".modal").removeClass("on");
    $("html, body").css({ overflowY: "visible" });
  });

  //*con3_modal*/
  $(".con3_inner .de_bg").on("click", function () {
    let currentIndex = $(this).index();
    $(".con3_inner .de_modal").addClass("on");
    $(".con3_inner .div_wrap").css({ left: -100 * currentIndex + "%" });
    $(".div_wrap").data("currentIndex", currentIndex);
    $("html, body").css({ overflowY: "hidden" });
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
    $("html, body").css({ overflowY: "visible" });
  });

  /*con3 button*/
  var gap = window.innerWidth < 1023 ? 0 : 100;
  var j = 0;
  var total = $(".de_bg").length - 1;
  $(".ne-right").on("click", function () {
    console.log(j);
    var design = $(".de_bg").innerWidth() + gap;
    if (j < total) {
      j++;
    }
    $(".con3 .design")
      .stop()
      .animate(
        {
          left: -j * design + "px",
        },
        500
      );
  });

  $(".pre-left").on("click", function () {
    var design = $(".de_bg").innerWidth() + gap;
    console.log(j);
    if (j > 0) {
      j--;
    }

    $(".con3 .design")
      .stop()
      .animate(
        {
          left: -j * design + "px",
        },
        500
      );
  });

  /*resize이벤트 시작*/
  /*resize*/
  var preWidth = $(window).width();
  // reWidth();
  $(window).on("resize", function () {
    reWidth();
    function reWidth() {
      var curWidth = $(window).width();

      if (curWidth !== preWidth) {
        location.reload();
      }
    }
  });
  /*여기가 끝(밑에)*/
});
