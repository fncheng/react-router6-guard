export const useNumber = async () => {
  const response = await fetch('http://127.0.0.1:3000/test/getNumber')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  return data.number
}
