
$.validator.setDefaults({
    
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },

    errorElement: 'span',
    errorClass: 'help-inline',

    errorPlacement: function(error, element) {
        $( element )
            .closest( "form" )
                .find( "label[for='" + element.attr( "id" ) + "']" )
                    .append( error );
    },
    submitHandler: function() {
        submitForm();
        //form.submit();
    }
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

$(document).ready(function() {
    
    $('.selectpicker').selectpicker();

    $("#myFavNoveltiesForm").validate({
        rules: {
            firstName: "required",
            lastName: "required",
            city: "required",
            state: "required",
            favNovelties: "required"
        },
        messages: {
            firstName: "  ( required )",
            lastName: "  ( required )",
            city: "  ( required )",
            state: "  ( required )",
            favNovelties: "  ( required )"
        }
    });

    var frm = document.getElementById("myFavNoveltiesForm");

    $('.clrFavForm').click(function(event) {
        console.log('####### > formValidation.js > clrFavForm > CLICK 1');
        if ( frm != null ) {
            frm.reset();
            $("#state").val('').trigger('change');
            $("#favNovelties").val('').trigger('change');
            $(frm).find(".form-group").removeClass("has-error"); 
            $(frm).data('validator').resetForm(); 
            //$('.selectpicker').selectpicker('refresh');
            //$('.selectpicker').selectpicker('deselectAll');
        }
        if ( this.id == 'cancelFormBtn' || this.id == 'navbarBrandBtn') {
            window.location.href= '/';
        }
    });




    $('.selectpicker').change(function(){

        if($(this).attr('id') == 'state'){
            console.log("############# formValidation.js > selectpicker > state")
            $(this).closest('.form-group').removeClass('has-error');
            var serr = $(this).closest("form").find("label[for='state']").find("span[id='state-error']");
            serr.remove();
        }

        if($(this).attr('id') == 'favNovelties'){
            console.log("############# formValidation.js > selectpicker > favNovelties")
            var selected = $(this).find("option:selected").val();
            var thisVal = $(this).val();
            if(selected != undefined){ 
                $(this).closest('.form-group').removeClass('has-error');
                var ferr = $(this).closest("form").find("label[for='favNovelties']").find("span[id='favNovelties-error']");
                ferr.remove();
            }
        }
    });
});



















