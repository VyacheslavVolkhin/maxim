document.addEventListener("DOMContentLoaded", function() {

	//video
	const btnVideo = document.querySelectorAll(".js-btn-video");
	if (btnVideo) {
		for (let i = 0; i < btnVideo.length; i++) {
			btnVideo[i
			  ].addEventListener("click", function (e) {
			  const videoURL = this.parentNode.dataset.video;
			  this.parentNode.classList.add("active");
			  this.parentNode.innerHTML += `<iframe width="100%" height="100%" src="${videoURL}" frameborder="0" allowfullscreen></iframe>`;
			  e.preventDefault;
			  });
		  }
	}
	

	//mobile menu
	const menuButton = document.querySelectorAll('.header-panel-wrap .btn-menu');
	if (menuButton) {
		for (i = 0;i < menuButton.length;i++) {
			menuButton[i].addEventListener('click', function(e) {
				if (innerWidth < 1024) {
					if (this.nextElementSibling.classList.contains('.menu')) {
						this.parentElement.classList.toggle('open')
						e.preventDefault()
						e.stopPropagation()
						return false
					}
				}
			})
		}
	}

	//fancybox
	Fancybox.bind("[data-fancybox]", {
		//settings
	});


	//js popup wrap
	const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
	const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
	const popupElements = document.querySelectorAll('.js-popup-wrap')
	const wrapWidth = document.querySelector('.wrap').offsetWidth
	const bodyElem = document.querySelector('body')
	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		document.body.classList.remove('filter-show')
		document.body.classList.remove('search-show')
		popupElements.forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		togglePopupButtons.forEach(element => {
			if (!element.closest('.no-close')) {
				element.classList.remove('active')
			}
		})
	}
	function popupElementsContentPositionClass() {
		popupElements.forEach(element => {
			let pLeft = element.offsetLeft
			let pWidth = element.querySelector('.js-popup-block').offsetWidth
			let pMax = pLeft + pWidth;
			if (pMax > wrapWidth) {
				element.classList.add('popup-right')
			} else {
				element.classList.remove('popup-right')
			}
		})
	}
	for (i = 0; i < togglePopupButtons.length; i++) {
		togglePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				popupElementsClose()
				this.classList.add('active')
				if (this.closest('.header-panel-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-search-wrap')) {
					document.body.classList.add('search-show')
				}
				if (this.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < closePopupButtons.length; i++) {
		closePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			e.stopPropagation()
			return false;
		})
	}
	document.onclick = function (event) {
		if (!event.target.closest('.js-popup-block')) {
			popupElementsClear()
			popupElementsClose()
		}
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
			} else {
				element.classList.remove('select-active')
			}
			for (i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					this.closest('.js-popup-wrap').classList.add('select-active')
					if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
						this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
					}
					this.classList.add('active')
					let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
					let popupElementButton = element.querySelector('.js-btn-popup-toggle')
					popupElementButton.innerHTML = ''
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
					popupElementsClear()
					popupElementsClose()
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault()
						e.stopPropagation()
						return false
					}
				})
			}
		}
	})

	//js tabs
	const tabsNav = document.querySelectorAll('.js-tabs-nav')
	const tabsBlocks = document.querySelectorAll('.js-tab-block')
	const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
	const tabsButtonContent = document.querySelectorAll('.js-tab-content')
	function tabsActiveStart() {
		for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
			if (tabsBlocks[iTab].classList.contains('active')) {
				tabsBlocks[iTab].classList.remove('active')
			}
		}
		for (i = 0; i < tabsNav.length; i++) {
			let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
			for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
				if (tabsNavElements[iElements].classList.contains('active')) {
					let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
					for (j = 0; j < tabsBlocks.length; j++) {
						if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
							console.log(tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive))
							tabsBlocks[j].classList.add('active')
						}
					}
				}
			}
		}
		
	}
	for (i = 0; i < tabsButtonTitle.length; i++) {
		tabsButtonTitle[i].addEventListener('click', function (e) {
			this.classList.toggle('active')
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < tabsNav.length; i++) {
		tabsNav[i].addEventListener('click', function (e) {
			if (e.target.closest('[data-tab]')) {
				let tabsNavElements = this.querySelector('[data-tab].active')
				tabsNavElements ? tabsNavElements.classList.remove('active') : false
				e.target.closest('[data-tab]').classList.add('active')
				tabsActiveStart()
				e.preventDefault()
				e.stopPropagation()
				return false
			}
		})
	}
	tabsActiveStart()



	// Popups
	let popupCurrent;
	let popupsList = document.querySelectorAll('.popup-outer-box')

	document.querySelectorAll(".js-popup-open").forEach(function (element) {
	element.addEventListener("click", function (e) {
		document.querySelector(".popup-outer-box").classList.remove("active");
		document.body.classList.add("popup-open");

		popupCurrent = this.getAttribute("data-popup");
		document
		.querySelector(
			`.popup-outer-box[id="${popupCurrent}"
			]`
		)
		.classList.add("active");

		e.preventDefault();
		e.stopPropagation();
		return false;
		});
	});
	document.querySelectorAll(".js-popup-close").forEach(function (element) {
	element.addEventListener("click", function (event) {
		document.body.classList.remove("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}
		event.preventDefault();
		event.stopPropagation();
		});
	});
	document.querySelectorAll(".popup-outer-box").forEach(function (element) {
	element.addEventListener("click", function (event) {
		if (!event.target.closest(".popup-box")) {
		document.body.classList.remove("popup-open");
		document.body.classList.remove("popup-open-scroll");
		document.querySelectorAll(".popup-outer-box").forEach(function (e) {
			e.classList.remove("active");
				});
		return false;
			}
		});
	});



	//slider gallery
	const swiperSliderGallery = new Swiper('.slider-gallery .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-gallery-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-gallery-prev',
		},
		breakpoints: {
			640: {
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	
	});


	//slider partners
	const swiperSliderPartners = new Swiper('.slider-partners .swiper', {
		loop: false,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: {
			el: '.slider-partners-pagination',
			clickable: true,
		},
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-partners-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-partners-prev',
		},
		breakpoints: {
			640: {
				slidesPerView: 2,
			},
			768: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 4,
			},
		},
	
	});


	//slider main
	const swiperSliderMain = new Swiper('.slider-main .swiper', {
		loop: true,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-main-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-main-prev',
		},
	
	});


	//slider programms
	const swiperSliderProgramms = new Swiper('.slider-programms .swiper', {
		loop: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: false,
		centeredSlides: true,
		speed: 400,
		pagination: {
			el: '.slider-programms-pagination',
			clickable: true,
		},
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-programms-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-programms-prev',
		},
	
	});


	//slider tiles
	function initializeSwiper() {
		if (window.innerWidth < 1024) {
			const swiperSliderTiles = new Swiper('.slider-tiles .swiper', {
				loop: false,
				slidesPerView: 1,
				spaceBetween: 0,
				autoHeight: false,
				speed: 400,
				pagination: {
					el: '.slider-tiles-pagination',
					clickable: true,
				},
				autoplay: false,
				navigation: {
					nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-tiles-next',
					prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.but	ton-slider-tiles-prev',
				},
				breakpoints: {
					640: {
						slidesPerView: 2,
					},
					1024: {
						slidesPerView: 3,
					},
					1400: {
						slidesPerView: 4,
					},
				},
			});
		}
	}
	initializeSwiper();


	//slider tabs
	const swiperSliderTabs = new Swiper('.slider-tabs .swiper', {
		loop: false,
		slidesPerView: 3,
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-tabs-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-tabs-prev',
		},
		breakpoints: {
			480: {
				slidesPerView: 4,
			},
			640: {
				slidesPerView: 5,
			},
			768: {
				slidesPerView: 3,
			},
			1024: {
				slidesPerView: 4,
			},
			1400: {
				slidesPerView: 4,
			},
			1500: {
				slidesPerView: 5,
			},
		},
	
	});


})