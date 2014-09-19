<!-- Preloader -->

//<![CDATA[
	$(window).load(function() { // makes sure the whole site is loaded
		$('#status').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(350).css({'overflow':'visible'});
	})
//]]>

<!-- smoooth-->
	$(function() {
		$('a[href*=#]:not([href=#])').click(function() {
		  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
			  $('html,body').animate({
				scrollTop: target.offset().top
			  }, 1000);
			  return false;
			}
		  }
		});
	});
	


<!-- vwm_surveys -->	
	$(document).ready(function() {
            $(document).on('click','form.vwm_surveys_survey button[type="submit"]',function(e) {
                e.preventDefault();
                var form = $(this).closest('form');
                var action = $(form).attr('action');
        var save = $(this).attr('name') == 'save' ? true : false;
        var data = $(form).serialize();
        if (save) { data += '&save=true'; }
                $('div.error').remove();
                $.ajax({
                    type: 'POST',
                    url: action,
                    data: data,
                    success: function(data) {
                        if (typeof data.saved != 'undefined') {
                alert('Survey has been saved');
            }
            if ( ! data.complete ) {
                            $(form).load(data.hash_redirect + ' #' + $(form).attr('id') + ' > *');
                        }
                        else {
                            //alert('Survey Completed');
                            window.location = data.redirect;
                        }
                    },
                    error: function(data) {

                        var data = $.parseJSON(data.responseText);
                        var xid = data.xid;
                        $(form).find('input[name="XID"]').val(xid);

                        $.each(data.errors, function(question_id, error_list) {

                            var el = $('<div />').addClass('error');
                            $.each(error_list, function(index, error) {
                                $(el).append('<span />').text(error);
                            });

                            $(form).find('label[for="vwm_surveys_question_' + question_id + '"]').closest('li').after(el);
                        });
                    },
                    dataType: 'json'
                });
            });
        });
