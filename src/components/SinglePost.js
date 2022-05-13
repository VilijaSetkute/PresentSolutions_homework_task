import React, {useState, useEffect, useContext} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mainContext from '../context/mainContext'

const SinglePost = () => {

    const {id} = useParams()
    const {showList} = useContext(mainContext)
    const [getPost, setPost] = useState([])
    const nav = useNavigate()

    useEffect(() => {
        async function getSinglePost() {
            if (id > 100) {
                const filteredPost = showList.filter(el => el.id === Number(id))[0]
                setPost(filteredPost)
            } else {
                await fetch('https://jsonplaceholder.typicode.com/posts/' + id)
                    .then(res => res.json())
                    .then(post => {
                        setPost(post)
                    })
            }
        }
        getSinglePost()
    }, [])

    return (
        <div className='container mx-auto'>
            
            <div className='d-flex justify-content-between mb-3'>
                <div className='fs-5 fw-bold'>Selected post</div>
                <div className='btn btn-outline-success mx-1' onClick={() => nav('/')}>Back to list</div>
            </div>
            <div className='card bg-light mb-1'>
                <div className='card-header'>
                    <div className='fw-bolder fs-5'>Post title</div>
                    <div className='fw-bolder'>{getPost.title}</div>
                    <div className='text-small'>created by user #{getPost.userId}</div>
                </div>
                <div className='card-body mb-3'>
                    <p className='card-text'>{getPost.body}</p>
                </div>
            </div>            
        </div>
    );
};

export default SinglePost;