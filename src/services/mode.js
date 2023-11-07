import axios from 'axios'
const baseUrl = 'https://backend-9f82.onrender.com/mode'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = (id, newMode) => {
  const request = axios.put(`${baseUrl}/${id}`, newMode)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, update }