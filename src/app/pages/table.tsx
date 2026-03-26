import { Table } from 'antd'
import { useState, useEffect } from 'react'

const generateData = (count: number) => {
    const data = []
    for (let i = 0; i < count; i++) {
        data.push({
            key: i.toString(),
            name: `姓名${i + 1}`,
            age: 20 + (i % 50),
            address: `西湖区湖底公园${i + 1}号`
        })
    }
    return data
}

const dataSource = generateData(100)

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
    }
]

const TableDemo = () => {
    const [tableHeight, setTableHeight] = useState(0)

    useEffect(() => {
        console.log('useEffect触发')
        const handleResize = () => {
            console.log('resize事件')
            // 估算其他元素的高度，例如头部、底部、边距等，这里假设为150px
            const offset = 150
            setTableHeight(window.innerHeight - offset)
        }

        handleResize() // 初始设置
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return <Table dataSource={dataSource} columns={columns} scroll={{ y: tableHeight }}></Table>
}

export default TableDemo
