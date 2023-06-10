// src/components/UpdateHouseForm.tsx
import React, {useState} from 'react';

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/houses/${house.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address,
                    currentValue: currentValue,
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
                <button type="submit">Update</button>
            </form>
        </div>
    );
};