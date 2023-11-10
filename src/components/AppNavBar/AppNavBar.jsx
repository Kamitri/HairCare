import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './index.scss'
import CartContext from '../CartContext'
import { Navbar, NavbarBrand, NavDropdown, Nav, Container, Badge } from 'react-bootstrap'
import { FaCartShopping } from 'react-icons/fa6'

function AppNavBar() {
    const { shoppingCart, setShoppingCart } = useContext(CartContext);
    const location = useLocation();
    return (
        <Navbar expand='lg' className='navbar-dark pt-3'>
            <Container fluid>
                <NavbarBrand href="#">
                    <img src="/logo.png" height="30" alt="HairCare Logo"/>
                </NavbarBrand>
                <Navbar.Toggle aria-controls="app-navbar" />
                <Navbar.Collapse id="app-navbar">
                    <Nav className='me-5' style={{gap: "5vh"}}>
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
                        <NavDropdown.Item as={Link} to={'/products/spray-bottle'} >Spray bottles</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/products/steamer'} >Steamers</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/products/massager'} >Massager</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/products/spa-cap'} >Spa caps</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown className={location.pathname.includes('/brand') ? "link-active" : ''} title='BRANDS'>
                        <NavDropdown.Item as={Link} to={'/brand/hair-care-manufacturing'}>HairCare Manufacturing</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/brand/loreal'}>L'Oréal</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/brand/head-and-shoulders'}>Head & Shoulders</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/brand/philips'}>Philips</NavDropdown.Item>
                    </NavDropdown>
                    <Link className={'nav-item nav-link ' + (location.pathname === '/compare' ? "link-active" : '')} to="/compare">COMPARE</Link>
                    <Link className={'nav-item nav-link ' + (location.pathname === '/contact-us' ? "link-active" : '')} to="/contact-us">CONTACT US</Link>
                    <Link className={'nav-item nav-link ' + (location.pathname === '/about-us' ? "link-active" : '')} to="/about-us">ABOUT US</Link>
                    </Nav>
                    <Link to='/cart'>
                        <button className='btn-primary-stylized px-3 py-1 d-flex align-items-center' >
                            <FaCartShopping className='me-1'/>
                            Cart
                            <Badge className='ms-1' bg="secondary">
                                { shoppingCart.length === 0 ? 0 : shoppingCart.length === 1 ? shoppingCart[0].quantity : shoppingCart.reduce((sum, product) => sum + product.quantity, 0) }
                            </Badge>
                        </button>
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavBar