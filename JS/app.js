//header

header.innerHTML=` <input type="checkbox" name="" id="check" />
<input type="checkbox" name="" id="check" />
<label for="check" class="burgerbutton"
  ><script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
  <lord-icon
    src="https://cdn.lordicon.com/bwhjesak.json"
    trigger="morph"
    colors="primary:#59DFD0,secondary:#08a88a"
    stroke="55"
    style="width: 60px; height: 60px"
  >
  </lord-icon>
</label>
<label for="navTitle" class="navTitle">SPACE GAZE &#9732; </label>


<ul>

  <li>
    <a href="index.html" class="opened">Home</a>
  </li>
  <li>
    <a href="blogs.html" class="opened"> Blogs</a>
  </li>
  <li>
    <a href="design.html"class="opened">Design</a>
  </li>
  <li>
    <a href="data.html" class="opened"> Data-Visualisation</a>
  </li>
  <li>
    <a href="art.html" class="opened"> Data-Art</a>
  </li>
</ul>`;
//active header
const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav a').forEach(link => {
  if(link.href.includes(`${activePage}`)){
    link.classList.add('active');
    
  }
})

//load transition
function reveal() {
   let reveals = document.querySelectorAll(".reveal");

  for ( let i = 0; i < reveals.length; i++) {
    let windowHeight = window.innerHeight;
     let elementTop = reveals[i].getBoundingClientRect().top;
     let elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("activePara");
    } else {
      reveals[i].classList.remove("activePara");
    }
  }
}

window.addEventListener("scroll", reveal);


//starry background

stars.innerHTML=`<scetion class="bg">
<scetion class="z-3">
  <scetion class="tile top-left animate-opacity freq-5"></scetion>
  <scetion class="tile top-right animate-opacity freq-9"></scetion>
  <scetion class="tile bottom-left animate-opacity freq-7"></scetion>
  <section              class="tile bottom-right animate-opacity freq-10"
  ></scetion>
</scetion>
<scetion class="z-2">
  <section              class="tile top-left animate-opacity freq-9 delay-2"
  ></scetion>
  <section              class="tile top-right animate-opacity freq-5 delay-2"
  ></scetion>
  <section              class="tile bottom-left animate-opacity freq-6 delay-4"
  ></scetion>
  <section              class="tile bottom-right animate-opacity freq-10 delay-4"
  ></scetion>
</scetion>
<scetion class="z-1">
  <section              class="tile top-left animate-opacity freq-7 delay-2"
  ></scetion>
  <section              class="tile top-right animate-opacity freq-5 delay-4"
  ></scetion>
  <section              class="tile bottom-left animate-opacity freq-9 delay-2"
  ></scetion>
  <section              class="tile bottom-right animate-opacity freq-5 delay"
  ></scetion>
</scetion>
</scetion>`;

//Referrence : Script, C.S.S. (2022). CSS Only Starry Sky Background Effect. [online] CSS Script. Available at: https://www.cssscript.com/starry-sky-background-effect/ [Accessed 13 Aug. 2023].
"use strict";
const z1 = document.getElementsByClassName("z-1")[0];
const z2 = document.getElementsByClassName("z-2")[0];
const z3 = document.getElementsByClassName("z-3")[0];

const ratio = 0.05;
let x;
let y;

document.addEventListener("mousemove", function (e) {
  x = e.pageX;
  y = e.pageY;
});

requestAnimationFrame(function animation() {
  z1.style.transform = "translate(" + x * ratio + "px," + y * ratio + "px)";

  z2.style.transform =
    "translate(" +
    (x * ratio) / 2 +
    "px," +
    (y * ratio) / 2 +
    "px) rotate(217deg)";

  z3.style.transform =
    "translate(" +
    (x * ratio) / 3 +
    "px," +
    (y * ratio) / 3 +
    "px) rotate(71deg)";

  requestAnimationFrame(animation);
});

// Generate Paragrapghs

