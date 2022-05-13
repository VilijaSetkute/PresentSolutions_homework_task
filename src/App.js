import './App.css';
import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import ListPage from "./pages/ListPage";
import NewRecordPage from "./pages/NewRecordPage";
import Toolbar from './components/Toolbar';
import mainContext from './context/mainContext';

function App() {

  const [originalList, setOriginalList] = useState([])
  const [showList, setShowList] = useState([])

  useEffect(() => {
      async function getData() {
        await fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(list => {
                setOriginalList(list)
                setShowList(list)
            })
      }
      getData()
  }, [])

  return (
    <mainContext.Provider value={{originalList, setOriginalList, showList, setShowList}}>
      <div>
          <Router>
          <Toolbar/>
              <Routes>
                  <Route path='/' element={<ListPage/>}/>
                  <Route path='/post/:id' element={<DetailsPage/>}/>
                  <Route path='/new-post' element={<NewRecordPage/>}/>
              </Routes>
          </Router>
      </div>
    </mainContext.Provider>
  );
}

export default App;
