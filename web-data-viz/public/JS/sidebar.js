
 const hamburgerMenu = document.getElementById('h-menu');
 const line1 = document.getElementById('line-1');
 const line2 = document.getElementById('line-2');
 const line3 = document.getElementById('line-3');

 function mostrarMenu() {

     if (hamburgerMenu.classList.contains('change-menu')) {
         hamburgerMenu.classList.remove('change-menu');
         line1.classList.remove('change-menu');
         line2.classList.remove('change-menu');
         line3.classList.remove('change-menu');
     } else {
         hamburgerMenu.classList.add('change-menu');
         line1.classList.add('change-menu');
         line2.classList.add('change-menu');
         line3.classList.add('change-menu');
     }
 }