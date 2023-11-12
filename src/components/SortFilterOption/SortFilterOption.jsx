import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Rating } from '@mui/material';

function SortFilterOption({ productData, setProductList }) {
    const [nameQuery, setNameQuery] = useState('');
    const [minPriceQuery, setMinPriceQuery] = useState(null);
    const [maxPriceQuery, setMaxPriceQuery] = useState(null);
    const [ratingQuery, setRatingQuery] = useState(0.0);
    const [sortBy, setSortBy] = useState('');

    useEffect(() => {
        setMinPriceQuery(null);
        setMaxPriceQuery(null);
        setRatingQuery(0.0);
        setSortBy('');
        setNameQuery('');
    }, [productData])

    useEffect(() => {
        // Filtering
        let newProductList = [...productData];
        if (nameQuery !== '') {
            newProductList = newProductList.filter((product) => product.name.toLowerCase().includes(nameQuery.toLowerCase()));
        }
        if (minPriceQuery !== null & minPriceQuery !== '')
            newProductList = newProductList.filter((product) => product.price >= minPriceQuery);
        if (maxPriceQuery !== null & maxPriceQuery !== '')
            newProductList = newProductList.filter((product) => product.price <= maxPriceQuery);
        newProductList = newProductList.filter((product) => product.rating >= ratingQuery);
        // Sorting
        if (sortBy === 'price-descending') {
            newProductList = newProductList.sort((a, b) => b.price - a.price);
        }
        else if (sortBy === 'price-ascending') {
            newProductList = newProductList.sort((a, b) => a.price - b.price);
        }
        else if (sortBy === 'rating-descending') {
            newProductList = newProductList.sort((a, b) => b.rating - a.rating);
        }
        else if (sortBy === 'rating-ascending') {
            newProductList = newProductList.sort((a, b) => a.rating - b.rating);
        }

        setProductList(newProductList);
        
    }, [nameQuery, minPriceQuery, maxPriceQuery, ratingQuery, sortBy])
    function handleNameQueryChange(event) {
        setNameQuery(event.target.value);
    }
    function handleMinPriceQueryChange(event) {
        setMinPriceQuery(event.target.value);
    }
    function handleMaxPriceQueryChange(event) {
        setMaxPriceQuery(event.target.value);
    }
    function handleRatingQueryChange(event) {
        setRatingQuery(event.target.value)
    }
    function handleSortByChange(event) {
        setSortBy(event.target.value);
    }

    return (
        <Container>
            <Row lg={12}>
                <Col>
                    <Card className='mb-4'>
            <Card.Header>Filter Results</Card.Header>
            <select onChange={handleSortByChange} value={sortBy} name='products-filter' id='products-filter'>
                <option disabled selected value=''>-- Select an option --</option>
                <optgroup label='Price'>
                    <option key='price-ascending' value='price-ascending'>Price Ascending</option>
                    <option key='price-descending' value='price-descending'>Price Descending</option>
                </optgroup>
                <optgroup label='Rating'>
                    <option key='rating-ascending' value='rating-ascending'>Rating Ascending</option>
                    <option key='rating-descending' value='rating-descending'>Rating Descending</option>
                </optgroup>
            </select>
                    </Card>
                </Col>
            
                <Col>
                    <Card>
                        <Card.Header>Sort Results</Card.Header>
                        <div className='d-flex flex-column p-3'>
                            <label for='product-name'>Find by name:</label>
                            <input type='text' id='product-name' onChange={handleNameQueryChange} value={nameQuery}/>
                            <label for='min-price'>Minimum price</label>
                            <input type='number' step={0.01} min={0} id='min-price' onChange={handleMinPriceQueryChange}    value=     {minPriceQuery}/>
                            <label for='max-price'>Maximum price</label>
                            <input type='number' step={0.01} min={0} id='max-price' onChange={handleMaxPriceQueryChange}    value=     {maxPriceQuery}/>
                            <label for='min-rating'>Minimum rating</label>
                            <Rating value={ratingQuery} precision={0.1} onChange={handleRatingQueryChange}/>
                            <div className='d-flex flex-row'>
                                <input className= 'w-75 me-2' type='range' min={0.0} max={5.0} step={0.1} id='min-rating' value={ratingQuery} onChange={handleRatingQueryChange}/>
                                <label>{parseFloat(ratingQuery).toFixed(1)}</label>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default SortFilterOption