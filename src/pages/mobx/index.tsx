import { observer } from 'mobx-react'
import { counterStore, counterStore1 } from './store'
import { useState } from 'react'
import { useUserStore, useZStore } from '@/store'
import { useShallow } from 'zustand/shallow'
import { Button, Form, Input } from 'antd'

const Mobx: React.FC = observer(() => {
    const { count, increment } = counterStore()
    const [state] = useState(counterStore1())
    const { count: count1, increment: increment1 } = state

    const {
        count: count2,
        increment: increment2,
        updateName
    } = useZStore(
        useShallow((store) => ({
            count: store.count,
            increment: store.increment,
            updateName: store.updateName
        }))
    )
    const { setUsername, setPassword } = useUserStore()

    console.log('render')
    return (
        <div>
            <div>
                <h5>counterStore</h5>
                <button onClick={increment}>set count</button>
                <span>{count}</span>
            </div>
            <div>
                <h5>counterStore1</h5>
                <button onClick={increment1}>set count</button>
                <span>{count1}</span>
            </div>
            <div>
                <h5>zustand</h5>
                <button onClick={increment2}>set count</button>
                <button onClick={updateName}>updateName</button>
                <span>{count2}</span>
            </div>
            <section>
                <Form
                    size='middle'
                    onFinish={(values) => {
                        console.log(values)
                        setUsername(values.username)
                        setPassword(values.password)
                    }}
                >
                    <Form.Item
                        name='username'
                        label='Username'
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label='Password'
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit'>Submit</Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    )
})

export default Mobx
