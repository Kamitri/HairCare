import React from 'react'
import './index.scss'
import { Pagination, Stack } from 'react-bootstrap'

function AdvancedPagination({ currentPage, setCurrentPage, maxPage }) {
    function setCurrentPageAndScrollToTop(page) {
        setCurrentPage(page);
    }
    return (
    <Pagination>
        <Stack direction='horizontal' className='me-5 ms-auto'>
            <Pagination.First disabled={(currentPage <= 1) ? true : false} onClick={() => setCurrentPageAndScrollToTop(1)} />
            <Pagination.Prev disabled={(currentPage <= 1) ? true : false} onClick={() => setCurrentPageAndScrollToTop(currentPage - 1)} />
        </Stack>
        {currentPage > 2 && <Pagination.Item onClick={() => setCurrentPageAndScrollToTop(currentPage - 2)}>{currentPage - 2}</Pagination.Item>}
        {currentPage > 1 && <Pagination.Item onClick={() => setCurrentPageAndScrollToTop(currentPage - 1)}>{currentPage - 1}</Pagination.Item>}
        <Pagination.Item active>{currentPage}</Pagination.Item>
        {maxPage - currentPage > 0 && <Pagination.Item onClick={() => setCurrentPageAndScrollToTop(currentPage + 1)}>{currentPage + 1}</Pagination.Item>}
        {maxPage - currentPage > 1 && <Pagination.Item onClick={() => setCurrentPageAndScrollToTop(currentPage + 2)}>{currentPage + 2}</Pagination.Item>}
        <Stack direction='horizontal' className='ms-5 me-auto'>
            <Pagination.Next disabled={(maxPage === currentPage) ? true : false} onClick={() => setCurrentPageAndScrollToTop(currentPage + 1)} />
            <Pagination.Last disabled={(maxPage === currentPage) ? true : false} onClick={() => {setCurrentPageAndScrollToTop(maxPage)}} />
        </Stack>
    </Pagination>
    )
}

export default AdvancedPagination