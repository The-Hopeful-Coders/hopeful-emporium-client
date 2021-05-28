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
    const shipping = 'Standard Shipping: (7-10 Business Days)'

    // create a purchase, pass it the purchase data and the user for its token
    purchaseCreate(product, user, shipping)
      // set the createdId to the id of the purchase we just created
      // .then(res => this.setState({ createdId: res.data.purchase._id }))
      .then(res => {
        this.setState({ createdId: res.data.purchase._id })
        // pass the response to the next .then so we can show the title
        return res
      })
      .then(res => msgAlert({
        heading: 'Purchase Made Successfully',
        message: 'An invoice will be sent to your email.',
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

    const user = this.props.user
    if (user) {
      return (
        <div>
          <Link to={`/purchases/${createdId}`}>
            <Button onClick={this.handleClick}>Buy Now</Button>
          </Link>
        </div>
      )
    } else if (!user) {
      return null
    }
  }
}

export default CreatePurchase
