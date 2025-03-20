import api from "./apiConfig"

export const postChangeCalendar = async (data) => {
  try {
    const response = await api.post("/altCalendar", data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getCalendarChanges = async (year, month) => {
  try {
    const response = await api.get("/calendar", {params: {year, month}})
    return response.data
  } catch (error) {
    console.log(error)
  }
}