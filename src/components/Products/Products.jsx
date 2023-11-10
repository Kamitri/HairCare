import React, { useMemo, useState } from 'react'
import allProducts from '../../assets/json/Products.json'
import Gallery from '../Gallery'
import SortFilterOption from '../SortFilterOption'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import AdvancedPagination from '../AdvancedPagination/AdvancedPagination';
import { Col, Container, Row } from 'react-bootstrap';

function Products() {
    const { category } = useParams();
    const [ productData, setProductData ] = useState(allProducts);
    useEffect(() => {
        if (category === undefined | category === 'all') {
            setProductData(allProducts);
        }
        else {
            setProductData(allProducts.filter((product) => product.category === category))
        }}, 
        [category]) // productData is constantly equal to all product but limited to specific category

    const productsPerPage = 8;
    const [productList, setProductList] = useState(productData);
    const [displayingProductList, setDisplayingProductList] = useState(productList); // Set of productList consisting of <= productsPerPage elements to display to the user at any given page number.
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    useEffect(() => {
        if (JSON.stringify(productList) === JSON.stringify(productData)) return;  // This will prevent recursive update by making sure these objects are different
        setProductList(productData);
    }, [productData])
    useEffect(() => {
        let newMaxPage = Math.ceil(productList.length / productsPerPage);
        if (newMaxPage < 1) newMaxPage = 1;  // Minimum max page of 1
        setMaxPage(newMaxPage);
        // If max page change and current page is higher than it (user is on page 2 when filtering and it shrunk down to max 1 page for example) reset current page to max page
        if (currentPage > newMaxPage) {
            setCurrentPage(newMaxPage);
        }
    }, [productList, currentPage])

    useEffect(() => {
        const indexFrom = (currentPage - 1) * productsPerPage;
        const indexTo = productsPerPage + ((currentPage - 1) * productsPerPage);
        setDisplayingProductList(productList.slice(indexFrom, indexTo));
    }, [productList, currentPage])
    
    return (
        <Container fluid className='mt-3'>
            <Row>
                <Col lg={2} className='mb-5'>
                    <aside>
                        <SortFilterOption productData={productData} setProductList={setProductList}/>
                    </aside>
                </Col>
                <Col lg={10}>
                    {displayingProductList.length > 0 ?
                        <main>
                            <h4 className='mb-3 ms-4'>Found {productList.length} products matching your queries.</h4>
                            <Gallery productList={displayingProductList} cols={4} />
                            <AdvancedPagination currentPage={currentPage} setCurrentPage={setCurrentPage} maxPage={maxPage}/>
                        </main>:
                        <main className='pe-5'>
                            <h1>No Results Found.</h1>
                            <h2>Try expanding your query or email us about any specific request you may have.</h2>
                        </main>
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default Products