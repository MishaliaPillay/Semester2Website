console.log("dark mode articles");
const toggleBtn = document.querySelector(".btn");
const htmlRoot = document.querySelector("html");


toggleBtn.addEventListener("click", () => {

htmlRoot.classList.toggle("dark-theme");

});

const articlesSection = document.querySelector(".articles");


articlesSection.innerHTML = articles.map((articles)=> {
    const {title ,titlee, date, length , snippet } = articles;
    return `<article class="post">
    <h1> ${title} </h1> <h1> ${titlee} </h1>
    <section class="post-info">
      <span>${date}</span>
      <span>${length}</span>
    </section>
    <p>${snippet}</p>
  </article>`;
});

/*
const displaySectionSection = document.querySelector(".displaySection");


displaySectionSection.innerHTML = displaySection.map((displaySection)=> {
    const {title ,titlee, date, length , snippet } = displaySection;
    return `<article class="post">
    <h1> ${title} </h1> <h1> ${titlee} </h1>
    <section class="post-info">
      <span>${date}</span>
      <span>${length}</span>
    </section>
    <p>${snippet}</p>
  </article>`;
});/*
const displaySectionSection = document.querySelector(".displaySection");


displaySectionSection.innerHTML = displaySection.map((displaySection)=> {
    const {title ,titlee, date, length , snippet } = displaySection;
    return `<section class="displaySection">
    <article class="container reveal">
      <h2 class="textTwo">${title}</h2>
      <article class="textContainer">
        <article class="textBox">
          <h3>${titlee}t</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            eius molestiae perferendis eos provident vitae iste.
          </p>
        </article>
        <article class="textBox">
          <h3>Section Text</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            eius molestiae perferendis eos provident vitae iste.
          </p>
        </article>
        <article class="textBox">
          <h3>Section Text</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
            eius molestiae perferendis eos provident vitae iste.
          </p>
        </article>
      </article>
    </article>`;
});*/