import { useEffect, useState } from 'react'
import { useNumber } from './useNumber'

const About1: React.FC = () => {
  const [number, setNumber] = useState(0)

  const getNumber = async () => {
    const number = await useNumber()
    setNumber(number)
  }

  useEffect(() => {
    getNumber()
  }, [])
  console.log('render')
  return <div style={{ color: 'red' }}>Here is the number: {number}</div>
}

export default About1
