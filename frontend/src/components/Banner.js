import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import axios from 'axios';
import headerImg from "../assets/img/header-img.svg"; // Default image in case the API doesn't provide one
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { HashLink } from 'react-router-hash-link';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const [bannerData, setBannerData] = useState(null);
  const toRotate = ["Web Developer","Full Stack Developer"];
  const period = 2000;

  // Fetch banner data from API
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/master/banner');
        setBannerData(response.data);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };
    fetchBannerData();
  }, []);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="tagline">{bannerData ? bannerData.title : "Welcome to my Portfolio"}</span>
                  <h1>
                    {bannerData ? bannerData.heading : "Hi! I'm Rahul Root"}
                    <span className="txt-rotate" dataPeriod="1000" data-rotate='["Web Developer", "Full Stack Developer"]'>
                      <span className="wrap"> {text}</span>
                    </span>
                  </h1>
                  <p>{bannerData ? bannerData.description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}</p>
                  <HashLink to='#connect'>
                  <button onClick={() => console.log(bannerData?.url || 'connect')}>
                    Let’s Connect <ArrowRightCircle size={25} />
                  </button>
                  </HashLink>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img
                    src={bannerData && bannerData.image ? `http://localhost:5000/${bannerData.image}` : headerImg}
                    alt="Banner"
                  />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
