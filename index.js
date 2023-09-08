const carouselFrames = Array.from(document.querySelectorAll('.carousel-frame'));

function makeCarousel(frame) {
  const carouselSlide = frame.querySelector('.carousel-slide');
  const carouselImages = getImagesPlusClones();
  const prevBtn = frame.querySelector('.carousel-prev');
  const nextBtn = frame.querySelector('.carousel-next');
  const navDots = Array.from(frame.querySelectorAll('.carousel-dots li'));

  let imageCounter = 1;

  function getImagesPlusClones() {
    let images = frame.querySelectorAll('.carousel-slide img');

    const firstClone = images[0].cloneNode();
    const lastClone = images[images.length - 1].cloneNode();

    firstClone.className = 'first-clone';
    lastClone.className = 'last-clone';

    // we need clones to make an infinite loop effect
    carouselSlide.append(firstClone);
    carouselSlide.prepend(lastClone);

    // must reassign images to include the newly cloned images
    images = frame.querySelectorAll('.carousel-slide img');

    return images;
  }

  function initializeNavDots() {
    if (navDots.length) navDots[0].classList.add('active-dot');
  }

  function initializeCarousel() {
    carouselSlide.style.transform = 'translateX(-100%)';
  }

  function slideForward() {
    // first limit counter to prevent fast-change bugs
    if (imageCounter >= carouselImages.length - 1) return;
    carouselSlide.style.transition = 'transform 400ms';
    imageCounter++;
    carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
  }

  function slideBack() {
    // first limit counter to prevent fast-change bugs
    if (imageCounter <= 0) return;
    carouselSlide.style.transition = 'transform 400ms';
    imageCounter--;
    carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
  }

  function makeLoop() {
    // instantly move from clones to originals to produce 'infinite-loop' effect
    if (carouselImages[imageCounter].classList.contains('last-clone')) {
      carouselSlide.style.transition = 'none';
      imageCounter = carouselImages.length - 2;
      carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
    }

    if (carouselImages[imageCounter].classList.contains('first-clone')) {
      carouselSlide.style.transition = 'none';
      imageCounter = carouselImages.length - imageCounter;
      carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
    }
  }

  function goToImage(e) {
    carouselSlide.style.transition = 'transform 400ms';
    imageCounter = 1 + navDots.indexOf(e.target);
    carouselSlide.style.transform = `translateX(-${100 * imageCounter}%)`;
  }

  function highlightCurrentDot() {
    navDots.forEach((dot) => {
      if (navDots.indexOf(dot) === imageCounter - 1) {
        dot.classList.add('active-dot');
      } else {
        dot.classList.remove('active-dot');
      }
    });
  }

  function addBtnListeners() {
    nextBtn.addEventListener('click', slideForward);
    prevBtn.addEventListener('click', slideBack);
  }

  function addNavDotListeners() {
    navDots.forEach((dot) => {
      dot.addEventListener('click', goToImage);
    });
  }

  function addTransitionListener() {
    carouselSlide.addEventListener('transitionend', () => {
      makeLoop();
      highlightCurrentDot();
    });
  }

  function autoAdvance() {
    let play = setInterval(slideForward, 5000);

    frame.addEventListener('mouseover', () => {
      clearInterval(play); // pause when mouse enters carousel
    });

    frame.addEventListener('mouseout', () => {
      play = setInterval(slideForward, 5000); // resume when mouse leaves carousel
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(play); // pause when user leaves page
      } else {
        play = setInterval(slideForward, 5000); // resume when user returns to page
      }
    });
  }

  function buildCarousel() {
    initializeCarousel();
    initializeNavDots();
    addNavDotListeners();
    addBtnListeners();
    addTransitionListener();
    autoAdvance();
  }

  buildCarousel();
}

carouselFrames.forEach(frame => makeCarousel(frame));







* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	/* --blue: #3d5056;
    --gray: #9da2a8;
    --brown: #924e3b; */
	font-family: "Quicksand", sans-serif;
}

section {
  position: relative;
  z-index: 3;
  padding-top: 50px;
  padding-bottom: 50px;
} *
.container {
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
}

.section-header {
  margin-bottom: 50px;
  text-align: center;
}

.section-header h2 {
  color: #FFF;
  font-weight: bold;
  font-size: 3em;
  margin-bottom: 20px;
}

.section-header p {
  color: #FFF;
}

.row  {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.contact-info {
  width: 50%;
}

.contact-info-item {
  display: flex;
  margin-bottom: 30px;
}

.contact-info-icon {
  height: 70px;
  width: 70px;
  background-color: #fff;
  text-align: center;
  border-radius: 50%;
}

.contact-info-icon i {
  font-size: 30px;
  line-height: 70px;
}

.contact-info-content {
  margin-left: 20px;
}

.contact-info-content h4 {
  color: #1da9c0;
  font-size: 1.4em;
  margin-bottom: 5px;
}

.contact-info-content p {
  color: #FFF;
  font-size: 1em;
}

.contact-form {
  background-color: #fff;
  padding: 40px;
  width: 45%;
  padding-bottom: 20px;
  padding-top: 20px;
}

.contact-form h2 {
  font-weight: bold;
  font-size: 2em;
  margin-bottom: 10px;
  color: #333;
}

.contact-form .input-box {
  position: relative;
  width: 100%;
  margin-top: 10px;
}

.contact-form .input-box input,
.contact-form .input-box textarea{
  width: 100%;
  padding: 5px 0;
  font-size: 16px;
  margin: 10px 0;
  border: none;
  border-bottom: 2px solid #333;
  outline: none;
  resize: none;
}

.contact-form .input-box span {
  position: absolute;
  left: 0;
  padding: 5px 0;
  font-size: 16px;
  margin: 10px 0;
  pointer-events: none;
  transition: 0.5s;
  color: #666;
}

.contact-form .input-box input:focus ~ span,
.contact-form .input-box textarea:focus ~ span{
  color: #e91e63;
  font-size: 12px;
  transform: translateY(-20px);
}

.contact-form .input-box input[type="submit"]
{
  width: 100%;
  background: #00bcd4;
  color: #FFF;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 18px;
  border: 1px solid #00bcd4;
  transition: 0.5s;
} */