import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useState, useEffect } from "react";
import axios from 'axios';

export const Projects = () => {
  const [projectData, setProjectData] = useState(null);

  // Fetch project data from API
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/master/project');
        setProjectData(response.data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };
    fetchProjectData();
  }, []);

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>{projectData ? projectData.title : 'Portfolio'}</h2>
                  <p>{projectData ? projectData.description : 'Portfolio'}</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Tab 1</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Tab 2</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Tab 3</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {
                            projectData && projectData.projects ? (
                              projectData.projects.map((project) => (
                                <ProjectCard
                                  key={project._id}
                                  title={project.title}
                                  description={project.description}
                                  imgUrl={`http://localhost:5000/${project.image}`} 
                                />
                              ))
                            ) : (
                              <p>No projects available.</p>
                            )
                          }
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                      <Row>
                          {
                            projectData && projectData.projects ? (
                              projectData.projects.slice(3).map((project) => (
                                <ProjectCard
                                  key={project._id}
                                  title={project.title}
                                  description={project.description}
                                  imgUrl={`http://localhost:5000/${project.image}`} 
                                />
                              ))
                            ) : (
                              <p>No projects available.</p>
                            )
                          }
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <p>Third Section</p>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="Background" />
    </section>
  );
}
