"use strict";

(function ($) {
  "use strict";

  pagepiling();
  swiperSlider();
  headerMenu();
  videoPlayer();
  labelAnim();
  loader();
  imageMoving();
  sectionScrollbar();
  sendForm();
  heroParalax();
  imageView();
  headerFixed();
})();
/* Function for loader */

/* when sidebar open click outside close sidebar */
$('main').click(function(e){
       $('.js-header-cnt').removeClass('active');
       $('.js-header-burger').removeClass('clicked');
       $('.js-header-cnt').addClass("anime");
        window.headerTimeout = setTimeout(function () {
          $('.js-header-cnt').removeClass("anime");
        }, 300);
});

function loader() {
  $(window).on('load', function () {
    $('.loader').fadeOut(1000);
  });
}
/* Page scroll */


function pagepiling() {
  if ($('.js-sections').length) {
    $('.js-sections').pagepiling({
      anchors: ['home', 'skill', 'projects', 'about',  'contact'],
      menu: '#navbar',
      navigation: false,
      onLeave: function onLeave(index, nextIndex, direction) {
        if (direction == "up") {
          $(".section-scroll-item").removeClass("active");
          $(".section-scroll-item").eq(index - 1).prevAll().addClass("active");
        } else {
          $(".section-scroll-item").removeClass("active");

          if ($(".section-scroll-item").eq(nextIndex).length) {
            $(".section-scroll-item").eq(nextIndex).prevAll().addClass("active");
          } else {
            $(".section-scroll-item").eq(nextIndex - 1).prevAll().addClass("active");
            $(".section-scroll-item").eq(nextIndex - 1).addClass("active");
          }
        }
      },
      afterRender: function afterRender() {
        var sectionCount = $('.section').length;

        for (var i = 0; i < sectionCount; i++) {
          $('<div/>', {
            "class": 'section-scroll-item'
          }).appendTo('.js-section-scroll');
        }

        $(".section-scroll-item").eq(0).addClass("active");
        $('.js-section-scroll').css({
          height: $(window).innerHeight() / 2
        });
        $('.section-scroll-item').css({
          height: $('.js-section-scroll').innerHeight() / $('.section-scroll-item').length
        });
      }
    });
  }
}
/* Scroll for sections */


function sectionScrollbar() {
  $(window).on('resize', function () {
    $('.js-section-scroll').css({
      height: $(window).innerHeight() / 2
    });
    $('.section-scroll-item').css({
      height: $('.js-section-scroll').innerHeight() / $('.section-scroll-item').length
    });
  });
}
/* Slider */


function swiperSlider() {
  var swiper = new Swiper('.js-education-slider, .js-reviews-slider', {
    resizeObserver: true,
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
}
/* Burger menu (responsive) */


function headerMenu() {
  $('.js-header-burger').on('click', function () {
    clearTimeout(window.headerTimeout);
    $('.js-header-cnt').addClass("anime");
    window.headerTimeout = setTimeout(function () {
      $('.js-header-cnt').removeClass("anime");
    }, 300);

    if ($(this).hasClass('clicked')) {
      $(this).removeClass('clicked');
      $('.js-header-cnt').removeClass('active');
    } else {
      $(this).addClass('clicked');
      $('.js-header-cnt').addClass('active');
    }
  });
}
/* Video player */


function videoPlayer() {
  $('.js-video-play').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });
}
/* Script for labels in form */


function labelAnim() {
  $('.form-control').on('focus', function () {
    $(this).parents('.form-group').addClass('focused');
  });
  $('.form-control').on('blur', function () {
    var inputValue = $(this).val();

    if (inputValue == "") {
      $(this).removeClass('filled');
      $(this).parents('.form-group').removeClass('focused');
    } else {
      $(this).addClass('filled');
    }
  });
}
/* Animation for image on Project page */


function imageMoving() {
  $(".js-projects-img").on("mouseout", function (e) {
    $(this).css("opacity", "0");
  });
  $(".js-projects-img").on("mousemove", function (e) {
    $(this).css("opacity", "1");
    var pos = $(this).offset();
    var elem_left = pos.left;
    var elem_top = pos.top;

    if (e.pageX < elem_left || e.pageX > elem_left + $(this).innerWidth() || e.pageY < elem_top || e.pageY > elem_top + $(this).innerHeight()) {
      $(this).css("opacity", "0");
      $(this).find(".projects-list__img").css({
        'transform': 'translateY(0) translateX(0)'
      });
    } else {
      $(this).css("opacity", "1");
      var Xinner = e.pageX - elem_left - $(this).innerWidth() / 2 + 40;
      var Yinner = e.pageY - elem_top - $(this).innerHeight() / 2 + 40;
      $(this).find(".projects-list__img").css({
        'transform': 'translateY(' + Yinner + 'px) translateX(' + Xinner + 'px)'
      });
    }
  });
}
/* Send form */


