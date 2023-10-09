

let articlesSection = document.querySelector(".articles");


articlesSection.innerHTML = articles.map((articles)=> {
    let {bigHeading, headingOne, paraOne ,headingTwo, paraTwo, headingThree, paraThree} = articles;
    return `


<section class="displaySection">
  <article class="container reveal">
    <h2 class="textOne" >${bigHeading}</h2>
    <article class="textContainer" class="h-feed">
      <article class="textBox">
        <h3 class="textTwo"> ${headingOne}</h3>
        <p class="p-summary">
        ${paraOne}
        </p>
      </article>
  
      
      ${headingTwo}
      ${paraTwo}
      
     
      <article class="textBox">
      <h3> ${headingThree}</h3>
      <p class="p-summary">
      ${paraThree}
      </p>
      </article>
    </article>
  </article>
</section>`;
});/*
clearempty();
function clearempty()
{
  let blocks=document.querySelectorAll("article.textBox");
  let k;
  for(k=0; k<blocks.length; k++)
  {
    let heading = blocks[k].firstChild
    if(heading.textContent==="")
    {
      blocks[k].style.display="none";
    }
  }
}*/


