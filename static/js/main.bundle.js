!function(){"use strict";function e(){$("[data-js=services]").find("[data-js=flipCard]").on("click",(function(){var e=$(this);e.closest("[data-js=card]").toggleClass("servicesCard_flipped","more"===e.data("type"))}))}function a(){var e=$("[data-js=difficultProblem]");$("[data-js=selectWithAnother]").on("change",(function(e){var a=$(e.target).parent(),o=a.data("name");if(console.log($(e.target).parent()),99===Number(e.target.value)){var n=$("<input />",{type:"text",name:"reserve_"+o,placeholder:"industry"===o?"Ваша отрасль":"Опишите проблему",class:"form-control survey__anotherProblem"});n.insertAfter(a),n.focus()}else $("[name=another_"+o+"]").remove()})),function(e){let{onChange:a}=e;for(var o="scaleOfProblem",n=10,t=$("[data-js=scaleOfProblem]"),l=1;l<=n;l++){var i=$("<label />",{class:o+"__label"}),s=$("<input />",{class:o+"__input",type:"radio",value:l,name:"scale"}),r=$("<div />",{class:o+"__fakeInput"}),c=$("<span />",{class:o+"__number",text:l});i.append(s),i.append(r),i.append(c),t.append(i),s.on("change",(function(e){a(e.target.value)}))}}({onChange(a){e.toggleClass("difficultProblem_visible",Number(a)>=9)}})}function o(){var e=$("[data-js=modal]"),a=e.clone(),o=$("[data-js=getService]");e.remove(),o.on("click",(function(e){var o="modal_hide",n=$(e.target).data("reason"),t=a.find("[data-js=modalClose]"),l=function(){a.addClass(o),setTimeout((function(){a.removeClass(o),a.remove(),$("html").css({overflow:""})}),400)};console.log(n),$("html").css({overflow:"hidden"}),a.find("button[type=submit]").attr("name",n),$("body").append(a),a.find("[name=fio]").focus(),$(document).on("keyup",(function(e){"Escape"===e.key&&l()})),t.on("click",l)}))}jQuery(document).ready((function(n){if(n(window).scroll((function(){n(this).scrollTop()>100?(n(".back-to-top").fadeIn("slow"),n("#header").addClass("header-fixed")):(n(".back-to-top").fadeOut("slow"),n("#header").removeClass("header-fixed"))})),n(".back-to-top").click((function(){return n("html, body").animate({scrollTop:0},1500,"easeInOutExpo"),!1})),AOS.init(),n(".nav-menu").superfish({animation:{opacity:"show"},speed:400}),n("#nav-menu-container").length){var t=n("#nav-menu-container").clone().prop({id:"mobile-nav"});t.find("> ul").attr({class:"",id:""}),n("body").append(t),n("body").prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>'),n("body").append('<div id="mobile-body-overly"></div>'),n("#mobile-nav").find(".menu-has-children").prepend('<i class="fa fa-chevron-down"></i>'),n(document).on("click",".menu-has-children i",(function(e){n(this).next().toggleClass("menu-item-active"),n(this).nextAll("ul").eq(0).slideToggle(),n(this).toggleClass("fa-chevron-up fa-chevron-down")})),n(document).on("click","#mobile-nav-toggle",(function(e){n("body").toggleClass("mobile-nav-active"),n("#mobile-nav-toggle i").toggleClass("fa-times fa-bars"),n("#mobile-body-overly").toggle()})),n(document).click((function(e){var a=n("#mobile-nav, #mobile-nav-toggle");a.is(e.target)||0!==a.has(e.target).length||n("body").hasClass("mobile-nav-active")&&(n("body").removeClass("mobile-nav-active"),n("#mobile-nav-toggle i").toggleClass("fa-times fa-bars"),n("#mobile-body-overly").fadeOut())}))}else n("#mobile-nav, #mobile-nav-toggle").length&&n("#mobile-nav, #mobile-nav-toggle").hide();n(".nav-menu a, #mobile-nav a, .scrollto").on("click",(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var e=n(this.hash);if(e.length){var a=0;return n("#header").length&&(a=n("#header").outerHeight(),n("#header").hasClass("header-fixed")||(a-=20)),n("html, body").animate({scrollTop:e.offset().top-a},1500,"easeInOutExpo"),n(this).parents(".nav-menu").length&&(n(".nav-menu .menu-active").removeClass("menu-active"),n(this).closest("li").addClass("menu-active")),n("body").hasClass("mobile-nav-active")&&(n("body").removeClass("mobile-nav-active"),n("#mobile-nav-toggle i").toggleClass("fa-times fa-bars"),n("#mobile-body-overly").fadeOut()),!1}}})),n(".gallery-popup").magnificPopup({type:"image",removalDelay:300,mainClass:"mfp-fade",gallery:{enabled:!0},zoom:{enabled:!0,duration:300,easing:"ease-in-out",opener:function(e){return e.is("img")?e:e.find("img")}}}),e(),a(),o(),n("[data-js=phoneMask]").mask("+ 7 (999) 999 99 99")}))}();
//# sourceMappingURL=main.bundle.js.map