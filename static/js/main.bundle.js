!function(){"use strict";function e(){$("[data-js=services]").find("[data-js=flipCard]").on("click",(function(){var e=$(this);e.closest("[data-js=card]").toggleClass("servicesCard_flipped","more"===e.data("type"))}))}function a(){var e=$("[data-js=difficultProblem]");$("[data-js=selectWithAnother]").on("change",(function(e){var a=$(e.target).parent(),t=a.data("name");if(99===Number(e.target.value)){var o=$("<input />",{type:"text",name:"reserve_"+t,placeholder:"industry"===t?"Ваша отрасль":"Опишите проблему",class:"form-control survey__anotherProblem"});o.insertAfter(a),o.focus()}else $("[name=another_"+t+"]").remove()})),function(e){let{onChange:a}=e;for(var t="scaleOfProblem",o=10,n=$("[data-js=scaleOfProblem]"),i=1;i<=o;i++){var l=$("<label />",{class:t+"__label"}),s=$("<input />",{class:t+"__input",type:"radio",value:i,name:"scale"}),r=$("<div />",{class:t+"__fakeInput"}),c=$("<span />",{class:t+"__number",text:i});l.append(s),l.append(r),l.append(c),n.append(l),s.on("change",(function(e){a(e.target.value)}))}}({onChange(a){e.toggleClass("difficultProblem_visible",Number(a)>=9)}})}function t(){var e=$("[data-js=modal]"),a=e.clone();$("[data-js=getService]");e.remove(),$(document).on("click","[data-js=getService]",(function(e){var t="modal_hide",o=$(e.target).data("reason"),n=a.find("[data-js=modalClose]"),i=function(){a.addClass(t),setTimeout((function(){a.removeClass(t),a.remove(),$("html").css({overflow:""})}),400)};$("html").css({overflow:"hidden"}),a.find("button[type=submit]").attr("name",o),a.css({display:"block"}),$("body").append(a),a.find("[name=fio]").focus(),$(document).on("keyup",(function(e){"Escape"===e.key&&i()})),n.on("click",i)}))}function o(){let e=!1;const a=$("[data-js=loginForm]"),t=a.find("[data-js=loginFormButton]");a.on("submit",(function(o){if(o.preventDefault(),e)return;const n=t.find("[data-js=loginFormButtonText]"),i=$('\n      <div class="auth__error" data-js="loginFormError">\n        Не получается авторизоваться :(<br />\n        <button class="auth__errorButton" type="button" data-js="getService">Напишите нам</button>.\n      </div>\n    '),l=$('<lottie-player src="/static/lottie/loading.json" class="auth__buttonLoading" background="transparent"  speed="1"  loop autoplay></lottie-player>');n.css({opacity:0}),t.append(l),e=!0,setTimeout((()=>{n.css({opacity:1}),l.remove(),0===a.find("[data-js=loginFormError]").length&&a.append(i),e=!1}),2e3)}))}function n(){$(document).on("click","[data-ym]",(function(e){const a=$(this),t=a.data("ym"),o=/^link/.test(t);o&&e.preventDefault(),ym(92316235,"reachGoal",t),o&&window.location.replace(a.attr("href"))}))}jQuery(document).ready((function(i){if(i(window).scroll((function(){i(this).scrollTop()>100?(i(".back-to-top").fadeIn("slow"),i("#header").addClass("header-fixed")):(i(".back-to-top").fadeOut("slow"),i("#header").removeClass("header-fixed"))})),i(".back-to-top").click((function(){return i("html, body").animate({scrollTop:0},1500,"easeInOutExpo"),!1})),AOS.init(),i(".nav-menu").superfish({animation:{opacity:"show"},speed:400}),i("#nav-menu-container").length){var l=i("#nav-menu-container").clone().prop({id:"mobile-nav"});l.find("> ul").attr({class:"",id:""}),i("body").append(l),i("body").prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>'),i("body").append('<div id="mobile-body-overly"></div>'),i("#mobile-nav").find(".menu-has-children").prepend('<i class="fa fa-chevron-down"></i>'),i(document).on("click",".menu-has-children i",(function(e){i(this).next().toggleClass("menu-item-active"),i(this).nextAll("ul").eq(0).slideToggle(),i(this).toggleClass("fa-chevron-up fa-chevron-down")})),i(document).on("click","#mobile-nav-toggle",(function(e){i("body").toggleClass("mobile-nav-active"),i("#mobile-nav-toggle i").toggleClass("fa-times fa-bars"),i("#mobile-body-overly").toggle()})),i(document).click((function(e){var a=i("#mobile-nav, #mobile-nav-toggle");a.is(e.target)||0!==a.has(e.target).length||i("body").hasClass("mobile-nav-active")&&(i("body").removeClass("mobile-nav-active"),i("#mobile-nav-toggle i").toggleClass("fa-times fa-bars"),i("#mobile-body-overly").fadeOut())}))}else i("#mobile-nav, #mobile-nav-toggle").length&&i("#mobile-nav, #mobile-nav-toggle").hide();i(".nav-menu a, #mobile-nav a, .scrollto").on("click",(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=i(this.hash);if(e.length){var a=0;return i("#header").length&&(a=i("#header").outerHeight(),i("#header").hasClass("header-fixed")||(a-=20)),i("html, body").animate({scrollTop:e.offset().top-a},1500,"easeInOutExpo"),i(this).parents(".nav-menu").length&&(i(".nav-menu .menu-active").removeClass("menu-active"),i(this).closest("li").addClass("menu-active")),i("body").hasClass("mobile-nav-active")&&(i("body").removeClass("mobile-nav-active"),i("#mobile-nav-toggle i").toggleClass("fa-times fa-bars"),i("#mobile-body-overly").fadeOut()),!1}}})),i(".gallery-popup").magnificPopup({type:"image",removalDelay:300,mainClass:"mfp-fade",gallery:{enabled:!0},zoom:{enabled:!0,duration:300,easing:"ease-in-out",opener:function(e){return e.is("img")?e:e.find("img")}}}),e(),a(),t(),o(),n(),i("[data-js=phoneMask]").mask("+ 7 (999) 999 99 99")}))}();
//# sourceMappingURL=main.bundle.js.map