import React, { useState } from 'react'
import './index.scss'
import allBrands from '../../assets/json/Brands.json'
import allProducts from '../../assets/json/Products.json'
import { Button, Carousel, Col, Container, Image, Row, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaShop, FaBlog, FaPhone } from 'react-icons/fa6'
import Gallery from '../Gallery'
import anime from 'animejs'


function Hero() {
    return (
    <Container fluid className='w-100 hero d-flex align-items-center'>
        <Row className='px-5'>
            <Col lg={6} className='d-flex flex-column justify-content-center order-2' data-aos='fade-up'  data-aos-delay='200'>
              <h1>Where your hair's best days begin.</h1>
              <h2>At HairCare, we offer our expertise to transform your hair journey. Our mission is to empower you with the knowledge, products, and guidance needed to achieve hair that truly reflects your unique beauty.</h2>
              <div className='d-flex justify-content-center justify-content-lg-start'>
                <Link to='/products'>
                  <btn className='btn-stylized-alt px-3 py-2'><FaShop className='me-2'/>Browse Store</btn>
                </Link>
              </div>
            </Col>
            <Col lg={6} className='order-1 order-lg-2 hero-img' data-aos='zoom-in' data-aos-delay='200'>
                <Carousel indicators={false} controls={false} fade={true} className='animated mb-3'>
                    <Carousel.Item><img src='/img/banner.avif' className='img-fluid img-banner' alt='' /></Carousel.Item>
                    <Carousel.Item><img src='/img/banner2.webp' className='img-fluid img-banner' alt='' /></Carousel.Item>
                    <Carousel.Item><img src='/img/banner3.webp' className='img-fluid img-banner' alt='' /></Carousel.Item>
                    <Carousel.Item><img src='/img/banner4.avif' className='img-fluid img-banner' alt='' /></Carousel.Item>
                </Carousel>
            </Col>
        </Row>
    </Container>
    )
}

function FeaturedProducts () {
  const cols = 4;
  const allFeaturedProducts = allProducts.filter((product) => product.featured === true);
  const [lastProductIndex, setLastProductIndex] = useState(cols - 1);
  const [displayingFeaturedProducts, setDisplayingFeaturedProducts] = useState(allFeaturedProducts.slice(0, cols));
  function handlePreviousPage(e) {
    let animation = anime.timeline({
      easing: 'easeOutExpo',
      duration: '500',
    });
    animation
    .add({
      targets: '.product-card',
      translateX: -50,
      opacity: 0,
      duration: 0,
    })
    .add({
      targets: '.product-card',
      translateX: 0,
      opacity: 100,
    });
    let indexes = Array.from({length: cols}).map((_, i) => (lastProductIndex + i) - cols + 1); // 0 -> [-3, -2, -1, 0]
    indexes = indexes.map((index) => index - cols); // [-3, -2, -1, 0] -> [-7, -6, -5, -4]
    indexes = indexes.map((index) => (
      index < 0 ? index + allFeaturedProducts.length : index // [-7, -6, -5, -4] -> [0, 1, 2, 3]
    ))
    const newDisplayingFeaturedProducts = indexes.map((index) => allFeaturedProducts[index]);
    setDisplayingFeaturedProducts(newDisplayingFeaturedProducts);
    setLastProductIndex(indexes[indexes.length - 1])
  }
    
  function handleNextPage(e) {
    let animation = anime.timeline({
      easing: 'easeOutExpo',
      duration: '500',
    });
    animation
    .add({
      targets: '.product-card',
      translateX: 50,
      opacity: 0,
      duration: 0,
    })
    .add({
      targets: '.product-card',
      translateX: 0,
      opacity: 100,
    });

    let indexes = Array.from({length: cols}).map((_, i) => (lastProductIndex + i) - cols + 1); // 4 -> [0, 1, 2, 3]
    indexes = indexes.map((index) => index + cols); // [0, 1, 2, 3] -> [4, 5, 6, 7]
    indexes = indexes.map((index) => (
      index > (allFeaturedProducts.length - 1) ? index - allFeaturedProducts.length : index // [4, 5, 6, 7] -> [4, 5, 6, 0]
    ))
    const newDisplayingFeaturedProducts = indexes.map((index) => allFeaturedProducts[index]);
    setDisplayingFeaturedProducts(newDisplayingFeaturedProducts);
    setLastProductIndex(indexes[indexes.length - 1])
  }
  return (
  <section id='featured-products' className='featured-brands section-bg py-5'>
      <div className='container' data-aos='fade-up'>
          <div className='section-title'>
                <h2 className='fw-bold'>FEATURED PRODUCTS</h2>
          </div>
          <div className='d-flex align-items-center justify-content-center'>
            <Button variant='primary' className='me-5' onClick={handlePreviousPage}>{"<"}</Button>
            <Gallery productList={displayingFeaturedProducts} cols={cols}/>
            <Button className='ms-5' onClick={handleNextPage}>{">"}</Button>
          </div>
      </div>
  </section>
  )
}

