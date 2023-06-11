// src/components/UpdateHouseForm.tsx
import React, {useState} from 'react';
import {API_BASE_URL} from "../config";

interface House {
    id: number;
    address: string;
    currentValue: number;
    loanAmount: number;
    risk: number;
}

interface Props {
    house: House;
    onUpdate: (updatedHouse: House) => void;
}

export const UpdateHouseForm: React.FC<Props> = ({house, onUpdate}) => {
    const [address, setAddress] = useState(house.address);
    const [currentValue, setCurrentValue] = useState(house.currentValue);
    const [loanAmount, setLoanAmount] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log()
        try {
            const response = await fetch(`${API_BASE_URL}/api/houses/${house.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address,
                    currentValue: currentValue,
                    loanAmount: loanAmount
                }),
            });

            if (response.ok) {
                const updatedHouse = await response.json();
                onUpdate(updatedHouse);
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Update House Details</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Current Value:</label>
                    <input
                        type="number"
                        value={currentValue}
                        onChange={(e) => setCurrentValue(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label>Loan Amount:</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};