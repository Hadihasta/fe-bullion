export function emailHelper(email) {
const detailedRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return detailedRegex.test(email);
}