function sendForm() {
  if ($('.js-form').length) {
    $('.js-form').each(function () {
      $(this).validate({
        errorClass: 'error wobble-error',
        submitHandler: function submitHandler(form) {
          $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(form).serialize(),
            success: function success() {
              $('#error').modal('hide');
              $('#success').modal('show');
            },
            error: function error() {
              $('#success').modal('hide');
              $('#error').modal('show');
            }
          });
        }
      });
    });
  }
}
/* Paralax on Project and Blog pages */


function heroParalax() {
  if ($('.js-hero').length) {
    $(window).on('scroll', function () {
      $('.js-hero').css({
        'transform': 'translateY(' + $(window).scrollTop() * 0.3 + 'px)'
      });
    });
  }
}
/* Show image on hover */


function isOnScreen(elem) {
  // if the element doesn't exist, abort
  if (elem.length == 0) {
    return;
  }

  var $window = $(window);
  var viewport_top = $window.scrollTop();
  var viewport_height = $window.height();
  var viewport_bottom = viewport_top + viewport_height;
  var $elem = $(elem);
  var top = $elem.offset().top;
  var height = $elem.height();
  var bottom = top + height;
  return top >= viewport_top && top < viewport_bottom || bottom > viewport_top && bottom <= viewport_bottom || height > viewport_height && top <= viewport_top && bottom >= viewport_bottom;
}

function imageView() {
  $(window).on('scroll', function (e) {
    $(".ps-img").each(function () {
      if (isOnScreen($(this))) {
        $(this).addClass("active");
      }
    });
  });
}
/* Fixed header */


function headerFixed() {
  $(window).on('scroll', function () {
    var sticky = $('.header'),
        scroll = $(window).scrollTop();

    if (scroll >= 40) {
      sticky.addClass('fixed');
    } else {
      sticky.removeClass('fixed');
    }
  });
}

/* time line collapse */
const contents = document.querySelectorAll('.content')
contents.forEach(function(content){
	const title = content.querySelector('.services-item__title')
	title.addEventListener('click',function(){
		contents.forEach(function(item){
			if(item !== content){
				item.classList.remove("show-content");
			}
		})
		content.classList.toggle("show-content");
	})
})

/* project img modal*/

function openModal1() {
  document.getElementById("myModal1").style.display = "block";
}
function openModal2() {
  document.getElementById("myModal2").style.display = "block";
}

function closeModal1() {
  document.getElementById("myModal1").style.display = "none";
}
function closeModal2() {
  document.getElementById("myModal2").style.display = "none";
}

var slideIndex = 1;
showSlides1(slideIndex);
showSlides2(slideIndex);

function plusSlides1(n) {
  showSlides1(slideIndex += n);
}
function plusSlides2(n) {
  showSlides2(slideIndex += n);
}

function currentSlide1(n) {
  showSlides1(slideIndex = n);
}
function currentSlide2(n) {
  showSlides2(slideIndex = n);
}

function showSlides1(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides1");
  var dots = document.getElementsByClassName("demo1");
  // var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  // captionText.innerHTML = dots[slideIndex-1].alt;
}

function showSlides2(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides2");
  var dots = document.getElementsByClassName("demo2");
  // var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  // captionText.innerHTML = dots[slideIndex-1].alt;
}

/* project mouse hover and text */
function showText(){
    document.querySelector(".img-text").style.display="block";
}
function hide(){
    document.querySelector(".img-text").style.display="none";
}
function showText2(){
    document.querySelector(".img-text2").style.display="block";
}
function hide2(){
    document.querySelector(".img-text2").style.display="none";
}

/*dynamic get years*/
let tempDate = new Date()
let tempYear = tempDate.getFullYear();
const footerRight = document.querySelector('.footer-copyright');
const headerRight = document.querySelector('.header-contacts__copyright');
footerRight.textContent=`© WILLIE GUAN ${tempYear}.`
headerRight.textContent=`© WILLIE GUAN ${tempYear}.`

//line QRcode
function showqrcode(){
  const x = document.getElementById("lineqrcode");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}