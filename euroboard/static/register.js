$( function() {
  $("#submit-btn").click(function() {
    if (confirm('Warning: Your password will not be stored securely. Have '
      + 'you used a password unrelated to all your other passwords?'))
    {
      $("#register-form").submit();
    }
  })
})
