document.addEventListener("DOMContentLoaded", function () {
    const tl = gsap.timeline();

    tl.from("#nav img,#nav-2,#nav-3", {
        y: -200,
        duration: 1,
        delay: 0.5,
        stagger: 1,
        opacity: 0
    });

    tl.from("h1", {
        y: 1000,
        duration: 1,
        delay: 0.5,
        stagger: 1,
        opacity: 0
    });

    tl.from("#img-1,#img-2", {
        y: 1000,
        duration: 1,
        delay: 0.5,
        stagger: 1,
        opacity: 0
    });

    tl.to("h2", {
        y: 14,
        duration: 1,
        // delay:0.5,
        yoyo: 1,
        repeat: -1,
        opacity: 1
    });
});
