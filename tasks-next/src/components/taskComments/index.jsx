"use client"
import { useEffect, useState } from 'react';
import styles from './styles.module.css'
import Textarea from '@/components/textarea';
import { addDoc, collection, where, query, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { FaTrash } from 'react-icons/fa';

export default function TaskComments({ session, id }) {
    const user = session?.user;
    const userName = session?.user?.name;
    const email = session?.user?.email;

    const [input, setInput] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [allComments, setAllComments] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input === '') return alert('Sem dados');
        if (!user || !userName) return alert('Usuário precisa estar logado.');
        try {
            setLoading(true);
            setError('');
            const docRef = await addDoc(collection(db, "comments"), {
                comment: input,
                created: new Date(),
                user: email,
                userName: userName,
                taskId: id,
            })
            const data = {
                id: docRef.id,
                comment: input,
                user: email,
                userName: userName,
                taskId: id,
            }
            setAllComments((prev) => [...prev, data]);
            setInput('');
        } catch (error) {
            setError(error.message || 'Erro ao postar comentário')
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try {
            setError('');
            const docRef = doc(db, "comments", id)
            await deleteDoc(docRef);
            const deleteComment = allComments.filter((item) => item.id !== id);
            setAllComments(deleteComment)
            // alert('Comentário deletado com sucesso.')
        } catch (error) {
            setError(error.message || 'Erro ao deletar comentário');
        }
    }

    useEffect(() => {
        const loadDocs = async () => {
            const q = query(
                collection(db, "comments"),
                where("taskId", "==", id)
            )
            const snapshotComments = await getDocs(q);
            let listComments = [];
            snapshotComments.forEach((doc) => {
                listComments.push({
                    id: doc.id,
                    comment: doc.data()?.comment,
                    user: doc.data()?.user,
                    userName: doc.data()?.userName,
                    taskId: doc.data()?.taskId,
                })
            })
            setAllComments(listComments);
        }
        loadDocs();
    }, [id])

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;
    return (
        <section className={styles.commentsContainer}>
            <h1>
                Deixar comentário
            </h1>
            <form onSubmit={handleSubmit}>
                <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={'Digite seu comentário aqui...'} />
                <button type={'submit'} className={styles.buttonComments} disabled={!user}>
                    Criar comentário
                </button>
            </form>
            <article className={styles.taskComment}>
                <h2>
                    Comentários
                </h2>
                {
                    allComments.length === 0 && (
                        <p>
                            Ops, sem comentário aqui...
                        </p>
                    )
                }
                {
                    allComments.map(({ id, user, userName, comment }) => (
                        <div key={id} className={styles.comment}>
                            <div className={styles.commentHead}>
                                <label className={styles.commentLabel}>
                                    {userName}
                                </label>
                                {
                                    user === session?.user?.email && (
                                        <button className={styles.commentButton} onClick={() => handleDelete(id)}>
                                            <FaTrash size={'1.5rem'} color={'#4e6bbf'} />
                                        </button>
                                    )
                                }
                            </div>
                            <p className={styles.content}>
                                {comment}
                            </p>
                        </div>
                    ))
                }
            </article>
        </section >
    )
}
