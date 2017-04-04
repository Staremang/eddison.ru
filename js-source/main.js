
var setDate = function () {
	var t = [], // Начальный массив лет
		l = -1, // Счетчик лет
		r = -1, // Счетчик месяцев
		y, // Текущий год в массиве
		m; // Текущий месяц в массиве
	
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
	return t;
}
function setScale () {
	var el, // Маркер лет
		elM, // Маркер месяцев
		date = new setDate(), // Массив с годами и месяцами
		h,
		headerH = document.querySelector('.header').offsetHeight, // Высота шапки (она переменная)
		gridHeight = document.querySelector('.portfolio-grid').offsetHeight, // Высота всего блока с элементами портфолио
		scaleBlock = document.querySelector('.scale'), // Блок с маркерами
		scroll,
		mouse = document.createElement('div'); // Маркер позиции мыши
	
	scaleBlock.innerHTML = ''; // Обнуляем, чтобы при resize там ничего не было
	
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
	
	
	var c = 0; // Счетчик количества табличек, ушедших за пределы блока
	date.forEach(function(item, i, arr) {
		var itemTop;
		/*
			Идем по массиву годов и вставляем таблички с годом
		*/
		el = document.createElement('div');
		el.classList.add('scale__item');
		el.innerHTML = item.year;
		/* 
			Совпадает с полосой прокрутки:
		*/
		itemTop = (document.querySelector('.scale').offsetHeight) * (item.months[0].el[0].offsetTop) / (gridHeight - document.documentElement.clientHeight + headerH);
		if (itemTop >= document.querySelector('.scale').offsetHeight) {
			/*
				20 - высота таблички с годом
				22 - высота таблички с отступом
			*/
			itemTop = document.querySelector('.scale').offsetHeight - (20 + 22 * c);
			c++;
		}
		/* 
			В пропорциях относительно .scale
			
		itemTop = (document.querySelector('.scale').offsetHeight - 20) * (date[i].el[0].offsetTop)/(date[date.length - 1].el[0].offsetTop);
		
		*/
		
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
			/*
				Идем по массиву месяцев и вставляем указатели
			*/
			elM = document.createElement('div');
			elM.classList.add('scale__item_m');
			/* 
				Совпадает с полосой прокрутки:
			*/
			itemTop = (document.querySelector('.scale').offsetHeight) * (item.el[0].offsetTop) / (gridHeight - document.documentElement.clientHeight + headerH);

			if (itemTop >= document.querySelector('.scale').offsetHeight) {
				itemTop = document.querySelector('.scale').offsetHeight - 20;
			}
			/* 
				В пропорциях относительно .scale
				
			itemTop = (document.querySelector('.scale').offsetHeight - 20) * (date[i].el[0].offsetTop)/(date[date.length - 1].el[0].offsetTop);
			*/

			elM.style.transform = 'translate(0, ' + itemTop + 'px)';
			scaleBlock.appendChild(elM);
		});
	});
	
	document.querySelectorAll('.scale__item')[0].classList.add('active');
	
	var i = 0, oldScroll = 0;
	window.onscroll = function (event) {
		if (window.pageYOffset > oldScroll) {
			if (i < date.length && date[i].months[0].el[0].getBoundingClientRect().top - headerH < 0) { 
				$('.scale__item').removeClass('active');
				document.querySelectorAll('.scale__item')[i].classList.add('active');
				i++;
			}
		} else {
			if (i > 1 && date[i - 1].months[0].el[0].getBoundingClientRect().top - headerH > 0) { 
				i--;
				$('.scale__item').removeClass('active');
				document.querySelectorAll('.scale__item')[i - 1].classList.add('active');
			}
		}
		oldScroll = window.pageYOffset
	}
	
}
window.onload = window.onresize = function () {
	var firstHeight;
	if (document.documentElement.clientWidth <= 768) {
		
		if (document.querySelector('.header__mobile')) {
			document.querySelector('.header__mobile').classList.add('hide');
		}
		if (document.querySelector('.first')) {
			
			firstHeight = 2 * document.documentElement.clientWidth * 1070 / 1920;
			
			document.querySelector('.first__grid-top').style.height = firstHeight / 2 + 'px';
			document.querySelector('.first__grid-left').style.height = firstHeight + 'px';
		}
		
	} else {
		
		if(document.querySelector('.portfolio')) {
			setScale();
		}
		if (document.querySelector('.header__mobile')) {
			document.querySelector('.header__mobile').classList.remove('hide');
		}
		
		if (document.querySelector('.first')) {
			firstHeight = document.documentElement.clientWidth * 1070 / 1920;
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
	var contactsButton = $('a[href*="#contacts"]');
	
	if (document.documentElement.clientWidth <= 768) {
		$('.header__item').click(function () {
			$('.header__mobile').addClass('hide');
		})
	}
	if(document.querySelector('.popup-contacts')) {
		
		contactsButton.click(function () {
			contactsButton.addClass('active');
			$('.popup-contacts').fadeIn();
		})
		$('.contacts__btn-close').click(function () {
			contactsButton.removeClass('active');
			$('.popup-contacts').fadeOut();
		})
		
	} else {
		contactsButton.anchor({
			transitionDuration: 1000
		});
		if (document.documentElement.clientWidth <= 768) {
			contactsButton.click(function () {
				$('.header__mobile').toggleClass('hide');
			})
		}
		
	}
	$('a[href="#reviews"]').anchor({
		transitionDuration: 1000
	});
	$('.header__btn').click(function () {
		$('.header__mobile').toggleClass('hide');
	})
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
		var offset = $(this).children().offset();
		var relativeX = (e.pageX - offset.left - $(this).children().innerWidth()/2)/($(this).children().innerWidth()/2);
		var relativeY = (e.pageY - offset.top - $(this).children().innerHeight()/2)/($(this).children().innerHeight()/2),
			t = 2;
		
		$(this).children().css('transform', 'rotateX(' + -relativeY * t + 'deg) rotateY(' + relativeX * t + 'deg)')
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