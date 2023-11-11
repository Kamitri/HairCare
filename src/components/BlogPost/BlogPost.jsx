import React from 'react'
import allPosts from '../../assets/json/Posts.json'
import allProducts from '../../assets/json/Products.json'
import { Badge, Card, Col, Container, Row, Stack } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import './index.scss'
import { Rating } from '@mui/material'

function GalleryItem({productId}) {
    const navigate = useNavigate();
    const product = allProducts.filter((product) => product.id === productId)[0];

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
                </div>
                
            </Card.Body>
        </Card>
    )
}

function BlogPost() {
    const { postId } = useParams();
    const post = allPosts.filter((post) => post.id === postId)[0]
    function contentToHTMLElement(contentElement) {
        // Takes a JSON Post content element and returns an appropriate HTML element depending on if it's p, h2, list, ...
        if (contentElement.type === 'heading') {
            return <h2 className='fw-bolder mb-2 mt-2'>{contentElement.content}</h2>
        }
        if (contentElement.type === 'paragraph') {
            return <p className='fs-5 mb-4 blog-content'>{contentElement.content}</p>
        }
        if (contentElement.type === 'ordered-list') {
            return (
            <ol className='fs-5 blog-content'>
                {contentElement.content.map((listItem) => 
                <li className='my-2'>
                    {listItem.title !== null && <span className='fw-bold'>{listItem.title}: </span>}
                    {listItem.content}
                </li>) }
            </ol>
            )
        }
        if (contentElement.type === 'unordered-list') {
            return (
            <ul className='fs-5 blog-content'>
                {contentElement.content.map((listItem) => 
                <li className='my-2'>
                    {listItem.title !== null && <span className='fw-bold'>{listItem.title}: </span>}
                    {listItem.content}
                </li>) }
            </ul>
            )
        }
        // Recursively call this function so that we can wrap all elements inside in <section> tag. There is no section in section case so we only call this once.
        if (contentElement.type === 'section') {
            return (
            <section>
                {contentElement.content.map((sectionContentElement) => contentToHTMLElement(sectionContentElement))}
            </section>
            )
        }
    }

    return (
    <Container className="mt-5 blog-post-content">
        <Row>
            <Col>
                <header className="container container-fluid mb-2">
                    <Row sm={12}>
                        <Col>
                            <h1 className="fw-bolder blog-title">{post.title}</h1>
                        </Col>
                    </Row>
                    <Row> 
                        <Col xs={2} sm={2} lg={1}>
                            <img className='float-left rounded-circle me-2' width={'50px'} height={'50px'} src={post.publish.avatar} alt={post.title + ' illustration'}/>
                        </Col>
                        <Col xs={10} sm={10} lg={4} className='me-auto'>
                            <div className='d-flex flex-column justify-content-start'>
                                <div className='text-muted fw-bold mb-1'>By {post.publish.user}</div>
                                <div className='text-muted fst-italic mb-1'>{new Date(post.publish.date).toLocaleDateString('vi-VN', {  weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}</div>  
                            </div>
                        </Col>
                        <Col lg={7}>
                            <Stack direction='horizontal' gap={2}>
                                {(post.tags.map((tag, i) => <Badge className={i === 0 ? 'first-badge' : i === post.tags.length -1 ? 'last-badge': ''} bg="secondary">{tag}</Badge>))}
                            </Stack>
                        </Col>
                    </Row>
                </header>
            </Col>
        </Row>
        <Row>
            <Col>
                <figure className="mb-4 d-flex justify-content-center">
                        <img className="img-fluid rounded blog-img" src={post.image} alt={post.title + ' demonstration'} width='50%'    height='auto'/>
                </figure>
            </Col>
        </Row>
        <Row>
        <Col>
            <article>
                <section>
                    <h2 className='fw-bolder mb-2 mt-2'>Introduction</h2>
                    <p className='fs-5 mb-4 blog-content'>{post.introduction}</p>
                </section>
                {post.content.map((contentElement) => (
                    contentToHTMLElement(contentElement)
                ))}
                <section>
                    <h2 className='fw-bolder mb-2 mt-2'>Conclusion</h2>
                    <p className='fs-5 mb-4 blog-content'>{post.conclusion}</p>
                </section>
                {post.recommendedProducts && 
                <section>
                    <h2 className='fw-bolder mb-2 mt-2'>Recommended products</h2>
                    <Container>
                        <Row>
                            {post.recommendedProducts.map((product) => 
                            <Col lg={4}>
                            <GalleryItem productId={product}/>
                            </Col>)}
                        </Row>
                    </Container>
                </section>}
                
            </article>
        </Col>
        </Row>
    </Container>
    )
}

export default BlogPost