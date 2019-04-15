$( document ).ready(function() {
    $(".service").change(function() {
       // getting value from both slider and price.
       $("#slider-value").val($("#zip-slider").val() + " miles");
    });
    console.log($("#price").val());

});