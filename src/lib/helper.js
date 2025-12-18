var sha256 = require('js-sha256');


export function emailHelper(email) {
const detailedRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return detailedRegex.test(email);
}


export const minLength = (value = "", length = 8) => {
  return value.trim().length >= length
}


export const checkEmpty = (value) => {
  return value.trim() ===  ""
}


export const hashSHA256 = (value) => {
  return sha256(value)
}

export const formatDate = (isoDate) => {
  if (!isoDate) return '-'

  const date = new Date(isoDate)

  if (isNaN(date.getTime())) return '-'

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}


export const formatDateOfBirth = (dateString) => {
  const date = new Date(dateString)
  return date.toISOString()
}


export const isoToFullDateString = (isoString) => {
  if (!isoString) return ''

  const date = new Date(isoString)

  // Convert to GMT+7 (WIB)
  const utcTime = date.getTime()
  const gmt7Offset = 7 * 60 * 60 * 1000
  const gmt7Date = new Date(utcTime + gmt7Offset)

  return gmt7Date.toString()
}