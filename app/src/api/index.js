import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertEntry = payload => api.post(`/entry`, payload)
export const getAllEntries = () => api.get(`/entries`)
export const updateEntryById = (id, payload) => api.put(`/entry/${id}`, payload)
export const deleteEntryById = id => api.delete(`/entry/${id}`)
export const getEntryById = id => api.get(`/entry/${id}`)

const apis = {
    insertEntry,
    getAllEntries,
    updateEntryById,
    deleteEntryById,
    getEntryById,
}

export default apis
