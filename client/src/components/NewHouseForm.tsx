// src/components/NewHouseForm.tsx
import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {API_BASE_URL} from "../config";

const NewHouseForm = () => {
    const [address, setAddress] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    const [loanAmount, setLoanAmount] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/api/houses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    address,
                    currentValue: parseFloat(currentValue),
                    loanAmount: parseFloat(loanAmount),
                }),
            });

            if (response.ok) {
                const newHouse = await response.json();
                // Show the newly created house's ID to the user
                alert(`New house created with ID: ${newHouse.id}`);
                // Clear the form fields
                setAddress('');
                setCurrentValue('');
                setLoanAmount('');
                // Navigate to the house detail page
                // Assuming you have a router in place, e.g., React Router
                // history.push(`/houses/${newHouse.id}`);
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return <>
        <h2>Add New House</h2>

        <form onSubmit={handleSubmit}>

            <div>
                <label>Address: </label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Current Value: </label>
                <input
                    type="number"
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    required
                />
            </div>

            <div style={{paddingBottom: 10}}>
                <label>Loan Amount: </label>
                <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    required
                />
            </div>

            <button type="submit">Submit</button>

            <div style={{paddingTop: 10}}>
                <Link to="/">Back to main page</Link>
            </div>
        </form>
    </>;
};

export default NewHouseForm;
