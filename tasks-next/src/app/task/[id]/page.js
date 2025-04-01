
import styles from './styles.module.css'

import { redirect } from 'next/navigation'

import { db } from '@/services/firebaseConfig';

import { doc, getDoc } from 'firebase/firestore';

import TaskComments from '@/components/taskComments';
import { auth } from '@/auth';

export const metadata = {
    title: "Detalhes da tarefa",
    description: "Tarefa detalhada",
};

export default async function Task({ params }) {
    const session = await auth();
    const { id } = await params;

    const docRef = doc(db, "tasks", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.data() === undefined) return redirect('/');

    if (!snapshot.data()?.publicTask) return redirect('/');

    const miliseconds = snapshot.data()?.created?.seconds * 1000;

    const task = {
        taskId: snapshot.id,
        task: snapshot.data()?.task,
        created: new Date(miliseconds).toLocaleDateString(),
        publicTask: snapshot.data()?.publicTask,
        user: snapshot.data()?.user
    }

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>
                    Detalhes da tarefa
                </h1>
                <div className={styles.userInfo}>
                    <h3>
                        Criado por - {session?.user?.name}
                    </h3>
                    <p>
                        Postado em - {task?.created}
                    </p>
                </div>
                <article className={styles.content}>
                    <p>
                        {task?.task}
                    </p>
                </article>
                <TaskComments session={session} id={task?.taskId} />
            </main>
        </div>
    )
}
