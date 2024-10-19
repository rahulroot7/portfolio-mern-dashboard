import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png";
import { useState, useEffect } from "react";
import axios from 'axios';

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const [skillData, setSkillData] = useState({
    title: '',
    description: '',
    skills: []
  });

  useEffect(() => {
    const fetchSkillData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/master/skill');
        setSkillData(response.data); // Set the entire response object
      } catch (error) {
        console.error('Error fetching skill data:', error);
      }
    };

    fetchSkillData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const { title, description, skills } = skillData;

  const progressBarStyle = {
    width: '150px', // Fixed width
    margin: '0 auto', // Center align
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>{title || "Skills"}</h2>
              <p>{description || "Here are some of the skills I possess."}</p>
              <Carousel 
                responsive={responsive} 
                infinite={true} 
                autoPlay={true}  // Enable auto sliding
                autoPlaySpeed={1000} // Set interval (in milliseconds)
                className="owl-carousel owl-theme skill-slider"
              >
                {skills.map((skill, index) => (
                  <div className="item" key={skill._id} style={progressBarStyle}>
                    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                      <defs>
                        <linearGradient id={`gradient${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00f260" />
                          <stop offset="100%" stopColor="#0575E6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <CircularProgressbar
                      value={skill.percentage}
                      text={`${skill.percentage}%`}
                      styles={buildStyles({
                        textColor: "#fff",
                        pathColor: `url(#gradient${index})`,
                        trailColor: "#d6d6d6",
                        textSize: '16px',
                        pathTransitionDuration: 0.5,
                      })}
                    />
                    <h5 style={{ textAlign: 'center', marginTop: '10px' }}>{skill.name}</h5>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Background" />
    </section>
  );
};
