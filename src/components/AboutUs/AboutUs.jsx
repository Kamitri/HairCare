import React from 'react'
import { Row, Col, Container, Card, Stack } from 'react-bootstrap'
import allEmployees from '../../assets/json/Employees.json'
import {FaFacebook, FaGithub, FaXTwitter, FaInstagram} from 'react-icons/fa6'
import './index.scss'


function OurStory() {
  return (
  <section></section>
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
                <p className='lead text-center'>Our team at HairCare is the heart of our commitment to exceptional hair care.   With experts in hair care, product development, and customer support, we collaborate to offer innovative  solutions tailored to your hair's unique needs. Get to know the faces behind the brand; we're here to guide  you on your hair care journey.</p>
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
            <Team />
        </main>
    )
}

export default AboutUs