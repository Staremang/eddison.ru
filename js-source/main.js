
var setDate = function () {
	var t = [],
		l = -1, r = -1,
		y, m;
	
	for (var i = 0; i < document.querySelectorAll('.portfolio-grid__item[data-date]').length; i++) {
//		y = Math.floor( Date.parse(document.querySelectorAll('.portfolio-grid__item[data-date]')[i].getAttribute('data-date'))/(1000*60*60*24*365)) + 1970;
		y = +document.querySelectorAll('.portfolio-grid__item[data-date]')[i].getAttribute('data-date').split('-')[0];
		m = +document.querySelectorAll('.portfolio-grid__item[data-date]')[i].getAttribute('data-date').split('-')[1];
		
		if ( l === -1 || t[l].year !== y) {
			l++;
			r = -1;
			t[l] = {
				year: y,
				months: []
			}
		}
		if ( r === -1 || t[l].months[r].month !== m) {
			r++;
			t[l].months[r] = {
				month: m,
				el: []
			}
		}
		t[l].months[r].el[t[l].months[r].el.length] = document.querySelectorAll('.portfolio-grid__item[data-date]')[i];
	}
	console.log(t)
	return t;
}
function setScale () {
	var el,
		elM,
		date = new setDate(),
		h,
		headerH = document.querySelector('.header').offsetHeight,
		gridHeight = document.querySelector('.portfolio-grid').offsetHeight,
		scaleBlock = document.querySelector('.scale'),
		scroll;
	scaleBlock.innerHTML = '';
	var mouse = document.createElement('div');
	mouse.classList.add('scale__mouse');
	scaleBlock.appendChild(mouse);
	
	scaleBlock.onmousemove = function(target)
	{
		mouse.style.top = target.clientY - headerH + 'px';
	}
	
	scaleBlock.onmousedown = function(t)
	{
		h = (t.clientY - headerH)/scaleBlock.offsetHeight;
		$('html, body').stop();
		$('html, body').animate({
			scrollTop: h * (gridHeight - document.documentElement.clientHeight + headerH) + 
				 	 document.querySelector('.portfolio-grid').getBoundingClientRect().top + 
					 pageYOffset - headerH
		}, 500);
		
		document.onmousemove = function(target)
		{
			$('html, body').stop();
			
			h = (target.clientY - headerH)/scaleBlock.offsetHeight;
			
			scroll = h * (gridHeight - document.documentElement.clientHeight + headerH) + 
				 	 document.querySelector('.portfolio-grid').getBoundingClientRect().top + 
					 pageYOffset - headerH;
//			
//			$('html, body').animate({
//				scrollTop: scroll
//			}, 300);
			window.scrollTo(0, scroll);
		}
		
		scaleBlock.onmouseup = function()
		{
			document.onmousemove = null;
			scaleBlock.onmouseup = null;
		}
		
	}
	
	
	
	date.forEach(function(item, i, arr) {
		var itemTop;
		el = document.createElement('div');
		el.classList.add('scale__item');
		el.innerHTML = item.year;
		/* 
			Совпадает с полосой прокрутки:
		*/
		itemTop = (document.querySelector('.scale').offsetHeight) * (item.months[0].el[0].offsetTop) / (gridHeight - document.documentElement.clientHeight + headerH);
		if (itemTop >= document.querySelector('.scale').offsetHeight) {
			itemTop = document.querySelector('.scale').offsetHeight - 20;
		}
		/* 
			В пропорциях относительно .scale
		*/
//		itemTop = (document.querySelector('.scale').offsetHeight - 20) * (date[i].el[0].offsetTop)/(date[date.length - 1].el[0].offsetTop);
		
		el.style.transform = 'translate(0, ' + itemTop + 'px)';
		
		
//		el.addEventListener('click', function () {
//			for (var i = 0; i < date.length; i++) {
//				if (date[i].year == +this.innerHTML) {
//					/* 
//					 Да-да, jq вставки
//					*/
//					$('html, body').animate({
//						scrollTop: date[i].el[0].getBoundingClientRect().top + pageYOffset - headerH
//					}, 800);
//				}
//			}
//			for (var i = 0; i < document.querySelectorAll('.scale__item').length; i++) {
//				document.querySelectorAll('.scale__item')[i].classList.remove('active');
//			}
//			this.classList.add('active')
//		})
		scaleBlock.appendChild(el);
		
		item.months.forEach(function(item, i, arr) {
//			var itemTop;
			elM = document.createElement('div');
			elM.classList.add('scale__item_m');
			/* 
				Совпадает с полосой прокрутки:
			*/
			itemTop = (document.querySelector('.scale').offsetHeight) * (item.el[0].offsetTop) / (gridHeight - document.documentElement.clientHeight + headerH);

//			if (itemTop >= document.querySelector('.scale').offsetHeight) {
//				itemTop = document.querySelector('.scale').offsetHeight - 20;
//			}
			/* 
				В пропорциях относительно .scale
			*/
	//		itemTop = (document.querySelector('.scale').offsetHeight - 20) * (date[i].el[0].offsetTop)/(date[date.length - 1].el[0].offsetTop);

			elM.style.transform = 'translate(0, ' + itemTop + 'px)';
			scaleBlock.appendChild(elM);
		});
	});
}

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
	if(document.querySelector('.portfolio')) {
		setScale();
	}
//	setDate();
//	setScale();
}
$(document).ready(function () {
	if(document.querySelector('.popup-contacts')) {
		$('a[href*="#contacts"]').click(function () {
			$('.popup-contacts').fadeIn();
			$(this).addClass('active');
//			$('.popup-contacts').addClass('fadeIn');
		})
		$('.contacts__btn-close').click(function () {
			$('a[href="#contacts"]').removeClass('active');
			$('.popup-contacts').fadeOut();
		})
	} else {
		$('a[href*="#contacts"]').anchor({
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
			t = 2;
		
		$(this).children().css('transform', 'rotateX(' + -relativeY * t + 'deg) rotateY(' + relativeX * t + 'deg)')
//		console.log("X: " + relativeX + "  Y: " + relativeY, $(this).innerWidth());
	});
	$(".services__col").mouseover(function(e) {
		$(this).children().css('transition', '')
	})
	$(".services__col").mouseout(function(e) {
		$(this).children().css({
			'transform':'rotateX(0deg) rotateY(0deg)',
			'transition': 'transform .3s ease'
		})
	})

})