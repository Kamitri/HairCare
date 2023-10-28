import React from 'react'
import './index.scss'
import { useState, useContext } from 'react'
import { Container, Col, Row, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Rating } from '@mui/material'
import ComparisonContext from '../ComparisonContext'

function GalleryItem({product}) {
    const navigate = useNavigate();
    const { comparisonList, setComparisonList } = useContext(ComparisonContext);
    const [ productInComparison, setProductInComparison ] = useState(comparisonList.filter((comparingProduct) => comparingProduct.id === product.id).length === 1);

    const handleAddToComparison = (e) => {
        e.stopPropagation(); 
        if (comparisonList.filter((comparingProduct) => comparingProduct.id === product.id).length !== 0) return;
        let newComparisonList = comparisonList;
        newComparisonList.push(product);
        setComparisonList(newComparisonList);
        setProductInComparison(true);
    }

    const handleRemoveFromComparison = (e) => {
        e.stopPropagation(); 
        const newComparisonList = comparisonList.filter((comparingProduct) => comparingProduct.id !== product.id)
        setComparisonList(newComparisonList);
        setProductInComparison(false);
    }

    return (
        <Card className='product-card mx-3 mb-3' onClick={() => navigate(`/product/${product.id}`)}>
            <Card.Img className='product-card-img' src={product.images[0]} />
            <Card.Body className='d-flex flex-column justify-content-start'>
                <Card.Title className='product-name fs-6'>{product.name}</Card.Title>
                <div className='d-flex align-items-center product-rating'>
                    <Rating value={product.rating} precision={0.1} readOnly/>
                    <span className='ps-1'>{product.rating}</span>
                </div>
                <div className='d-flex mt-auto align-items-end'>
                <Card.Text className='pricetag fw-bold mb-0'>${product.price.toFixed(2)}</Card.Text>
                {
                        productInComparison ? 
                        <Button className='ms-auto' variant='danger' onClick={handleRemoveFromComparison}>Remove</Button> :
                        <Button className='ms-auto' variant='primary' onClick={handleAddToComparison}>Compare</Button>
                    }
                </div>
                
            </Card.Body>
        </Card>
    )
}
function Gallery({productList, cols}) {
    const rows = productList.length > cols ? Math.ceil(productList.length / cols) : 1;
    return (
        <Container className='gallery'>
            {Array.from({ length: rows }).map((_, i) =>
                <Row lg={cols}>
                    {productList.slice(cols * i, (cols * i) + cols).map((product, idx) => (
                        <Col key={idx}>
                            <GalleryItem product={product}></GalleryItem>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    )
}

export default Gallery