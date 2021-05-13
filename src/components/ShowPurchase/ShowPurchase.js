import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect } from 'react-router-dom'
import { purchaseShow, purchaseDelete } from '../../api/purchase'

class ShowPurchase extends Component {
  constructor (props) {
    super(props)

    // initially our purchase state will be null, until it is fetched from the api
    this.state = {
      purchase: null,
      deleted: false
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    console.log('this is user', user)
    // make a request for a single purchase
    purchaseShow(match.params.id, user)
      // set the purchase state, to the purchase we got back in the response's data
      .then(res => this.setState({ purchase: res.data.purchase }))
      .then(() => msgAlert({
        heading: 'Here is Your Purchase',
        message: 'The purchase is now displayed.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Movie Failed',
          message: 'Failed to show purchase with error: ' + error.message,
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
        heading: 'Deleted Movie Successfully!',
        message: 'Movie deleted!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Deleting Movie Failed',
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
      return <Redirect to="/products" />
    }

    return (
      <div>
        <h3>{name}</h3>
        <button onClick={this.handleDelete}>Get Refund</button>
      </div>
    )
  }
}

export default withRouter(ShowPurchase)
