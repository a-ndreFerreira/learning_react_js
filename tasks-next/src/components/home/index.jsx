import styles from './styles.module.css'

import TaskIcon from "../svg-home/TaskIcon";


export default function Home({ commentsSnapshot, tasksSnapshot }) {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.logoContent}>
                    {/* Era para ser um component NEXT JS => <Image src={ } alt={ } /> */}
                    {/* mas usei um componente svg criado */}
                    <TaskIcon className={styles.hero} />
                </div>

                <h1 className={styles.title}>
                    Sistema feito para <br /> gerênciar seus estudos
                </h1>

                <div className={styles.infoContent}>
                    <section className={styles.box}>
                        <span>+{tasksSnapshot.size || 0} Posts</span>
                    </section>

                    <section className={styles.box}>
                        <span>+{commentsSnapshot.size || 0} Comentários</span>
                    </section>
                </div>

            </main>

        </div >
    )
}
