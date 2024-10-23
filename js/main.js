"use strict";

let aboutSwiper = document.querySelector('.about__slider');
if (aboutSwiper) {
   const swiper = new Swiper('.about__slider', {
      loop: true,
      effect: 'fade',
      speed: 1000,
      autoplay: {
         delay: 3000,
         disableOnInteraction: false,
         pauseOnMouseEnter: true,
      },
      navigation: {
         nextEl: '.about__next',
         prevEl: '.about__prev',
      },
   });
}

let advantagesSwiper = document.querySelector('.advantages__slider');
if (advantagesSwiper) {
   const swiper = new Swiper('.advantages__slider', {
      loop: true,
      effect: 'fade',
      speed: 1000,
      autoplay: {
         delay: 3000,
         disableOnInteraction: false,
         pauseOnMouseEnter: true,
      },
      navigation: {
         nextEl: '.advantages__next',
         prevEl: '.advantages__prev',
      },
   });
}

let reviewsSwiper = document.querySelector('.reviews__slider');
if (reviewsSwiper) {
   const swiper = new Swiper('.reviews__slider', {
      loop: true,
      speed: 1000,
      spaceBetween: 30,
      parallax: true,
      grabCursor: true,
      autoplay: {
         delay: 3000,
         disableOnInteraction: false,
         pauseOnMouseEnter: true,
      },
      navigation: {
         nextEl: '.reviews__next',
         prevEl: '.reviews__prev',
      },
   });
}

window.addEventListener('load', function () {
   let teamsSwiper = document.querySelector('.team__slider');
   if (teamsSwiper) {
      const swiper = new Swiper('.team__slider', {
         loop: true,
         speed: 1000,
         spaceBetween: 30,
         autoHeight: true,
         grabCursor: true,
         // autoplay: {
         //    delay: 3000,
         //    disableOnInteraction: false,
         //    pauseOnMouseEnter: true,
         // },
         navigation: {
            nextEl: '.team__next',
            prevEl: '.team__prev',
         },
      });
   }
});

// inputMask
let inputs = document.querySelectorAll('input[type="tel"]');
if (inputs) {
   let im = new Inputmask({
      mask: "+7 (999) 999-99-99",
      jitMasking: false,
      // clearMaskOnLostFocus: false,
      // placeholder: '9',
      showMaskOnHover: false,
      showMaskOnFocus: true,
   });
   im.mask(inputs);
}

// МЕНЮ БУРГЕР
let menu = document.querySelector('.icon-menu');
let menuBody = document.querySelector('.menu__body');
menu.addEventListener('click', function () {
   document.body.classList.toggle('_lock');
   menu.classList.toggle('_active');
   menuBody.classList.toggle('_active');
});

// ЛИПКИЙ HEADER
let header = document.querySelector('.header');

document.onscroll = function () {
   let scroll = window.scrollY;
   if (scroll > 0){
      header.classList.add('_fixed');
   } else {
      header.classList.remove('_fixed');
   }
}
// ПАРАЛАХ АНИМАЦИЯ МЫШЬЮ
const paralaxMouse = document.querySelectorAll('[data-prlx-mouse]');
if (paralaxMouse.length) {
   paralaxMouseInit(paralaxMouse);
}
function paralaxMouseInit(paralaxMouse) {
   paralaxMouse.forEach(el => {
      const paralaxMouseWrapper = el.closest('[data-prlx-mouse-wrapper]');

      // Коэф. X 
      const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100;
      // Коэф. У 
      const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100;
      // Напр. Х
      const directionX = el.hasAttribute('data-prlx-dxr') ? -1 : 1;
      // Напр. У
      const directionY = el.hasAttribute('data-prlx-dyr') ? -1 : 1;
      // Скорость анимации
      const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50;


      // Объявление переменных
      let positionX = 0, positionY = 0;
      let coordXprocent = 0, coordYprocent = 0;

      setMouseParallaxStyle();

      // Проверяю на наличие родителя, в котором будет считываться положение мыши
      if (paralaxMouseWrapper) {
         mouseMoveParalax(paralaxMouseWrapper);
      } else {
         mouseMoveParalax();
      }

      function setMouseParallaxStyle() {
         const distX = coordXprocent - positionX;
         const distY = coordYprocent - positionY;
         positionX = positionX + (distX * paramAnimation / 1000);
         positionY = positionY + (distY * paramAnimation / 1000);
         el.style.cssText = `transform: translate3D(${directionX * positionX / (paramСoefficientX / 5)}%,${directionY * positionY / (paramСoefficientY / 5)}%,0);`;
         requestAnimationFrame(setMouseParallaxStyle);
      }
      function mouseMoveParalax(wrapper = window) {
         wrapper.addEventListener("mousemove", function (e) {
            const offsetTop = el.getBoundingClientRect().top + window.scrollY;
            if (offsetTop >= window.scrollY || (offsetTop + el.offsetHeight) >= window.scrollY) {
               // Получение ширины и высоты блока
               const parallaxWidth = window.innerWidth;
               const parallaxHeight = window.innerHeight;
               // Ноль по середине
               const coordX = e.clientX - parallaxWidth / 2;
               const coordY = e.clientY - parallaxHeight / 2;
               // Получаем проценты
               coordXprocent = coordX / parallaxWidth * 100;
               coordYprocent = coordY / parallaxHeight * 100;
            }
         });
      }
   });
}


