import axios from 'axios'

export const apiProjectBurguer = axios.create({
  baseURL: 'http://localhost:4000'
})

export default apiProjectBurguer
