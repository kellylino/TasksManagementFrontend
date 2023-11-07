import axios from 'axios'
const baseUrl = 'https://backend-9f82.onrender.com/tags'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newTag) => {
    const request = axios.post(baseUrl, newTag)
    return request.then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newTag) => {
    const request = axios.put(`${baseUrl}/${id}`, newTag)
    return request.then(response => response.data)
}



// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove, update }