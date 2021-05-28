import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { purchaseIndex } from '../../api/purchase'

class PurchaseIndex extends Component {
  constructor (props) {
    super(props)

    // keep track of the purchases in our application
    // initially they will be null until we have fetched them from the api
    this.state = {
      purchases: null
    }
  }

  // after we render the MovieIndex component for the first time
  componentDidMount () {
    const { msgAlert, user } = this.props

    // make a request to get all of our purchases
    purchaseIndex(user)
    // set the purchases state, to the purchases we got back in the response's data
      .then(res => this.setState({ purchases: res.data.purchases }))
    // dummy data until we create actual purchases
    // .then(res => this.setState({ purchases: [{ _id: 1, title: 'jaws' }, { _id: 2, title: 'The Phantom Menace' }] }))
      .then(() => msgAlert({
        heading: 'Purchases Loaded Successfully',
        message: 'All purchases retrieved. Click on one to go to its page.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Load Purchases!',
          message: 'Could not load purchases with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    // destructure our purchases state
    const { purchases } = this.state

    // if we haven't fetched any purchases yet from the API
    if (!purchases) {
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
    const purchaseCards = purchases.map(purchase => {
      return (
        <Card bg="info" key={purchase._id} style={{ width: '14rem', margin: 8 }}>
          {/* <Card.Img variant='top' src={purchase.backgroundUrl}/> */}
          <Card.Body>
            <Card.Title>{purchase.product.name}</Card.Title>
            <Card.Text>ID:{purchase._id}</Card.Text>
            <Card.Text>{purchase.product.description}</Card.Text>
            <Card.Text>${purchase.product.price}</Card.Text>
            <Link to={`/purchases/${purchase._id}`} key={purchase._id}>
              <Button>View Purchase Details</Button>
            </Link>
          </Card.Body>
        </Card>
      )
    })
    return (
      <div style={cardContainerLayout}>
        { purchaseCards }
      </div>
    )
  }
}

export default PurchaseIndex
