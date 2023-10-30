import React from 'react'
import { Row, Col, Container, Card, Stack } from 'react-bootstrap'
import allEmployees from '../../assets/json/Employees.json'
import {FaFacebook, FaGithub, FaXTwitter, FaInstagram} from 'react-icons/fa6'
import './index.scss'


function OurStory() {
  return (
  <section>
    <div className='container mt-3 text-right'>
        <h2 className='section-title fw-bold'>Our Story</h2>
        <Container>
            <Row>
                <Col>
                    <img src='https://media.istockphoto.com/id/1347116065/photo/daily-routine-at-the-office.jpg?s=612x612&w=0&k=20&c=hQUg-hz3xOZurD3Ys5eWmI1cGW04Mvt8y1lX48urj9I=' className='float-left' alt='HairCare company demonstration' />
                </Col>
                <Col>
                    <p>In January 2023, Nguyễn Minh Trí, a passionate entrepreneur, embarked on a digital adventure, giving birth to HairCare – an exclusively e-commerce platform for hair care products. This visionary journey was fueled by Nguyễn Minh Trí's desire to revolutionize the way we approach hair care.</p>
                    <p>Nguyễn Minh Trí's mission was clear: to provide personalized hair care solutions in a world where generic products ruled the market. He believed that every individual's hair deserved a customized approach, and this core belief became the driving force behind HairCare.</p>
                    <p>From its inception, HairCare served as an online repository of knowledge, offering valuable insights into common hair problems, home remedies, and the latest products. It seamlessly blended science and nature, tradition and innovation, all within a few clicks.</p>
                    <p>As we step into 2023, HairCare's narrative continues to evolve. The mission remains unwavering: to empower individuals to embrace the unique beauty of their hair. Join us on this digital odyssey, where your hair's story becomes our story. Welcome to the HairCare family, where Nguyễn Minh Trí's vision becomes a reality.</p>
                </Col>
            </Row>
        </Container>
    </div>
  </section>
  )
}

function TeamMember({ employeeId }) {
    let employee = allEmployees.filter((employee) => employee.id === employeeId)[0]
    console.log(employee);
    return (
    <Card className='card-team-member m-3 w-100 h-100'>
        <div className='d-flex flex-row h-100'>
            <img style={{'max-width': '30%', 'height': 'auto', objectFit: 'contain'}} className='img-fluid ms-3 rounded align-self-center' src={employee.avatar}/>
            <div className='mx-4 d-flex flex-column justify-content-center'>
                <h4 className='fw-bold'>{employee.name}</h4>
                <h6 className='my-0'>{employee.role}</h6>
                <p className='fs-6 lead my-0'>{employee.desc}</p>
                <Stack direction='horizontal' gap={3}>
                    <a className='social-link' href={employee.social.facebook}><FaFacebook size={20}/></a>
                    <a className='social-link' href={employee.social.github}><FaGithub size={20}/></a>
                    <a className='social-link' href={employee.social.x}><FaXTwitter size={20}/></a>
                    <a className='social-link' href={employee.social.instagram}><FaInstagram size={20}/></a>
                </Stack>
            </div>
        </div>
    </Card>
    )
}

function Team() {
  return (
    <section id='team' className='team py-5'>
        <div className='container'>
            <section data-aos='fade-up'>
                <div className='section-title'>
                    <h2 className='fw-bold'>Meet Our Team</h2>
                </div>
                <p className='text-center'>Our team at HairCare is the heart of our commitment to exceptional hair care.   With experts in hair care, product development, and customer support, we collaborate to offer innovative  solutions tailored to your hair's unique needs. Get to know the faces behind the brand; we're here to guide  you on your hair care journey.</p>
            </section>
            <Container>
                <Row>
                    <Col className='mb-5 col-lg-6 d-flex align-items-stretch' data-aos='zoom-in'>
                        <TeamMember employeeId={1} />
                    </Col>
                    <Col className='mb-5 col-lg-6 d-flex align-items-stretch' data-aos='zoom-in' data-aos-delay='200'>
                        <TeamMember employeeId={2} />
                    </Col>
                </Row>
                <Row>
                    <Col className='mb-5 col-lg-6 d-flex align-items-stretch' data-aos='zoom-in' data-aos-delay='400'>
                        <TeamMember employeeId={3} />
                    </Col>
                    <Col className='mb-5 col-lg-6 d-flex align-items-stretch' data-aos='zoom-in' data-aos-delay='600'>
                        <TeamMember employeeId={4} />
                    </Col>
                </Row>
            </Container>
        </div>
    </section>
    )
}

function AboutUs() {
    return (
        <main>
            <OurStory />
            <hr />
            <Team />
        </main>
    )
}

export default AboutUs