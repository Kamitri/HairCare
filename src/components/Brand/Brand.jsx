import React from 'react'
import allBrands from '../../assets/json/Brands.json'
import allProducts from '../../assets/json/Products.json'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import SortFilterOption from '../SortFilterOption'
import Gallery from '../Gallery'
import './index.scss'
import { Col, Container, Row } from 'react-bootstrap'


function Brand() {
    const [productData, setProductData] = useState(allProducts);
    const [productList, setProductList] = useState(allProducts);
    const { brandId } = useParams();
    console.log(brandId, allBrands);
    const [brand, setBrand] = useState(allBrands.filter((brand) => brand.id.toLowerCase() === brandId.toLowerCase())[0]);

    useEffect(() => {
        const newBrand = allBrands.filter((brand) => brand.id.toLowerCase() === brandId.toLowerCase())[0];
        setBrand(newBrand);
        const brandProducts = allProducts.filter((product) => product.brand.toLowerCase() === newBrand.name.toLowerCase());
        setProductData(brandProducts);
        setProductList(brandProducts);
    }, [brandId]);

    return (
    <main>
        <header className="bg-light border-bottom py-2 mb-3">
            <div className="text-center my-3 mx-5">
                <img className='brand-logo h-auto mb-3' src={brand.logo} alt={brand.name + ' logo'}/>
                <p className="lead mb-0">{brand.desc}</p>
            </div>
        </header>

        <Container fluid className='mt-3'>
            <Row>
                <Col lg={2} className='mb-5'>
                    <aside>
                        <SortFilterOption productData={productData} setProductList={setProductList}/>
                    </aside>
                </Col>
                <Col lg={10}>
                    {productList.length > 0 ?
                        <main>
                            <Gallery productList={productList} cols={4} />
                        </main>:
                        <main className='pe-5'>
                            <h1>No Results Found.</h1>
                            <h2>Try expanding your query or email us about any specific request you may have.</h2>
                        </main>
                    }
                </Col>
            </Row>
        </Container>
    </main>
    )
}

export default Brand