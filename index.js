function playclip() {
  var audio = document.getElementsByTagName('audio')[0];
  audio.play();
}
$(document).ready(function() {
  $('.img').on('mouseenter', function() {
    if (!$(this).hasClass('.played')) {
      playclip();
      $(this).addClass('.played');
    }
  });
  $('.img').on('mouseleave', function() {
    if ($(this).hasClass('.played')) {
      $(this).removeClass('.played');
    }
  });
});
