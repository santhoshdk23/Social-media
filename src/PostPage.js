import React from 'react'
import { Link, useParams } from 'react-router-dom'
// import { Link, Routes } from 'react-router-dom'

const PostPage = ({posts,handleDelete}) => {
  const {id}=useParams();
  const post=posts.find(post=> (post.id).toString()===id);
  return (
      <main className='postpage'>
        <article className='post'>
       {post &&
       <>
       <h2>{post.title}</h2>
       <p className='postdate'>{post.date}</p>
       <p className="postbody">{post.body}</p>
       <Link to={`/edit/${post.id}`}><button>Edit Post</button></Link>
       <button onClick={()=>
       handleDelete(post.id)}>Delete Post</button>
       </>
      }
      {!post &&
      <>
      <h2>Page not found</h2>
      <Link to='/'>Visit our home</Link>
      </>
      }
      </article>
      </main>
      
  )
}

export default PostPage