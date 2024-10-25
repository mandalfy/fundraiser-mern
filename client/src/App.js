// client/src/App.js

import React from 'react';
import './App.css'; // Ensure to keep the CSS import if you want your styles to remain

import DonationFeed from './components/DonationFeed'; // Import the DonationFeed component

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Fundraising Application</h1>
                <DonationFeed /> {/* Include the DonationFeed component */}
            </header>
        </div>
    );
};

export default App;