$( document ).ready(function() {
    $(".service").change(function() {
       // getting value from both slider and price.
       $("#slider-value").val($("#zip-slider").val() + " miles");
       // const $priceSort = $("#price").val();
       // console.log($distance);
       // console.log($priceSort);
    });
});