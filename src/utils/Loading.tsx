import { LoadingOutlined } from "@ant-design/icons";

export const Loading = () => {
    return (
        <div
            style={{
                display: "flex",
                height: 100,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <LoadingOutlined />
        </div>
    );
};