function AboutUs() {
    return (
    <section id='about' className='about py-3' data-aos='fade-up'>
        <div className='container'>
            <h2 className='section-title fw-bold'>What is HairCare?</h2>
            <p className='lead text-center'>At HairCare, we are more than just a company; we are a team of passionate individuals dedicated to your hair's well-being. We believe that every individual deserves to embrace their unique beauty through healthy, radiant hair. With a wealth of expertise and a commitment to excellence, we aim to be your trusted partner on your hair care journey, ensuring you have the tools, knowledge, and support you need to achieve the hair you love.</p>
            <div className='d-flex justify-content-center'>
              <Link to='/about-us'>
                <button className='btn-stylized justify-self-center px-4 py-1 btn-gogo'>Meet Our Team</button>
              </Link>
            </div>
      </div>
    </section>
    )
}

function FeaturedBrands () {
    function getBrandImg(brand, index) {
        // Returns nothing after index = 6 (7 featured brands in total)
        if (index > 6) return null;
        return (
        <Link to={`/brand/${brand.id}`} data-aos='fade-right' data-aos-delay={index * 400 - 400}>
            <img style={{width: '20vh'}} className='img-fluid mx-3' src={brand.logo} alt={brand.name + ' logo'}/>
        </Link>
        )
    }
    return (
    <section id='featured-brands' className='featured-brands section-bg'>
        <div className='container' data-aos='fade-up'>
            <h2 className='section-title fw-bold'>Our partners</h2>
            <Stack className='justify-content-center' direction='horizontal'>
                {allBrands.map((brand, i) => // TODO: Make image logo clickable in a larger, consistent square
                    getBrandImg(brand, i)
                )}
            </Stack>
        </div>
    </section>
    )
}

function Services() {
    return (
        <section id='services' className='services section-bg'>
        <div className='container' data-aos='fade-up'>
  
            <h2 className='section-title fw-bold'>Services</h2>
            <p className='lead text-center'>Our mission is to provide top-quality hair care products and share valuable   information on hair problems, home remedies, and expert guidance for anyone facing hair issues. Discover our  excellent services meticulously tailored to ensure a smooth and transformative hair journey.</p>
  
            <Row className='justify-content-center'>
              <div className='col-xl-3 col-md-6 d-flex align-items-stretch mx-3' data-aos='zoom-in'>
                <div className='icon-box'>
                  <div className='icon'><FaBlog size={40}/></div>
                  <h4><Link to={'/blog'}>Hair Journey Blog</Link></h4>
                  <p>Shared stories from our experts that cover various topics from common hair problems to home remedies.</p>
                </div>
              </div>
  
              <div className='col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 mx-3' data-aos='zoom-in' data-aos-delay='300'>
                <div className='icon-box'>
                  <div className='icon'><FaShop size={40}/></div>
                  <h4><Link to={'/products'}>Hair Care Products</Link></h4>
                  <p>Curated store filled with hair care essentials that will transform your hair journey.</p>
                </div>
              </div>
  
              <div className='col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0 mx-3' data-aos='zoom-in' data-aos-delay='600'>
                <div className='icon-box'>
                  <div className='icon'><FaPhone size={40}/></div>
                  <h4><Link to={'/contact-us'}>Ask Experts</Link></h4>
                  <p>Our experts are available 24/7 to assist you with any hair problems you can think of.</p>
                </div>
              </div>
  
            </Row>
  
        </div>
      </section>
    )
}

function Discover() {
  return (
  <section id='discover' className='discover py-3' data-aos='fade-up'>
      <div className='container'>
          <h2 className='section-title fw-bold'>Discover the latest trends in hair care</h2>
          <Container>
            <Row>
              <Col lg={5}>
                <Image fluid src='/img/hair-color-simulation.jpg' />
              </Col>
              <Col>
                <p className='lead text-justify'>Discover the Latest Advancements in Hair Care! Our experts predict that 2023 is poised to revolutionize the way we care for our hair. In this article, we delve into the cutting-edge developments that are reshaping the industry. From CBD-infused products to smart hair care technology, the future of hair care is here.</p>
                <div className='learn-more'>
                  <Link to='blog/d-trend-2023'>
                    <button className='btn-stylized justify-self-center px-4 py-1'>Learn More</button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
          
          
    </div>
  </section>
  )
}

function Home() {
    return (
    <main>
        <Hero />
        <FeaturedProducts />
        <hr />
        <AboutUs />
        <hr/ >
        <Services />
        <hr/ >
        <FeaturedBrands />
        <hr />
        <Discover />
    </main>
    )
}

export default Home