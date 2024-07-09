import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Header from './Components/Header';
import ProductCard from './Components/ProductCard';
import ProductList from './Components/ProductList';
import Login from './Components/Login';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleLogin = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} username={username} />
            <Routes>
                <Route path="/" element={<ProductCard />} />
                <Route path="/admin" element={isLoggedIn && username === 'admin' ? <ProductList /> : <Navigate to="/" />} />
                <Route path="/login" element={<Login handleLogin={handleLogin} />} />
            </Routes>
        </Router>
    );
};

export default App;
