import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); 

const DonationFeed = () => {
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        
        socket.on('newDonation', (donation) => {
            setDonations((prevDonations) => [donation, ...prevDonations]);
        });

        return () => {
            socket.off('newDonation');
        };
    }, []);

    return (
        <div>
            <h2>Recent Donations</h2>
            <ul>
                {donations.map((donation) => (
                    <li key={donation._id}>
                        {donation.amount} donated by {donation.donorName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DonationFeed;
