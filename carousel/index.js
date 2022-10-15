const carousel = document.querySelector(".carousel");
const images = document.querySelector(".carousel__images");
const allImages = images.querySelectorAll(".carousel__image");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const dotsContainer = document.querySelector(".carousel__dots");
const AllDots = document.querySelectorAll(".carousel__dot");


// throttle slider
let lastClicked = 0;
function throttle(callback, delay) {
    function throttleTimeout(val1, val2) {
        let now = Date.now();
        if (lastClicked < now) {
            lastClicked = now + delay;
            callback(val1, val2, delay)
            console.log("throttle invoked")
        } else {
            console.log(lastClicked, "throttle function is disabled, come again after 5 seconds.")
        }
    }
    return throttleTimeout;
}

const transitionProperty = "transform";
const transitionTimingFunction = "linear";

// throttle time and duration time should be equal and more than transition duration
const transitionDuration = "1000ms";
const throttleTime = 1000;

// restart time should be negligible small as compare to 
let currentSlide = 1;
const autoSlideTime = 4000;
images.style.transform = "translateX(" + (-100 * currentSlide) + "%)";
let autoSlideId = setTimeout(nextSlide, autoSlideTime);

function currentFrame(currentFrameIndex) {
    images.style.transitionProperty = transitionProperty;
    images.style.transitionDuration = transitionDuration;
    images.style.transitionTimingFunction = transitionTimingFunction;
    images.style.transform = "translateX(" + (-100 * currentFrameIndex) + "%)";
}

function clearTImers() {
    if (autoSlideId) {
        console.log("clear timers")
        clearTimeout(autoSlideId)
    }
}

function nextSlide(e = null) {
    if (currentSlide > (allImages.length - 2)) {
        return false;
    }

    if (e) {
        console.log(e.type, "next")
    }

    clearTImers()
    currentSlide++;
    currentFrame(currentSlide)
}

function prevSlide(e) {
    if (currentSlide < 1) {
        return false;
    }

    if (e) {
        console.log(e.type, "next")
    }

    clearTImers()
    currentSlide--;
    currentFrame(currentSlide)
}

nextButton.addEventListener("click", throttle((e) => {
    nextSlide(e)
}, throttleTime))

prevButton.addEventListener("click", throttle((e) => {
    prevSlide(e)
}, throttleTime))

AllDots.forEach((dot, index) => {
    dot.addEventListener("click", throttle((e) => {
        console.log(e.type)
        clearTImers()
        currentSlide = index + 1;
        currentFrame(currentSlide)
    }, throttleTime))
})

images.addEventListener("transitionrun", throttle((e) => {
    console.log(e.type)
}, throttleTime))

images.addEventListener("transitionend", function (e) {
    console.log(currentSlide)

    if (allImages[currentSlide].id == "last-clone") {
        images.style.transitionProperty = "none";
        currentSlide = allImages.length - 1 - 1;
        images.style.transform = "translateX(" + (-100 * currentSlide) + "%)";
    }

    if (allImages[currentSlide].id == "first-clone") {
        images.style.transitionProperty = "none";
        currentSlide = allImages.length - currentSlide;
        images.style.transform = "translateX(" + (-100 * currentSlide) + "%)";
    }

    autoSlideId = setTimeout(nextSlide, autoSlideTime)
})


// function debounce(callback, delay) {
//     let lastClicked = 0;
//     function debounceTimeout(val1, val2) {
//         if (lastClicked) {
//             clearTimeout(lastClicked);
//         }
//         lastClicked = setTimeout(function () {
//             callback(val1, val2)
//         }, delay);
//     }
//     return debounceTimeout;
// }