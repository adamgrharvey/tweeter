$(document).ready(function() {
  const mybutton = document.getElementById("scrollUpBtn");

  $('#scrollUpBtn').on('click', (evt) => {
    topFunction();
  })
  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};

  const scrollFunction = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
     mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
   }
  }

// When the user clicks on the button, scroll to the top of the document
  const topFunction = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
});
