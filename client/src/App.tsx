// src/App.tsx
import React, {useState} from 'react';
import {Link, Route, Routes, useLocation} from 'react-router-dom';
import NewHouseForm from './components/NewHouseForm';
import {HouseDetail} from "./components/HouseDetail";

function App() {
    const location = useLocation();
    const showNavLinks = location.pathname === '/';

    const [houseId, setHouseId] = useState('');

    const handleHouseIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHouseId(event.target.value);
    };
    return (
        <div>
            {showNavLinks && (
                <nav>
                    <ul>
                        <li>
                            <Link to="/new-house">New House</Link>
                        </li>
                        <li>
                            <Link to={`/update-house/${houseId}`}>Update House with ID:</Link>
                            <input type="text" value={houseId} onChange={handleHouseIdChange} />
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
