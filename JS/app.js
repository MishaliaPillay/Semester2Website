//header

header.innerHTML=` <input type="checkbox" name="" id="check" />
<input type="checkbox" name="" id="check" />
<label for="check" class="burgerbutton"
  ><script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
  <lord-icon
    src="https://cdn.lordicon.com/bwhjesak.json"
    trigger="morph"
    colors="primary:#0a4e5c,secondary:#08a88a"
    stroke="55"
    style="width: 60px; height: 60px"
  >
  </lord-icon>
</label>
<label for="navtitle" class="navtitle">MISHALIA'S PORTFOLIO</label>

cheese
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

//
function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("activePara");
    } else {
      reveals[i].classList.remove("activePara");
    }
  }
}

window.addEventListener("scroll", reveal);
