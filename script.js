const menu = document.getElementById("navLinks");
const overlay = document.getElementById("overlay");
const projectsCount = document.getElementById("proCount");
const yearsCount = document.getElementById("yrCount");
const customersCount = document.getElementById("cusCount");
const slides = document.getElementById("clients");
const totalSlides = document.querySelectorAll(".slide").length;
const slide = document.querySelectorAll(".slide")
const dotsContainer = document.getElementById("dots");
const dots = document.querySelectorAll(".dot");
let index = 0;
let i = 0;

setInterval(() => { 
  if (i <= 162) {
    projectsCount.innerHTML = i + "+";
    i++;
  } else {
    clearInterval(); 
  }
}, 10); 
setInterval(() => {
  if (i >= 7, i <= 9) {
    yearsCount.textContent = i + "+";
    i++;
  } else {
    clearInterval(); 
  }
}, 40); 
setInterval(() => {
  if (i <= 200) {
    customersCount.textContent = i + "+";
    i++;
  } else{
    clearInterval(); 
  }
}, 50);

function showMenu(){
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
}

function SubmitNews(){
    alert("Thank you for subscribing to our Newsletter");
}

function isDesktop(){
  return window.innerWidth >= 768;
}
    

// Generate dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.addEventListener("click", () => {
    index = i;
    updateSlidePosition();
    updateDots();
  });
  dotsContainer.appendChild(dot);
}


function updateSlidePosition() {
  slides.style.transform = `translateX(-${index * 100}%)`;
  // First clear animations
  slide.forEach(lide => {
lide.style.animation = 'none';
});

// Get the target slide
const currentSlide = slide[index];

// Optional: force reflow to allow re-animation
void currentSlide.offsetWidth;

// Apply the animation to the new slide
currentSlide.style.animation = 'slide-in 8s ease forwards';
// currentSlide.style.tr = 'transform 3s ease-in';
if(isDesktop()){
  slides.style.transform = `none`;
}
}

function updateDots() {
const dots = document.querySelectorAll(".dot");
      dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}
/* function showSlide(index){
    slide.forEach((s, i) => {
      s.classList.remove('active');
      if (i === index) s.classList.add('active');
  });

} */

function nextSlide() {
  index = (index + 1) % totalSlides;
updateSlidePosition();
  updateDots();
  
  
}

function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides;
  updateSlidePosition();
  updateDots();
}

// Swipe logic
let startX = 0;
let endX = 0;

slides.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slides.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = endX - startX;
  if (swipeDistance > 50) prevSlide();
  else if (swipeDistance < -50) nextSlide();
}

// Auto slide
setInterval(() => {
  nextSlide();
}, 6000);

// Initialize dots
updateDots();