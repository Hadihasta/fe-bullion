import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const instance = axios.create({
  baseURL,
  timeout: 10000,
})

/**
 * REQUEST INTERCEPTOR
 * Pasang Bearer Token dari localStorage
 */
instance.interceptors.request.use(
  (config) => {
    // Pastikan hanya jalan di browser (Next.js safe)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

/**
 * RESPONSE INTERCEPTOR (optional)
 * Auto-handle 401 / token expired
 */
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      typeof window !== "undefined"
    ) {
      // Optional: clear token & redirect
      localStorage.removeItem("token")
      // window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)

export default instance
