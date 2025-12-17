import instance from "@/lib/axios";


export const  fetchTableUser = async(payload) => {
try {
    const res = await instance.get('/admin?offset=5&limit=5')
    return res.data
    
} catch (error) {
    throw error
}
}