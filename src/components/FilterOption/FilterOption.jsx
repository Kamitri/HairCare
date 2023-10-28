import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { Rating } from '@mui/material';
import productData from '../../assets/json/Products.json'

function FilterOption({ setProductList }) {
    const [nameQuery, setNameQuery] = useState('');
    const [minPriceQuery, setMinPriceQuery] = useState(null);
    const [maxPriceQuery, setMaxPriceQuery] = useState(null);
    const [ratingQuery, setRatingQuery] = useState(0.0);
    useEffect(() => {
        let newProductList = [...productData];
        if (nameQuery !== '') {
            newProductList = newProductList.filter((product) => product.name.toLowerCase().includes(nameQuery.toLowerCase()));
        }
        if (minPriceQuery !== null)
            newProductList = newProductList.filter((product) => product.price >= minPriceQuery);
        if (maxPriceQuery !== null)
            newProductList = newProductList.filter((product) => product.price <= maxPriceQuery);
        newProductList = newProductList.filter((product) => product.rating >= ratingQuery);
        setProductList(newProductList);
        
    }, [nameQuery, minPriceQuery, maxPriceQuery, ratingQuery])
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
    return (
        <Card>
            <Card.Header>Sort Results</Card.Header>
            <label for='product-name'>Find by name:</label>
            <input type='text' id='product-name' onChange={handleNameQueryChange} value={nameQuery}/>
            <label for='min-price'>Minimum price</label>
            <input type='number' step={0.01} min={0} id='min-price' value={minPriceQuery}/>
            <label for='max-price'>Maximum price</label>
            <input type='number' step={0.01} min={0} id='max-price' value={maxPriceQuery}/>
            <div className='d-flex flex-row'>
            <label for='min-rating'>Minimum rating</label>
                <Rating value={ratingQuery} precision={0.1} readOnly/>
            </div>
            <div className='d-flex flex-row'>
                <input className='me-2' type='range' min={0.0} max={5.0} step={0.1} id='min-rating' value={ratingQuery} onChange=    {handleRatingQueryChange}/>
                <label>{parseFloat(ratingQuery).toFixed(1)}</label>
            </div>
        </Card>
    )
}

export default FilterOption