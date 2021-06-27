$('#loginBtn').click(function(e) {
    $('.login-modal').addClass('active');
    e.preventDefault();
  });
  
  $('.login-modal').click(function(e) {
    $('.login-modal').removeClass('active');
    e.preventDefault();
  });