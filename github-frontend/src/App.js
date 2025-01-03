import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';


const App = () => {
    const [userData, setUserData] = useState(null);
    const [repos, setRepos] = useState([]);
    return (
        <Router>
            <Routes>
                <Route path="/" 
                   element={ <Home setUserData={setUserData} setRepos={setRepos} />}
               />
            </Routes>
        </Router>
    );
};

export default App;
