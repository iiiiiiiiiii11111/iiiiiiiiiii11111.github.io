(function($){
    let $navbar = $('.navbar-header');
    let navbar_offset = $navbar.innerHeight();
    function scrollToAnchor(target) {
      target = (typeof target === 'undefined' || typeof target === 'object') ? window.location.hash : target;
      target = target.replace(/:/g, '\\:');
      if($(target).length) {
        $('body').addClass('scrolling');
        $('html, body').animate({
          scrollTop: $(target).offset().top - navbar_offset
        }, 600, function () {
          $('body').removeClass('scrolling');
        });
      }
    }
    function fixScrollspy() {
      let $body = $('body');
      let data = $body.data('bs.scrollspy');
      if (data) {
        data.options.offset = navbar_offset;
        $body.data('bs.scrollspy', data);
        $body.scrollspy('refresh');
      }
    }
    window.addEventListener("hashchange", scrollToAnchor);
    $('#navbar-main li.nav-item a').on('click', function(event) {
      let hash = this.hash;
      if ( hash && $(hash).length && ($("#homepage").length > 0)) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: $(hash).offset().top - navbar_offset
        }, 800);
      }
    });
    $(document).on('click', '.navbar-collapse.in', function(e) {
      let targetElement = $(e.target).is('a') ? $(e.target) : $(e.target).parent();
      if (targetElement.is('a') && targetElement.attr('class') != 'dropdown-toggle') {
        $(this).collapse('hide');
      }
    });
    let $grid_projects = $('#container-projects');
    $grid_projects.imagesLoaded(function () {
      $grid_projects.isotope({
        itemSelector: '.isotope-item',
        layoutMode: 'masonry',
        filter: $('#default-project-filter').text()
      });
      $('#filters a').click(function () {
        let selector = $(this).attr('data-filter');
        $grid_projects.isotope({filter: selector});
        $(this).removeClass('active').addClass('active').siblings().removeClass('active all');
        return false;
      });
    });
    $(window).on('load', function() {
      if (window.location.hash) {
        if (window.location.hash == "#top") {
          window.location.hash = ""
        } else {
          scrollToAnchor();
        }
      }
      let $body = $('body');
      $body.scrollspy({offset: navbar_offset });
      let resizeTimer;
      $(window).resize(function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(fixScrollspy, 200);
      });
    });
  })(jQuery);  