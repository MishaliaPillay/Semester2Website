// Function to toggle sidebar navigation links
function toggleNav() {
    var links = document.querySelectorAll('.sidenav a');
    for (var i = 0; i < links.length; i++) {
      links[i].style.display = (links[i].style.display === 'none' || links[i].style.display === '') ? 'block' : 'none';
    }
  }
  