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
    // console.log(page, limit, ' <<< ')

    const res = await instance.get(`/admin?offset=1&limit=`)
    return res.data
  } catch (error) {
    throw error
  }
}
