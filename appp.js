

const articlesSection = document.querySelector(".articles");


articlesSection.innerHTML = articles.map((articles)=> {
    const { headingOne, paraOne ,headingTwo, paraTwo, headingThree, paraThree} = articles;
    return `

</section>
<section class="displaySection">
  <article class="container reveal">
    <h2 class="textTwo">Caption</h2>
    <article class="textContainer">
      <article class="textBox">
        <h3> ${headingOne}</h3>
        <p >
        ${paraOne}
        </p>
      </article>
      
      <article class="textBox">
      <h3> ${headingTwo}</h3>
      <p >
      ${paraTwo}
      </p>
      </article>
      <article class="textBox">
      <h3> ${headingThree}</h3>
      <p >
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

function ClearEmptyParagraphs()
{let block = document.getElementsByClassName("textBox")
console.log(block)
let k

for(k=0; k<block.length;k++)
{
    console.log(block[k].firstChild)
    if(block[k].firstChild.innerText==="")
    {
        console.log("cheese")
        block[k].style.display="none";
    }
    else {console.log("nothing")}
}
};ClearEmptyParagraphs();
