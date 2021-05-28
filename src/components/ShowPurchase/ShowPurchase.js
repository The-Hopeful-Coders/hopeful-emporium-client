import React, { Component, Fragment } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Button, DropdownButton, Dropdown } from 'react-bootstrap'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect, Link } from 'react-router-dom'
import { purchaseShow, purchaseDelete, purchaseUpdate } from '../../api/purchase'

class ShowPurchase extends Component {
  constructor (props) {
    super(props)

    // initially our purchase state will be null, until it is fetched from the api
    this.state = {
      purchase: null,
      deleted: false,
      updated: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    console.log('this is the match', match)
    console.log('this is user', user)
    // make a request for a single purchase
    purchaseShow(match.params.id, user)
      // set the purchase state, to the purchase we got back in the response's data
      .then(res => this.setState({ purchase: res.data.purchase }))
      .then(() => msgAlert({
        heading: 'Here\'s Your Purchase!',
        message: 'Enjoy your phonebooth or request a refund.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Purchase Failed',
          message: 'Failed to show purchase with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleUpdate = event => {
    const { user, msgAlert, match } = this.props
    // make a delete axios request
    purchaseUpdate(match.params.id, user)
      // set the deleted variable to true, to redirect to the purchases page in render
      .then(() => this.setState({ updated: true }))
      .then(() => msgAlert({
        heading: 'Shipping Updated Successfully!',
        message: 'Your shipping preferences have been updated',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Shipping Update Failed',
          message: 'Failed with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleDelete = event => {
    const { user, msgAlert, match } = this.props
    // make a delete axios request
    purchaseDelete(match.params.id, user)
      // set the deleted variable to true, to redirect to the purchases page in render
      .then(() => this.setState({ deleted: true }))
      .then(() => msgAlert({
        heading: 'Purchase Refunded Successfully!',
        message: 'Transaction will be refunded in 3-5 business days',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Purchase Refund Failed',
          message: 'Failed with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { purchase, deleted } = this.state

    // if we don't have a purchase yet
    if (!purchase) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    // if the purchase is deleted
    if (deleted) {
      // redirect to the purchases index page
      return <Redirect to="/index-purchases" />
    }

    return (
      <Fragment>
        <div>
          <h3>Yay, you have your very own phone booth in route!</h3>
          <h5>Item: {purchase.product.name}</h5>
          <p>{purchase.product.description}</p>
          <p>Price: ${purchase.product.price}</p>
          <p>Shipping info: {purchase.shipping}</p>
          <DropdownButton id="dropdown-basic-button" title="Shipping Options">
            <Dropdown.Item handleUpdate={this.handleUpdate}>Priority Shipping (3-4 Business Days)</Dropdown.Item>
            <Dropdown.Item handleUpdate={this.handleUpdate}>Express Shipping (1 Business Day)</Dropdown.Item>
          </DropdownButton>
          <Button onClick={this.handleDelete}>Get Refund</Button>
          <Link to="/products">
            <Button>Buy More</Button>
          </Link>
          <Link to="/index-purchases">
            <Button>View All Purchases</Button>
          </Link>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(ShowPurchase)
