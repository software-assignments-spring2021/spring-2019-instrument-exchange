Stripe.setPublishableKey('sk_test_K8TpMHDjlapM1Vp5kjoaxppN00ccillGae');
var $form = $('#checkout-form');
console.log("HELLO FROM STRIPE!");

$form.submit(function(event) {

  $form.find('button').prop('disabled', true);
  Stripe.card.createToken({
    number: $('#creditCardNum').val(),
    cvc: $('#cvvCode').val(),
    exp_month: $('#expirationMonth').val(),
    exp_year: $('#expirationYear').val(),
    name: $('#cardName').val()
  }, stripeResponseHandler);
  return false;
});

function stripeResponseHandler(status, response) {

  if (response.error) {
    // Show errors on form
    $('#charge-error').text(response.error.message);
    $('#charge-error').removeClass('hidden');
    $form.find('button').prop('disabled', false);

  } else {
    var token = response.id;
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    $form.get(0).submit();
  }
}
