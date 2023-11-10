import React from 'react'
import allCategories from '../../assets/json/Categories.json'
import { useContext } from 'react'
import ComparisonContext from '../ComparisonContext';
import { Button, Container, Table } from 'react-bootstrap';

function ComparisonTable({comparisonList}) {
    return (
    <Table striped responsive hover>
        <thead>
            <th style={{width: '45%'}}>Title</th>
            <th style={{width: '10%'}}>Category</th>
            <th style={{width: '10%'}}>Price</th>
            <th style={{width: '5%'}}>Rating</th>
            <th style={{width: '10%'}}>Weight (if any)</th>
            <th style={{width: '10%'}}>Volume (if any)</th>
        </thead>
        <tbody>
            {comparisonList.map((product) =>
            <tr>
                <td>{product.name}</td>
                <td>{allCategories.filter((category) =>category.id === product.category)[0].title}</td>
                <td>${parseFloat(product.price).toFixed(2)}</td>
                <td>{product.rating}</td>
                <td>{product.specifications.filter((spec) => spec[0] === 'Weight')[0] !== undefined ? product.specifications.filter((spec) => spec[0] === 'Weight')[0][1] : null
                }</td>
                <td>{product.specifications.filter((spec) => spec[0] === 'Volume')[0] !== undefined ? product.specifications.filter((spec) => spec[0] === 'Volume')[0][1] : null
                }</td>
            </tr>
            )}
        </tbody>
    </Table>
    )
}

function Compare() {
    const { comparisonList, setComparisonList } = useContext(ComparisonContext);
    const handleRemoveAll = (e) => {
        if (window.confirm('Do you want to remove all items from the comparison list? This action is irreversible.') === false)
        return;
        e.preventDefault()
        setComparisonList([]);
    }
    return (
    <main className='mt-5'>
        <Container>
        {comparisonList.length > 0 ? 
        <div>
            <p className='text-center lead mb-5'>Still don't know what to buy? Let's plug those numbers in!</p>
            <ComparisonTable comparisonList={comparisonList} setComparisonList={setComparisonList} />
            <Button variant='danger' onClick={handleRemoveAll}>Remove all</Button>
        </div>: 
        <div className='text-center'>
            <h1>You haven't selected any products for comparison yet!</h1>
            <h1>Click "Compare" on any products to begin evaluating.</h1>
        </div>}
        </Container>
    </main>
    )
}

export default Compare