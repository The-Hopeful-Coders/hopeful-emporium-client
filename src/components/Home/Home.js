import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link to='/products'>
        <Button>Shop</Button>
      </Link>
    </div>
  )
}
export default Home
