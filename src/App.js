import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/login/Login';
import Signup from  './components/signup/Signup';
import SideMenu from './components/sidemenu/Sidemenu';
import AddSubject from './components/AddSubject/AddSubject';

function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='' element={<Login />} />
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/sidemenu' element={<SideMenu />}/>
            <Route path='/addsubject' element={<AddSubject/>}/>

        </Routes>
    </Router>
      
    </div>
  );
}

export default App;
