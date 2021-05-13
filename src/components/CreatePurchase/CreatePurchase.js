import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { purchaseCreate } from '../../api/purchase'
import { Redirect, Link } from 'react-router-dom'

class CreatePurchase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      purchase: null,
      createdId: null
    }
  }

  handleClick = event => {
    event.preventDefault()

    const { user, msgAlert } = this.props
    const product = this.props.product
    console.log('this should be a product id', product)

    // create a purchase, pass it the purchase data and the user for its token
    purchaseCreate(product, user)
      // set the createdId to the id of the purchase we just created
      // .then(res => this.setState({ createdId: res.data.purchase._id }))
      .then(res => {
        this.setState({ createdId: res.data.purchase._id })
        // pass the response to the next .then so we can show the title
        return res
      })
      .then(res => msgAlert({
        heading: 'Purchase Made',
        message: 'Go',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create Purchase',
          message: 'Could not create purchase with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    // destructure our movie and createdId state
    const { createdId } = this.state

    // if the purchase has been created and we set its id
    if (createdId) {
      // redirect to the movies show page
      return <Redirect to={`/purchases/${createdId}`} />
    }
    return (
      <div>
        <Link to={`/purchases/${createdId}`}>
          <Button onClick={this.handleClick}>Purchase</Button>
        </Link>
      </div>
    )
  }
}

export default CreatePurchase
