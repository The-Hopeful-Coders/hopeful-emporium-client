import React, { Component } from 'react'
import { purchaseCreate } from '../../api/purchase'
import { Redirect } from 'react-router-dom'

class CreatePurchase extends Component {
  constructor (props) {
    super(props)

    this.state = {
      purchase: {
        product: null
      },
      createdId: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const { user, msgAlert } = this.props
    const { purchase } = this.state

    // create a purchase, pass it the purchase data and the user for its token
    purchaseCreate(purchase, user)
      // set the createdId to the id of the purchase we just created
      // .then(res => this.setState({ createdId: res.data.purchase._id }))
      .then(res => {
        this.setState({ createdId: res.data.purchase._id })
        // pass the response to the next .then so we can show the title
        return res
      })
      .then(res => {
        this.setState({ purchase: res.data.purchase.product._id })
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

    // when an input changes, update the state that corresponds with the input's name
    handleChange = event => {
      // in react, an event is actually a SyntheticEvent
      // to ensure the properties are not set to null after handleChange is finished
      // we must call event.persist
      event.persist()

      this.setState(state => {
        // return our state changge
        return {
          // set the purchase state, to what it used to be (...state.purchase)
          // but replace the property with `name` to its current `value`
          // ex. name could be `title` or `director`
          purchase: { ...state.purchase, [event.target.name]: event.target.value }
        }
      })
    }
    render () {
    // destructure our movie and createdId state
      const { createdId } = this.state

      // if the movie has been created and we set its id
      if (createdId) {
      // redirect to the movies show page
        return <Redirect to={`/purchases/${createdId}`} />
      }
      return (
        <div>
          <h3>Created Purchase</h3>
        </div>
      )
    }
}

export default CreatePurchase
