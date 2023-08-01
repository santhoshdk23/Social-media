import React from 'react'
import { Link } from 'react-router-dom'
const Post=({post})=>{
    console.log(post)
    return(
        <article className='post'>
          <Link to={`post/${post.id}`} >
             <h2>{post.title}</h2>
            <p className="postdate">{post.date}</p>
          </Link>  
            <p className="postbody">{
                (post.body).length <= 25
                ? post.body
                : `${(post.body).slice(0,25)}...`}</p>
        </article>
    )
}

export default Post