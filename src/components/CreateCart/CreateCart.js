import React, { Component } from 'react'
import { cartCreate } from '../../api/cart'
import { Redirect } from 'react-router-dom'

class CartCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cart: {
        count: null,
        subtotal: null,
        checkout: false
      },
      createdId: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const { user, msgAlert } = this.props
    const { cart } = this.state

    // create a cart, pass it the cart data and the user for its token
    cartCreate(cart, user)
      // set the createdId to the id of the cart we just created
      // .then(res => this.setState({ createdId: res.data.cart._id }))
      .then(res => {
        this.setState({ createdId: res.data.cart._id })
        // pass the response to the next .then so we can show the title
        return res
      })
      .then(res => msgAlert({
        heading: 'Cart Created',
        message: 'Go',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create Cart',
          message: 'Could not create cart with error: ' + error.message,
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
          // set the cart state, to what it used to be (...state.cart)
          // but replace the property with `name` to its current `value`
          // ex. name could be `title` or `director`
          cart: { ...state.cart, [event.target.name]: event.target.value }
        }
      })
    }
    render () {
    // destructure our movie and createdId state
      const { createdId } = this.state

      // if the movie has been created and we set its id
      if (createdId) {
      // redirect to the movies show page
        return <Redirect to={`/carts/${createdId}`} />
      }
      return (
        <div>
          <h3>Created Cart</h3>
        </div>
      )
    }
}

export default CartCreate
