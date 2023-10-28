import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Card } from 'react-bootstrap'

function SortingOption({ productList, setProductList }) {
    const [sortBy, setSortBy] = useState('');
    useEffect(() => {
        if (sortBy === 'price-descending') {
            setProductList([...productList.sort((a, b) => b.price - a.price)]);
        }
        else if (sortBy === 'price-ascending') {
            setProductList([...productList.sort((a, b) => a.price - b.price)]);
        }
        else if (sortBy === 'rating-descending') {
            setProductList([...productList.sort((a, b) => b.rating - a.rating)]);
        }
        else if (sortBy === 'rating-ascending') {
            setProductList([...productList.sort((a, b) => a.rating - b.rating)]);
        }
    }, [sortBy, productList])
    function handleSortByChange(event) {
        setSortBy(event.target.value);
    }
    return (
        <Card style={{marginBottom: '20px'}}>
            <Card.Header>Filter Results</Card.Header>
            <select onChange={handleSortByChange} name='products-filter' id='products-filter'>
                <option disabled selected value>-- Select an option --</option>
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
    )
}

export default SortingOption