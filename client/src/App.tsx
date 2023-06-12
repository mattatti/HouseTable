// src/App.tsx
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import NewHouseForm from './components/NewHouseForm';
import {HouseDetail} from "./components/HouseDetail";
import Nav from "./components/Nav";

function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Nav/>}/>
                <Route path="/new-house" element={<NewHouseForm/>}/>
                <Route path="/update-house/:id" element={<HouseDetail/>}/>
            </Routes>
        </div>
    );
}

export default App;
