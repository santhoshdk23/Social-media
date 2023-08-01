import {Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import About from './About';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Missing from './Missing';
import Nav from './Nav';
import NewPost from './NewPost';
import PostPage from './PostPage';
import { useEffect, useState } from 'react';
import {format} from 'date-fns'
import api from "./api/posts"
import EditPost from './EditPost';
// import Post from './Post';
// import PostLayout from './PostLayout';



function App() {
  const [posts,setPosts]=useState([])
  const [search,setSearch]=useState('')
  const [searchresults,setSearchResults]=useState([])
  const [postTitle,setPostTitle]=useState('')
  const[postBody,setPostBody]=useState('')
  const [editTitle,setEditTitle]=useState('')
  const[editBody,setEditBody]=useState('')
  const navigate=useNavigate()

  useEffect(()=>{ //when your loading the data for first time we use useeffect
     const fetchposts=async()=>{
      try{
        const response= await api.get('/posts')
        setPosts(response.data); //not need to convert to .json as you do in fetch() in axios .data is enough
      }catch(err){
        if(err.response){ //if there is res
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        }
        else{ //if no res
          console.log(`Error:${err.message}`);
        }
      }
     }
     fetchposts();
  },[])

  useEffect(()=>{
    const filteredresults=posts.filter((post)=>
    ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
    ((post.title).toLowerCase()).includes(search.toLowerCase())) 
    setSearchResults(filteredresults.reverse()); //show the latest post using reverse
    },[posts,search])


  const handleSubmit=async(e)=>{
    e.preventDefault();
    const id=posts.length ? posts[posts.length-1].id+1:1;
    const date=format(new Date(),'MMMM dd,yyyy pp');
    const newPost={id,title:postTitle,date,body:postBody};
    try{
    const response=await api.post('/posts',newPost) //new post is saved even if its reloaded
    const allPosts=[...posts,response.data]  ;
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate('/')
    }catch(err){
      //if no res
        console.log(`Error:${err.message}`);
      }
  }
  const handleEdit=async (id)=>{
    const date=format(new Date(),'MMMM dd,yyyy pp');
    const updatedPost={id,title:editTitle,date,body:editBody};
    try{
      const response=await api.put(`/posts/${id}`,updatedPost)
      setPosts(posts.map(post=> post.id===id ? {...response.data}:post))
      setEditTitle('')
      setEditBody('')
      navigate('/')
      }catch(err){
           console.log(`Error: ${err.message}`);
    }
  }
   
  const handleDelete=async (id)=>{
    try{
      await api.delete(`posts/${id}`)
      const postList=posts.filter(post=> post.id !== id);
      setPosts(postList)
      navigate('/')
    }catch(err){
      //if no res
        console.log(`Error:${err.message}`);
      }  
}
  return (
    <div className="app">
      
      <Header title="Fake App" />
      <Nav 
      search={search}
      setSearch={setSearch}/>
      <Routes>
        <Route path='/' element={<Home posts={searchresults}/>} />
        <Route path='post'>
          <Route index element={ <NewPost 
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}/>}/>
          <Route path=':id' element={<PostPage posts={posts} 
          handleDelete={handleDelete}/>}/>
        </Route>
      <Route path='/edit/:id' element={<EditPost 
          posts={posts}
          handleEdit={handleEdit}
          editBody={editBody}
          editTitle={editTitle}
          setEditBody={setEditBody}
          setEditTitle={setEditTitle} /> }/>    
      <Route path='about' element={<About/>}/>
      <Route path='*' element={<Missing/>}/>
      </Routes>
      
      <Footer/>
     
    </div>
  );
}

export default App;
