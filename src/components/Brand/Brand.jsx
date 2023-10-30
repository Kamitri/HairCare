import React from 'react'
import allBrands from '../../assets/json/Brands.json'
import allProducts from '../../assets/json/Products.json'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import SortFilterOption from '../SortFilterOption'
import Gallery from '../Gallery'
import './index.scss'


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
                <img className='brand-logo h-auto' src={brand.logo} alt={brand.name + ' logo'}/>
                <p className="lead mb-0">{brand.desc}</p>
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