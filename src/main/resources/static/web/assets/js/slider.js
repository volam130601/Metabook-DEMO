// Slider
let slideIndex = 0;
showArrows(slideIndex);

let intervalSlide;
let number = 0;
let margin_left = 0;

// Next/previous controls
function plusSlides(n) {
    showArrows((slideIndex += n));
    number = margin_left;
    // margin_left += n * 115;
    margin_left += n * 135;
    if (number !== margin_left) intervalSlide = loopSlide();
    else clearInterval(intervalSlide);
}

function loopSlide() {
    const slides = $(".mySlides");
    return setInterval(() => {
        if (number < margin_left) {
            $(slides[0]).attr("style", `margin-left: -${number}px`);
            number += 5;
        } else if (number > margin_left) {
            $(slides[0]).attr("style", `margin-left: -${number}px`);
            number -= 5;
        } else {
            $(slides[0]).attr("style", `margin-left: -${margin_left}px`);
            clearInterval(intervalSlide);
        }
    }, 15);
}

function showArrows(n) {
    const $prev = $(".prev");
    const $next = $(".next");
    const slides = $(".mySlides");
    if (n < 1) {
        $prev.hide();
    } else {
        $prev.show();
    }
    if (n + 4 === slides.length) {
        $next.hide();
    } else {
        $next.show();
    }
}
