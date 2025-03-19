
import './App.css'

import { loadPosts } from '../../utils/loadPosts';

import Post from '../../components/Post/Post';
import Button from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import Input from '../../components/Input/Input';

function App() {

  const { posts, allPosts, loading, error, loadMorePosts, noMorePosts } = loadPosts();

  const [searchValue, setSearchValue] = useState('');

  const [resultSearch, setResultSearch] = useState([]);

  const search = () => {
    if (!searchValue) return setResultSearch('');

    const resultFilter = allPosts.filter((item) => item.title.toLowerCase().includes(searchValue.toLocaleLowerCase()));

    setResultSearch(resultFilter);
  }

  useEffect(() => {
    search();

  }, [searchValue]);

  const filteredPost = resultSearch ? (resultSearch) : (posts);

  if (loading) return <p>Carregando...</p>;

  if (error) return <p>{error.message}</p>

  return (
    <section className='container'>

      <div className='search-container'>
        <Input
          onChange={(e) => setSearchValue(e.target.value)}
          searchValue={searchValue}
          placeholder='Faça sua busca aqui...'
        />

        {
          searchValue && (
            <h3>
              {resultSearch.length} resultados de busca para... '{searchValue}'
            </h3>
          )
        }
      </div>

      {
        filteredPost.length > 0 ?
          <Post posts={filteredPost} /> :
          (<p>Sem resultados de busca...</p>)
      }

      <div className='button-container'>
        {
          !searchValue && (
            <Button
              text='Load More Posts'
              onClick={loadMorePosts}
              disabled={noMorePosts}
            />
          )
        }
      </div>
    </section>
  )
}

export default App
