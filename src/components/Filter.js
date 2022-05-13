import React, {useRef, useState, useEffect, useContext} from 'react';
import mainContext from '../context/mainContext';

const Filter = ({setCurrentPage}) => {

    const filterRef = useRef()

    const {showList, setShowList, originalList} = useContext(mainContext)
    const [getToggle, setToggle] = useState(false)
    const [getSelection, setSelection] = useState('Filter by user')
    const [uniqueUsers, setUniqueUsers] = useState([])

    const handleClick = e => {
        if (!filterRef.current.contains(e.target)) return setToggle(false)
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => { document.removeEventListener("mousedown", handleClick) };
    }, []);

    useEffect(() => {
        const uniqueUsers = originalList
            .filter((value, index, self) => self.findIndex((el) => el.userId === value.userId) === index)
            .map(el => el.userId)
            .sort((a, b) => a > b ? 1 : -1);
        setUniqueUsers(uniqueUsers)
    }, [showList]) 

    async function handleFilter(user) {
        if (user === 'remove') {
            setShowList(originalList)
            setSelection('Filter by user')
        } else {
            const filtered = originalList.filter(el => el.userId === user)
            setShowList(filtered)
            setSelection(`user ${typeof user !== 'string' ? '#' + user : user}`)
        }
        setCurrentPage(1)
        setToggle(false)
    }

    return (
        <div ref={filterRef} className='ms-1' style={{width: '150px'}}>

            <div className='w-100 sorting position-relative'>
                <div className={`${getToggle && 'btn-success'} selection d-flex justify-content-between align-items-center rounded-2`}
                     onClick={() => setToggle(!getToggle)}>
                    <div>{getSelection}</div>
                </div>
                {getToggle && <div className='optionSet position-absolute' >
                    <div className='option' onClick={() => handleFilter('remove')}>Remove filter</div>
                    {uniqueUsers.map((x, i) => 
                        <div key={i} className='option' onClick={() => handleFilter(x)}>{typeof x !== 'string' && '#'}{x}</div>
                    )}
                </div>}
            </div>

        </div>
    );
};

export default Filter;