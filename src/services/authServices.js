import instance from "@/lib/axios";


export const  fetchlogin = async(payload) => {
try {
    const res = await instance.post('/auth/login', payload)
    return res.data
    
} catch (error) {
    throw error
}
}

export const  registerAccount = async(formData) => {
try {
    const res = await instance.post('/auth/register', formData)
    return res.data
    
} catch (error) {
    throw error
}
}