gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform
    ? "transform"
    : "fixed",
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

function page1Animation() {
  var tl = gsap.timeline();
  tl.from(".loader img", {
    opacity: 0,
    stagger: 0.6,
    duration: 0.6,
    y: 20,
  });
  tl.from(".loader h2", {
    opacity: 0,
    stagger: 0.6,
    duration: 0.4,
    x: -15,
  });
  tl.to(".loader img, .loader h2", {
    opacity: 0,
    stagger: 0.6,
    duration: 0.4,
  });
  tl.to(".loader", {
    opacity: 0,
  });
  tl.to(".loader", {
    display: "none",
  });
  tl.from("nav img,nav a", {
    y: -30,
    opacity: 0,
    stagger: 0.1,
  });
  tl.from(
    ".btn button, .menuicon",
    {
      x: 30,
      stagger: 0.1,
      opacity: 0,
    },
    "left"
  );
  tl.from(
    ".scrolldown, .downicon",
    {
      x: -30,
      stagger: 0.2,
      opacity: 0,
    },
    "left"
  );
  tl.from(".centerpart h2", {
    y: 50,
    stagger: 0.2,
    opacity: 0,
    duration: 0.5,
  });
}
function rotatebutton() {
  var plusbtn = document.querySelector(".plusicon");
  var btn = document.querySelector(".btn button");

  plusbtn.addEventListener("mouseenter", function () {
    gsap.to(plusbtn, {
      rotate: "360deg",
      duration: 0.3,
      ease: "power3.out",
      color: "#F9F3EB",
    });
    gsap.to(btn, {
      duration: 0.2,
      ease: "power3.out",
      backgroundColor: "black",
      color: "#F9F3EB",
    });
  });
  plusbtn.addEventListener("mouseleave", function () {
    gsap.to(plusbtn, {
      rotate: "0deg",
      duration: 0.5,
      color: "black",
    });
    gsap.to(btn, {
      backgroundColor: "#F9F3EB",
      duration: 0.4,
      color: "black",
    });
  });
}
function page4animation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".discover",
      scroller: ".main",
      start: "50% 50%",
      end: "100% 100%",
      // markers:true,
      scrub: 3,
    },
  });
  tl.to(
    ".discover",
    {
      backgroundColor: "#222222",
    },
    "copy"
  );
  tl.to(
    ".page4,h2,h3",
    {
      color: "white",
    },
    "copy"
  );
  tl.from(
    ".discover h2, .discover h3",
    {
      y: 100,
      opacity: 0,
      duration: 0.5,
      scrub: 3,
    },
    "copy"
  );
  tl.to(
    ".page5",
    {
      backgroundColor: "#222222",
    },
    "copy"
  );
  tl.from(
    ".hike, .smilegirl, .dance, .cricketer",
    {
      y: 250,
      opacity: 0,
      duration: 0.8,
    },
    "copy"
  );
}
function ZoominAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page6",
      scroller: ".main",
      start: "30% 50%",
      end: "100% 100%",
      // markers:true,
      scrub: 3,
      duration: 1,
    },
  });
  tl.to(".page6 .page6Center", {
    height: "100vh",
    width: "100vw",
  });
}
function stringAnimation() {
  var initialPath = `M 10 100 Q 500 100 990 100`;
  var finalPath = `M 10 100 Q 500 100 990 100`;

  var svg = document.querySelector(".page7, .string");

  svg.addEventListener("mousemove", function (dets) {
    initialPath = `M 10 100 Q ${dets.x} ${dets.y} 990 100`;
    gsap.to("svg path", {
      attr: { d: initialPath },
      duration: 0.5,
      ease: "power3.out",
    });
  });
  svg.addEventListener("mouseleave", function (dets) {
    gsap.to("svg path", {
      attr: { d: finalPath },
      duration: 1,
      ease: "elastic.out(1.5)",
    });
  });
}
function SideMenubar() {
  var menu = document.querySelector(".menuicon");
  var cross = document.querySelector(".sideslide i");
  var tl = gsap.timeline();

  tl.to(".sideslide", {
    right: 0,
    duration: 0.5,
  });
  tl.from(".sideslide h4", {
    x: 100,
    duration: 0.4,
    stagger: 0.2,
    opacity: 0,
  });
  tl.from(".sideslide i", {
    opacity: 0,
    duration: 0.6,
    rotate: "360deg",
  });
  tl.pause();

  menu.addEventListener("click", function () {
    tl.play();
  });
  cross.addEventListener("click", function () {
    tl.reverse();
  });
}
function page2TextAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page2",
      scroller: ".main",
      start: "10% 60%",
      end: "80% 100%",
      // markers:true,
      scrub: 3,
    },
  });
  tl.from(".centerText h4,.centerText h2,.centerText p", {
    y: 40,
    stagger: 1,
    duration: 0.8,
    pin: true,
    opacity: 0,
  });
}
function Customcursor() {
  var main = document.querySelector(".main");
  var cursor = document.querySelector(".cursor");
  var red = document.querySelector(".red,.red img ");
  var blue = document.querySelector(".blue,.blue img ");
  var yellow = document.querySelector(".yellow,.yellow img ");
  main.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y,
      duration: 1,
      // ease:"back.out",
    });
  });
  red.addEventListener("mouseenter", function () {
    cursor.innerHTML = "Buy now";
    gsap.to(cursor, {
      scale: "3",
    });
  });
  red.addEventListener("mouseleave", function () {
    cursor.innerHTML = "";
    gsap.to(cursor, {
      scale: "1",
    });
  });
  blue.addEventListener("mouseenter", function () {
    cursor.innerHTML = "Buy now";
    gsap.to(cursor, {
      scale: "3",
    });
  });
  blue.addEventListener("mouseleave", function () {
    cursor.innerHTML = "";
    gsap.to(cursor, {
      scale: "1",
    });
  });
  yellow.addEventListener("mouseenter", function () {
    cursor.innerHTML = "Buy now";
    gsap.to(cursor, {
      scale: "3",
    });
  });
  yellow.addEventListener("mouseleave", function () {
    cursor.innerHTML = "";
    gsap.to(cursor, {
      scale: "1",
    });
  });
}

