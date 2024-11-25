import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/login/Login';
import Signup from  './components/signup/Signup';

function App() {
  return (
    <div>
      <Router>
        <Routes>
            <Route path='' element={<Login />} />
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<Signup />}/>

        </Routes>
    </Router>
      
    </div>
  );
}

export default App;
