import React from "react";

const AboutSection = ({isTrue}) => {
   if(isTrue){
      document.title = "About Ghs Julian | Read And Know More About Myself" 
   }
    return (
        <section data-aos="zoom-in" id="about" className="about">
            <h2 id="heading">About Me</h2>
            <div className="two-row">
                <div data-aos="zoom-in" className="col">
                    <img
                        id="user"
                        src="./images/ghs-dev.jpg"
                        alt="Ghs Julian Web Developer Designer"
                    />
                </div>
                <div data-aos="zoom-in" className="col">
                <article>
                 I am Ghs Julian a professional web developer and designer.
                 I am a student department of English. I am doing a graduation in English. 
                 Web Development is my hobby and i have learned everything about coding and website development from self learning.
                 Most of them i have learned from Internet.
                 I love my self study. I am from Bangladesh.
                 I live in Bangladesh with my parents in a small village of Bangladesh.
                 To know more about myself or wanna talk with me please contact me or hire me for your requirements.
                </article>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
