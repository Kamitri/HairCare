import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Form, Row, Table } from 'react-bootstrap'
import CartContext from '../CartContext';
import allProducts from '../../assets/json/Products.json'


function CustomerInfo({ total }) {
    function handleFormSubmit(e) {
        const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries());
        console.log(formDataObj);
        let msg = "Your purchase order totaling $" + total + " has been successfully processed!\n" + "Your name: " + formDataObj.lastName + " " + formDataObj.firstName + "\n";
        if (formDataObj.email !== "")
            msg += "Email: " + formDataObj.email + "\n";
        msg += "Address: " + formDataObj.address + "\n" + "Phone Number: " + formDataObj.phoneNumber;

        alert(msg);
    }
    return (
        <Form class="container needs-validation" onSubmit={handleFormSubmit}>
            <Row className='mb-3'>
                <Col md={4}>
                    <Form.Label for="firstName">First name</Form.Label>
                    <Form.Control type="text" name="firstName" id="firstName" required />
                </Col>
                <Col md={4}>
                    <Form.Label for="lastName">Last name</Form.Label>
                    <Form.Control type="text" name="lastName" id="lastName" required />
                </Col>
                <Col md={4}>
                    <Form.Label for="email">Email</Form.Label>
                    <Form.Control type="email" name="email" id="email" />
                </Col>
            </Row>

            <Row className='my-3'>
                <Col md={8}>
                    <Form.Label for="address">Address</Form.Label>
                    <Form.Control type="text" name="address" id="address" required />
                </Col>
                <Col md={4}>
                    <Form.Label for="phoneNumber">Phone Number</Form.Label>
                    <Form.Control type="tel" name="phoneNumber" id="phoneNumber" required />
                </Col>
            </Row>
            <Row className='my-3'>
                <Col>
                    <button class="btn btn-primary" type="submit">Submit form</button>
                </Col>
            </Row>
        </Form>
    )
}

function CartTable({ shoppingCart, total, setTotal }) {
    
    useEffect(() => {
        let newTotal = 0;
        for (let index = 0; index < shoppingCart.length; index++) {
            const productInfo = shoppingCart[index];
            const product = allProducts.filter((product) => product.id === productInfo.id)[0];
            newTotal += product.price * productInfo.quantity;
            setTotal(newTotal);
        }
	  }, [shoppingCart]);

    return (
    <Table striped responsive hover>
        <thead>
            <th style={{width: '70%'}}>Products</th>
            <th style={{width: '15%'}}>Quantity</th>
            <th style={{width: '15%'}}>Price</th>
        </thead>
        <tbody>
            {shoppingCart.map((productInfo) => 
            <tr>
                <td>{ allProducts.filter((product) => product.id === productInfo.id)[0].name }</td>
                <td>{ productInfo.quantity }</td>
                <td>{ '$' + parseFloat(allProducts.filter((product) => product.id === productInfo.id)[0].price).toFixed(2) }</td>
            </tr>
            )}
            <tr>
                <td colSpan={2}><b>Total</b></td>
                <td> 
                    { '$' + total }
                </td>
            </tr>
        </tbody>
    </Table>
    )
}


function Cart() {
    const { shoppingCart } = useContext(CartContext);
    const [ total, setTotal ] = useState(0);
    return (
        <Container className='mt-4'>
            {shoppingCart.length > 0 ?
             <Container fluid>
                <CartTable shoppingCart={shoppingCart} total={total} setTotal={setTotal} />
                <h1 className='mt-5'>Your contact information</h1>
                <CustomerInfo total={total}/>
            </Container>
             : <h1>Nothing here yet. Add some products to the cart to continue!</h1>}
    
        </Container>
    )
}

export default Cart