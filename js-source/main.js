window.onload = window.onresize = function () {
	var firstHeight;
	if (document.documentElement.clientWidth <= 768) {
		document.querySelector('.header__mobile').classList.add('hide');
		firstHeight = 2 * document.documentElement.clientWidth * 1070 / 1920;
		
		if (document.querySelector('.first__grid-top')) {
			document.querySelector('.first__grid-top').style.height = firstHeight / 2 + 'px';
		}
		
		if (document.querySelector('.first__grid-left')) {
			document.querySelector('.first__grid-left').style.height = firstHeight + 'px';
		}
	} else {
		document.querySelector('.header__mobile').classList.remove('hide');
		firstHeight = document.documentElement.clientWidth * 1070 / 1920;
		
		if (document.querySelector('.first')) {
			document.querySelector('.first').style.height = firstHeight + 'px';
		}
	}
	
	for (var i = 0; i < document.querySelectorAll('.first__grid-left .first__item').length; i++) {
		document.querySelectorAll('.first__grid-left .first__item')[i].style.height = firstHeight + 'px';
	}
	for (var i = 0; i < document.querySelectorAll('.first__grid-top .first__item').length; i++) {
		document.querySelectorAll('.first__grid-top .first__item')[i].style.height = firstHeight / 2 + 'px';
	}
}
$(document).ready(function () {
	if(document.querySelector('.popup-contacts')) {
		$('a[href="#contacts"]').click(function () {
			$('.popup-contacts').fadeIn();
			$(this).addClass('active');
//			$('.popup-contacts').addClass('fadeIn');
		})
		$('.contacts__btn-close').click(function () {
			$('a[href="#contacts"]').removeClass('active');
			$('.popup-contacts').fadeOut();
		})
	} else {
		$('a[href="#contacts"]').anchor({
			transitionDuration: 1000
		});
	}
	$('a[href="#reviews"]').anchor({
		transitionDuration: 1000
	});
	$('.header__btn').click(function () {
		$('.header__mobile').toggleClass('hide');
	})
	if (document.documentElement.clientWidth <= 768) {
		$('.header__item').click(function () {
			console.log('цепляется ')
			$('.header__mobile').addClass('hide');
		})
	}
	$('.reviews__container').owlCarousel({
		loop:true,
		margin:10,
		nav:false,
		items: 1,
		center:true
	});
	$('.pr-slider').owlCarousel({
		loop:true,
//		margin:10,
		nav:false,
		items: 1,
		center:true
	});
	$('.first__container').owlCarousel({
		loop:true,
		margin:10,
		nav:false,
		items: 1,
		margin: 0,
		center:true
	});
	
	$('.clients__container').owlCarousel({
		loop:true,
		margin:10,
		nav:false,
//    autoWidth:true,
		center:true,
		
//		items:3,
		autoWidth:true,
		stagePadding: 150,
		margin: 50,
		autoplay:true,
		autoplayTimeout:1000,
//		autoplayHoverPause:false,
		responsive:{
			0:{
				items:1,
				stagePadding: 70
			},
			600:{
				items:2,
				stagePadding: 80
			},
			768:{
				items:3,
				stagePadding: 90
			},
			1000:{
				items:4
			}
		}
	});
	$(".services__col").mousemove(function(e) {
//		console.log('Событие наведения');
		var offset = $(this).children().offset();
		var relativeX = (e.pageX - offset.left - $(this).children().innerWidth()/2)/($(this).children().innerWidth()/2);
		var relativeY = (e.pageY - offset.top - $(this).children().innerHeight()/2)/($(this).children().innerHeight()/2),
			t = 5;
		
		$(this).children().css('transform', 'rotateX(' + -relativeY * t + 'deg) rotateY(' + relativeX * t + 'deg)')
//		console.log("X: " + relativeX + "  Y: " + relativeY, $(this).innerWidth());
	});
	$(".services__col").mouseout(function(e) {
		$(this).children().css('transform', 'rotateX(0deg) rotateY(0deg)')
	})

})