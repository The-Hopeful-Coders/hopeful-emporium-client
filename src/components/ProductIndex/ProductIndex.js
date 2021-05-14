import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { productIndex } from '../../api/products'
import CreatePurchase from '../CreatePurchase/CreatePurchase'

class ProductIndex extends Component {
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
    // destructure our movies state
    const { products } = this.state

    // if we haven't fetched any movies yet from the API
    if (!products) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    const cardContainerLayout = {
      display: 'flex',
      justifyContent: 'center',
      flexFlow: 'row wrap'
    }
    const productCards = products.map(product => {
      return (
        <Card bg="secondary" key={product._id} style={{ width: '16rem', margin: 8 }}>
          {/* <Card.Img variant='top' src={product.backgroundUrl}/> */}
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>${product.price}</Card.Text>
            <CreatePurchase
              product={product._id}
              user={this.props.user}
              msgAlert={this.props.msgAlert}
            />
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

export default ProductIndex
