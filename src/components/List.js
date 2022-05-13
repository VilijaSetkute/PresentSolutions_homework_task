import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import mainContext from '../context/mainContext';
import Sorting from './Sorting';
import Filter from './Filter';
import Pagination from "./Pagination";

const List = () => {

    const {showList} = useContext(mainContext)
    const nav = useNavigate()

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(10)

    const lastPost = currentPage * postPerPage
    const firstPost = lastPost - postPerPage
    const currentPosts = showList.slice(firstPost, lastPost)

    const paginate = pageNum => setCurrentPage(pageNum);

    return (
        <div className='container'>
            <div className='d-flex align-items-center'>
                <div>
                    <div className='btn btn-success' onClick={() => nav('/new-post')}>New post</div>
                </div>
                <div className='d-flex'>
                    <Sorting/>
                    <Filter setCurrentPage={setCurrentPage}/>
                </div>

            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Title</th>
                </tr>
                </thead>
                <tbody>
                {currentPosts.map((x, i) =>
                    <tr key={i} onClick={() => nav('/post/'+ x.id)} className='hover hover-text'>
                        <th scope="row">{x.id}</th>
                        <td>{x.userId}</td>
                        <td>{x.title}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <Pagination postsPerPage={postPerPage} totalPosts={showList.length} paginate={paginate} currentPage={currentPage}/>
        </div>
    );
};

export default List;