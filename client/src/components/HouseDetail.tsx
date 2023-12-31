// src/components/HouseDetail.tsx
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {UpdateHouseForm} from './UpdateHouseForm';
import {API_BASE_URL} from "../config";

interface House {
    id: number;
    address: string;
    currentValue: number;
    loanAmount: number;
    risk: number;
}

export const HouseDetail = () => {
    const {id} = useParams<{ id: string }>();

    const [house, setHouse] = useState<House | null>(null);

    useEffect(() => {
        const fetchHouseDetails = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/houses/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setHouse(data);
                } else {
                    alert(`House with ID ${id} doesn't exist`);
                    console.error('Error:', response.status);
                }
            } catch (error) {

                console.error('Error:', error);
            }
        };

        fetchHouseDetails().catch(console.error);
    }, [id]);

    const handleUpdate = (updatedHouse: House) => {
        setHouse(updatedHouse);
    };

    return <>
        {!house ?
            <>
                <div>Please go back to the previous page.</div>
                <div style={{paddingTop: 10}}>
                    <Link to="/">Back</Link>
                </div>
            </>
            :
            <>
                <h2>House Details</h2>
                <p>ID: {house.id}</p>
                <p>Address: {house.address}</p>
                <p>Current Value: {house.currentValue}</p>
                <p>Loan Amount: {house.loanAmount}</p>
                <p>Risk: {(house.risk * 100).toFixed(2)}%</p>
                <UpdateHouseForm house={house} onUpdate={handleUpdate}/>
            </>
        }
    </>;
};