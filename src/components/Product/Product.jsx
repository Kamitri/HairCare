import React, { useContext, useState } from 'react'
import { Badge, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import productList from '../../assets/json/Products.json'
import ImageGallery from 'react-image-gallery'
import { Rating } from '@mui/material';
import './index.scss'
import CartContext from '../CartContext'

function Manual({product}) {
    return (
    <section className='py-3'>
        <h2>Manual</h2>
        {(product.manual === null || product.manual === undefined) ? 
            <p className='font-italic'>No manual was provided by the manufacturer.</p> : product.manual.endsWith('.pdf') ? 
            <div>
                <a href={product.manual} target='_blank' rel='noreferrer'>Download file</a>
            </div> : 
            <p>{product.manual}</p>}
    </section>
    )
}

function Specifications({product}) {    
    const specAsElement = (specification) => {
        if (specification[1] === null) return null;
        if (specification[0] !== "Ingredients")
        return <p><span className='fw-bold'>{specification[0]}:</span> {specification[1]}</p>
        else return null;
    }
    return (
    <section className='py-3'>
        <h2>Specifications</h2>
        {product.specifications.map((spec) => 
            (<Col>{specAsElement(spec)}</Col>))
        }
    </section>
    )
}

function Ingredients({product}) {
    let ingredients = product.specifications.filter((spec) => spec[0] === 'Ingredients');
    if (ingredients.length === 0) {return null;}
    ingredients = ingredients[0][1];
    return (
    <section className='py-3'>
        <h2>Ingredients</h2>
        {ingredients.map((ingredient) => <Badge bg='secondary' pill className='me-3 my-1 px-2 py-2'>{ingredient}</Badge>)}
    </section>
    )
}

function Product() {
    const { productId } = useParams();
    const [ productQuantity, setProductQuantity ] = useState(1);
    const { shoppingCart, setShoppingCart } = useContext(CartContext);
    const product = productList.filter((prod) => prod.id === productId)[0];
    const images = product.images.map((image) => ({'original': image, 'originalHeight': '400px'}))

    function handleAddToCart() {
        let newShoppingCart = [...shoppingCart];
        // Check if the cart already has this item. If it does, increment instead of pushing
        const productInCart = newShoppingCart.filter((product) => product.id === productId);
        if (productInCart.length !== 0) {
            newShoppingCart = newShoppingCart.filter((product) => product.id !== productId);
            newShoppingCart.push({'id': productId, 'quantity': productInCart[0].quantity + productQuantity})
        }
        else {
            newShoppingCart.push({'id': productId, 'quantity': productQuantity})
        }
        setShoppingCart(newShoppingCart);
    }

    function handleChangeProductQuantity(e) {
        setProductQuantity(parseInt(e.target.value));
    }

    return (
        <main> 
            <Container className="px-4 my-5">
                <Row className="gx-4 align-items-center">
                    <Col md={6}>    
                        <ImageGallery items={images} slideInterval={4000} autoPlay={true} />
                    </Col>
                    <div className="col-md-6">
                        <h1 className="fw-bold">{product.name}</h1>
                        <Badge pill bg='secondary'>{product.inStock !== 0 ? product.inStock + " in stock" : "Out of stock"}</Badge>
                        {product.featured && 
                        <Badge pill className='ms-2' bg='success'>Featured Product</Badge>}
                        <div className="my-2 fs-5 d-flex justify-content-between">
                            <span className='fw-bold'>${product.price.toFixed(2)}</span>
                            <div className='d-flex align-items-center'>
                                <Rating name='product-rating' defaultValue={product.rating} precision={0.1} readOnly/>
                            <span className='ps-1 fw-bold'>{product.rating}</span>
                        </div>
                        </div>
                        
                        <p className="lead">{product.desc}</p>
                        {product.inStock !== 0 ? 
                        <div className="d-flex">
                            <input className="text-center me-3" id="product-quantity" type="number" style={{maxWidth: "3rem"}} value={ productQuantity } min={1} max={product.inStock} onChange={handleChangeProductQuantity}/>
                            <button className="btn-stylized px-4 py-1" onClick={handleAddToCart}>
                                Add to cart
                            </button>
                        </div>:
                        <h4>Not available for purchase.</h4>}
                        
                    </div>
                </Row>
                <Row>
                    <Col>
                        <Manual product={product} />
                        <Specifications product={product} />
                        <Ingredients product={product} />
                    </Col>
                </Row>
                
            </Container>
        </main>
    )
}

export default Product