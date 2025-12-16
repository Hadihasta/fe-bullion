import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL
console.log(baseURL)
const instance = axios.create({
  baseURL,
  timeout: 10000,
})

export default instance