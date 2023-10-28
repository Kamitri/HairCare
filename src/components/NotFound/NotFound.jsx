import React from 'react'
import './index.scss'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    const navigate = useNavigate();
    return (
        <main className='d-flex align-items-center justify-content-center flex-column '>
            <h1>404. Look like you're a bit lost.</h1>
            <Button className='m-5' onClick={() => navigate('/')}>Back to Home</Button>
        </main>
    )
}

export default NotFound