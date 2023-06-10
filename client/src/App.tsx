// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewHouseForm from './components/NewHouseForm';
import {HouseDetail} from "./components/HouseDetail";

function App() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<NewHouseForm/>} />
            <Route path="/houses/:id" element={<HouseDetail/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
