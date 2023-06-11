const newUser = $('#new-user');
const welcome = $('#welcome');

$( function() {
  if (localStorage.getItem('name')) {
    newUser.find("label").first().text('Change Name: ');
    welcome.text(`Welcome to the Euro App, ${localStorage.getItem('name')}!`);
  }

  $("#submit-btn").click(function(){
    localStorage.setItem('name', $("#name-entry").val());
    welcome.text(`Welcome to the Euro App, ${localStorage.getItem('name')}!`);
  });

});
