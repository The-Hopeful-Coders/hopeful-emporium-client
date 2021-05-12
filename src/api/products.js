import apiUrl from '../apiConfig'

import axios from 'axios'

export const productIndex = user => {
  return axios({
    url: apiUrl + '/products',
    method: 'GET'
  })
}