// СПОЙЛЕРЫ
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
   // Получение обычных спойлеров
   const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
      return !item.dataset.spollers.split(",")[0];
   });

   // Инициализация обычных спойлеров
   if (spollersRegular.length > 0) {
      initSpollers(spollersRegular);
   }

   // Получение спойлеров с медиа запросами
   const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
      return item.dataset.spollers.split(",")[0];
   });

   // Инициализация спойлеров с медиа запросами
   if (spollersMedia.length > 0) {
      const breakpointsArray = [];
      spollersMedia.forEach(item => {
         const params = item.dataset.spollers;
         const breakpoint = {};
         const paramsArray = params.split(",");
         breakpoint.value = paramsArray[0];
         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
         breakpoint.item = item;
         breakpointsArray.push(breakpoint);
      });

      // Получаем уникальные брейкпоинты
      let mediaQeries = breakpointsArray.map(function (item) {
         return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
      });
      mediaQeries = mediaQeries.filter(function (item, index, self) {
         return self.indexOf(item) === index;
      });

      // Работаем с каждым брейкпоинтом
      mediaQeries.forEach(breakpoint => {
         const paramsArray = breakpoint.split(",");
         const mediaBreakpoint = paramsArray[1];
         const mediaType = paramsArray[2];
         const matchMedia = window.matchMedia(paramsArray[0]);

         // Объекты с нужными условиями
         const spollersArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint && item.type === mediaType) {
               return true;
            }
         });
         // Событие
         matchMedia.addListener(function () {
            initSpollers(spollersArray, matchMedia);
         });
         initSpollers(spollersArray, matchMedia);
      });
   }
   // Инициализация
   function initSpollers(spollersArray, matchMedia = false) { 
      spollersArray.forEach(spollersBlock => {
         spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
         if (matchMedia.matches || !matchMedia) {
            spollersBlock.classList.add('_init');
            initSpollerBody(spollersBlock);
            spollersBlock.addEventListener('click', setSpollerAction);
         } else {
            spollersBlock.classList.remove('_init');
            initSpollerBody(spollersBlock, false);
            spollersBlock.removeEventListener('click', setSpollerAction);
         }
      });
   }
   // Работа с контентом
   function initSpollerBody(spollersBlock, hideSpollerBody = true) { 
      const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
      if (spollerTitles.length > 0) {
         spollerTitles.forEach(spollerTitle => {
            if (hideSpollerBody) {
               spollerTitle.removeAttribute('tabindex');
               if (!spollerTitle.classList.contains('_active')) {
                  spollerTitle.nextElementSibling.hidden = true;
               }
            } else {
               spollerTitle.setAttribute('tabindex', '-1');
               spollerTitle.nextElementSibling.hidden = false;
            }
         });
      }
   }
   function setSpollerAction(e) { 
      const el = e.target;
      if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) { 
         const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
         const spollersBlock = spollerTitle.closest('[data-spollers]');
         const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
         const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
         if (!spollersBlock.querySelectorAll('._slide').length) {
            if (oneSpoller && !spollerTitle.classList.contains('_active')) { 
               hideSpollersBody(spollersBlock);
            }
            spollerTitle.classList.toggle('_active');
            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
         }
         e.preventDefault();
      }
   }
   function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
      const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
      if (spollerActiveTitle) {
         spollerActiveTitle.classList.remove('_active');
         _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
      }
   }
   // Закрытие при клике вне спойлера
	const spollersClose = document.querySelectorAll('[data-spoller-close]');
	if (spollersClose.length) {
		document.addEventListener("click", function (e) {
			const el = e.target;
			if (!el.closest('[data-spollers]')) {
				spollersClose.forEach(spollerClose => {
					const spollersBlock = spollerClose.closest('[data-spollers]');
					const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
					spollerClose.classList.remove('_active');
					_slideUp(spollerClose.nextElementSibling, spollerSpeed);
				});
			}
		});
	}
}

