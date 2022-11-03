import * as flsFunctions from "./modules/functions.js";
flsFunctions.isWebP();
//flsFunctions.isMobile();


import VanillaScrollspy from 'vanillajs-scrollspy';
const menu = document.querySelector('#navbar');
if (menu) {
    const scrollspy = VanillaScrollspy({ menu });
    scrollspy.init();
}

import Sticky from './modules/sticky-js/sticky.js';
var sticky = new Sticky('[data-sticky]', {});
window.addEventListener('resize', function (event) {
    sticky.update();
});

import InputMask from './modules/input-mask/inputmask.js';
var inputmask = new InputMask('input[type="tel"]', {
    layout: 'data-mask'
});

import Swiper, { Navigation, Autoplay, Zoom, Lazy } from 'swiper';
import { escapeSelector } from "jquery";
Swiper.use([Navigation, Autoplay, Zoom, Lazy]);


const swiperSlider = new Swiper('.slider', {
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    speed: 1000,
    zoom: {
        maxRatio: 2,
    },
    preloadImages: false,
    checkInView: true,
    lazy: true,
    // lazy: {
    //     loadPrevNext: true,
    // },
});

//для увеличения и перетаскивания картинки
const swiperZoom = new Swiper('.swiper-zoom', {
    slidesPerView: 1,
    loop: false,
    centeredSlides: true,
    autoHeight: true,
    navigation: {},
    preloadImages: false,
    lazy: true,
    checkInView: true,
    zoom: {
        maxRatio: 2,
    },
    on: {
        click: function (swiper, event) {
            this.zoom.toggle();
        }
    },
    breakpoints: {
        // when window width is >= 992px
        992: {
            enabled: false
        }
    }
});

//для увеличения и перетаскивания svg с интерактивными областями
Array.prototype.forEach.call(document.querySelectorAll('.swiper-zoom-svg'), (swiperZoom) => {
    var swiperZoomSvg = new Swiper(swiperZoom, {
        slidesPerView: 1,
        loop: false,
        centeredSlides: true,
        autoHeight: true,
        navigation: {},
        zoom: {
            maxRatio: 2,
        },
        on: {
            click: function (swiper, event) {
                //отменим увеличение, если кликнули на область, по клику на который должен открыться modal
                var arrPath  = [];
                Array.prototype.forEach.call(arrInteractiveSvg, (el) => {
                    arrPath.push(el.id);
                });
                if (arrPath.indexOf(event.target.id) == -1)// element not found
                {
                    this.zoom.toggle();
                }
                // else {
                //     //this.zoom.disable();
                // }
            },

        },
        breakpoints: {
            // when window width is >= 992px
            992: {
                enabled: false
            }
        }
    });
    // document.addEventListener("click", function (event) {
    //     swiperZoomSvg.zoom.in();
    //     console.log(swiperZoomSvg.zoom.in)
    //     console.log(swiperZoomSvg.zoom.out)
    // });

});


// import Lightense from 'lightense-images';
// window.addEventListener('load', function () {
//     var el = document.querySelectorAll('.lightense');
//     Lightense(el, {
//         time: 300,
//         padding: 10,
//         offset: 40,
//         keyboard: true,
//         cubicBezier: 'cubic-bezier(.2, 0, .1, 1)',
//         background: 'rgba(46, 48, 54, .9)',
//         zIndex: 50,
//         beforeShow(config) {
//             document.querySelector('body').classList.add('img-enlarge');

//         },
//         afterShow(config) {
//         },
//         beforeHide(config) {
//         },
//         afterHide(config) {
//             document.querySelector('body').classList.remove('img-enlarge');
//         }
//     });
// }, false);


// (function () {
// 	'use strict'

// 	// Fetch all the forms we want to apply custom Bootstrap validation styles to
// 	var forms = document.querySelectorAll('.needs-validation')

// 	// Loop over them and prevent submission
// 	Array.prototype.slice.call(forms)
// 		.forEach(function (form) {
// 			form.addEventListener('submit', function (event) {
// 				if (!form.checkValidity()) {
// 					event.preventDefault()
// 					event.stopPropagation()
// 				}

// 				form.classList.add('was-validated')
// 			}, false)
// 		})
// })();





addEventListener('DOMContentLoaded', () => {

    flsFunctions.interactiveSvg(arrInteractiveSvg);

    flsFunctions.modals();
    flsFunctions.tabs();
    flsFunctions.mobileMenu();
    flsFunctions.scrollTopButton();
    flsFunctions.fixMobileWindowHeigh();

    addEventListener('resize', (event) => {
        flsFunctions.fixMobileWindowHeigh();
    });


    addEventListener('scroll', (event) => {

    });


});





