import React from 'react'
import productList from '../../data/product-list'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductCards = () => {
  const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
  }
  const productCards = productList.map(product => {
    return (
      <Card key={product.id} style={{ width: '18rem' }}>
        <Card.Img variant='top' src={product.backgroundUrl}/>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>{product.price}</Card.Text>
          <Link to='/carts/:id'>
            <Button>Add to Cart</Button>
          </Link>
        </Card.Body>
      </Card>
    )
  })
  return (
    <div style={cardContainerLayout}>
      { productCards }
    </div>
  )
}

export default ProductCards