rotatebutton();
page1Animation();
page4animation();
ZoominAnimation();
stringAnimation();
SideMenubar();
page2TextAnimation();
Customcursor();

let mm = gsap.matchMedia();
mm.add("(min-width:601px)", () => {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page2",
      scroller: ".main",
      start: "0% 50%",
      end: "100% 50%",
      // markers:true,
      scrub: 1,
    }
  })
  tl.from(".topcan img", {
    y: -150,
  });

  var tl = gsap.timeline({
    scrollTrigger:{
    trigger:".page2",
    scroller:".main",
    start:"20% 50%",
    end:"100% 50%",
    scrub:1,
    // markers:true
    }
  })
  tl.from(".can img",{
    x:200,
  });

  var tl = gsap.timeline(
    {
      scrollTrigger: {
        trigger: ".page2",
        scroller: ".main",
        start: "40% 50%",
        end: "200% 100%",
        // markers: true,
        scrub: 1,
      }
    })
  tl.to(".canwrapper img",
    {
      top: "126vh",
      left: "175%",
      scale: 1,
      scrub: 2,
    })
})


// forMoblileScreen 
mm.add("(max-width:600px)", () => {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page2",
      scroller: ".main",
      start: "0% 40%",
      end: "20% 50%",
      // markers:true,
      scrub: 1,
    }
  })
  tl.from(".topcan img", {
    y: -150,
  });

  var tl = gsap.timeline({
    scrollTrigger:{
    trigger:".page2",
    scroller:".main",
    start:"10% 50%",
    end:"80% 50%",
    scrub:1,
    // markers:true
    }
  })
  tl.from(".can img",{
    x:200,
    scale:1.2
  });

  var tl = gsap.timeline(
    {
      scrollTrigger: {
        trigger: ".page2",
        scroller: ".main",
        start: "40% 40%",
        end: "200% 100%",
        // markers: true,
        scrub: 1,
      }
    })
  tl.to(".canwrapper img",
    {
      top: "152vh",
      left: "15%",
      duration: .8,
      scale: 1.2,
      scrub: 2,
    })
})
