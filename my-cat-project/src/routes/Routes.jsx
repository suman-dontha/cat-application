import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { HomePage } from '../pages/HomePage/HomePage';
import { Upload } from '../pages/Upload/Upload';

export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/upload" element={<Upload />} />
            </Routes>
        </Router>
    );
};
