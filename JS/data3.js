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
      paraOne: "There are 20 asteroids and there are 10 colors used to distinguish between the asteroids. I chose to use 10 colours as opposed to giving all 20 asteroids their own colour because it would have been too many colours to keep track of and too many closely related shades. The choice of 10 colours decreases the cognitive load of the user. This is in line with the goal for this data art as well as avoiding the unnecessary complication of the data. ",
      image: `<figure>
      <img
        src="./Images/bars.png"
        alt="Circular bar plot bars image"
        id="imgg2"
      />
      <figcaption>Circular bar plots , bars with differnet colurs with the same width.</figcaption>
      </figure>`,
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
        src="./Images/tooltip.png"
        alt="tooltip  image"
        id="imgg2"
      />
      <figcaption>Tooltip as user hovers over a bar,on Circular bar plot.</figcaption>
      </figure><figure>
      <img
        src="./Images/btns.png"
        alt="buttons image"
        id="imgg2"
      />
      <figcaption>Image of the buttons.</figcaption>
      </figure>`,
      paraTwo: "",
      headingThree: "Filters",
      paraThree: "The buttons that for this data art were added to help distil the information for the user, it helps the user take control of their understanding. The user can visualize how many / few asteroids a planet has encountered. ",
      
    },{
        id: 5,
        bigHeading:``,
        headingOne: "Observations: Asteroid size differences",
        paraOne: "The size scale helps visualize the influence that the magnitude of an asteroid has on its motion. An example of this from the data art is that the largest asteroids are 1915 Quetzalcoatl and 1221 Amor, the colour of these asteroids is dark blue, and these asteroids have the furthest miss distances. This is interesting because these asteroids only have encounters with Earth and they are not potentially hazardous. Thus, for this data set it can be said that the larger an asteroid is the further away it will be from a planet, thus has a decreased risk than smaller asteroids. ",
        image: `<figure>
        <img
          src="./Images/scale.png"
          alt="14-17 size scale image"
          id="imgg2"
        />
        <figcaption>This image shows the asteroids between sizes 14-17h.</figcaption>
        </figure>`,
        paraTwo: "",
        headingThree: "",
        paraThree: " Another observation is that most asteroid sizes lie between 14 – and 17 in this data set, the decreased opacity of the circles in the scale helps us see this. These findings could help determine the average size of asteroids and follow along the circular bar plot to see if the size affects the frequency of close approach distances. ",
        
      },,{
        id: 6,
        bigHeading:``,
        headingOne: "Observations: Asteroids Encounters with Earth vs other planets",
        paraOne: "Since this circular bar plot displays the data of these asteroids in relation to four planets, we can compare the number of asteroids that approach a planet as well as the frequency over time. The interactive buttons below the data art help to filter the bars according to the different planets, a quick click through puts into perspective the mass amount of asteroids that Earth encounters compared to the other planets. This raises new questions such as: Is this because NASA focuses its research on Earth and all these asteroids are recorded near Earth then its trajectory is tracked? or does Earth’s position in the solar system lead it to have the greatest number of encounters with asteroids? Another example from the data set is that when a user clicks the button for mercury, it is seen that only one asteroid (1566 Icarus) has approached it however Earth has had encounters with all of the asteroids in this data set. ",
        image: `<figure>
        <img
          src="./Images/Merc.png"
          alt="Mercury image"
          id="imgg2"
        />
        <figcaption>Mercury's asteroid 1566 Icarus.</figcaption>
        </figure>`,
        paraTwo: " ",
        headingThree: "Conclusion",
        paraThree: "Overall, this data helps make it clear that there is a need for NASA to track this data and the importance of the research that they do. It is really shocking and almost scary to observe how many asteroids encounter Earth and how many of them are potentially hazardous as seen on the data visualization page. The colour bars make the data more friendly and inviting which helps the data set look easier to understand at all levels (scientists and unfamiliar users) Another way this is accommodated is the full names of these asteroids are displayed which gives information to both types of users.",
        
      },
  ];
  