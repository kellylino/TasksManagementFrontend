import axios from 'axios'
const baseUrl = 'https://backend-9f82.onrender.com/tasks'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newTask) => {
    const request = axios.post(baseUrl, newTask)
    return request.then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newTask) => {
    const request = axios.put(`${baseUrl}/${id}`, newTask)
    return request.then(response => response.data)
}

const updateTasksOrder = (newTasksOrder) => {
    const request = axios.put(baseUrl, newTasksOrder)
    return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, remove, update, updateTasksOrder }