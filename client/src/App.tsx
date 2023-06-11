// src/App.tsx
import React from 'react';
import {Link, Route, Routes, useLocation} from 'react-router-dom';
import NewHouseForm from './components/NewHouseForm';
import {HouseDetail} from "./components/HouseDetail";

function App() {
    const location = useLocation();
    const showNavLinks = location.pathname === '/';
    return (
        <div>
            {showNavLinks && (
            <nav>
                <ul>
                    <li>
                        <Link to="/new-house">New House</Link>
                    </li>
                    <li>
                        <Link to="/update-house">Update House</Link>
                    </li>
                </ul>
            </nav>
            )}
                <Routes>
                    <Route path="/new-house" element={<NewHouseForm/>}/>
                    <Route path="/update-house/:id" element={<HouseDetail/>}/>
                </Routes>


        </div>
    );
}

export default App;
