let articles = [
    {
      id: 1,
      bigHeading: ` <a href="blogs.html" class="texTwo">Blog Section</a>
      `,
      headingOne: "Design Decision: Dashed Lines",
      paraOne: "There is consistent use of dashed lines to indicate the scales in this data art. This was used for the asteroid miss distance in the circular bar plot and for the scale of the magnitude of the asteroids. This has created a visual convention, the importance of this convention is that it affects the “look and feel”(Parker, 2012). This helps create flow in the design of this data art as the user can encrypt the data art quicker once they identify the scale conventions of dashed lines that are used. ",
      image:`<figure>
      <img
        src="./Images/dashed1.png"
        alt="dashed lines image"
        id="imgg2"
      />
      <figcaption>Dashed lines from size scale.</figcaption>
      </figure><figure>
      <img
        src="./Images/dashed2.png"
        alt="dashed lines image"
        id="imgg2"
      />
      <figcaption>Dashed lines from Circular Bar plot.</figcaption>
      </figure>`,
      paraTwo:`id="Composition"`, 
      headingThree: "Bar plot ordered by Date ",
      paraThree: "The bars are arranged by date, this emulates a clock of sorts since it displays data of asteroids through time(dates). This helps users answer questions such as: Has the frequency of asteroid encounters changed in any way, did some asteroids “survive” longer than others, were some asteroids “active” for shorter periods than others according to the data art? Ordering the data by date helps situate the user, as the user can identify a start and end point. ",
     
    },
    {
      id: 2,
      bigHeading:``,
      headingOne: "Size Scale Opacity",
      paraOne: "The addition of the size scale adds new meanings to this data set, by helping the user visualize the differences between asteroids. This deepens the understanding of the data art since the user can see if the size of an asteroid could affect its life span as well as the distance it covers, in terms of how many planets it comes into contact with.The adjustment of the opacity of the circles in the size scale was an active decision, as can be seen by the scale many asteroids are similar in magnitude. Thus, the only way to display all these asteroids on the size scale is to allow the asteroids below to be seen, otherwise, the scale looks incomplete and might confuse the user. ",
      image: `<figure>
      <img
        src="./Images/dashed1.png"
        alt="Size scale image"
        id="imgg2"
      />
      <figcaption>Circles from the Size Scale.</figcaption>
      </figure>`,
      paraTwo: `id="asteClassi"`,
      headingThree: "Bar Width",
      paraThree: "The bars in the circular bar plot are very narrow, this design decision was made so that all the bars are visible. This was necessary so that the user could see data that was not obscured or crowded, if the bars overlapped due to their width, it would affect the emotion and meaning of the data. It would decrease the number of visible bars which would make it appear as though there are fewer asteroids than there are. The narrow bars allow the data to be spread out, which is clearer for the user, thus making the information displayed more readable. ",
     
    },
    {
      id: 3,
      bigHeading:``,
      headingOne: "Design Decision: Bar Colour ", 
      paraOne: "There are 20 asteroids and there are 10 colors used to distinguish between the asteroids. I chose to use 10 colours as opposed to giving all 20 asteroids their colour because it would have been too many colours to keep track of and too many closely related shades. The choice of 10 colours decreases the cognitive load of the user. This is in line with the goal for this data art as well as avoiding the unnecessary complication of the data. ",
      image: `<figure>
      <img
        src="./Images/dashed1.png"
        alt="Circular bar plot bars image"
        id="imgg2"
      />
      <figcaption>Circular bar plots , bars with differnet colurs with the same width.</figcaption>
      </figure><`,
      paraTwo: `id="asteName"`,
      headingThree: "Inner circle (circular bar plot)",
      paraThree: "The centre of the circular bar plot has a circle that is animated by zooming in and out as it changes colour. The centre of the plot represents the planets that these asteroids encounter, and these planets vary in colour and size. Thus, this animated colour-changing circle is used to emulate the different planets and help the user identify what the centre of the bar plot represents. Earth is blue, Venus is pale yellow, Mars is red, and Mercury is dark grey. The colours that were chosen are based on the information from the NASA website. ",
     
    },
    {
      id: 4,
      bigHeading:``,
      headingOne: "Design Decision: Toolitip ",
      paraOne: "The tooltips are not styled, this was done intentionally to not obscure or take away attention from the data art. This tooltip is simple and effective as it displays all the relevant information to a user. This was also chosen since there are many bars on the circular bar plot, this not only means that there are lots of data to analyse but lots of colour and meanings to unpack, this simple tooltip decreases the cognitive load on the user. ",
      image: `<figure>
      <img
        src="./Images/spaceshuttle.png"
        alt="tooltip  image"
        id="imgg2"
      />
      <figcaption>Tooltip as user hovers over a bar,on Circular bar plot.</figcaption>
      </figure>`,
      paraTwo: "",
      headingThree: "",
      paraThree: "Asteroids are also given a number, for example (99942) Apophis. The Harvard Smithsonian Center for Astrophysics keeps a fairly current list of asteroid names.",
      
    },
  ];
  