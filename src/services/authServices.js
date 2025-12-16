import instance from "@/lib/axios";


export const  fetchlogin = async(payload) => {
try {
    const res = await instance.post('/auth/login', payload)
    return res
    
} catch (error) {
    throw error
}
}