"use client";
import Textarea from '@/components/textarea';

import styles from './styles.module.css'

import { FiShare2 } from 'react-icons/fi'
import { FaTrash } from 'react-icons/fa'

import { useState, useEffect } from 'react';

import { db } from '@/services/firebaseConfig';

import { addDoc, collection, query, orderBy, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import Link from 'next/link';

export default function TaskManager({ session }) {

    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [publicTask, setPublicTask] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCheckbox = (e) => {
        setPublicTask(e.target.checked)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (input === '') return alert('Sem dados');

        try {
            setError('');
            setLoading(true);

            await addDoc(collection(db, "tasks"), {
                task: input,
                created: new Date(),
                user: session?.user?.email,
                publicTask: publicTask
            });

            setInput('');
            setPublicTask(false);

        } catch (error) {
            setError(error.message || 'Erro ao buscar dados.')
        } finally {
            setLoading(false);
        }
    }

    const handleShare = async (id) => {
        await navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_URL}/task/${id}`
        );
        alert('Link copiado...');
    }

    const handleDeletDoc = async (id) => {
        const docRef = doc(db, "tasks", id);
        alert('Deletar tarefa?')
        await deleteDoc(docRef);
    }

    useEffect(() => {
        const loadTasks = async () => {
            const tasksRef = collection(db, "tasks");
            const q = query(
                tasksRef,
                orderBy("created", "desc"),
                where("user", "==", session?.user?.email)
            );
            onSnapshot(q, (snapshot) => {
                let list = [];
                snapshot.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        task: doc.data().task,
                        created: doc.data().created,
                        user: doc.data().user,
                        publicTask: doc.data().publicTask
                    })
                })
                setTasks(list);
            })
        }
        loadTasks();
    }, [session?.user?.email]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <main className={styles.main}>
            <section className={styles.content}>
                <div className={styles.contentForm}>
                    <h1 className={styles.title}>
                        Qual sua tarefa?
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <Textarea
                            id={'input'}
                            name={'input'}
                            placeholder='Digite aqui sua tarefa...'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />

                        <div className={styles.checkboxArea}>
                            <input
                                id={'checkbox'}
                                name={'checkbox'}
                                type='checkbox'
                                className={styles.checkbox}
                                checked={publicTask}
                                onChange={handleCheckbox}
                            />
                            <label>Deixar publica</label>
                        </div>
                        <button type='submit' className={styles.button}>
                            Criar tarefa
                        </button>
                    </form>
                </div>
            </section>

            <section className={styles.taskContainer}>
                <h1>
                    Minhas Tarefas
                </h1>

                {
                    tasks?.map(({ id, task, publicTask }) => (
                        <article key={id} className={styles.task}>
                            {
                                publicTask && (
                                    <div className={styles.tagContainer}>
                                        <label className={styles.tag}>Publico</label>
                                        <button type={'button'} className={styles.shareButton} onClick={() => handleShare(id)}>
                                            <FiShare2 size={'1.2rem'} color={'#4e6bbf'} />
                                        </button>
                                    </div>
                                )
                            }

                            <div className={styles.taskContent}>
                                {
                                    publicTask ? (
                                        <Link href={`/task/${id}`} className={styles.publicLink}>
                                            <p>{task}</p>
                                        </Link>
                                    ) : (
                                        <p>
                                            {task}
                                        </p>
                                    )
                                }
                                <button type={'button'} className={styles.trashButton} onClick={() => handleDeletDoc(id)}>
                                    <FaTrash size={'1.5rem'} color={'#4e6bbf'} />
                                </button>
                            </div>
                        </article>
                    ))
                }

            </section>
        </main>
    )
}
