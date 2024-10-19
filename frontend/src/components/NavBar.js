import { useState, useEffect } from "react";
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import navIcon4 from '../assets/img/icons8-github.svg';
import { Navbar, Nav, Container } from "react-bootstrap";
import { HashLink } from 'react-router-hash-link';
import {
  BrowserRouter as Router
} from "react-router-dom";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [headerData, setHeaderData] = useState(null); // Store API data

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  // Fetch the API data
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/master/header/");
        const data = await response.json();
        setHeaderData(data); // Store the fetched data in state
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };
  
    fetchHeaderData(); // Call the async function
  }, []);
  

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  if (!headerData) {
    return null; // Show nothing until the data is fetched
  }

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="/">
          <img src={`http://localhost:5000/${headerData.logo}`} className="logo-img" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {headerData.menu.split(',').map((menuItem, index) => (
              <Nav.Link
                key={index}
                href={`#${menuItem.toLowerCase()}`}
                className={activeLink === menuItem.toLowerCase() ? 'active navbar-link' : 'navbar-link'}
                onClick={() => onUpdateActiveLink(menuItem.toLowerCase())}
              >
                {menuItem}
              </Nav.Link>
            ))}
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              {headerData.linkedin && <a href={headerData.linkedin} target="_blank"><img src={navIcon1} alt="LinkedIn" /></a>}
              {headerData.github && <a href={headerData.github} target="_blank"><img src={navIcon4} alt="GitHub" /></a>}
              {headerData.facebook && <a href={headerData.facebook} target="_blank"><img src={navIcon2} alt="Facebook" /></a>}
              {headerData.instagram && <a href={headerData.instagram} target="_blank"><img src={navIcon3} alt="Instagram" /></a>}
            </div>
            <HashLink to='#connect'>
              <button className="vvd"><span>{headerData.contact}</span></button>
            </HashLink>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
