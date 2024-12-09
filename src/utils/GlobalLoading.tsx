import { LoadingOutlined } from "@ant-design/icons"

export default function GlobalLoading() {
    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <LoadingOutlined />
        </div>
    )
}
