import styles from './styles.module.css'

export default function Textarea({ ...rest }) {
    return (
        <textarea className={styles.textarea} {...rest}></textarea>
    )
}
