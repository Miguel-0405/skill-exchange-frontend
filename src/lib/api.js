import axios from "axios"

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://apiskills.danidev.co/api"

const api = axios.create({
  baseURL,
})

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
