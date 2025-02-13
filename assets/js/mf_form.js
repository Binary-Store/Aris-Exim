(function ($) {
    "use strict";

    $("form.mf_form_validate").each(function () {
        $(this).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    number: true,
                },
                password: "required",
                repeat_password: {
                    equalTo: "#password_field"
                }
            }
        });
    });

    $("form.ajax_submit").on('submit', function (e) {
        e.preventDefault();
        var has_errors = false,
            form = $(this),
            submit_btn = $('#submit_form'),
            form_fields = form.find('input'),
            form_message = form.find('textarea');
        var server_result_display = form.find('.server_response');



        form_fields.each(function () {
            if ($(this).hasClass('error')) {
                has_errors = true;
            }
        });

        if (form_message.length > 0) {
            if (form_message.hasClass('error')) {
                has_errors = true;
            }
        }

        var datastring = form.serialize();

        console.log(typeof datastring);
        console.log(datastring);

        if (!has_errors) {
            submit_btn.attr('disabled', true).html('Please wait...');
            $.ajax({
                type: "POST",
                url: form.attr('action'),
                data: datastring,
                success: function (data) {
                    var response = jQuery.parseJSON(data);
                    if (response.status == 'error') {
                        server_result_display.empty().html('<div class="mb-0 mt-3 alert alert-danger  alert-dismissible">' + response.errors + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                    } else if (response.status == 'success') {
                        server_result_display.empty().html('<div class="mb-0 mt-3 alert alert-success  alert-dismissible">' + response.message + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');

                        setTimeout(function () {
                            $('form.ajax_submit .mf_alert').fadeOut(500);
                        }, 1500);
                        // form.trigger("reset");
                    }
                    submit_btn.removeAttr('disabled').html('Submit');
                },
                error: function () {
                    submit_btn.removeAttr('disabled').html('Submit');
                    server_result_display.empty().html('<div class="mb-0 mt-3 alert alert-danger  alert-dismissible">Server error! Please try again...<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                }
            });
        }

        return false;
    });
})(jQuery);