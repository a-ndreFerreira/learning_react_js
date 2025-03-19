import { useEffect, useState } from 'react'

export const loadPosts = () => {

    const [posts, setPosts] = useState([]);

    const [allPosts, setAllPosts] = useState([]);

    const [page, setPage] = useState(0);

    const [postPerPage] = useState(3)

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);

    const loadMorePosts = () => {

        const nextPage = page + postPerPage;

        const nextPost = allPosts.slice(nextPage, nextPage + postPerPage);

        setPosts((posts) => [...posts, ...nextPost])

        setPage(nextPage)

    }

    const noMorePosts = page + postPerPage >= allPosts.length;

    useEffect(() => {
        const loadingPost = async () => {
            try {
                setError('');
                setLoading(true);

                //Depois corrigir aqui
                const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');

                // const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

                const photosResponse = fetch('https://picsum.photos');

                //fazer todos as promises
                const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

                //converte em json
                const postJson = await posts.json();

                // const photosJson = await photos.json();

                const photosUrl = `${photos.url}600/700?random=`;

                //ziper de arrays
                const postsNphotos = postJson.map((post, index) => {
                    return { ...post, cover: `${photosUrl}${index}` }
                })

                // const postsNphotos = postJson.map((item, index) => {
                //     return {...item, cover: postsNphotos[index].url};
                // })

                setPosts(postsNphotos.slice(page, postPerPage));
                setAllPosts(postsNphotos)

            } catch (error) {
                setError(error.message || 'Erro ao buscar dados.');

            } finally {
                setLoading(false);
            }

        }

        loadingPost();

    }, []);

    return { posts, allPosts, loading, error, loadMorePosts, noMorePosts };

}