var stripe = Stripe('pk_test_eL7C4wl2pmBlYBp4mfwslAFu00kbiZA9eq');

var $form = $('#checkout-form');

$form.submit(function(event) {
  $form.find('button').prop('disabled', true);
  stripe.createToken({
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

  } else {
    var token = response.id;
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    $form.get(0).submit();
  }
}
