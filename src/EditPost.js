import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditPost = ({
  posts,handleEdit,editBody,editTitle,setEditBody,setEditTitle
}) => {
  const {id}=useParams()
  const post=posts.find(post=>post.id.toString()===id)
  useEffect(()=>{
    if(post){
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  },[post,setEditBody,setEditTitle])
  return (
    <main className="newpost">
      {editTitle &&
      <>
      <h2>Edit Post</h2>
      <form onSubmit={(e)=>e.preventDefault()} className="newpostform">
        <label htmlFor='posttitle'>Title:</label>
        <input
          id='posttitle'
          type='text'
          required
          value={editTitle}
          onChange={(e)=> setEditTitle(e.target.value)}/>
        <label htmlFor='postbody'>Post:</label>
        <textarea
          id='postbody'
          type='text'
          rows={10}
          cols={10}
          required
          value={editBody}
          onChange={(e)=> setEditBody(e.target.value)}/>  
        <button type='sumbit'
         onClick={()=>handleEdit(post.id)} >Submit</button>  

      </form>
      </>
      }
    </main>
  )
}

export default EditPost