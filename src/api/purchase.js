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
    // send the movie object as our data for creating a movie
  })
}
