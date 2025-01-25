import { useUserStore, useZStore } from '@/store'
import { useShallow } from 'zustand/shallow'
import { Button, Form, Input } from 'antd'
import ChildA from './Child1'
import ChildB from './Child2'
import { memo } from 'react'

const Zustand: React.FC = () => {
    const { count, increment, updateName } = useZStore(
        useShallow((store) => ({
            count: store.count,
            increment: store.increment,
            updateName: store.updateName
        }))
    )
    // const { count, increment, updateName } = useZStore()
    const { setUsername, setPassword } = useUserStore()

    console.log('render')
    return (
        <div>
            <div>
                <h5>zustand</h5>
                <button onClick={increment}>set count</button>
                <button onClick={updateName}>updateName</button>
                <span>{count}</span>
            </div>
            <ChildA />
            <ChildB />
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
}

export default memo(Zustand)
