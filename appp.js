

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