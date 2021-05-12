import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { productIndex } from '../../api/products'

class ProductCards extends Component {
  constructor (props) {
    super(props)

    // keep track of the movies in our application
    // initially they will be null until we have fetched them from the api
    this.state = {
      products: null
    }
  }
  componentDidMount () {
    productIndex()
      .then(res => this.setState({ products: res.data.products }))
  }

  render () {
    const cardContainerLayout = {
      display: 'flex',
      justifyContent: 'center',
      flexFlow: 'row wrap'
    }
    const productCards = this.products.map(product => {
      return (
        <Card key={product.id} style={{ width: '18rem' }}>
          <Card.Img variant='top' src={product.backgroundUrl}/>
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>{product.price}</Card.Text>
            <Link to='/carts'>
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
}

export default ProductCards
