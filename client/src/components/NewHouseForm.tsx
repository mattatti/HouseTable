// src/components/NewHouseForm.tsx
import React, { useState } from 'react';

const NewHouseForm = () => {
    const [address, setAddress] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [houseId, setHouseId] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/houses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address,
                    currentValue: parseFloat(currentValue),
                }),
            });

            if (response.ok) {
                const { id } = await response.json();
                setHouseId(id);
                setAddress('');
                setCurrentValue('');
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>New House Form</h2>
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
                        onChange={(e) => setCurrentValue(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {houseId && (
                <p>
                    House created with ID: {houseId}.{' '}
                    <a href={`/houses/${houseId}`}>View details</a>
                </p>
            )}
        </div>
    );
};

export default NewHouseForm;
