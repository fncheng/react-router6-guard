import styles from './index.module.css'

const Test = () => {
    return (
        <>
            <span style={{ width: 50 }} className={styles.ellipsis}>
                abcdefghijklmnopqrstuvwxyz
            </span>
            <div style={{ width: 50 }} className={styles.ellipsis}>
                abcdefghijklmnopqrstuvwxyz
            </div>
            <span>Test</span>
        </>
    )
}

export default Test
