import React from 'react'
import allBrands from '../../assets/json/Brands.json'
import allProducts from '../../assets/json/Products.json'
import { Badge, Button, Card, Col, Container, Pagination, Row, Stack, Image } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import './index.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import Products from '../Products'
import SortFilterOption from '../SortFilterOption'
import Gallery from '../Gallery'


function Brand() {
    const [productData, setProductData] = useState(allProducts);
    const [productList, setProductList] = useState(allProducts);
    const { brandId } = useParams();
    const [brand, setBrand] = useState(allBrands.filter((brand) => brand.id === brandId)[0]);

    useEffect(() => {
        const newBrand = allBrands.filter((brand) => brand.id === brandId)[0];
        setBrand(newBrand);
        const brandProducts = allProducts.filter((product) => product.brand === newBrand.name);
        setProductData(brandProducts);
        setProductList(brandProducts);
    }, [brandId]);

    return (
    <main>
        <header className="bg-light border-bottom py-2 mb-3">
            <div className="container">
                <div className="text-center my-3">
                    <img className='w-25 h-auto' src={brand.logo} alt={brand.name + ' logo'}/>
                    <p className="lead mb-0">{brand.desc}</p>
                </div>
            </div>
        </header>
        <div className='products d-flex'> 
            <aside>
                <SortFilterOption productData={productData} setProductList={setProductList}/>
            </aside>
            <main>
                <Gallery productList={productList} cols={4}/>
            </main>
        </div>
    </main>
    )
}

export default Brand