import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { MailchimpForm } from "./MailchimpForm";
import logo from "../assets/img/rahul.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";
import navIcon4 from '../assets/img/icons8-github.svg';
import axios from 'axios';

export const Footer = () => {
  const [footerData, setFooterData] = useState(null); // Correct useState

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/master/footer');
        setFooterData(response.data);
      } catch (error) {
        console.log('Error fetching footer data');
      }
    };

    fetchFooterData(); 
  }, []);

  if (!footerData) {
    return null; 
  }

  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <MailchimpForm />
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" className="logo-img" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href={footerData.linkedin}><img src={navIcon1} alt="LinkedIn" /></a>
              <a href={footerData.github}><img src={navIcon4} alt="GitHub" /></a>
              <a href={footerData.facebook}><img src={navIcon2} alt="Facebook" /></a>
              <a href={footerData.instagram}><img src={navIcon3} alt="Instagram" /></a>
            </div>
            <p>{footerData.copyright}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
