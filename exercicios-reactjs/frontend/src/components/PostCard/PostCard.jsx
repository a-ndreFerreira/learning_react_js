import './PostCard.css'

const PostCard = ({ cover, title, body, id }) => {
    return (
        <div className='post'>
            <img src={cover} alt={title} />
            <div className='post-content'>
                <h2>
                    {title} #{id}
                </h2>
                <p>
                    {body}
                </p>
            </div>
        </div>
    )
}

export default PostCard