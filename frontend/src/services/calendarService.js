import api from "./apiConfig"

export const postChangeCalendar = async (data) => {
  try {
    const response = await api.post("/altCalendar", data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}