import apiUrl from '../apiConfig'
import axios from 'axios'

export const purchaseCreate = (productId, user) => {
  console.log('This is the purchase ', productId)
  return axios({
    url: apiUrl + '/purchases',
    method: 'POST',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      'purchase': { 'product': productId }
    }
    // send the purchase object as our data for creating a purchase
  })
}
// get a single purchase
export const purchaseShow = (id, user) => {
  return axios({
    url: apiUrl + '/purchases/' + id,
    method: 'GET',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    }
  })
}

export const purchaseDelete = (id, user) => {
  return axios({
    url: apiUrl + '/purchases/' + id,
    method: 'DELETE',
    // Add an authorization header
    headers: {
      // we need the user, so we have access to their token
      'Authorization': `Bearer ${user.token}`
    }
  })
}