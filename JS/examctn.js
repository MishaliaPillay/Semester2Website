

let examctn = document.querySelector(".exam");


examctn.innerHTML = exam.map((exam)=> {
    let {bigHeading , headingOne, paraOne , paraTwo, headingThree, paraThree ,image} = exam;
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


