import { auth } from '@/auth'
import styles from './styles.module.css'

import { redirect } from 'next/navigation';
import TaskManager from '@/components/taskManager';


export const metadata = {
    title: "Dashboard",
    description: "Bem-vindo ao painel de controle.",
};

export default async function Dashboard() {

    const session = await auth();

    if (!session?.user) {
        return redirect('/')
    }

    return (
        <div className={styles.container}>
            <TaskManager session={session} />
        </div>
    )
}

