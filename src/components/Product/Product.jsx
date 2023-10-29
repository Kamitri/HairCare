import React from 'react'
import { Carousel, Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import productList from '../../assets/json/Products.json'
import { useState } from 'react';
import ImageGallery from 'react-image-gallery'
import { Rating } from '@mui/material';
import './index.scss'

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
        {ingredients.map((ingredient) => <span className='me-3'>{ingredient}</span>)}
    </section>
    )
}

function Product() {
    const { productId } = useParams();
    const product = productList.filter((prod) => prod.id === productId)[0];
    const images = product.images.map((image) => ({'original': image, 'originalHeight': '400px'}))
    return (
        <main> 
            <Container className="px-4 my-5">
                <Row className="gx-4 align-items-center">
                    <Col md={6}>    
                        <ImageGallery items={images} slideInterval={4000} autoPlay={true} />
                    </Col>
                    <div className="col-md-6">
                        <h1 className="fw-bold">{product.name}</h1>
                        <div className="fs-5">
                            <span>${product.price.toFixed(2)}</span>
                        </div>
                        <div className='d-flex align-items-center py-1'>
                            <Rating name='product-rating' defaultValue={product.rating} precision={0.1} readOnly/>
                            <span className='ps-1 fw-bold'>{product.rating}</span>
                        </div>
                        <p className="lead">{product.desc}</p>
                        <div className="d-flex">
                            <input className="text-center me-3" id="input-quantity" type="num" value="1" style={{maxWidth: "3rem"}} />
                            <button className="btn-stylized px-4 py-1" type="button">
                                Add to cart
                            </button>
                        </div>
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