// Вспомогательные модули плавного расскрытия и закрытия объекта ===========================================
let _slideUp = (target, duration = 500, h = 0) => { 
   if (!target.classList.contains('_slide') && !target.classList.contains('_showmore')) {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = target.offsetHeight + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => { 
         target.hidden = true;
         target.style.removeProperty('height');
         target.style.removeProperty('padding-top');
         target.style.removeProperty('padding-bottom');
         target.style.removeProperty('margin-top');
         target.style.removeProperty('margin-bottom');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
      }, duration);
   } else {
      target.classList.add('_slide');
      target.style.transitionProperty = 'height';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = h + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = h + 'px';
      window.setTimeout(() => { 
         target.classList.remove('_slide');
      }, duration);
   }
}
let _slideDown = (target, duration = 500, h = 0) => { 
   if (!target.classList.contains('_slide') && !target.classList.contains('_showmore')) {
      target.classList.add('_slide');
      if (target.hidden) {
         target.hidden = false;
      }
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      window.setTimeout(() => { 
         target.style.removeProperty('height');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('_slide');
      }, duration);
   } else {
      target.classList.add('_slide');
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = h + 'px';
      target.style.transitionProperty = 'height';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = h + 'px';
      window.setTimeout(() => { 
         target.classList.remove('_slide');
      }, duration);
   }
}
let _slideToggle = (target, duration = 500, h = 0) => { 
   if (target.hidden) {
      return _slideDown(target, duration, h);
   } else {
      return _slideUp(target, duration, h);
   }
}
let _slideRemove = (target, duration = 500, h = 0) => {
   target.style.removeProperty('height');
   target.style.removeProperty('overflow');
   target.style.removeProperty('transition-duration');
   target.style.removeProperty('transition-property');
}
// POPUP
const popupLinks = document.querySelectorAll('[data-popup]');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll("[data-lp]");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++){
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.dataset.popup;
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}
const popupCloseIcon = document.querySelectorAll('[data-close]');
if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++){
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   }
}

function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup._open');
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add('_open');
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('_open');
      if (doUnlock) {
         bodyUnLock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

   if (lockPadding.length > 0) {

      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];

         el.style.paddingRight = lockPaddingValue;
      }
   }   
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('_lock');

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
         }
      }   
      body.style.paddingRight = '0px';
      body.classList.remove('_lock');
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

document.addEventListener('keydown', function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector('.popup._open');
      popupClose(popupActive);
   }
});

(function () {
   // проверяем поддержку
   if (!Element.prototype.closest) {
      // реализуем
      Element.prototype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null;
      }
   }
})();
(function () {
   // проверяем поддержку
   if (!Element.prototype.matches) {
      // определяем свойство
      Element.prototype.matches = Element.prototype.matchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.msMatchesSelector;
   }
})();
// ВАЛИДАЦИЯ ФОРМЫ
let forms = document.querySelectorAll('form');
if (forms.length > 0) { 
   intitForms(forms);
   function intitForms(forms) {
      for (let i = 0; i < forms.length; i++){
         initForm(forms[i]);
      }
   
      function initForm(form) { 
         form.addEventListener('submit', formSend);
   
         async function formSend(e) {
            e.preventDefault();
   
            let error = formValidate(form);
   
            // для отправки спомощью AJAX
            const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
            const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
            const formData = new FormData(form);
   
            if (error === 0) {
               // для отправки спомощью AJAX
               const response = await fetch(formAction, {
                  method: formMethod,
                  body: formData
               });
               
               if (response.ok) {
                  let result = await response.json(); 
                  let popup = document.getElementById('popup');
                  form.reset();
                  function open(e) {
                     const popupName = 'popup';
                     const curentPopup = document.getElementById(popupName);
                     popupOpen(curentPopup);
                  }
                  open();
               }else{
                  alert('Ошибка');
               }
            }
         }
   
         function formValidate(form) { 
            let error = 0;
            let formReq = form.querySelectorAll('._req');
   
            for (let i = 0; i < formReq.length; i++){
               const input = formReq[i];
               formRemoveError(input);
               // проверяем input на email
               if (input.classList.contains('_email')) {
                  if (emailTest(input)) {
                     formAddError(input);
                     error++;
                  }
               // проверяем input на checkbox
               } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                  formAddError(input);
                  error++;
               } else if(input.getAttribute('type') === 'tel') {
                  // проверяем input на пустые поля
                  if (!telTest(input)) {
                     formAddError(input);
                     error++;
                  }
               } else {
                  // проверяем input на пустые поля
                  if (input.value === '') {
                     formAddError(input);
                     error++;
                  }
               }
            }
            
            return error;
         }
         // Функция для добавления класса error
         function formAddError(input) { 
            input.parentElement.classList.add('_error');
            input.classList.add('_error');
         }
         // Функция для удаления класса error
         function formRemoveError(input) { 
            input.parentElement.classList.remove('_error');
            input.classList.remove('_error');
            let p = input.parentElement.querySelector('.message');
            if (p) {
               p.remove();
            }
         }
         // Функия теста email
         function emailTest(input) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
         }
         // Функия теста tel
         function telTest(input) {
            return /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value);
         }
      }
   }
}
const animItems = document.querySelectorAll('._anim-items');
if (animItems.length > 0) {
   window.addEventListener('scroll', animOnScroll);
   function animOnScroll() {
      for (let index = 0; index < animItems.length; index++){
         const animItem = animItems[index];
         const animItemHeight = animItem.offsetHeight;
         const animItemOffset = offset(animItem).top;
         const animStart = 4;

         let animItemPoint = window.innerHeight - animItemHeight / animStart;
         if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
         }

         if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
            animItem.classList.add('_active');
         } else {
            if (!animItem.classList.contains('_anim-no-hide')) {
               animItem.classList.remove('_active');
            }
         }
      }
   }
   function offset(el) {
      const rect = el.getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
   }

   setTimeout(() => {
      animOnScroll();
   }, 300);
}