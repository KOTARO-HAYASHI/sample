
$(function () {
    const myImage = document.querySelectorAll('#holder');

    Holder.run({
        images: myImage
    });
})

$(function () {
    $(".slideshow").each(function () {
        const $container = $(this);
        const $slideGroup = $container.find(".slideshow-slides");
        const $slides = $slideGroup.find(".slide");
        const $nav = $container.find(".slideshow-nav");
        const $indicator = $container.find(".slideshow-indicator");
        const slideCount = $slides.length;
        const duration = 500;
        const interval = 7500;
        const $navPrev = $nav.find(".prev");
        const $navNext = $nav.find(".next");

        let indicatorHTML = "";
        let currentIndex = 0;
        let timer;

        $slides.each(function (i) {
            $(this).css({
                left: 100 * i + "%"
            });
            let id = $(this).attr("id");
            indicatorHTML += '<a href="#' + id + '">' + (i + 1) + '</a>';
        });

        $indicator.html(indicatorHTML);
        const $indicatorValues = $indicator.find("a");

        function goToSlide(index) {
            $slideGroup.animate({
                left: -100 * index + "%"
            }, duration);
            currentIndex = index;
            updateNav();
        };

        function updateNav() {



            if (currentIndex === 0) {
                $navPrev.addClass("disabled")
            } else {
                $navPrev.removeClass("disabled")
            }

            if (currentIndex === slideCount - 1) {
                $navNext.addClass("disabled")
            } else {
                $navNext.removeClass("disabled")
            }
            $indicatorValues.removeClass("active").eq(currentIndex).addClass("active");
        };

        function startTimer() {
            timer = setInterval(function () {
                let nextIndex = (currentIndex + 1) % slideCount;
                goToSlide(nextIndex)

            }, interval)

        }

        function stopTimer() {
            clearInterval(timer);
        }



        $container.on({
            mouseenter: stopTimer,
            mouseleave: startTimer
        });

        $nav.on("click", "a", function (event) {
            event.preventDefault();
            if ($(this).hasClass("prev")) {
                goToSlide(currentIndex - 1);
            }
            else {
                goToSlide(currentIndex + 1);
            }

        });

        $indicator.on("click", "a", function (event) {
            event.preventDefault();
            if (!$(this).hasClass("active")) {
                goToSlide($(this).index());
            }
        });

        startTimer();
        goToSlide(currentIndex);
    });

})

