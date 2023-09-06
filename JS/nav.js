//header

// Wait for the document to load
document.addEventListener("DOMContentLoaded", function () {
  // Create the header element
  let header = document.createElement("header");

  // Create the navigation element
  let nav = document.createElement("nav");
  let section = document.createElement("section");
 
  // Create an unordered list for the navigation links
  let ul = document.createElement("ul");
  ul.id = "navList"; // Set an ID for styling or manipulation later

  // Create an array of navigation items with corresponding URLs
  let navItems = [{ text: "Home", url: "index.html" },
      { text: "Blogs", url: "blogs.html" },
      { text: "Design", url: "design.html" },
      { text: "Data-Visualisation", url: "data.html" },
      { text: "Design-Art", url: "art.html" }
  ];

  // Iterate through the array to create list items and links
  navItems.forEach(function (item) {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.href = item.url; // Set the href attribute with the URL
      a.textContent = item.text; // Set the link text
      li.appendChild(a); // Add the link to the list item
      ul.appendChild(li); // Add the list item to the unordered list
  });

  // Add the unordered list to the navigation element

nav.innerHTML+=` <input type="checkbox" name="" id="check" />
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
<label for="navTitle" class="navTitle">SPACE GAZE &#9732; </label>`;
  // Add the navigation element to the header element  
  nav.appendChild(ul);
  header.appendChild(nav);


  // Find the body element and insert the header as the first child
  let body = document.querySelector("body");
  body.insertBefore(header, body.firstChild);
});

// Wait for the document to load
document.addEventListener("DOMContentLoaded", function () {
  // Get the current page's URL
  let currentPageUrl = window.location.href;

  // Get all the navigation links
  let navLinks = document.querySelectorAll("#navList li a");

  // Iterate through the links and check if they match the current page
  navLinks.forEach(function (link) {
      if (link.href === currentPageUrl) {
          // Add the "active" class to underline the active link
          link.parentElement.classList.add("active");
      }
  });
});




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
};

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
let z1 = document.getElementsByClassName("z-1")[0];
let z2 = document.getElementsByClassName("z-2")[0];
let z3 = document.getElementsByClassName("z-3")[0];

let ratio = 0.05;
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

