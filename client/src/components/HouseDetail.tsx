// src/components/HouseDetail.tsx
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
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
                    console.error('Error:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchHouseDetails().catch();
    }, [id]);

    const handleUpdate = (updatedHouse: House) => {
        setHouse(updatedHouse);
    };

    if (!house) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>House Details</h2>
            <p>ID: {house.id}</p>
            <p>Address: {house.address}</p>
            <p>Current Value: {house.currentValue}</p>
            <p>Loan Amount: {house.loanAmount}</p>
            <p>Risk: {house.risk}%</p>
            <UpdateHouseForm house={house} onUpdate={handleUpdate}/>
        </div>
    );
};