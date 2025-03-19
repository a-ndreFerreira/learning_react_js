import './Post.css'

import PostCard from '../PostCard/PostCard';

const Post = ({ posts }) => {


    return (
        <div className='posts'>
            {
                posts?.map((item) => {
                    const { body, title, id, cover } = item;

                    return (
                        <PostCard
                            key={id}
                            id={id}
                            cover={cover}
                            title={title}
                            body={body}
                        />
                    )
                })
            }
        </div>
    )
}

export default Post