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
	
	$('a[href="#contacts"]').anchor({
		transitionDuration: 1000
	});
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
//		center:true
		
//		items:3,
		autoWidth:true,
		stagePadding: 150,
		margin: 50,
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

})