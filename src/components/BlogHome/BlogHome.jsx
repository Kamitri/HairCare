import React from 'react'
import allPosts from '../../assets/json/Posts.json'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './index.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import AdvancedPagination from '../AdvancedPagination/AdvancedPagination'

function FeaturedPostCard({post}) {
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    return (
    <Card className='h-100 card-blog-post card-featured-blog-post mb-3'>
        <Card.Img variant='top' src={post.image} alt={post.image + ' demonstration'} />
        <Card.Body>
            <div className="small text-muted">{new Date(post.publish.date).toLocaleDateString('vi-VN', options)}</div>
            <h2 className="card-title">{post.title}</h2>
            <Card.Text className='card-blog-post-introduction'>{post.introduction}</Card.Text>
            <Button variant='primary' as={Link} to={`/blog/${post.id}`}>Read more →</Button>
        </Card.Body>
    </Card>
    )
}

function PostCard({post}) {
    const options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };
    return (
    <div className='h-100 py-3'>
        <Card className='h-100 card-blog-post'>
            <Card.Img variant='top' src={post.image} alt={post.image + ' demonstration'} />
            <Card.Body className='d-flex flex-column align-items-start'>
                <div className="small text-muted">{new Date(post.publish.date).toLocaleDateString('vi-VN', options)}</div>
                <h2 className="card-title h4">{post.title}</h2>
                <Card.Text className='card-blog-post-introduction'>{post.introduction}</Card.Text>
                <Button className='mt-auto' variant='primary' as={Link} to={`/blog/${post.id}`}>Read more →</Button>
            </Card.Body>
        </Card>
    </div>
    )
}

function CardFrequentlySearchTopics ({postCategorySearch, setPostCategorySearch}) {
    const handleCategoryToggle = (category) => {
        let newPostCategorySearch = [...postCategorySearch]; // So that push works on a new instance, not the copy, leading to postCategorySearch not updating
        if (postCategorySearch.includes(category)) {
            // Remove category from filter
            newPostCategorySearch = newPostCategorySearch.filter((currentCategory) => currentCategory !== category)
        }
        else {
            // Add category to filter
            newPostCategorySearch.push(category);
        }
        console.log(newPostCategorySearch);
        setPostCategorySearch(newPostCategorySearch);
    }
    return (
    <Card className="mb-4">
        <Card.Header>Frequently Searched Topics</Card.Header>
        <Card.Body>
            <Row>
                <div className='d-flex flex-column'>
                    {postCategorySearch.length === 0 && <p className='fw-light text-center'>Currently showing all posts</p>}
                    <Button className='my-1' onClick={() => handleCategoryToggle('Home Remedies')} variant='primary'>Home Remedies
                        <Badge className='ms-2' bg="secondary">{postCategorySearch.includes('Home Remedies') ? '-' : '+'}</Badge>
                    </Button>
                    <Button className='my-1' onClick={() => handleCategoryToggle('Common Hair Problems')} variant='primary'>Common Hair Problems
                        <Badge className='ms-2' bg="secondary">{postCategorySearch.includes('Common Hair Problems') ? '-' : '+'}</Badge>
                    </Button>
                    <Button className='my-1' onClick={() => handleCategoryToggle('R&D')} variant='primary'>R&D in Hair Care
                        <Badge className='ms-2' bg="secondary">{postCategorySearch.includes('R&D') ? '-' : '+'}</Badge>
                    </Button>
                </div>
            </Row>
        </Card.Body>
    </Card>
    )
}

function BlogHome() {   
    const [postData, setPostData] = useState(allPosts);
    const [postTitleSearch, setPostTitleSearch] = useState('');
    const [postCategorySearch, setPostCategorySearch] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    useEffect(() => {
        let newPostData = allPosts;
        if (postTitleSearch !== '') {
            newPostData = newPostData.filter((post) => post.title.toLowerCase().includes(postTitleSearch.toLowerCase()))
        }
        if (postCategorySearch.length !== 0) {
            newPostData = newPostData.filter((post) => postCategorySearch.includes(post.category))
        }
        setPostData(newPostData);
    }, [postTitleSearch, postCategorySearch])

    useEffect(() => {
        setMaxPage(Math.ceil(postData.length / 5))
    }, [postData])

    useEffect(() => {
        setTimeout(()=>{
            window.scrollTo(0, 200);
           }, 50)
    }, [currentPage])

    function handlePostTitleSearchChange(event) {
        setPostTitleSearch(event.target.value);
    } 

    return (
    <div>
        <header className="bg-light border-bottom mb-4">
            <div className="text-center pt-2 mx-5">
                <h1 className="fw-bolder">The ultimate guide to unlock your perfect hair.</h1>
                <p className="lead mb-0">If you have ever wondered how to take care of your hair, we have got you covered with our experts' writings on various common hair problems, home remedies and more. Elevate your hairstyle, today!</p>
            </div>
        </header>
        <Container className='blog-home'>
            <Row>
                <Col lg={9}>
                    <main>
                        <Row>
                            <Col>
                                {postData.length > 5 * (currentPage - 1) && <FeaturedPostCard post={postData[5 * (currentPage - 1)]} />}
                            </Col>
                        </Row>
                        <Row>
                        <Col>
                            {postData.length > 5 * (currentPage - 1) + 1 && <PostCard post={postData[5 * (currentPage- 1)  + 1]} />}
                        </Col>
                        <Col>
                            {postData.length > 5 * (currentPage - 1) + 2 && <PostCard post={postData[5 * (currentPage- 1)  + 2]} />}
                        </Col>
                        </Row>
                        <Row>
                            <Col>
                                {postData.length > 5 * (currentPage - 1) + 3 && <PostCard post={postData[5 * (currentPage- 1) + 3]} />}
                            </Col>
                            <Col>
                                {postData.length > 5 * (currentPage - 1) + 4 && <PostCard post={postData[5 * (currentPage- 1) +     4]} />}
                            </Col>
                        </Row>
                        {postData.length === 0 && <h1>We found nothing matching your criteries. Perhaps you should consult doctor  instead  :{"  ("} </h1>}
                    </main>
                {maxPage > 1 && <AdvancedPagination currentPage={currentPage} setCurrentPage={setCurrentPage} maxPage={maxPage}/>} 
                </Col>
            <Col xs={{order: 'first'}} lg={{order: 'last', span: 3}}>
                    <aside className='row row-lg-2'>
                        <Col>
                            <Card className='mb-4'>
                                <Card.Header>Anything on your mind?</Card.Header>
                                <Card.Body>
                                    <input style={{width: '100%'}} type="text" placeholder="Enter search term..."   onChange=           {handlePostTitleSearchChange}/>
                                </Card.Body>
                            </Card>
                            <CardFrequentlySearchTopics postCategorySearch={postCategorySearch} setPostCategorySearch=          {setPostCategorySearch} />
                        </Col>
                    </aside>
                </Col>
            </Row>
        </Container>
    </div>
    )
}

export default BlogHome