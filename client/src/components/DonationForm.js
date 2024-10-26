import React, { useState } from 'react';
import axios from 'axios';

const DonationForm = () => {
    const [amount, setAmount] = useState('');
    const [donorName, setDonorName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const donationData = {
            amount,
            donorName,
        };

        try {
            const response = await axios.post('http://localhost:3000/donate', donationData);
            console.log('Donation successful:', response.data);
            setAmount('');
            setDonorName('');
        } catch (error) {
            console.error('Error making donation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Make a Donation</h2>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button type="submit">Donate</button>
        </form>
    );
};

export default DonationForm;
