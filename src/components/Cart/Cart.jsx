import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Form, Image, Row, Table } from 'react-bootstrap'
import CartContext from '../CartContext';
import allProducts from '../../assets/json/Products.json'
import { Link } from 'react-router-dom';
import './index.scss'


function CustomerInfo({ total }) {
    function handleFormSubmit(e) {
        const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries());
        let msg = "Your purchase order totaling $" + total + " has been successfully processed!\n" + "Your name: " + formDataObj.lastName + " " + formDataObj.firstName + "\n";
        if (formDataObj.email !== "")
            msg += "Email: " + formDataObj.email + "\n";
        msg += "Address: " + formDataObj.address + "\n" + "Phone Number: " + formDataObj.phoneNumber;

        alert(msg);
    }
    return (
        <Form className="container" onSubmit={handleFormSubmit}>
            <Row className='mb-3'>
                <Col md={4}>
                    <Form.Label for="firstName">First name (*)</Form.Label>
                    <Form.Control type="text" name="firstName" id="firstName" required />
                </Col>
                <Col md={4}>
                    <Form.Label for="lastName">Last name (*)</Form.Label>
                    <Form.Control type="text" name="lastName" id="lastName" required />
                </Col>
                <Col md={4}>
                    <Form.Label for="email">Email</Form.Label>
                    <Form.Control type="email" name="email" id="email" />
                </Col>
            </Row>

            <Row className='my-3'>
                <Col md={8}>
                    <Form.Label for="address">Address (*)</Form.Label>
                    <Form.Control type="text" name="address" id="address" required />
                </Col>
                <Col md={4}>
                    <Form.Label for="phoneNumber">Phone Number (*)</Form.Label>
                    <Form.Control type="tel" name="phoneNumber" id="phoneNumber" pattern="^(\(\d{3}\)|\d{3})-?\d{3}-?\d{4}$" required />
                </Col>
            </Row>
            <Row className='my-3'>
                <Col>
                    <button className="btn-stylized rounded px-2 py-1" type="submit">Continue purchase</button>
                </Col>
            </Row>
        </Form>
    )
}

function CartTable({ shoppingCart, setShoppingCart, total, setTotal }) {
    
    useEffect(() => {
        let newTotal = 0;
        for (let index = 0; index < shoppingCart.length; index++) {
            const productInfo = shoppingCart[index];
            const product = allProducts.filter((product) => product.id === productInfo.id)[0];
            newTotal += product.price * productInfo.quantity;
            setTotal(Number(newTotal).toFixed(2));
        }
	  }, [shoppingCart]);

    function handleChangeQuantity(productId, newQuantity) {
        let newShoppingCart = [...shoppingCart];
        // Check if the cart already has this item. If it does, increment instead of pushing

        for (let index = 0; index < newShoppingCart.length; index++) {
            const element = newShoppingCart[index];
            if (element.id === productId) {
                newShoppingCart[index].quantity = newQuantity;
            } 
            
        }
        setShoppingCart(newShoppingCart);
    }

    return (
    <Table responsive hover>
        <thead>
            <th style={{width: '40%'}}>Products</th>
            <th style={{width: '30%'}}>Preview</th>
            <th style={{width: '15%'}}>Quantity</th>
            <th style={{width: '15%'}}>Price</th>
        </thead>
        <tbody>
            {shoppingCart.map((productInfo) => 
            <tr>
                <td>
                    <Link className='no-style' to={`/product/${productInfo.id}`}>
                        { allProducts.filter((product) => product.id === productInfo.id)[0].name }
                    </Link>
                </td>
                <td>
                    <Image style={{maxHeight: '18vh'}} fluid src={ allProducts.filter((product) => product.id === productInfo.id)[0].images[0] }>
                    </Image>
                </td>
                <td><input style={{maxWidth: '50px'}} min={0} max={allProducts.filter((product) => product.id === productInfo.id)[0].inStock} type='number' value={ productInfo.quantity } onChange={(e) => handleChangeQuantity(productInfo.id, parseInt(e.target.value))} /></td>
                <td>{ '$' + parseFloat(allProducts.filter((product) => product.id === productInfo.id)[0].price).toFixed(2) }</td>
            </tr>
            )}
            <tr>
                <td colSpan={3}><b>Total</b></td>
                <td> 
                    { '$' + total }
                </td>
            </tr>
        </tbody>
    </Table>
    )
}


function Cart() {
    const { shoppingCart, setShoppingCart } = useContext(CartContext);
    const [ total, setTotal ] = useState(0);
    return (
        <Container className='mt-4'>
            {shoppingCart.length > 0 ?
             <Container fluid>
                <CartTable shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} total={total} setTotal={setTotal} />
                <h1 className='mt-5'>Your contact information</h1>
                <CustomerInfo total={total}/>
            </Container>
             : <h1>Nothing here yet. Add some products to the cart to continue!</h1>}
    
        </Container>
    )
}

export default Cart