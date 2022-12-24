import './main.scss';

jQuery(document).ready(function($) {

  // Header fixed and Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
      $('#header').addClass('header-fixed');
    } else {
      $('.back-to-top').fadeOut('slow');
      $('#header').removeClass('header-fixed');
    }
  });
  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the AOS animation library
  AOS.init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smoth scroll on page hash links
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Gallery - uses the magnific popup jQuery plugin
  $('.gallery-popup').magnificPopup({
    type: 'image',
    removalDelay: 300,
    mainClass: 'mfp-fade',
    gallery: {
      enabled: true
    },
    zoom: {
      enabled: true,
      duration: 300,
      easing: 'ease-in-out',
      opener: function(openerElement) {
        return openerElement.is('img') ? openerElement : openerElement.find('img');
      }
    }
  });

  /**
   * Блок "Услуги"
   * - Анимация переворачивания карточек
   */
  services();
  survey();
  modal();
  loginForm();

  $('[data-js=phoneMask]').mask('+ 7 (999) 999 99 99');
});

// Service block
function services () {
  var $services = $('[data-js=services]');
  var $button = $services.find('[data-js=flipCard]');

  $button.on('click', function () {
    var $this = $(this);
    var $card = $this.closest('[data-js=card]');

    $card.toggleClass('servicesCard_flipped', $this.data('type') === 'more');
  });
}
function survey () {
  var className = 'difficultProblem';
  var $difficultProblem = $('[data-js=difficultProblem]');
  var $selectWithAnother = $('[data-js=selectWithAnother]');

  $selectWithAnother.on('change', function (e) {
    var $selectContainer = $(e.target).parent();
    var name = $selectContainer.data('name');

    if (Number(e.target.value) === 99) {
      var $input = $(
        '<input />',
        {
          type: 'text',
          name: 'reserve_' + name,
          placeholder: (name === 'industry' ? 'Ваша отрасль' : 'Опишите проблему'),
          class: 'form-control survey__anotherProblem',
        },
      );

      $input.insertAfter($selectContainer);
      $input.focus();
    } else {
      $('[name=another_' + name + ']').remove();
    }
  });

  scaleOfProblem({
    onChange (value) {
      $difficultProblem.toggleClass(className + '_visible', Number(value) >= 9);
    },
  });
};
function scaleOfProblem ({ onChange }) {
  var className = 'scaleOfProblem';
  var numberOfPoints = 10;
  var $block = $('[data-js=scaleOfProblem]');

  for (var i = 1; i <= numberOfPoints; i++) {
    var $label = $(
      '<label />',
      { class: className + '__label' },
    );
    var $input = $(
      '<input />',
      {
        class: className + '__input',
        type: 'radio',
        value: i,
        name: 'scale',
      },
    );
    var $fakeInput = $(
      '<div />',
      { class: className + '__fakeInput' },
    );
    var $number = $(
      '<span />',
      {
        class: className + '__number',
        text: i,
      },
    );

    $label.append($input);
    $label.append($fakeInput);
    $label.append($number);
    $block.append($label);

    $input.on('change', function (e) {
      onChange(e.target.value);
    });
  }
}
function modal () {
  var $modal = $('[data-js=modal]');
  var $modalClone = $modal.clone();
  var $button = $('[data-js=getService]');

  $modal.remove();

  $(document).on('click', '[data-js=getService]',  function (e) {
    var hideClassName = 'modal_hide';
    var reason = $(e.target).data('reason');
    var $closeButton = $modalClone.find('[data-js=modalClose]');
    var close = function () {
      $modalClone.addClass(hideClassName);

      setTimeout(
        function () {
          $modalClone.removeClass(hideClassName);
          $modalClone.remove();
          $('html').css({ overflow: '' });
        },
        400,
      )
    };

    $('html').css({ overflow: 'hidden' });
    $modalClone.find('button[type=submit]').attr('name', reason);
    $modalClone.css({ display: 'block' });
    $('body').append($modalClone);

    $modalClone.find('[name=fio]').focus();

    $(document).on('keyup', function(e) {
      if (e.key === 'Escape') {
        close();
      }
    });
    $closeButton.on('click', close);
  });
}

function loginForm () {
  let disabled = false;
  const $form = $('[data-js=loginForm]');
  const $button = $form.find('[data-js=loginFormButton]');

  $form.on('submit', function (e) {
    e.preventDefault();

    if (disabled) return;

    const $buttonText = $button.find('[data-js=loginFormButtonText]');
    const $error = $(`
      <div class="auth__error" data-js="loginFormError">
        Не получается авторизоваться :(<br />
        <button class="auth__errorButton" type="button" data-js="getService">Напишите нам</button>.
      </div>
    `);
    const $lottie = $('<lottie-player src="/static/lottie/loading.json" class="auth__buttonLoading" background="transparent"  speed="1"  loop autoplay></lottie-player>');

    $buttonText.css({ opacity: 0 });

    $button.append($lottie);

    disabled = true;

    setTimeout(
      () => {
        $buttonText.css({ opacity: 1 });
        $lottie.remove();

        if ($form.find('[data-js=loginFormError]').length === 0) {
          $form.append($error);
        }

        disabled = false;
      },
      2000,
    );
  });
}