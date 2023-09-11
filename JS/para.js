

let articlesSection = document.querySelector(".articles");


articlesSection.innerHTML = articles.map((articles)=> {
    let {bigHeading , headingOne, paraOne , paraTwo, headingThree, paraThree ,image} = articles;
    return ` 
    <section ${paraTwo} class="paraContent"  class="p-summary">
    <h3 class="textTwo">${headingOne}</h3>   
      ${paraOne}
${image}
    </section>
 

  
    <section class="paraContent" class="p-summary"><h3 class="textTwo">${headingThree}</h3>${paraThree}
    </section>
`;
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
    console.log(block[k].innerHTML)
    if(block[k].firstChild.innerText==="")
    {
        console.log("cheese")
        block[k].style.display="none";
    }
    else {console.log("nothing")}
}
};
ClearEmptyParagraphs();
