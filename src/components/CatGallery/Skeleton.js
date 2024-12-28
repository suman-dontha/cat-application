import React from 'react';

const Skeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {Array.from({ length: 8 }).map((_, index) => ( // Adjust 12 to control the number of skeleton cards
                <div key={index} className="border p-4 rounded shadow-sm animate-pulse">
                    <div className="w-full h-48 bg-gray-300 rounded mb-4" />
                    <div className="h-6 bg-gray-300 w-1/2 rounded mb-2" />
                    <div className="h-6 bg-gray-300 w-1/4 rounded mb-2" />
                    <div className="h-4 bg-gray-300 rounded" />
                </div>
            ))}
        </div>
    );
};

export default Skeleton;