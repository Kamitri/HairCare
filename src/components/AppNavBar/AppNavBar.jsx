import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './index.scss'
import { Button, Dropdown, Navbar, NavbarBrand, ButtonGroup, NavDropdown, Nav } from 'react-bootstrap'

function AppNavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    return (
       <Navbar expand='lg' className='navbar-dark'>
            <NavbarBrand href="#">
                <img src="/logo.png" height="30" alt="HairCare Logo"/>
            </NavbarBrand>
            <Navbar.Toggle aria-controls="app-navbar" />
            <Navbar.Collapse id="app-navbar">
                <Nav className="me-auto" style={{gap: "5vh"}}>
                    <Link className={'nav-item nav-link ' + (location.pathname === '/' ? "link-active" : '')} to="/">HOME</Link>
                    <Link className={"nav-item nav-link " + (location.pathname === '/blog' ? "link-active" : '')} to="/blog">BLOG</Link>
                    <NavDropdown className={location.pathname.includes('/products') ? "link-active" : ''} title='STORE'>
                        <NavDropdown.Item as={Link} to={'/products'} >All Products</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/products/hair-cream'} >Hair cream</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/products/shampoo'} >Shampoo</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/products/conditioner'} >Conditioners</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/products/mask'} >Masks</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/products/serum'} >Serums</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/products/hairspray'} >Hairspray</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/products/oil'} >Hair oils</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/products/dryer'} >Dryers</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/products/straightener'} >Straighteners</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/products/spray-bottle'} >Hair oils</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/products/steamer'} >Steamers</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/products/massager'} >Massager</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/products/spa-cap'} >Spa caps</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown className={location.pathname.includes('/brand') ? "link-active" : ''} title='BRANDS'>
                        <NavDropdown.Item as={Link} to={'/brand/hair-care-manufacturing'}>HairCare Manufacturing</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/brand/loreal'}>L'Oréal</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/brand/philips'}>Philips</NavDropdown.Item>
                    </NavDropdown>
                    <Link className={'nav-item nav-link ' + (location.pathname === '/compare' ? "link-active" : '')} to="/compare">COMPARE</Link>
                    <Link className={'nav-item nav-link ' + (location.pathname === '/contact-us' ? "link-active" : '')} to="/contact-us">CONTACT US</Link>
                    <Link className={'nav-item nav-link ' + (location.pathname === '/about-us' ? "link-active" : '')} to="/about-us">ABOUT US</Link>
                </Nav>
            </Navbar.Collapse>
       </Navbar>
    )
}

export default AppNavBar