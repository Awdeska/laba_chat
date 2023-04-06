import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import ChatPage from "./pages/ChatPage";
import RegistrationPage from "./pages/RegistrationPage";
import {store} from "./index";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    async function handleCheckAuth() {
        if (localStorage.getItem('token')) {
            await store.checkAuth();
            if (store.isAuthorized) {
                setIsAuthenticated(true);
            }
        }
    }
    useEffect(() => {
        handleCheckAuth();
    }, []);

    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route exact path="/" element=
                        {isAuthenticated ? (
                            <Navigate to="/chat" />
                        ) : (
                            <RegistrationPage/>
                        )}>
                    </Route>
                    <Route exact path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/" />}>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;