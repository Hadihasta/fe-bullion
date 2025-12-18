import instance from '@/lib/axios'

export const fetchTableUser = async ({ offset, limit }) => {
  try {
    // console.log(page, limit, ' <<< ')

    const res = await instance.get(`/admin?offset=${offset}&limit=${limit}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getTotalData = async () => {
  try {
    const res = await instance.get(`/admin?offset=1&limit=`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const getDetailUser = async (id) => {
  try {
    const res = await instance.get(`/admin/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const editUser = async (payload) => {
  try {
    // const {id} = payload
    const {
      body,
      id
    } = payload


    // console.log(id)
    const res = await instance.put(`/admin/${id}/update`, body)
    return res.data
  } catch (error) {
    throw error
  }
}
