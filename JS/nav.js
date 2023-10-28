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
      { text: "Data-Art", url: "art.html" }
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







