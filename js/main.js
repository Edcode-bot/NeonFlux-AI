(function ($) {
    "use strict";

// Loading screen
setTimeout(() => {
    document.querySelector('.loading-screen').style.display = 'none';
}, 3000);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});
const images = document.querySelectorAll('.blog-image');
const content = document.querySelectorAll('.blog-content');
const circles = document.querySelectorAll('.blog-circle');
let currentImage = 0;

// Function to update the current slide
function updateSlide(index) {
  images.forEach((image, i) => {
    image.classList.remove('active');
    content[i].classList.remove('active');
  });
  images[index].classList.add('active');
  content[index].classList.add('active');

  // Update active circle
  circles.forEach((circle, i) => {
    circle.classList.remove('active');
  });
  circles[index].classList.add('active');
}

// Initial setup
updateSlide(currentImage);

// Handle circle clicks
circles.forEach((circle, index) => {
  circle.addEventListener('click', () => {
    currentImage = index;
    updateSlide(index);
  });
});

// Auto-slide functionality (optional)
setInterval(nextImage, 3000); // Change image every 3 seconds

// Function to move to the next slide
function nextImage() {
  currentImage = (currentImage + 1) % images.length;
  updateSlide(currentImage);
}

   // Loading screen
setTimeout(() => {
    document.querySelector('.loading-screen').style.display = 'none';
}, 3000);
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('bg-primary shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('bg-primary shadow-sm').css('top', '-150px');
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: true,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });
    
})(jQuery);

