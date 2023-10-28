import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './index.scss'
import { Button, Dropdown, Navbar, NavbarBrand, ButtonGroup, NavDropdown } from 'react-bootstrap'

function AppNavBar() {
    const navigate = useNavigate();
    return (
       <Navbar className='navbar-expand-lg navbar-dark'>
            <NavbarBrand href="#">
                <img src="/logo.png" height="30" alt="HairCare Logo"/>
            </NavbarBrand>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"   aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav" style={{gap: "5vh"}}>
                    <Link className="nav-item nav-link active" to="/">HOME</Link>
                    <Link className="nav-item nav-link active" to="/blog">BLOG</Link>
                    <Dropdown as={ButtonGroup} className='app-dropdown'>
                    <button className='app-dropdown' onClick={() => navigate('/products')}>PRODUCTS</button>
                    <Dropdown.Toggle split />
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={'/products/hair-cream'} >Hair cream</Dropdown.Item>
                        <Dropdown.Item as={Link} to={'/products/shampoo'} >Shampoo</Dropdown.Item>
                        <Dropdown.Item as={Link} to={'/products/conditioner'} >Conditioners</Dropdown.Item>
                        <Dropdown.Item as={Link} to={'/products/mask'} >Masks</Dropdown.Item>
                        <Dropdown.Item as={Link} to={'/products/serum'} >Serums</Dropdown.Item>
                        <Dropdown.Item as={Link} to={'/products/hairspray'} >Hairspray</Dropdown.Item>
                        <Dropdown.Item as={Link} to={'/products/oil'} >Hair oils</Dropdown.Item>
                        <Dropdown.Item as={Link} to={'/products/dryer'} >Dryers</Dropdown.Item>
                        <Dropdown.Item as={Link} to={'/products/straightener'} >Straighteners</Dropdown.Item>
                        <Dropdown.Item as={Link} to={'/products/spray-bottle'} >Hair oils</Dropdown.Item>
                        <Dropdown.Item as={Link} to={'/products/steamer'} >Steamers</Dropdown.Item>
                        <Dropdown.Item as={Link} to={'/products/massager'} >Massager</Dropdown.Item>
                        <Dropdown.Item as={Link} to={'/products/spa-cap'} >Spa caps</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown as={ButtonGroup} className='app-dropdown'>
                        <button className='app-dropdown' onClick={() => navigate('#')}>BRANDS</button>
                        <Dropdown.Toggle split />
                        <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={'/brand/hair-care-manufacturing'}>HairCare Manufacturing</Dropdown.Item>
                            <Dropdown.Item as={Link} to={'/brand/loreal'}>L'Oréal</Dropdown.Item>
                            <Dropdown.Item as={Link} to={'/brand/philips'}>Philips</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Link className="nav-item nav-link active" to="/compare">COMPARE</Link>
                    <Link className="nav-item nav-link active" to="/contact-us">CONTACT US</Link>
                    <Link className="nav-item nav-link active" to="/about-us">ABOUT US</Link>
                </div>
            </div>
       </Navbar>
    )
}

export default AppNavBar