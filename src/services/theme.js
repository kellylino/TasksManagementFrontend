import axios from 'axios'
const baseUrl = 'https://backend-9f82.onrender.com/theme'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = (id, newTheme) => {
  const request = axios.put(`${baseUrl}/${id}`, newTheme)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, update }