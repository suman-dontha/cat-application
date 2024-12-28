import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import CatGallery from '../../components/CatGallery/CatGallery';

export const HomePage = () => {
    return (
    <>
        <NavBar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <CatGallery />
        </main>
    </>
    );
};

