import React, { useState } from 'react'
import './index.scss'
import {FaMapLocation, FaEnvelope, FaPhone} from 'react-icons/fa6'
import { Card, Col, Container, Form, Row } from 'react-bootstrap'

function ContactUs() {
    const [ justSentMessage, setJustSentMessage ] = useState(false);
    const [ userName, setUserName ] = useState(null);
    function handleSendMessage(e) {
        e.preventDefault();
        const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries());
        setUserName(formDataObj.name)
        setJustSentMessage(true);
        let x = document.getElementById('contact-us-name');
        x.value = '';
        x = document.getElementById('contact-us-email');
        x.value = ''; 
        x = document.getElementById('contact-us-subject');
        x.value = ''; 
        x = document.getElementById('contact-us-message');
        x.value = '';  
    }
  return (
    <main id="contact" className="contact pt-3">
        <Container>
            <Row>
                <Col className='section-title'>
                    <p>Something on your mind? Don't hesitate to contact us, we are always available to help. </p>
                </Col>
            </Row>
            <Row>
                <Col className='mb-3' md={6} lg={7} data-aos='fade-right'>
                    <Form className='form-contact-us' onSubmit={handleSendMessage}>
                        <Row>
                            <Col>
                                <Form.Label>Name (*)</Form.Label>
                                <Form.Control id='contact-us-name' name='name' type="text" placeholder="Enter your name" required/>
                            </Col>
                            <Col>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control id='contact-us-email' name='email' type="email" placeholder="Enter email" />
                            </Col>
                        </Row>
                        <Form.Group>
                            <Form.Label>Subject (*)</Form.Label>
                            <Form.Control id='contact-us-subject' name='subject' type="text" placeholder="Title of your message" required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Message (*)</Form.Label>
                            <Form.Control id='contact-us-message' name='message' as="textarea" rows={3} placeholder="Content of your message" required/>
                        </Form.Group>
                        {justSentMessage && <div className="my-3">
                          <div className="sent-message">Thank you for your feedback, {<b>{userName}</b>}!</div>
                        </div>}
                        <div className="text-center pt-3"><button className='btn-stylized rounded py-1 px-3' type="submit">Send Message</button></div>
                    </Form>
                </Col>
                <Col className='mb-3' md={6} lg={5} data-aos='fade-left' data-aos-delay='100'>
                    <Card className='contact-us-card p-3'>
                        <div className="address contact-us-info">
                            <Row>
                                <Col className='col-auto'><FaMapLocation className='contact-us-icon' size={30}/></Col>
                                <Col>
                                    <h4>Location:</h4>
                                    <p>391A Nam Ky Khoi Nghia Street, District 3, Ho Chi Minh City, Vietnam</p>
                                </Col>
                            </Row>
                        </div>

                        <div className="email contact-us-info">
                            <Row>
                                <Col className='col-auto'><FaEnvelope className='contact-us-icon' size={30}/></Col>
                                <Col>
                                    <h4>Email:</h4>
                                    <p>kamitri.tnyn@gmail.com</p>
                                </Col>
                            </Row>
                        </div>

                        <div className="phone contact-us-info">
                            <Row>
                                <Col className='col-auto'><FaPhone className='contact-us-icon' size={30}/></Col>
                                <Col className='align-items-center'>
                                    <h4>Call:</h4>
                                    <p>+084-0000-1111</p>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col data-aos='zoom-in' data-aos-delay='100'>
                    <iframe
                    title='HairCare Inc. Headquarters Location'
	                width='100%'
	                height='400px'
	                frameborder='0' style={{border: '0'}}
	                referrerpolicy='no-referrer-when-downgrade'
	                src='//www.google.com/maps/embed/v1/place?key=AIzaSyCVgvXLzZY03gYNAE-n_JWcmVK2-SxwRxo&q=FPT+APTECH+HCM+2+-+Hệ+Thống+Đào+Tạo+Lập+Trình+Viên+Quốc+Tế+(Since+1999)'
	                allowfullscreen>
                    </iframe>
                </Col>
            </Row>
        </Container>

    </main>
  )
}

export default ContactUs