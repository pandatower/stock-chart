import React, { useState } from "react";
import stockChartLogo from "../images/stockchart.png"; 
import { useNavigate } from 'react-router-dom';  

const NavBar = ({ setSymbol, saveStock }) => {
    const navigate = useNavigate();
    const [searchTick, setSearchTick] = useState("");

    const handleInputChange = (e) => {
        setSearchTick(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTick.trim()) {
            setSymbol(searchTick);
            setSearchTick("");
        }
    };

    const handleSave = () => {
        saveStock(); // Save the current stock
    };

    const goToWatchlist = () => {
        navigate('saved-stocks');
    };

    return (
        <div id='nav-bar'>
            <img src={stockChartLogo} alt="Stock Chart Logo" className="logo" />
            <div className="Nav-buttons">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Search Ticker Symbol" 
                        value={searchTick} 
                        onChange={handleInputChange} 
                    />
                    <button type="submit">Search</button>
                    <button type="button" onClick={handleSave}>Save</button>
                    <button type="button" onClick={goToWatchlist}>Watchlist</button>
                </form>
            </div>
        </div>
    );
};

export default NavBar;
