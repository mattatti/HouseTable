// src/App.tsx
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

function Nav() {
    const navigate = useNavigate();

    const [houseId, setHouseId] = useState('');

    //handler so that the user will be able to go to the update house page by inserting house ID
    const handleHouseIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHouseId(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && houseId.trim() !== '') {
            navigate(`/update-house/${houseId}`);
        }
    };

    const isHouseIdEmpty = houseId.trim() === '';

    return <nav>
        <ul>
            <li>
                <Link to="/new-house">New House</Link>
            </li>
            <li>
                <span>Update or get House details with ID: </span>
                <input type="text" value={houseId} onChange={handleHouseIdChange} onKeyDown={handleKeyDown}/>
                {!isHouseIdEmpty && (
                    <Link to={`/update-house/${houseId}`}>Go</Link>
                )}
            </li>
        </ul>
    </nav>;
}

export default Nav;
