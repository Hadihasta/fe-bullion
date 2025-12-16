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