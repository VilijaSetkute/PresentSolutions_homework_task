import React, {useRef, useState, useEffect, useContext} from 'react';
import mainContext from '../context/mainContext';

const Sorting = () => {

    const sortingRef = useRef()

    const {showList, setShowList, originalList} = useContext(mainContext)
    const [getToggle, setToggle] = useState(false)
    const [getSelection, setSelection] = useState('Sort by')

    const handleClick = e => {
        if (!sortingRef.current.contains(e.target)) return setToggle(false)
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => { document.removeEventListener("mousedown", handleClick) };
    }, []);

    function selectOption(text) {
        setSelection(text)
        setToggle(false)
    }

    function sort(text) {
        let posts
        if (text === 'remove') {
            setShowList(originalList.sort((a,b) => a.id > b.id ? 1 : -1))
            setSelection('Sort by')
        } else {
            if (text === 'asc') {
                posts = showList.sort((a, b) => a.title > b.title ? 1 : -1)
                selectOption('Title (A to Z)')
            }
            if (text === 'desc') {
                posts = showList.sort((a, b) => a.title < b.title ? 1 : -1)
                selectOption('Title (Z to A)')
            }
            setShowList([...posts])
        }

    }

    return (
        <div ref={sortingRef} className='ms-1' style={{width: '150px'}}>

            <div className='w-100 sorting position-relative'>
                <div className={`${getToggle && 'btn-success'} selection d-flex justify-content-between align-items-center rounded-2`}
                     onClick={() => setToggle(!getToggle)}>
                    <div>{getSelection}</div>
                </div>
                {getToggle && <div className='optionSet position-absolute' >
                    <div className='option' onClick={() => sort('remove')}>Remove filter</div>
                    <div className='option' onClick={() => sort('asc')}>Title (A to Z)</div>
                    <div className='option' onClick={() => sort('desc')}>Title (Z to A)</div>
                </div>}
            </div>

        </div>
    );
};

export default Sorting;