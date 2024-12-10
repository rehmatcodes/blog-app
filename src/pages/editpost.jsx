import React,{useEffect,useState} from 'react'
import {containor,PostForm} from '../Components'
import appwriteservice from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import { set } from 'react-hook-form'


function editpost() {
    const [posts , setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()


    useEffect(() =>{
        if (slug) {
            appwriteservice.getPost(slug).then((posts) =>{
                if(posts){
                    setPosts
                }
            })
        } else{
            navigate('/')
        }
    },[
        slug,navigate
    ])
  return posts ? (
    <div className='py-8 '>
        <containor>
            <PostForm posts = {posts} />
            </containor>
    </div>
  ) : null
}

export default editpost