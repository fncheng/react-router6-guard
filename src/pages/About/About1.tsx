import { useEffect, useState } from 'react'
import { useNumber } from './useNumber'
import { LoadingOutlined } from '@ant-design/icons'

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
  return (
    <main>
      <h1>Let's loading some data</h1>
      {number ? (
        <div style={{ color: 'red' }}>Here is the number: {number}</div>
      ) : (
        <LoadingOutlined />
      )}
    </main>
  )
}

export default About1
