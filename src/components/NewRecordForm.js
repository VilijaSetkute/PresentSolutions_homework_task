import React, {useRef, useContext} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import mainContext from '../context/mainContext';

const NewRecordForm = () => {

    const {originalList, setOriginalList, showList, setShowList} = useContext(mainContext)
    const nav = useNavigate()
    const userRef = useRef()
    const titleRef = useRef()
    const bodyRef = useRef() 

    async function handlePost() {

        const newPost = {
            id: originalList.length + 1,
            userId: userRef.current.value,
            title: titleRef.current.value,
            body: bodyRef.current.value,
        }

        await fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(list => {
                setOriginalList([...originalList, newPost])
                setShowList([...showList, newPost])
            })

        userRef.current.value = ''
        titleRef.current.value = ''
        bodyRef.current.value = ''
        nav('/')
    }

    return (
        <div className='container mx-auto'>
            <div>
                <div className='border rounded-1 p-3 d-flex flex-column'>
                    <div className='text-center fw-bolder fs-5 mb-3'>New post</div>
                    <input ref={userRef} className='p-1 my-1 border rounded-1' type='text' placeholder='enter user name / id'/>
                    <input ref={titleRef} className='p-1 my-1 border rounded-1' type='text' placeholder='enter post title'/>
                    <textarea ref={bodyRef} className='p-1 my-1 border rounded-1' rows='5' placeholder='enter post content'/>
                    <div className='btn btn-outline-success my-1' onClick={handlePost}>Add new post</div>
                </div>
            </div>
        </div>
    );
};

export default NewRecordForm;